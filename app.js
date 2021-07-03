const auth = "563492ad6f91700001000001c52d87070c5547f29ee36618e00d5e4f";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
let searchValue;

//event listener
searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchPhotos(searchValue);
});

function updateInput(e) {
  searchValue = e.target.value;
}

//function that can be used for any api fetch
async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  return data;
}

function generatePictures(data) {
  // taking all photos returned from the fetch method and iterating over them with forEach and create a div that will display the image
  data.photos.forEach((photo) => {
    console.log(photo);
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = ` 
        <div class="gallery-info">
        <img src=${photo.src.large}> </img>
          <p>${photo.photographer}</p>
          <a href=${photo.src.original} title="Download Image"><i class="fas fa-download"></i> </a>
          </div>
          `;
    gallery.appendChild(galleryImg);
  });
}

async function curatedPhotos() {
  const data = await fetchApi(
    "https://api.pexels.com/v1/curated?per_page=15&page=1"
  );
  console.log(data);
  generatePictures(data);
}

async function searchPhotos(search) {
  clear("");
  const data = await fetchApi(
    `https://api.pexels.com/v1/search?query=${search}+query&per_page=15&page=1`
  );
  generatePictures(data);
}

//clears default rendered photos and input value when searching for photos
function clear() {
  gallery.innerHTML = "";
  searchInput.value = "";
}

curatedPhotos();
