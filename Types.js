// Richard McNew
// CS 5400
// Common types for Labs

// requires GoodParts.js 

// Point class 
function Point(x, y, z, w) {
    if (!(this instanceof Point)) {
        return new Point(x, y, z, w);
    }
    this.x = (typeof x !== 'undefined') ? x : 0;
    this.y = (typeof y !== 'undefined') ? y : 0;
    this.z = (typeof z !== 'undefined') ? z : 0;
    this.w = (typeof w !== 'undefined') ? w : 0;

}

Point.method('equals', function(otherPoint) {
    if (this === otherPoint) {
        return true;
    } else if ((otherPoint instanceof Point) && 
               (otherPoint.x === this.x) &&
               (otherPoint.y === this.y) &&
               (otherPoint.z === this.z) &&
               (otherPoint.w === this.w) ){
        return true;
    }
    return false;
});

Point.method('hashcode', function() {
    return this.x.toString() + "_" + this.y.toString() + "_" +
           this.z.toString() + "_" + this.w.toString();
});

function distance(pointA, pointB) {
    if ((typeof pointA !== 'undefined') && (typeof pointB !== 'undefined') &&
        (pointA instanceof Point) && (pointB instanceof Point)) {

        return Math.sqrt( Math.pow((pointA.x - pointB.x),2) + Math.pow((pointA.y - pointB.y),2) + 
                          Math.pow((pointA.z - pointB.z),2) + Math.pow((pointA.w - pointB.w),2) );
    } else {
        console.log("distance:  Illegal argument!");
        return undefined;
    }
}

function calculateComponentVector(startPoint, endPoint) {
    if ((typeof startPoint !== 'undefined') && (typeof endPoint !== 'undefined') &&
        (startPoint instanceof Point) && (endPoint instanceof Point)) {

        return new Point(endPoint.x - startPoint.x, endPoint.y - startPoint.y,
                         endPoint.z - startPoint.z, endPoint.w - startPoint.w);

    } else {
        console.log("calculateComponentVector:  Illegal argument!");
        return undefined;
    }
}

function addPoints(pointA, pointB) {
    if ((typeof pointA !== 'undefined') && (typeof pointB !== 'undefined') &&
        (pointA instanceof Point) && (pointB instanceof Point)) {

        return new Point(pointA.x + pointB.x, pointA.y + pointB.y,
                         pointA.z + pointB.z, pointA.w + pointB.w);

    } else {
        console.log("addPoints:  Illegal argument!");
        return undefined;
    }
}

// rotateRight(x, y) = (0.5x + 0.5y, -0.5x + 0.5y)
function rotateRightXY(compVec) {
    if ((typeof compVec !== 'undefined') && (compVec instanceof Point)) {
        return new Point ( ( 0.5 * compVec.x) + ( 0.5 * compVec.y), // x
                           (-0.5 * compVec.x) + ( 0.5 * compVec.y), // y
                            0,                                      // z
                            0 );                                    // w
    } else {
        console.log("rotateRight:  Illegal argument!");
        return undefined;
    }
}

// rotateLeft(x, y) = (0.5x - 0.5y, 0.5x + 0.5y)
function rotateLeftXY(compVec) {
    if ((typeof compVec !== 'undefined') && (compVec instanceof Point)) {
        return new Point ( ( 0.5 * compVec.x) + (-0.5 * compVec.y), // x
                           ( 0.5 * compVec.x) + ( 0.5 * compVec.y), // y
                            0,                                      // z
                            0 );                                    // w
    } else {
        console.log("rotateLeft:  Illegal argument!");
        return undefined;
    }
}

function pointToVec2(point) {
    if ((typeof point !== 'undefined') && (point instanceof Point)) {

        return vec2(point.x, point.y);

    } else {
        console.log("pointToVec3:  Illegal argument!");
        return undefined;
    }
}

// Color class 
function Color(red, green, blue, alpha) {
    if (!(this instanceof Color)) {
        return new Color(red, green, blue, alpha);
    }
    this.red   = (typeof red   !== 'undefined') ? red   : 0;
    this.green = (typeof green !== 'undefined') ? green : 0;
    this.blue  = (typeof blue  !== 'undefined') ? blue  : 0;
    this.alpha = (typeof alpha !== 'undefined') ? alpha : 0;

}


// Triangle class
function Triangle(PointA, PointB, PointC) {
    if (!(this instanceof Triangle)) {
        return new Triangle(PointA, PointB, PointC);
    }
    this.PointA = (typeof PointA !== 'undefined') ? PointA : 0;
    this.PointB = (typeof PointB !== 'undefined') ? PointB : 0;
    this.PointC = (typeof PointC !== 'undefined') ? PointC : 0;
}
