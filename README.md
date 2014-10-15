turf-inside
===========
[![Build Status](https://travis-ci.org/Turfjs/turf-inside.svg)](https://travis-ci.org/Turfjs/turf-inside)

Checks to see if a point is inside of a polygon. The polygon can be convex or concave. The function accepts any valid polygon or multipolygon and accounts for holes.

###Install

```sh
npm install turf-inside
```

###Parameters

|name|description|
|---|---|
|point|A Point Feature|
|polygon|Determines if the point is inside the polygon or not|

###Usage

```js
inside(pt, poly)
```

###Example

```js
var inside = require('turf-inside')
var point = require('turf-point')
var polygon = require('turf-polygon')

var poly = polygon([[[0,0], [50, 50], [0,100], [100,100], [100,0]]])
var pt = point(75, 75)

var isInside = inside(pt, poly)

console.log(isInside) // true
```

###CLI

```bash
npm install turf-inside -g
turf-inside point.geojson polygon.geojson
```
