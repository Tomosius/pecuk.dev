---
title: DuckDB -  First Steps for Analytics
date: 2025-02-12
tags:
  - duckdb
  - analytics
  - etl
summary: How I set up fast, cheap analytics with DuckDB and Parquet.
cover: images/blog/duckdb-first-steps/cover.png
---

<script>
  import Img from '$lib/blog/Img.svelte';
</script>

<Img src="images/blog/duckdb-first-steps/cover.png" alt="DuckDB cover" className="rounded-xl border border-white/10" />

DuckDB makes columnar analytics ridiculously easy. In this post I show how I wired
CSV/Parquet sources, ran simple aggregations, and kept it reproducible.

```sql
SELECT COUNT(*) FROM 'data/events.parquet';