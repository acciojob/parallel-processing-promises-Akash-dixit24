const output = document.getElementById("output");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Create loading and error elements
const loading = document.createElement("div");
loading.id = "loading";
loading.textContent = "Loading...";

const errorDiv = document.createElement("div");
errorDiv.id = "error";

document.body.insertBefore(loading, output);
document.body.insertBefore(errorDiv, output);

// Function to download a single image
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");

    img.onload = () => resolve(img);

    img.onerror = () => {
      reject(new Error(`Failed to load image: ${url}`));
    };

    img.src = url;
  });
}

// Function to download all images
async function downloadImages() {
  loading.style.display = "block";
  errorDiv.textContent = "";
  output.innerHTML = "";

  try {
    const imagePromises = images.map((image) =>
      downloadImage(image.url)
    );

    const downloadedImages = await Promise.all(imagePromises);

    loading.style.display = "none";

    downloadedImages.forEach((img) => {
      output.appendChild(img);
    });
  } catch (error) {
    loading.style.display = "none";
    errorDiv.textContent = error.message;
  }
}

// Start downloading images
downloadImages();