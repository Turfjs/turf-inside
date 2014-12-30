global.inside = require('./');
var Benchmark = require('benchmark');
var fs = require('fs');
global.point = require('turf-point');
global.polygon = require('turf-polygon');

global.poly = polygon([[[0,0], [0,100], [100,100], [0, 0]]]);
global.ptIn = point(50, 50);
global.ptOut = point(140, 150);

var suite = new Benchmark.Suite('turf-inside');
suite
  .add('turf-inside',function () {
    global.inside(global.ptIn, global.poly);
  })
  .add('turf-inside-special',function () {
    global.inside.special(global.ptIn, global.poly);
  })
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .on('complete', function () {
    
  })
  .run();
