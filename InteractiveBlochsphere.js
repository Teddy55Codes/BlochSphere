import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// helper methods
function hsl(h, s, l) {
    return (new THREE.Color()).setHSL(h, s, l);
}

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.z = 50;

let controls= new OrbitControls(camera, renderer.domElement);

const geometryZAxis = new THREE.CircleGeometry( 15, 32 ); 
const lineZAxis = new THREE.LineSegments(new THREE.EdgesGeometry(geometryZAxis), new THREE.LineBasicMaterial({color: 0x00000}))

const geometryXAxis = new THREE.CircleGeometry( 15, 32 );
geometryXAxis.rotateX(1.571)
const line1XAxis = new THREE.LineSegments(new THREE.EdgesGeometry(geometryXAxis), new THREE.LineBasicMaterial({color: 0x00000}))

const geometryYAxis = new THREE.CircleGeometry( 15, 32 );
geometryYAxis.rotateY(1.571)
const line1YAxis = new THREE.LineSegments(new THREE.EdgesGeometry(geometryYAxis), new THREE.LineBasicMaterial({color: 0x00000}))


const dir = new THREE.Vector3( 1, 2, 0 );

//normalize the direction vector (convert to vector of length 1)
dir.normalize();

const origin = new THREE.Vector3( 0, 0, 0 );
const length = 20;
const hex = 0xff00ff;

const arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );

// scene population
scene.background = new THREE.Color(0xaaaaaa);
scene.add( lineZAxis );
scene.add( line1XAxis );
scene.add( line1YAxis );
scene.add( arrowHelper );

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
