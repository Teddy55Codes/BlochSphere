import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import TextSprite from '@seregpie/three.text-sprite';

// helper methods
function hsl(h, s, l) {
    return (new THREE.Color()).setHSL(h, s, l);
}

function addTextAsChild(parent, textSprite, vector3D) {
    const group = new THREE.Group();
    group.position.x = vector3D.x;
    group.position.y = vector3D.y; //(new Vector3(10, 1, 1))
    group.position.z = vector3D.z;
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
const geometryZAxis = new THREE.CircleGeometry( 15, 32 ); 
const lineZAxis = new THREE.LineSegments(new THREE.EdgesGeometry(geometryZAxis), new THREE.LineBasicMaterial({color: 0x00000}))

const geometryXAxis = new THREE.CircleGeometry( 15, 32 );
geometryXAxis.rotateX(1.571)
const lineXAxis = new THREE.LineSegments(new THREE.EdgesGeometry(geometryXAxis), new THREE.LineBasicMaterial({color: 0x00000}))

const geometryYAxis = new THREE.CircleGeometry( 15, 32 );
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

// rendering text
const color = "black";
const fontFamily = '"Times New Roman", Times, serif';
const fontStyle = "italic"
const fontSize = 2

addTextAsChild(arrowX.cone, new TextSprite({
    color: color,
    fontFamily: fontFamily,
    fontSize: fontSize,
    fontStyle: fontStyle,
    text: "y",
}), new THREE.Vector3(-2.4, -1.2, 0));

addTextAsChild(arrowY.cone, new TextSprite({
    color: color,
    fontFamily: fontFamily,
    fontSize: fontSize,
    fontStyle: fontStyle,
    text: "z",
}), new THREE.Vector3(0, 1.8, 0));

addTextAsChild(arrowZ.cone, new TextSprite({
    color: color,
    fontFamily: fontFamily,
    fontSize: fontSize,
    fontStyle: fontStyle,
    text: "x",
}), new THREE.Vector3(0, -1.2, -2.4));

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
