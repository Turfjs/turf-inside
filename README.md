# turf-inside

[![build status](https://secure.travis-ci.org/Turfjs/turf-inside.png)](http://travis-ci.org/Turfjs/turf-inside)

turf inside module


### `turf.inside(point, polygon)`

Checks to see if a Point is inside of a Polygon. The Polygon can
be convex or concave. The function accepts any valid Polygon or MultiPolygon
and accounts for holes.


### Parameters

| parameter | type    | description       |
| --------- | ------- | ----------------- |
| `point`   | Point   | a Point feature   |
| `polygon` | Polygon | a Polygon feature |


### Example

```js
var pt1 = turf.point([-111.467285, 40.75766], {'marker-color': "#f00"});
var pt2 = turf.point([-111.873779, 40.647303], {'marker-color': "#0f0" });
var poly = turf.polygon([[
 [-112.074279, 40.52215],
 [-112.074279, 40.853293],
 [-111.610107, 40.853293],
 [-111.610107, 40.52215],
 [-112.074279, 40.52215]
]]);
var features = turf.featurecollection([pt1, pt2, poly]);

//=features

var isInside1 = turf.inside(pt1, poly);
//=isInside1

var isInside2 = turf.inside(pt2, poly);
//=isInside2
```

## Installation

Requires [nodejs](http://nodejs.org/).

```sh
$ npm install turf-inside
```

## Tests

```sh
$ npm test
```

