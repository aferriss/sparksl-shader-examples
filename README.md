## SparkSL Shader Examples


### Intro

This is a collection of heavily commented examples of how to write shaders in [SparkSL](https://sparkar.facebook.com/ar-studio/learn/sparksl/sparksl-overview). SparkSL is a shader language used in SparkAR that is cross compatible across iOS and android devices. It shares many similarities to GLSL but has a few quirks and nice additions of its own. 

This repo closely mirrors my other project of [p5js shader examples](https://github.com/aferriss/p5jsShaderExamples).

Currently a work in progress, feel free to get in touch if you've got any questions or file a PR if you'd like to contribute.

### Contents


Each project contains a spark file with a few different example shaders contained within. Just open up the patch editor and connect the output of the shader assets to the Device Output patch to try different effects.


#### Color

This project shows how to create a shader code asset and render a few different colors.
 - Red
 - Gray
 - Cyan 
 - Functions

#### Texture Coordinates

This project shows how to access texture coordinates and use them in a variety of different ways
 - Basic Uvs
 - Tiles
 - Gradient
 - Random
 - Noise
 - Checkers
 - Vignette

#### Uniforms

This project shows how to send values to a shader from the patch / material editors, as well as from a script.
 - Uniforms Basics
 - Touch Position
 - From Script
 - Textures 


