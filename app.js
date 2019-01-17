var app = {
    version: '1.0',
    canvasDOM: undefined,
    ctx: undefined,
    w: undefined,
    h: undefined,
    _setCanvasDimensions: function () {
        this.w = window.innerWidth
        this.h = window.innerHeight

        this.canvasDOM
            .setAttribute("width", window.innerWidth);

        this.canvasDOM
            .setAttribute("height", window.innerHeight)
    },
    _setHandlers: function () {
        //remember, arrow functions doesnt change the "this" value
        window.onresize = () => {
            this._setCanvasDimensions()
        }
    },
    _draw: function () {
        var ctx = this.ctx;

        function Square(w, h) {
            this.w = w
            this.h = h
        }

        function Triangle(ctx) {
            ctx.beginPath();
            ctx.moveTo(75, 50);
            ctx.lineTo(200, 100);
            ctx.lineTo(200, 0);
            ctx.fill();
            ctx.closePath();
        }

        var sq;
        var w = this.w;
        var h = this.h
        var halfW = w / 2
        var halfH = h / 2
        var sqHeight;

        function drawSquares() {
            for (var i = 0; i < 100; i++) {
                sqHeight = 20 * i
                sq = new Square(20 + i, sqHeight)

                ctx.strokeRect(100 * i, (h / 2) - sqHeight / 2, sq.w, sq.h);
            }
        }

        function drawTriangles() {
            Triangle(ctx)
        }

        function drawLines() {
            for (var i = 0; i < 180; i += 2) {
                ctx.moveTo(Math.random() * w, Math.random() * h)
                ctx.lineTo(halfW, halfH)
                // ctx.lineWidth = 5;
                ctx.strokeStyle = `rgb(${Math.random() * 255}, 0 ,0)`;
                ctx.stroke()

            }
            //ctx.clearRect(45, 45, 60, 60);
            //ctx.strokeRect(50, 50, 50, 50);
        }

        function drawCircle() {
            ctx.beginPath();
            var x = 500; // x coordinate
            var y = 275; // y coordinate
            var radius = 150; // Arc radius
            var startAngle = 0 * Math.PI / 180; // Starting point on circle
            var endAngle = 360 * Math.PI / 180; // End point on circle

            // ctx.arc(x, y, radius, startAngle, endAngle, true);
            ctx.fillStyle = "#FF0000";
            // ctx.moveTo(290, 75)

            function drawC(circleRadius, color) {
                for (var i = 0; i < 100; i++) {
                    for (var j = 0; j < 100; j++) {
                        ctx.beginPath()
                        ctx.arc(circleRadius * 2 * i, circleRadius * 2 * j, circleRadius, 0, endAngle, true);
                        ctx.fillStyle = `rgb(${Math.random() * 255}, 0 , 0)`
                        ctx.fill();
                        ctx.closePath()

                        ctx.beginPath()
                        ctx.arc(circleRadius * 2 * i, circleRadius * 2 * j, circleRadius - 20, 0, endAngle, true);
                        ctx.fillStyle = "green"//`rgb(${Math.random() * 255}, 0 , 0)`
                        ctx.fill();
                        ctx.closePath()
                    }
                }
            }

            drawC(80 / 2, "#cccccc")
            // drawC(100/2, "#ff0000")

            // ctx.strokeStyle ="#ff0000"
            // ctx.stroke();

        }

        // drawSquares()
        //drawLines()
        // drawTriangles()

        // drawCircle()

        function drawBigCircle() {
            var intervalID

            function drawCosine(timing) {
                var xPos = 0, yPos = h / 2, radius = 50, angle = 0

                intervalID = setInterval(function () {
                    //ctx.clearRect(0, 0, w, h)

                    angle += 1
                    var xPosFinal = xPos + 200 * Math.sin(angle * Math.PI / 180) + w / 2
                    var yPosFinal = yPos + 200 * Math.cos(angle * Math.PI / 180)

                    ctx.beginPath()
                    ctx.arc(xPosFinal, yPosFinal, Math.random() * 40, 0, Math.PI * 2, true);
                    ctx.fillStyle = `rgb(${Math.random() * 255}, 0 , 0)`
                    ctx.fill();
                    ctx.closePath()

                    if (angle > 360 * 1) {
                        clearInterval(intervalID)
                    }
                }, timing)
            }

            drawCosine(1)
        }

        var xPosFinal = 0

        function animateCollision() {
            var sense = 1

            setInterval(function () {
                ctx.clearRect(0, 0, w, h)

                ctx.beginPath()
                ctx.arc(xPosFinal += sense, h / 2, 40, 0, Math.PI * 2, true);
                ctx.fillStyle = `rgb(100, 0 , 0)`
                ctx.fill();
                ctx.closePath()

                if (xPosFinal === w / 4) {
                    sense = -1
                }

                if (xPosFinal === 0) {
                    sense = 1
                }
            }, 1)
        }

        animateCollision()

        //drawBigCircle()

        document.getElementById("stop").onclick = function () {
            clearInterval(intervalID)
        }
    },
    init: function (canvasSelector) {
        this.canvasDOM = document.querySelector(canvasSelector)
        this.ctx = this.canvasDOM.getContext('2d');

        this._setCanvasDimensions()
        this._setHandlers()
        this._draw()
    }
}