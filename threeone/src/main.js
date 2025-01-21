const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Initialize OrbitControls
const controls = new THREE.OrbitControls(camera, renderer.domElement);

const loader = new THREE.PLYLoader();
loader.load('nevipillo_point_cloud.ply', function(geometry) {
    geometry.computeVertexNormals();
    const material = new THREE.PointsMaterial({ 
        size: 0.01, 
        vertexColors: true 
    });
    const mesh = new THREE.Points(geometry, material);
    scene.add(mesh);
});

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Update controls
    renderer.render(scene, camera);
}
animate();