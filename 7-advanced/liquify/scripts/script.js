const S = require("Scene");
const R = require("Reactive");
const D = require("Diagnostics");
const P = require("Patches");
const Time = require("Time");
const TG = require("TouchGestures");

(async function () {
  // Init to no touching
  P.inputs.set("isTouchDown", 0);

  let curX = 0;
  let curY = 0;
  let lastX = 0;
  let lastY = 0;

  TG.onPan({ normalizeCoordinates: true }).subscribe((gesture) => {
    // keep track of touch down / ups
    P.inputs.set("isTouchDown", 1);
    gesture.state.monitor().subscribe((state) => {
      if (state.newValue === "ENDED") {
        P.inputs.set("isTouchDown", 0);
      }
    });

    // Keep track of current and last touches
    gesture.location.x.monitor().subscribe((x) => {
      if (curX == 0 && lastX == 0) {
        // On the first frame, set the values the same so we don't get a pop
        lastX = x.newValue;
      } else {
        lastX = curX;
      }
      curX = x.newValue;

      P.inputs.set("curX", curX);
      P.inputs.set("lastX", lastX);
    });

    gesture.location.y.monitor().subscribe((y) => {
      if (curY == 0 && lastY == 0) {
        // On the first frame, set the values the same so we don't get a pop
        lastY = y.newValue;
      } else {
        lastY = curY;
      }
      curY = y.newValue;

      P.inputs.set("curY", curY);
      P.inputs.set("lastY", lastY);
    });
  });
})();
