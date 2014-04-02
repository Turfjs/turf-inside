var test = require('tape');
var inside = require('./')
var point = require('turf-point')
var polygon = require('turf-polygon')

test('featureCollection', function(t){
  t.plan(4)

  // test for a simple polygon
  var poly = polygon([[[0,0], [0,100], [100,100], [100,0]]])
  var ptIn = point(50, 50)
  var ptOut = point(140, 150)

  t.true(inside(ptIn, poly), 'point inside simple polygon')
  t.false(inside(ptOut, poly), 'point outside simple polygon')

  // test for a concave polygon
  var concavePoly = polygon([[[0,0], [50, 50], [0,100], [100,100], [100,0]]])
  var ptConcaveIn = point(75, 75)
  var ptConcaveOut = point(25, 50)

  t.true(inside(ptConcaveIn, concavePoly), 'point inside concave polygon')
  t.false(inside(ptConcaveOut, concavePoly), 'point outside concave polygon')
});