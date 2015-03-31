if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (function() {
        
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame

    })();
}