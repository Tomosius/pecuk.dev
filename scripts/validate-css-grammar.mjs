// scripts/validate-css-grammar.mjs
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import * as csstree from 'css-tree';

const TARGET_DIR = 'src'; // validate only authored CSS

const SKIP_PROPS = new Set(['font-family', 'font-feature-settings', 'font-variation-settings']);

async function* walk(dir) {
	for (const dirent of await readdir(dir, { withFileTypes: true })) {
		const res = join(dir, dirent.name);
		if (dirent.isDirectory()) yield* walk(res);
		else if (dirent.isFile() && res.endsWith('.css')) yield res;
	}
}

function valueHasVar(valueNode) {
	let has = false;
	csstree.walk(valueNode, {
		visit: 'Function',
		enter(n) {
			if (n.type === 'Function' && n.name.toLowerCase() === 'var') {
				has = true; // no this.break in your version; just flag it
			}
		}
	});
	return has;
}

function isInsidePropertyAtRule(stack) {
	return stack.some((n) => n.type === 'Atrule' && String(n.name).toLowerCase() === 'property');
}

function validateCss(content, file) {
	const errors = [];
	let ast;
	try {
		ast = csstree.parse(content, { positions: true, filename: file });
	} catch (e) {
		errors.push(`${file}: Parse error: ${e.message}`);
		return errors;
	}

	const stack = [];
	csstree.walk(ast, {
		enter(node) {
			stack.push(node);
			if (node.type !== 'Declaration') return;

			const prop = node.property.toLowerCase();
			if (prop.startsWith('--') || prop.startsWith('-')) return; // custom/vendor
			if (SKIP_PROPS.has(prop)) return;
			if (isInsidePropertyAtRule(stack)) return;
			if (valueHasVar(node.value)) return;

			try {
				const match = csstree.lexer.matchProperty(prop, node.value);
				if (!match.matched) {
					const { line, column } = node.loc?.start ?? {};
					const loc = line ? `:${line}:${column}` : '';
					const reason = match.error?.rawMessage || 'Invalid value';
					errors.push(`${file}${loc} — ${prop}: ${reason}`);
				}
			} catch {
				// property unknown to csstree dictionary – ignore
			}
		},
		leave() {
			stack.pop();
		}
	});

	return errors;
}

let allErrors = [];
for await (const file of walk(TARGET_DIR)) {
	const css = await readFile(file, 'utf8');
	allErrors.push(...validateCss(css, file));
}

if (allErrors.length) {
	console.error('✖ CSS grammar errors found:\n');
	for (const e of allErrors) console.error('  -', e);
	process.exit(1);
} else {
	console.log('✓ CSS grammar looks valid.');
}
