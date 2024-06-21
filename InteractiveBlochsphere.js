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

const geometry = new THREE.SphereGeometry( 15, 32, 16 );
const line = new THREE.LineSegments(new THREE.EdgesGeometry(geometry), new THREE.LineBasicMaterial({color: 0x00000}))

// scene population
scene.background = new THREE.Color(0xaaaaaa);
scene.add( line );


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
