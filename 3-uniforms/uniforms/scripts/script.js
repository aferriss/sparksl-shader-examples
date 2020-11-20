const S = require("Scene");
const M = require("Materials");
const TG = require("TouchGestures");

(async function () {
  // Get our material
  const mat = await M.findFirst("setUniformFromScriptMat");

  // Send a value to the shader
  // You can also use this same function with vec4, vec3, vec2
  // ex: mat.setParameter("example", R.pack4(1.0, 0.0, 0.5, 0.2));
  mat.setParameter("armCount", 9.0);
})();
