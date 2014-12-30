// http://en.wikipedia.org/wiki/Even%E2%80%93odd_rule
// modified from: https://github.com/substack/point-in-polygon/blob/master/index.js
// which was modified from http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

module.exports = function(point, polygon) {
  var polys = polygon.geometry.coordinates;
  var pt = [point.geometry.coordinates[0], point.geometry.coordinates[1]];
  // normalize to multipolygon
  if(polygon.geometry.type === 'Polygon') polys = [polys];

  var insidePoly = false;
  var i = 0;
  while (i < polys.length && !insidePoly) {
    // check if it is in the outer ring first
    if(inRing(pt, polys[i][0])) {
      var inHole = false;
      var k = 1;
      // check for the point in any of the holes
      while(k < polys[i].length && !inHole) {
        if(inRing(pt, polys[i][k])) {
          inHole = true;
        }
        k++;
      }
      if(!inHole) insidePoly = true;
    }
    i++;
  }
  return insidePoly;
}

function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1];
}

function sub(a, b) {
    return [a[0] - b[0], a[1] - b[1]];
}

function fastTriangle(coords, p) {
    var v0 = sub(coords[1], coords[0]),
        v1 = sub(coords[2], coords[0]),
        v2 = sub(p, coords[0]);

    // Compute dot products
    var dot00 = dot(v0, v0),
    dot01 = dot(v0, v1),
    dot02 = dot(v0, v2),
    dot11 = dot(v1, v1),
    dot12 = dot(v1, v2);

    // Compute barycentric coordinates
    var invDenom = 1 / (dot00 * dot11 - dot01 * dot01),
    u = (dot11 * dot02 - dot01 * dot12) * invDenom,
    v = (dot00 * dot12 - dot01 * dot02) * invDenom;

    // Check if point is in triangle
    return (u >= 0) && (v >= 0) && (u + v < 1);
}

module.exports.special = function(point, polygon) {
  var polys = polygon.geometry.coordinates;
  var pt = [point.geometry.coordinates[0], point.geometry.coordinates[1]];

  if (polys.length === 1 && polys[0].length === 4) {
      return fastTriangle(polys[0], pt);
  }

  // normalize to multipolygon
  if(polygon.geometry.type === 'Polygon') polys = [polys];

  var insidePoly = false;
  var i = 0;
  while (i < polys.length && !insidePoly) {
    // check if it is in the outer ring first
    if(inRing(pt, polys[i][0])) {
      var inHole = false;
      var k = 1;
      // check for the point in any of the holes
      while(k < polys[i].length && !inHole) {
        if(inRing(pt, polys[i][k])) {
          inHole = true;
        }
        k++;
      }
      if(!inHole) insidePoly = true;
    }
    i++;
  }
  return insidePoly;
}

// pt is [x,y] and ring is [[x,y], [x,y],..]
function inRing (pt, ring) {
  var isInside = false;
  for (var i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    var xi = ring[i][0], yi = ring[i][1];
    var xj = ring[j][0], yj = ring[j][1];
    
    var intersect = ((yi > pt[1]) != (yj > pt[1]))
        && (pt[0] < (xj - xi) * (pt[1] - yi) / (yj - yi) + xi);
    if (intersect) isInside = !isInside;
  }
  return isInside;
}

