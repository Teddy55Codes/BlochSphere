import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import TextSprite from '@seregpie/three.text-sprite';

// helper methods
function hsl(h, s, l) {
    return (new THREE.Color()).setHSL(h, s, l);
}

function setPosition(element, vector3D) {
    element.position.x = vector3D.x;
    element.position.y = vector3D.y; //(new Vector3(10, 1, 1))
    element.position.z = vector3D.z;
}

function addTextAsChild(parent, textSprite, vector3D) {
    const group = new THREE.Group();
    setPosition(group, vector3D)
    group.add(textSprite)
    parent.add(group)
}

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.z = 50;

let controls= new OrbitControls(camera, renderer.domElement);

// Sphere outline
const sphereRadius = 15;
const sphereSegments = 32;


const geometryZAxis = new THREE.CircleGeometry( sphereRadius, sphereSegments ); 
const lineZAxis = new THREE.LineSegments(new THREE.EdgesGeometry(geometryZAxis), new THREE.LineBasicMaterial({color: 0x00000}))

const geometryXAxis = new THREE.CircleGeometry( sphereRadius, sphereSegments );
geometryXAxis.rotateX(1.571)
const lineXAxis = new THREE.LineSegments(new THREE.EdgesGeometry(geometryXAxis), new THREE.LineBasicMaterial({color: 0x00000}))

const geometryYAxis = new THREE.CircleGeometry( sphereRadius, sphereSegments );
geometryYAxis.rotateY(1.571)
const lineYAxis = new THREE.LineSegments(new THREE.EdgesGeometry(geometryYAxis), new THREE.LineBasicMaterial({color: 0x00000}))

// x, y and z axis arrows
const origin = new THREE.Vector3( 0, 0, 0 );
const length = 18;
const hex = 0x000000;
const headLength = 1.;
const headWidth = .75;

const dirY = new THREE.Vector3( 0, 0, 0 );
dirY.normalize();
const arrowY = new THREE.ArrowHelper( dirY, origin, length, hex, headLength, headWidth );

const dirYNeg = new THREE.Vector3( 0, -1, 0 );
dirYNeg.normalize();
const arrowYNeg = new THREE.ArrowHelper( dirYNeg, origin, length, hex, headLength, headWidth );

const dirX = new THREE.Vector3( 1, 0, 0 );
dirX.normalize();
const arrowX = new THREE.ArrowHelper( dirX, origin, length, hex, headLength, headWidth );

const dirXNeg = new THREE.Vector3( -1, 0, 0 );
dirXNeg.normalize();
const arrowXNeg = new THREE.ArrowHelper( dirXNeg, origin, length, hex, headLength, headWidth );

const dirZ = new THREE.Vector3( 0, 0, 1 );
dirZ.normalize();
const arrowZ = new THREE.ArrowHelper( dirZ, origin, length, hex, headLength, headWidth );

const dirZNeg = new THREE.Vector3( 0, 0, -1 );
dirZNeg.normalize();
const arrowZNeg = new THREE.ArrowHelper( dirZNeg, origin, length, hex, headLength, headWidth );

// intersection dots
const dotRadius = .2;
const dotWidthSegments = 10;
const dotHeightSegments = 10;
const dotColor = 0x0000ff;

const geometry = new THREE.SphereGeometry( dotRadius, dotWidthSegments, dotHeightSegments );
const material = new THREE.MeshBasicMaterial( { color: dotColor } );

const dotZero = new THREE.Mesh( geometry, material );
setPosition(dotZero, new THREE.Vector3( 0, sphereRadius, 0 ))

const dotOne = new THREE.Mesh( geometry, material );
setPosition(dotOne, new THREE.Vector3( 0, -sphereRadius, 0 ))

const dotPos = new THREE.Mesh( geometry, material );
setPosition(dotPos, new THREE.Vector3( 0, 0, sphereRadius ))

const dotNeg = new THREE.Mesh( geometry, material );
setPosition(dotNeg, new THREE.Vector3( 0, 0, -sphereRadius ))

const dotIPos = new THREE.Mesh( geometry, material );
setPosition(dotIPos, new THREE.Vector3( sphereRadius, 0, 0 ))

const dotINeg = new THREE.Mesh( geometry, material );
setPosition(dotINeg, new THREE.Vector3( -sphereRadius, 0, 0 ))

// rendering text
const arrowTextColor = "black";
const dotTextColor = "blue"
const fontFamily = '"Times New Roman", Times, serif';
const fontStyle = "italic"
const fontSize = 2

// arrow text
addTextAsChild(arrowX.cone, new TextSprite({
    color: arrowTextColor,
    fontFamily: fontFamily,
    fontSize: fontSize,
    fontStyle: fontStyle,
    text: "y",
}), new THREE.Vector3(-2.4, -1.2, 0));

addTextAsChild(arrowY.cone, new TextSprite({
    color: arrowTextColor,
    fontFamily: fontFamily,
    fontSize: fontSize,
    fontStyle: fontStyle,
    text: "z",
}), new THREE.Vector3(0, 1.8, 0));

addTextAsChild(arrowZ.cone, new TextSprite({
    color: arrowTextColor,
    fontFamily: fontFamily,
    fontSize: fontSize,
    fontStyle: fontStyle,
    text: "x",
}), new THREE.Vector3(0, -1.2, -2.4));


// dot text
addTextAsChild(dotIPos, new TextSprite({
    color: dotTextColor,
    fontFamily: fontFamily,
    fontSize: fontSize,
    fontStyle: fontStyle,
    text: "|+i⟩",
}), new THREE.Vector3(-2.4, 1.8, 0));

addTextAsChild(dotINeg, new TextSprite({
    color: dotTextColor,
    fontFamily: fontFamily,
    fontSize: fontSize,
    fontStyle: fontStyle,
    text: "|-i⟩",
}), new THREE.Vector3(2.4, 1.8, 0));

addTextAsChild(dotPos, new TextSprite({
    color: dotTextColor,
    fontFamily: fontFamily,
    fontSize: fontSize,
    fontStyle: fontStyle,
    text: "|+⟩",
}), new THREE.Vector3(0, 1.8, -2.4));

addTextAsChild(dotNeg, new TextSprite({
    color: dotTextColor,
    fontFamily: fontFamily,
    fontSize: fontSize,
    fontStyle: fontStyle,
    text: "|-⟩",
}), new THREE.Vector3(0, 1.8, 2.4));

addTextAsChild(dotOne, new TextSprite({
    color: dotTextColor,
    fontFamily: fontFamily,
    fontSize: fontSize,
    fontStyle: fontStyle,
    text: "|1⟩",
}), new THREE.Vector3(0, 2.4, 0));

addTextAsChild(dotZero, new TextSprite({
    color: dotTextColor,
    fontFamily: fontFamily,
    fontSize: fontSize,
    fontStyle: fontStyle,
    text: "|0⟩",
}), new THREE.Vector3(0, -1.2, 0));

// scene population
scene.background = new THREE.Color(0xaaaaaa);
scene.add( lineZAxis );
scene.add( lineXAxis );
scene.add( lineYAxis );

scene.add( arrowX );
scene.add( arrowY );
scene.add( arrowZ );
scene.add( arrowXNeg );
scene.add( arrowYNeg );
scene.add( arrowZNeg );

scene.add( dotZero );
scene.add( dotOne );
scene.add( dotNeg );
scene.add( dotPos );
scene.add( dotIPos )
scene.add( dotINeg )


function addLight(...pos) {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(...pos);
    scene.add(light);
}

addLight(-1, 2, 4);
addLight( 1, -1, -2);

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
    requestAnimationFrame(animate);
    controls.update()
    renderer.render( scene, camera );
    
}

animate();
