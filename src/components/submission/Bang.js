/*eslint-disable no-undef*/
export function createCanvasElement() {


    var vertexShaderSource = `
attribute vec3 position;
uniform mat4 MVP;

void main() {
  gl_Position = MVP * vec4(position, 1.0); 
}
`;

    var fragmentShaderSource = `
void main() {
  gl_FragColor = vec4(0.5, 0.3, 1.0, 1.0);
}
`;

    var Model = (function () {
        'use strict';

        var _allModels = [];

        function Model(vertecies) {
            this.vertecies = new Float32Array(vertecies);
            this.nVertecies = vertecies.length / 3;

            _allModels.push(this);
        }

        Model.getAllModels = function () {
            return _allModels;
        }

        Model.allVerteciesLength = function () {
            return _allModels.reduce(function (acc, m) { return acc + m.nVertecies }, 0);
        }


        return Model;

    }());


    // setup up the canvas
    var canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // get the gl context
    var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    // create programm from our 2 shaders
    var program = setupProgram(vertexShaderSource, fragmentShaderSource);

    // configure gl
    gl.useProgram(program);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    // var triangle = new Model([
    //   0.0, 1.0, 0.0,
    //   1.0, -1.0, 0.0,
    //   -1.0, -1.0, 0.0
    // ]);

    // push3dModel(triangle);

    // var cube = new Model([
    //   -1.0,-1.0,-1.0,
    //   -1.0,-1.0, 1.0,
    //   -1.0, 1.0, 1.0,
    //   1.0, 1.0,-1.0, 
    //   -1.0,-1.0,-1.0,
    //   -1.0, 1.0,-1.0, 
    //   1.0,-1.0, 1.0,
    //   -1.0,-1.0,-1.0,
    //   1.0,-1.0,-1.0,
    //   1.0, 1.0,-1.0,
    //   1.0,-1.0,-1.0,
    //   -1.0,-1.0,-1.0,
    //   -1.0,-1.0,-1.0, 
    //   -1.0, 1.0, 1.0,
    //   -1.0, 1.0,-1.0,
    //   1.0,-1.0, 1.0,
    //   -1.0,-1.0, 1.0,
    //   -1.0,-1.0,-1.0,
    //   -1.0, 1.0, 1.0,
    //   -1.0,-1.0, 1.0,
    //   1.0,-1.0, 1.0,
    //   1.0, 1.0, 1.0,
    //   1.0,-1.0,-1.0,
    //   1.0, 1.0,-1.0,
    //   1.0,-1.0,-1.0,
    //   1.0, 1.0, 1.0,
    //   1.0,-1.0, 1.0,
    //   1.0, 1.0, 1.0,
    //   1.0, 1.0,-1.0,
    //   -1.0, 1.0,-1.0,
    //   1.0, 1.0, 1.0,
    //   -1.0, 1.0,-1.0,
    //   -1.0, 1.0, 1.0,
    //   1.0, 1.0, 1.0,
    //   -1.0, 1.0, 1.0,
    //   1.0,-1.0, 1.0
    // ]);

    // push3dModel(cube);

    function getRandomPoint() {
        return (Math.random() * 2 - 1);
    }

    function Point(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    Point.prototype.distance = function _dist(pointB) {
        var deltaX = this.x - pointB.x;
        var deltaY = this.y - pointB.y;
        var deltaZ = this.z - pointB.z;
        return Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ);
    }

    function Line(pointA, pointB) {
        this.A = pointA;
        this.B = pointB;
    }


    var points = [];
    var lines = [];

    for (var i = 0; i < 1000; i++) {

        var newPoint = new Point(getRandomPoint(), getRandomPoint(), getRandomPoint());

        for (var j = 0; j < points.length; j++) {

            var dist = points[j].distance(newPoint);


            if (dist < .15) {

                lines.push(new Line(points[j], newPoint));


            }

        }

        points.push(newPoint);

    }

    // var flatPoint = points.reduce((acc, pointA) => {
    //   return acc.concat(pointA);
    // }, []).reduce((acc, point) => acc.concat(point.x).concat(point.x).concat(point.z), []);

    var linesFlat = lines.reduce((acc, line) => {
        return acc.concat(line.A.x).concat(line.A.y).concat(line.A.z)
            .concat(line.B.x).concat(line.B.y).concat(line.B.z);
    }, []);

    var linesModel = new Model(linesFlat);

    push3dModel(linesModel);

    // var pointsModel = new Model(flatPoint);

    // push3dModel(pointsModel);

    var modelIndentityMatrix = mat4.create();
    scaleMatrixLineary(modelIndentityMatrix, 0.5);

    var projectionMatirx = [];
    var viewMatrix = [];
    var MVP = [];

    mat4.perspective(projectionMatirx, 0.78, canvas.width / canvas.height, 0.01, 100.0);

    var eyePos = [];
    var target = [];
    var up = [];

    calcViewMatrix();

    mat4.lookAt(viewMatrix, eyePos, target, up);

    function renderLoop() {

        mat4.rotateY(modelIndentityMatrix, modelIndentityMatrix, 0.001);


        calcMVP();

        setMVP(MVP);

        render();

        window.requestAnimationFrame(renderLoop);
    }

    window.requestAnimationFrame(renderLoop);


    function calcViewMatrix() {
        vec3.set(eyePos, .1, .1, 1);
        vec3.set(target, 0, 0, 0);
        vec3.set(up, 0, 1, 0);
    }

    function calcMVP() {
        mat4.mul(MVP, projectionMatirx, viewMatrix);
        mat4.mul(MVP, MVP, modelIndentityMatrix);
    }

    function render() {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.drawArrays(gl.LINES, 0, Model.allVerteciesLength());
    }

    function setMVP(newMVP) {
        var MVPLoc = gl.getUniformLocation(program, 'MVP');
        gl.uniformMatrix4fv(MVPLoc, false, new Float32Array(newMVP));
    }


    function pushVecsToGPU(vecs, pos) {
        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, vecs, gl.STATIC_DRAW);
        var ref = gl.getAttribLocation(program, pos);
        gl.enableVertexAttribArray(ref);
        gl.vertexAttribPointer(ref, 3, gl.FLOAT, false, 0, 0);
    }

    function push3dModel(model) {
        pushVecsToGPU(model.vertecies, 'position');
    }

    function pushColors(colors) {
        pushVecsToGPU(colors, 'color');
    }

    function setupProgram(vertexShaderSource, fragmentShaderSource) {
        var vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
        var fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
        var program = createProgram(vertexShader, fragmentShader);
        return program;
    }

    function createProgram(vertexShader, fragShader) {
        var program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error("unable to initialize the shader program!", gl.getProgramInfoLog(program));
            return null;
        }

        return program;
    }

    function compileShader(shaderSource, shaderType) {
        var shader;

        shader = gl.createShader(shaderType);

        gl.shaderSource(shader, shaderSource);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error('couldn\'t compile the shader: ', gl.getShaderInfoLog(shader));
            return null;
        }

        return shader;
    }

    function scaleMatrixLineary(matrix, scale) {
        var scalar = vec3.create();
        vec3.set(scalar, scale, scale, scale);
        mat4.scale(matrix, matrix, scalar);
    }

    return canvas;

}