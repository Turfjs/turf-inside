var test = require('tape');
var inside = require('./');
var point = require('turf-point');
var linestring = require('turf-linestring');
var polygon = require('turf-polygon');
var multipoint = require('turf-multipoint');
var multilinestring = require('turf-multilinestring');
var multipolygon = require('turf-multipolygon');
var geometrycollection = require('turf-geometrycollection');
var featurecollection = require('turf-featurecollection');
var fs = require('fs');

test('bad type', function (t) {
  var poly = polygon([[[0,0], [0,100], [100,100], [100,0], [0,0]]]);

  t.throws(function() {
      inside(poly, poly);
  }, /Invalid input to inside: must be a Point, given Polygon/);

  t.end();
});

test('concave/convex polygons', function (t) {
  // test for a simple polygon
  var poly = polygon([[[0,0], [0,100], [100,100], [100,0], [0,0]]]);
  var ptIn = point([50, 50]);
  var ptOut = point([140, 150]);

  t.true(inside(ptIn, poly), 'point inside simple polygon');
  t.false(inside(ptOut, poly), 'point outside simple polygon');

  // test for a concave polygon
  var concavePoly = polygon([[[0,0], [50, 50], [0,100], [100,100], [100,0], [0,0]]]);
  var ptConcaveIn = point([75, 75]);
  var ptConcaveOut = point([25, 50]);

  t.true(inside(ptConcaveIn, concavePoly), 'point inside concave polygon');
  t.false(inside(ptConcaveOut, concavePoly), 'point outside concave polygon');

  t.end();
});

test('poly with hole', function (t) {
  var ptInHole = point([-86.69208526611328, 36.20373274711739]);
  var ptInPoly = point([-86.72229766845702, 36.20258997094334]);
  var ptOutsidePoly = point([-86.75079345703125, 36.18527313913089]);
  var polyHole = JSON.parse(fs.readFileSync(__dirname + '/fixtures/poly-with-hole.geojson'));

  t.false(inside(ptInHole, polyHole), 'out');
  t.true(inside(ptInPoly, polyHole), 'in');
  t.false(inside(ptOutsidePoly, polyHole), 'out');

  t.end();
});

test('multipolygon with hole', function (t) {
  var ptInHole = point([-86.69208526611328, 36.20373274711739]);
  var ptInPoly = point([-86.72229766845702, 36.20258997094334]);
  var ptInPoly2 = point([-86.75079345703125, 36.18527313913089]);
  var ptOutsidePoly = point([-86.75302505493164, 36.23015046460186]);
  var multiPolyHole = JSON.parse(fs.readFileSync(__dirname + '/fixtures/multipoly-with-hole.geojson'));

  t.false(inside(ptInHole, multiPolyHole), 'out');
  t.true(inside(ptInPoly, multiPolyHole), 'in');
  t.true(inside(ptInPoly2, multiPolyHole), 'in');
  t.true(inside(ptInPoly, multiPolyHole), 'in');
  t.false(inside(ptOutsidePoly, multiPolyHole), 'out');

  t.end();
});

test('point', function (t) {
  var pt1 = point([-86.69208526611328, 36.20373274711739]);
  var pt2 = point([-86.72229766845702, 36.20258997094334]);

  t.true(inside(pt1, pt1), 'in');
  t.false(inside(pt1, pt2), 'out');

  t.end();
});

test('linestring', function (t) {
  var pt = point([1,1]);
  var line1 = linestring([[86,42],[66,25],[93,23],[0,16],[-40,5],[16,-20],[1,1]], 'in');
  var line2 = linestring([[86,42],[66,25],[93,23],[86,42],[-54,63],[-80,53],[-60,52],[-54,63]], 'out');

  t.true(inside(pt, line1), 'in');
  t.false(inside(pt, line2), 'out');

  t.end();
});

test('multipoint', function (t) {
  var pt = point([1,1]);
  var multipt1 = multipoint([[0,0], [1,1]], 'in');
  var multipt2 = multipoint([[0,0], [2,2]], 'out');

  t.true(inside(pt, multipt1), 'in');
  t.false(inside(pt, multipt2), 'out');

  t.end();
});

test('multilinestring', function (t) {
  var pt = point([1,1]);
  var multiline1 = multilinestring([[[86,42],[66,25],[93,23]], [[1,1],[-40,5],[16,-20],[0,16]]], 'in');
  var multiline2 = multilinestring([[[86,42],[66,25],[93,23]], [[-54,63],[-80,53],[-60,52]]], 'out');

  t.true(inside(pt, multiline1), 'in');
  t.false(inside(pt, multiline2), 'out');

  t.end();
});

test('multipolygon', function (t) {
  var pt = point([1,1]);
  var multipoly1 = multipolygon([[[[86,42],[66,25],[93,23],[86,42]]], [[[0,16],[-40,5],[16,-20],[0,16]]]], 'in');
  var multipoly2 = multipolygon([[[[86,42],[66,25],[93,23],[86,42]]], [[[-54,63],[-80,53],[-60,52],[-54,63]]]], 'out');

  t.true(inside(pt, multipoly1), 'in');
  t.false(inside(pt, multipoly2), 'out');

  t.end();
});

test('geometrycollection', function (t) {
  var pt = point([1,1]);
  var multipoly1 = multipolygon([[[[86,42],[66,25],[93,23],[86,42]]], [[[0,16],[-40,5],[16,-20],[0,16]]]]);
  var multipoly2 = multipolygon([[[[86,42],[66,25],[93,23],[86,42]]], [[[-54,63],[-80,53],[-60,52],[-54,63]]]]);

  var gc1 = geometrycollection([point([0,0]).geometry, multipoly1.geometry]);
  var gc2 = geometrycollection([point([0,0]).geometry, multipoly2.geometry]);
  var gc3 = geometrycollection([point([1,1]).geometry, multipoly2.geometry]);
  t.true(inside(pt, gc1), 'in');
  t.false(inside(pt, gc2), 'out');
  t.true(inside(pt, gc3), 'in');

  t.end();
});

test('featurecollection', function (t) {
  var pt = point([1,1]);
  var multipoly1 = multipolygon([[[[86,42],[66,25],[93,23],[86,42]]], [[[0,16],[-40,5],[16,-20],[0,16]]]]);
  var multipoly2 = multipolygon([[[[86,42],[66,25],[93,23],[86,42]]], [[[-54,63],[-80,53],[-60,52],[-54,63]]]]);

  var fc1 = featurecollection([point([0,0]), multipoly1]);
  var fc2 = featurecollection([point([0,0]), multipoly2]);
  var fc3 = featurecollection([point([1,1]), multipoly2]);

  t.true(inside(pt, fc1), 'in');
  t.false(inside(pt, fc2), 'out');
  t.true(inside(pt, fc3), 'in');

  t.end();
});