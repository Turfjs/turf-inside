var inside = require('./');
var Benchmark = require('benchmark');
var fs = require('fs');
var point = require('turf-point');
var linestring = require('turf-linestring');
var polygon = require('turf-polygon');
var multipoint = require('turf-multipoint');
var multilinestring = require('turf-multilinestring');
var multipolygon = require('turf-multipolygon');
var geometrycollection = require('turf-geometrycollection');
var featurecollection = require('turf-featurecollection');

var ptIn = point([50, 50]);

var pt = point([50, 50]);
var multipt = multipoint([[0,0], [50,50]]);
var line = linestring([[86,42],[66,25],[93,23],[0,16],[-40,5],[16,-20],[1,1]]);
var multiline = multilinestring([[[86,42],[66,25],[93,23]], [[1,1],[-40,5],[16,-20],[0,16]]]);
var poly = polygon([[[0,0], [0,100], [100,100], [100,0], [0,0]]]);
var multipoly = multipolygon([[[[86,42],[66,25],[93,23],[86,42]]], [[[0,16],[-40,5],[16,-20],[0,16]]]]);
var fc = featurecollection([poly, multiline]);

var suite = new Benchmark.Suite('turf-inside');
suite
  .add('turf-inside - point',function () {
    inside(ptIn, pt);
  })
  .add('turf-inside - multipoint',function () {
    inside(ptIn, multipt);
  })
  .add('turf-inside - linestring',function () {
    inside(ptIn, line);
  })
  .add('turf-inside - multilinestring',function () {
    inside(ptIn, multiline);
  })
  .add('turf-inside - polygon',function () {
    inside(ptIn, poly);
  })
  .add('turf-inside - multipolygon',function () {
    inside(ptIn, multipoly);
  })
  .add('turf-inside - featurecollection',function () {
    inside(ptIn, fc);
  })
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .on('complete', function () {
    
  })
  .run();