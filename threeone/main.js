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

let mesh; // Declare mesh variable globally

// Function to load a PLY file
function loadPLYFile(filename) {
    loader.load(`data/${filename}`, function(geometry) {
        geometry.computeVertexNormals();
        const material = new THREE.PointsMaterial({ 
            size: 0.01, 
            vertexColors: true 
        });
        mesh = new THREE.Points(geometry, material);
        scene.add(mesh);
    });
}

// Initial load
loadPLYFile('nevipillo_point_cloud.ply');

// Event listener for dropdown change
document.getElementById('plySelector').addEventListener('change', function() {
    // Clear the scene before loading new PLY file
    while(scene.children.length > 0){ 
        scene.remove(scene.children[0]); 
    }
    loadPLYFile(this.value);
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