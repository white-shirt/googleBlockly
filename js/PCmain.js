var startEvt, moveEvt, endEvt;
if ('ontouchstart' in window) {
    startEvt = 'touchstart';
    moveEvt = 'touchmove';
    endEvt = 'rouchend';
} else {
    startEvt = 'mousedown';
    moveEvt = 'mousemove';
    endEvt = 'mouseup';
};


