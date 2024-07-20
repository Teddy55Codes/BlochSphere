import * as THREE from "three";
import {OrbitControls} from "three/addons/controls/OrbitControls.js";
import TextSprite from '@seregpie/three.text-sprite';
import GUI from 'lil-gui';
import * as Qubit from "./Qubit";
import * as Gates from "./Gates"

let qubit = new Qubit.Qubit();

function setPosition(element, vector3D) {
    element.position.x = vector3D.x;
    element.position.y = vector3D.y;
    element.position.z = vector3D.z;
}

function addTextAsChild(parent, textSprite, vector3D) {
    const group = new THREE.Group();
    setPosition(group, vector3D);
    group.add(textSprite);
    parent.add(group);
}

function setArrowWithSphericalPolarCoordinates(polar, azimuthal) {
    qubitAnchor.setRotationFromAxisAngle(new THREE.Vector3(0, 1, 0), azimuthal);
    qubitArrow.setRotationFromAxisAngle(new THREE.Vector3(1, 0, 0), polar);
}

function refreshArrowPosition() {
    const { 
        theta: polar, 
        phi: azimuthal } = qubit.polarCoordinates();
    const { 
        realAlpha: realAlpha, 
        imagAlpha: imagAlpha, 
        realBeta: realBeta, 
        imagBeta: imagBeta } = qubit.qubitValue()
    
    setArrowWithSphericalPolarCoordinates(polar, azimuthal);
    refreshTextInfo(polar, azimuthal, realAlpha, imagAlpha, realBeta, imagBeta);

}

function setState(state) {
    qubit = new Qubit.Qubit(state[0], state[1]);
    refreshArrowPosition();
}

function applyGate(gate) {
    qubit.applyGate(gate)
    refreshArrowPosition();
}

function refreshTextInfo(polar, azimuthal, realAlpha, imagAlpha, realBeta, imagBeta) {
    infoText.innerText = 
        `θ: ${polar} 
        φ: ${azimuthal} 
        
        Alpha: ${realAlpha} + ${imagAlpha}i 
        Beta: ${realBeta} + ${imagBeta}i`;
}

const renderer = new THREE.WebGLRenderer();
const scene = new THREE.Scene();

// Sphere outline
const sphereRadius = 15;
const sphereSegments = 32;

const geometryZAxis = new THREE.CircleGeometry(sphereRadius, sphereSegments);
const lineZAxis = new THREE.LineSegments(new THREE.EdgesGeometry(geometryZAxis), new THREE.LineBasicMaterial({color: 0x00000}))

const geometryXAxis = new THREE.CircleGeometry(sphereRadius, sphereSegments);
geometryXAxis.rotateX(Math.PI/2)
const lineXAxis = new THREE.LineSegments(new THREE.EdgesGeometry(geometryXAxis), new THREE.LineBasicMaterial({color: 0x00000}))

const geometryYAxis = new THREE.CircleGeometry(sphereRadius, sphereSegments);
geometryYAxis.rotateY(Math.PI/2)
const lineYAxis = new THREE.LineSegments(new THREE.EdgesGeometry(geometryYAxis), new THREE.LineBasicMaterial({color: 0x00000}))

// x, y and z axis arrows
const origin = new THREE.Vector3(0, 0, 0);
const length = 18;
const hex = 0x000000;
const headLength = 1.;
const headWidth = .75;

const dirY = new THREE.Vector3(0, 0, 0);
dirY.normalize();
const arrowY = new THREE.ArrowHelper(dirY, origin, length, hex, headLength, headWidth);

const dirYNeg = new THREE.Vector3(0, -1, 0);
dirYNeg.normalize();
const arrowYNeg = new THREE.ArrowHelper(dirYNeg, origin, length, hex, headLength, headWidth);

const dirX = new THREE.Vector3(1, 0, 0);
dirX.normalize();
const arrowX = new THREE.ArrowHelper(dirX, origin, length, hex, headLength, headWidth);

const dirXNeg = new THREE.Vector3(-1, 0, 0);
dirXNeg.normalize();
const arrowXNeg = new THREE.ArrowHelper(dirXNeg, origin, length, hex, headLength, headWidth);

const dirZ = new THREE.Vector3(0, 0, 1);
dirZ.normalize();
const arrowZ = new THREE.ArrowHelper(dirZ, origin, length, hex, headLength, headWidth);

const dirZNeg = new THREE.Vector3(0, 0, -1);
dirZNeg.normalize();
const arrowZNeg = new THREE.ArrowHelper(dirZNeg, origin, length, hex, headLength, headWidth);

// intersection dots
const dotRadius = .2;
const dotWidthSegments = 10;
const dotHeightSegments = 10;
const dotColor = 0x0000ff;

const geometry = new THREE.SphereGeometry(dotRadius, dotWidthSegments, dotHeightSegments);
const material = new THREE.MeshBasicMaterial({color: dotColor});

const dotZero = new THREE.Mesh(geometry, material);
setPosition(dotZero, new THREE.Vector3(0, sphereRadius, 0))

const dotOne = new THREE.Mesh(geometry, material);
setPosition(dotOne, new THREE.Vector3(0, -sphereRadius, 0))

const dotPos = new THREE.Mesh(geometry, material);
setPosition(dotPos, new THREE.Vector3(0, 0, sphereRadius))

const dotNeg = new THREE.Mesh(geometry, material);
setPosition(dotNeg, new THREE.Vector3(0, 0, -sphereRadius))

const dotIPos = new THREE.Mesh(geometry, material);
setPosition(dotIPos, new THREE.Vector3(sphereRadius, 0, 0))

const dotINeg = new THREE.Mesh(geometry, material);
setPosition(dotINeg, new THREE.Vector3(-sphereRadius, 0, 0))

// qubit position arrow
const qubitArrowLength = 16;
const qubitArrowColor = 0xff00000;

let qubitPosition = new THREE.Vector3(0, 1, 0);
const qubitArrow = new THREE.ArrowHelper(qubitPosition, origin, qubitArrowLength, qubitArrowColor, headLength, headWidth);
const qubitAnchor = new THREE.Group();

// rendering text
const arrowTextColor = "black";
const dotTextColor = "blue"
const qubitTextColor = "red";
const fontFamily = 'Times, serif, "Times New Roman"';
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
}), new THREE.Vector3(1.8, 2.4, 0));

addTextAsChild(dotZero, new TextSprite({
    color: dotTextColor,
    fontFamily: fontFamily,
    fontSize: fontSize,
    fontStyle: fontStyle,
    text: "|0⟩",
}), new THREE.Vector3(1.8, -1.2, 0));

// qubit arrrow text
addTextAsChild(qubitArrow.cone, new TextSprite({
    color: qubitTextColor,
    fontFamily: fontFamily,
    fontSize: fontSize,
    fontStyle: fontStyle,
    text: "|Ψ⟩",
}), new THREE.Vector3(1.8, 1.8, 0));

// scene population
scene.background = new THREE.Color(0xffffff);
scene.add(lineZAxis);
scene.add(lineXAxis);
scene.add(lineYAxis);

scene.add(arrowX);
scene.add(arrowY);
scene.add(arrowZ);
scene.add(arrowXNeg);
scene.add(arrowYNeg);
scene.add(arrowZNeg);

scene.add(dotZero);
scene.add(dotOne);
scene.add(dotNeg);
scene.add(dotPos);
scene.add(dotIPos);
scene.add(dotINeg);

qubitAnchor.add(qubitArrow)
scene.add(qubitAnchor);

function addLight(...pos) {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(...pos);
    scene.add(light);
}

addLight(-1, 2, 4);
addLight(1, -1, -2);

// Handle window resize
window.addEventListener('resize', () => {
    const height = contentContainer.clientHeight - getAbsoluteHeight(infoText);
    
    camera.aspect = contentContainer.clientWidth / height;
    camera.updateProjectionMatrix();
    renderer.setSize(contentContainer.clientWidth, height);
});

const parent = document.getElementById("blochsphere");
parent.style.display = "flex";
parent.style.alignItems = "horizontal"

const controlsContainer = document.createElement("div");
controlsContainer.style.width = "150px";

const contentContainer = document.createElement("div");
contentContainer.style.width = "100%";

// Info text that shows the current value of the qubit
const infoText = document.createElement("p");
infoText.style.marginLeft = "10px";

// lil-gui
const gui = new GUI({
    container: controlsContainer,
    width: 150});

BuildGUI();

parent.appendChild(contentContainer);
parent.appendChild(controlsContainer);
contentContainer.appendChild(infoText);
contentContainer.appendChild(renderer.domElement);
renderer.setSize(contentContainer.clientWidth, contentContainer.clientHeight - getAbsoluteHeight(infoText));

// camera controls
const camera = new THREE.PerspectiveCamera(75, contentContainer.clientWidth / (contentContainer.clientHeight - getAbsoluteHeight(infoText)), 1, 1000);
camera.position.z = 40;
camera.position.x = 22;
camera.position.y = 15;
const controls = new OrbitControls(camera, renderer.domElement);

// set initial displayed values
refreshArrowPosition();

function animate() {
    requestAnimationFrame(animate);
    controls.update()
    renderer.render(scene, camera);
}

animate();

function BuildGUI() {
    const actions = {
        State0: () => setState(Qubit.baseState0),
        State1: () => setState(Qubit.baseState1),
        StateM: () => setState(Qubit.baseStateM),
        StateP: () => setState(Qubit.baseStateP),
        StateMi: () => setState(Qubit.baseStateMi),
        StatePi: () => setState(Qubit.baseStatePi),
        XGate: () => applyGate(Gates.XGate),
        YGate: () => applyGate(Gates.YGate),
        ZGate: () => applyGate(Gates.ZGate),
        HGate: () => applyGate(Gates.HGate),
        SGate: () => applyGate(Gates.SGate),
        SNegGate: () => applyGate(Gates.SNegGate),
        YHalfGate: () => applyGate(Gates.YHalfGate),
        YNegHalfGate: () => applyGate(Gates.YNegHalfGate),
        XHalfGate: () => applyGate(Gates.XHalfGate),
        XNegHalfGate: () => applyGate(Gates.XNegHalfGate),
        TGate: () => applyGate(Gates.TGate),
        TNegGate: () => applyGate(Gates.TNegGate),
        YQuarterGate: () => applyGate(Gates.YQuarterGate),
        YNegQuarterGate: () => applyGate(Gates.YNegQuarterGate),
        XQuarterGate: () => applyGate(Gates.XQuarterGate),
        XNegQuarterGate: () => applyGate(Gates.XNegQuarterGate),
    }

    const setStateFolder = gui.addFolder("Set Qubit State");
    setStateFolder.add(actions, "State0").name("|0⟩");
    setStateFolder.add(actions, "State1").name("|1⟩");
    setStateFolder.add(actions, "StateM").name("|-⟩");
    setStateFolder.add(actions, "StateP").name("|+⟩");
    setStateFolder.add(actions, "StateMi").name("|-i⟩");
    setStateFolder.add(actions, "StatePi").name("|+i⟩");

    const halfTurnsFolder = gui.addFolder("Half Turn Gates");
    halfTurnsFolder.add(actions, "XGate").name("X");
    halfTurnsFolder.add(actions, "YGate").name("Y");
    halfTurnsFolder.add(actions, "ZGate").name("Z");
    halfTurnsFolder.add(actions, "HGate").name("H");

    const quarterTurnsFolder = gui.addFolder("Quarter Turn Gates");
    quarterTurnsFolder.add(actions, "SGate").name("S");
    quarterTurnsFolder.add(actions, "SNegGate").name("S^-1");
    quarterTurnsFolder.add(actions, "YHalfGate").name("Y^½");
    quarterTurnsFolder.add(actions, "YNegHalfGate").name("Y^-½");
    quarterTurnsFolder.add(actions, "XHalfGate").name("X^½");
    quarterTurnsFolder.add(actions, "XNegHalfGate").name("X^-½");

    const eighthTurnsFolder = gui.addFolder("Eighth Turn Gates");
    eighthTurnsFolder.add(actions, "TGate").name("T");
    eighthTurnsFolder.add(actions, "TNegGate").name("T^-1");
    eighthTurnsFolder.add(actions, "YQuarterGate").name("Y^¼");
    eighthTurnsFolder.add(actions, "YNegQuarterGate").name("Y^-¼");
    eighthTurnsFolder.add(actions, "XQuarterGate").name("X^¼");
    eighthTurnsFolder.add(actions, "XNegQuarterGate").name("X^-¼");

    halfTurnsFolder.open();
    quarterTurnsFolder.open();
    eighthTurnsFolder.open();
}

function getAbsoluteHeight(el) {
    el = (typeof el === "string") ? document.querySelector(el) : el;

    const styles = window.getComputedStyle(el);
    const margin = parseFloat(styles['marginTop']) + parseFloat(styles['marginBottom']);

    return Math.ceil(el.offsetHeight + margin);
}
