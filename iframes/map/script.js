const svg = document.getElementById("worldMap");

let scale = 1; // Initial zoom scale
const minScale = 0.5; // Minimum zoom level
const maxScale = 5; // Maximum zoom level

let isDragging = false; // To track dragging state
let dragStart = { x: 0, y: 0 }; // To store starting drag coordinates
let currentTranslate = { x: 0, y: 0 }; // To track current translation

svg.addEventListener("wheel", (event) => {
    event.preventDefault(); // Prevent default scroll behavior

    const rect = svg.getBoundingClientRect();

    // Calculate mouse position relative to the SVG's coordinate system
    const mouseX = (event.clientX - rect.left - currentTranslate.x) / scale;
    const mouseY = (event.clientY - rect.top - currentTranslate.y) / scale;

    // Determine the new scale
    const delta = event.deltaY > 0 ? -0.1 : 0.1;
    const newScale = Math.min(maxScale, Math.max(minScale, scale + delta));

    // Adjust translation to keep the mouse position stable during zoom
    currentTranslate.x -= mouseX * (newScale - scale) * scale;
    currentTranslate.y -= mouseY * (newScale - scale) * scale;

    // Update the scale
    scale = newScale;

    // Apply the transformation
    updateTransform();
});

svg.addEventListener("mousedown", (event) => {
    if (event.button === 1) { // Middle mouse button
        event.preventDefault();
        isDragging = true;
        dragStart = { x: event.clientX, y: event.clientY };
        svg.style.cursor = "grabbing";
    }
});

svg.addEventListener("mousemove", (event) => {
    if (isDragging) {
        const dx = event.clientX - dragStart.x;
        const dy = event.clientY - dragStart.y;

        currentTranslate.x += dx;
        currentTranslate.y += dy;

        updateTransform();

        dragStart = { x: event.clientX, y: event.clientY };
    }
});

svg.addEventListener("mouseup", (event) => {
    if (event.button === 1) {
        isDragging = false;
        svg.style.cursor = "default";
    }
});

svg.addEventListener("mouseleave", () => {
    if (isDragging) {
        isDragging = false;
        svg.style.cursor = "default";
    }
});

function updateTransform() {
    svg.style.transform = `translate(${currentTranslate.x}px, ${currentTranslate.y}px) scale(${scale})`;
}
