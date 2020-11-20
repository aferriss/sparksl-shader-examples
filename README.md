# SparkSL Shader Examples

## Intro

This is a collection of heavily commented examples of how to write shaders in [SparkSL](https://sparkar.facebook.com/ar-studio/learn/sparksl/sparksl-overview). SparkSL is a shader language used in SparkAR that is cross compatible across iOS and android devices. It shares many similarities to GLSL but has a few quirks and nice additions of its own.

This repo closely mirrors my other project of [p5js shader examples](https://github.com/aferriss/p5jsShaderExamples).

Currently a work in progress, feel free to get in touch if you've got any questions or file a PR if you'd like to contribute.

## Differences from GLSL

For a complete list of new features in SparkSL consult the [documentation](https://sparkar.facebook.com/ar-studio/learn/sparksl/sparksl-overview).

I've outlined a few of the things I've noticed for easy reference.

### Vertex Shader

```glsl
//GLSL

// In glsl the vertex and fragment shaders are in separate files

// Vertex shader
uniform mat4 u_MVPMatrix;
attribute vec4 a_Position;
attribute vec2 a_TexCoord;
varying vec2 v_TexCoord;
void main(){
    v_TexCoord = a_TexCoord;
    gl_Position = u_MVPMatrix * a_Position;
}

// Fragment shader
varying vec2 v_TexCoord;

void main(){
    gl_FragColor = vec4(v_TexCoord, 0.0, 1.0);
}

// SparkSL

// In SparkSL, the vert and frag shaders are part of the same function

// We need to specify a position and color output for the shader
void main(out vec4 Position, out vec4 Color){

    // SparkSL has built in functions for accessing the transform matrices and vertex attributes
    Position = std::getModelViewProjectionMatrix() * std::getVertexPosition();

    // By default vertex attributes or calculations will happen in the vertex shader
    // You can force a calculation to the fragment shader by surrounding the function with fragment()
    vec2 uv = fragment(std::getVertexTexCoord());
    Color = vec4(uv, 0.0, 1.0)
}
```

### Namespaces

```glsl

// There's no such thing as namespaces in glsl

// In sparkSL you can use namespaces similar to how they work in c++

// Adding the following line means that I no longer need to write std:: before using builtin functions
using namespace std;

// You can also create your own namespaces
namespace adam {
    vec4 ferriss(vec2 uv){
        return vec4(fract(uv), 0.0, 1.0);
    }
};

vec4 main(){
    vec2 uv = fragment(getVertexTexCoord());

    return adam::ferriss(vec2(uv * 10.0));
}


```

### Swizzling

```glsl
// GLSL

// In glsl you can swizzle using rgba, xyzw, or stpq
vec4 colorA = vec4(0.1, 0.5, 0.2, 1.0);
vec4 colorB = colorA.brag; // vec4(0.2, 0.1, 1.0, 0.5);

// SparkSL

// In SparkSL you can swizzle using rgba, xyzw, stpq, as well as 0 and 1
// Swizzles work just like patch editor swizzle strings
vec4 colorA = vec4(0.1, 0.5, 0.2, 1.0);
vec4 colorB = coloA.br01; // vec4(0.2, 0.1, 0.0, 1.0);
```

### Uniforms

```glsl
// GLSL
// In glsl you add uniforms to the top of your script with the uniform keyword
uniform float time;

// SparkSL
// In SparkSL you create uniforms by adding them as parameters to the main function
// !!!!!!!! DANGER DANGER !!!!!!!!!
// SparkSL doesn't currently support boolean, integer, or string type uniforms. Passing them in will break spark and may crash your filter

// Time and colorA will appear as uniforms in the patch and material editors
void main(float time, vec4 colorA){

}

// To set a uniform from a script you can use the material.setParameter() function
// setParameter() can take a float or R.pack2, R.pack3, or R.pack4

const M = require("Materials");
const Time = require("Time");

M.findFirst("material0).then( m => {
    m.setParameter("time", Time.ms.div(1000))
    m.setParameter("colorA", R.pack4(1.0, 0.0, 0.5, 1.0));
});

```

### Sampling Textures

```glsl

// GLSL
uniform sampler2D myTex;
varying vec2 uv;

void main(){
    vec4 color = texture2D(myTex, uv);
    gl_FragColor = color;
}

// SparkSL
vec4 main(std::Texture2d myTex){
    vec2 uv = fragment(std::getVertexTexCoord());
    vec4 color = myTex.sample(uv) ;
    return color;
}
```

## Contents

![demonstration](demo.png)

Each project contains a spark file with a few different example shaders contained within. Just open up the patch editor and connect the output of the shader assets to the Device Output patch to try different effects.

### Color

This project shows how to create a shader code asset and render a few different colors.

- Red
- Gray
- Cyan
- Functions

### Texture Coordinates

This project shows how to access texture coordinates and use them in a variety of different ways

- Basic Uvs
- Tiles
- Gradient
- Random
- Noise
- Checkers
- Vignette

### Uniforms

This project shows how to send values to a shader from the patch / material editors, as well as from a script.

- Uniforms Basics
- Touch Position
- From Script
- Textures
