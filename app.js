var app = {
    version: '1.0',
    canvasDOM: undefined,
    _setCanvasDimensions: function () {
        this.canvasDOM
            .setAttribute("width", window.innerWidth);

        this.canvasDOM
            .setAttribute("height", window.innerHeight)
    },
    _setHandlers : function () {
        //remember, arrow functions doesnt change the "this" value
        window.onresize = () => {
            this._setCanvasDimensions()
        }
    },
    init: function (canvasSelector) {
        this.canvasDOM = document.querySelector(canvasSelector)

        this._setCanvasDimensions()
        this._setHandlers()
    }
}