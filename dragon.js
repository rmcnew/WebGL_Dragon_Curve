// Richard McNew
// CS 5400
// Assignment 01:  Dragon Curve
var gl;
var vertices;  // used by shaders
var points;    // hash table of calculated dragon curve points: key "iterationN", value [points]  

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    // place starting points 
    points = {
        "iteration0":[new Point(-1,0), new Point(1,0)]
    };
    var iteration = 16;
    var scaleBy = 0.60;

    //  Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // Load the data into the GPU
    
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    var iterationPoints = computeDragonCurvePoints(iteration);
    //console.log("iterationPoints is " + iterationPoints);
    vertices = pointsToVec2s(iterationPoints, scaleBy);
    //console.log("vertices is " + vertices);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    render();
};

// return an array of Points that gives the Dragon Curve with 
// iteration given by iterationCount parameter
function computeDragonCurvePoints(iterationCount) {
    if ( (typeof iterationCount === 'number') && (iterationCount >= 0) ) {
        if (points["iteration" + iterationCount]) {
            return points["iteration" + iterationCount];
        } else {
            var previousIterationPoints = computeDragonCurvePoints(iterationCount - 1);
            var currentIterationPoints = [];
            // walk through line segments
            var index;
            // we will be looking at pairs, so do not look at the very last element
            var nextToLast = previousIterationPoints.length-1; 
            // start by rotating right, then alternate
            var right = true; 

            for (index = 0; index < nextToLast; index++) {
                var startPoint = previousIterationPoints[index];
                var endPoint = previousIterationPoints[index+1];
                var compVector = calculateComponentVector(startPoint, endPoint);
                var rotated;
                if (right) {
                    // rotateRight
                    rotated = rotateRightXY(compVector);
                    right = false;
                } else {
                    // rotateLeft
                    rotated = rotateLeftXY(compVector);
                    right = true;
                }
                var dragonPoint = addPoints(startPoint, rotated);
                currentIterationPoints.push(startPoint, dragonPoint);
            }            
            // don't forget to include the last point
            currentIterationPoints.push(previousIterationPoints[previousIterationPoints.length-1]);

            // save the computed points 
            points["iteration" + iterationCount] = currentIterationPoints;
            return points["iteration" + iterationCount];
        }
    } else {
        console.log("computeDragonCurvePoints:  Illegal argument!");
        return undefined;
    }
}


// convert the points to vertices by iterating through and creating 
// line segment pairs; also, scale by scaleFactor
function pointsToVec2s(iterationPoints, scaleFactor) {
    var convertedVec2s = [];
    var index;
    var nextToLast = iterationPoints.length-1;
    for (index = 0; index < nextToLast; index++) {
        convertedVec2s.push(scale(scaleFactor, pointToVec2(iterationPoints[index])));
        convertedVec2s.push(scale(scaleFactor, pointToVec2(iterationPoints[index+1])));
    }
    return convertedVec2s;
}


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.LINES, 0, vertices.length );
}
