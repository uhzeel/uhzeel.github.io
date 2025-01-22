// Create a new Three.js scene
const scene = new THREE.Scene();

// Set up the camera with a perspective view
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Create a WebGL renderer and set its size
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// Append the renderer's DOM element to the document body
document.body.appendChild(renderer.domElement);

// Initialize OrbitControls to allow mouse interaction with the scene
const controls = new THREE.OrbitControls(camera, renderer.domElement);

/* // Enable panning with the touchpad
controls.enablePan = true;
controls.panSpeed = 2.0; // Adjust the pan speed as needed
 */

// Load the PLY file using PLYLoader
const loader = new THREE.PLYLoader();
loader.load('nevipillo_point_cloud.ply', function(geometry) {
    // Compute vertex normals for the geometry
    geometry.computeVertexNormals();
    
    // Create a PointsMaterial with vertex colors
    const material = new THREE.PointsMaterial({ 
        size: 0.01, 
        vertexColors: true 
    });
    
    // Create a Points object and add it to the scene
    const mesh = new THREE.Points(geometry, material);
    scene.add(mesh);
});

// Set the camera position
camera.position.z = 5;

// Animation loop to render the scene and update controls
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Update controls
    renderer.render(scene, camera); // Render the scene
}
animate();