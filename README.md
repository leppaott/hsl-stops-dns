# hsl-stops-dns
Tiny REST API to translate bus stop numbers &lt;-> stop names

Using [HSL-Api](https://digitransit.fi/en/developers/)

Deployed as a Google Cloud Function at (https://us-central1-hsl-stop-dns.cloudfunctions.net/stops) this api provides translation between bus stop numbers (ex. 4040) and bus stop names (ex. Liisankatu).

Example:
In JSON:
```javascript
 {"stops": "4040,Kumpula,Liisanka"}
```
or simply
(https://us-central1-hsl-stop-dns.cloudfunctions.net/stops?stops=4040,Kumpula,Liisanka)

results in:

```javascript
[
  {
    "4040": "Herttoniemi(M)"
  },
  {
    "Kumpula": "3080"
  },
  {
    "Liisanka": "2012",
    "properName": "Liisankatu"
  }
]
```
Where keys are search queries and values results of queries and properName where bus number query didn't quite match the full name of the stop.

