const S = require("Scene");
const R = require("Reactive");
const D = require("Diagnostics");
const P = require("Patches");
const Time = require("Time");
const TG = require("TouchGestures");
const A = require("Animation");
const IN = require("Instruction");

(async function () {
  IN.bind(true, "drag_to_change");
  // Init to no touching
  P.inputs.set("isTouchDown", 0);
  P.inputs.set("curX", 0);
  P.inputs.set("curY", 0);

  TG.onPan({ normalizeCoordinates: true }).subscribe((gesture) => {
    IN.bind(false, "drag_to_change");
    // keep track of touch down / ups
    P.inputs.set("isTouchDown", 1);

    P.inputs.set("pinchLocation", gesture.location);
    gesture.state.monitor().subscribe((state) => {
      if (state.newValue === "ENDED") {
        P.inputs.set("isTouchDown", 0);
        P.inputs.set("curX", 0);
        P.inputs.set("curY", 0);
      }
    });

    // send the touches to the patch editor
    gesture.location.x.monitor().subscribe((x) => {
      P.inputs.set("curX", x.newValue);
    });

    gesture.location.y.monitor().subscribe((y) => {
      P.inputs.set("curY", y.newValue);
    });
  });

  let pinchSignal = R.scalarSignalSource("pinchSignal");
  pinchSignal.set(0.2);
  P.inputs.set("pinch", pinchSignal.signal.expSmooth(100));

  TG.onPinch({ normalizeCoordinates: true }).subscribe((gesture) => {
    D.log(gesture);
    const lastPinch = pinchSignal.signal.pinLastValue();
    pinchSignal.set(gesture.scale.mul(lastPinch).clamp(0.1, 0.4));

    const x = gesture.location.x.expSmooth(100);
    const y = gesture.location.y.expSmooth(100);
    const pinchLocation = R.pack2(x, y, 0);

    P.inputs.set("pinchLocation", pinchLocation);
  });

  const resetDriver = A.timeDriver({ durationMilliseconds: 350, loopCount: 1 });
  const resetSampler = A.samplers.easeOutQuad(0, 1);
  const resetAnim = A.animate(resetDriver, resetSampler);
  P.inputs.set("resetAnim", resetAnim);
  resetDriver.start();

  resetDriver.onCompleted().subscribe(() => {
    P.inputs.set("resetAnim", 0);
  });

  TG.onLongPress().subscribe((gesture) => {
    resetDriver.reset();
    resetDriver.start();
    P.inputs.set("resetAnim", resetAnim);
  });
})();
