const output = document.getElementById("output");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Returns a Promise that resolves when image loads
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");

    img.onload = () => {
      resolve(img);
    };

    img.onerror = () => {
      reject(new Error(`Failed to load image: ${url}`));
    };

    img.src = url;
  });
}

// Download all images using Promise.all()
async function downloadImages() {
  output.innerHTML = "";
  errorDiv.textContent = "";

  loading.textContent = "Loading...";

  try {
    const imagePromises = images.map((image) =>
      downloadImage(image.url)
    );

    const downloadedImages = await Promise.all(imagePromises);

    loading.textContent = "";

    downloadedImages.forEach((img) => {
      output.appendChild(img);
    });

  } catch (error) {
    loading.textContent = "";
    errorDiv.textContent = error.message;
  }
}

// Button click event
btn.addEventListener("click", downloadImages);