const imageContainer = document.getElementById("image-container");


let photosArray = [];
// unsplash api
const count = 10;
const apiKey = "R4Drd-1kpIX7wawJcXufN3V61IlJdzMwWGOeCjHrIhk";
const apiurl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


// check if all image were loaded..

function imageLoaded(){
  console.log('image loaded');
  imageLoaded++;
  if (imageLoaded === totalImage){
    ready = true;
    console.log('ready =' , ready);
  }
}
// helper function tp set  attribute on dom element.

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}
// create elements for links & photos, add a dom
function displayPhotos() {
  totalImage = photosArray.length;
  console.log('total image');
  photosArray.forEach((photo) => {
    // Create <a> to link to unsplash.
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // create <img> for photo.
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // put <img> inside <a>, then put both inside image container element.
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}
// Get photos from unsplash API.
async function getPhotos() {
  try {
    const response = await fetch(apiurl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {}
}

// cheack to see if scrolling near bottom of page, load more photos.
window.addEventListener('scroll',()=>{
  if( window.innerHeight+ window.scrollY >= document.body.offsetHeight - 1000){
    console.log('load more');
    getPhotos();

  }
})
// On loding
getPhotos();
