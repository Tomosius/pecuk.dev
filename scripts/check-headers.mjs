import { execSync } from 'node:child_process';

const url = process.env.PROD_URL;
if (!url) {
	console.log('SKIP headers check: set PROD_URL (e.g. https://example.com)');
	process.exit(0);
}

// Fetch headers
const raw = execSync(`curl -sI ${url}`, { encoding: 'utf8' });
const headers = Object.fromEntries(
	raw
		.split(/\r?\n/)
		.filter(Boolean)
		.slice(1)
		.map((l) => {
			const i = l.indexOf(':');
			return [l.slice(0, i).toLowerCase(), l.slice(i + 1).trim()];
		})
);

function mustHave(name) {
	if (!headers[name]) {
		console.error(`Missing header: ${name}`);
		process.exitCode = 1;
	}
}

mustHave('content-security-policy'); // CSP
mustHave('x-content-type-options'); // nosniff
mustHave('referrer-policy');
mustHave('permissions-policy');
mustHave('x-frame-options');
/* HSTS only makes sense on HTTPS apex
if (!url.startsWith('http://')) mustHave('strict-transport-security');
*/

if (process.exitCode) {
	console.error('\nGot headers:\n' + raw);
	process.exit(process.exitCode);
} else {
	console.log('Security headers OK');
}
