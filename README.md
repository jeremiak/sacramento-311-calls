# Sacramento 311 calls

Compiling 311 data for the City of Sacramento to facilitate analysis by neighborhood or time period.

[![Scrape 311 data](https://github.com/jeremiak/sacramento-311-requests/actions/workflows/scrape.yml/badge.svg)](https://github.com/jeremiak/sacramento-311-requests/actions/workflows/scrape.yml)

## Motivation

The city of Sacramento recommends that residents use 311 to make the city government aware of issues but does not publish the calls in a way that facilitates performance analysis and answer questions like:

* How long is the average 311 request open for? Does it vary by neighborhood or by issue?


Apparently, the city government once thought it would publish frequent updates of the data. On the municipal web page describing the 311 incident map it says:
> You can download all 311 Incidents created since May 1st 2016 through April 15th, 2020 in the Open Data Portal . Incidents post April 15th, 2020 will be added soon.

They haven't yet been added.

## Running

```
deno run --allow-read=calls.json --allow-write=calls.json --allow-net ./scrape.ts
```
