class Marker {
  constructor(name, latlng, tags, address, zipcode, reason, picture, object) {
    this.name = name;
    this.latlng = latlng;
    this.tags = tags;
    this.address = address;
    this.zipcode = parseInt(zipcode);
    this.reason = reason;
    this.picture = picture;
    this.object = object;
  };
}

// create the map
var map = L.map('map').setView([37.38, -122.07], 13);
var tiles = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
map.doubleClickZoom.disable();
var visible = L.icon({iconUrl: 'marker.png'})
var invisible = L.icon({iconUrl: 'transparent.png'})


// set up for creating and storing markers
var markers = []
var markerForm = document.getElementById("submitMarker");
var findPlace = document.getElementById("findPlace");
var latlng;
var markerObj;

// adding markers
map.on('dblclick', addMarker);
function addMarker(e) {
  latlng = e.latlng;
  markerObj = L.marker(latlng).addTo(map);
  markerForm.style.display = 'block';
  findPlace.style.display = 'none';
  let submitButton = document.getElementById("submit")
  submitButton.addEventListener("click", submitForm);
};

// the function to get the values and submit them
function submitForm() {
  let name = document.getElementById("fSpot").value;
  let tags = document.getElementById("fTags").value.split(", ");
  let address = document.getElementById("fAddress").value;
  let zip = document.getElementById("fZipcode").value;
  let reasons = document.getElementById("fReasons").value;
  let picture = document.getElementById("fPicture").value;
  var marker = new Marker(name, latlng, tags, address, zip, reasons, picture, markerObj);
  markers.push(marker);
  markerForm.style.display = 'none';
  findPlace.style.display = 'block';
  let innerText = `<p>Name of spot: ` + marker.name + `</p>
    <p>Tags: ` +  marker.tags + `</p>
    <p>Address: ` + marker.address + `</p>
    <p>Zipcode: ` + marker.zipcode + `</p>
    <p>Why it's a happy spot: ` + marker.reason + `</p>
    <p>Photo: <img style="width: 100px; height: 100px" src=` + marker.picture + '>'
  markerObj.bindPopup(innerText).openPopup();
}

// show and hide locations based on selected tags
findPlace.addEventListener('change', updateTags);
function updateTags () {
  var tPark = document.getElementById("tPark").checked;
  var tRestaurant = document.getElementById("tRestaurant").checked;
  var tView = document.getElementById("tView").checked;
  var tMuseum = document.getElementById("tMuseum").checked;
  var tTrail = document.getElementById("tTrail").checked;
  var tOther = document.getElementById("tOther").checked;
  markers.forEach((marker)=> {
    marker.tags.forEach((tag)=> {
  		if (tag == "park" && tPark)
        {marker.object.setIcon(visible);}
  		else if (tag == "restaurant" && tRestaurant)
        {marker.object.setIcon(visible);}
  		else if (tag == "view" && tView) 
        {marker.object.setIcon(visible);}
      else if (tag == "museum" && tMuseum) 
        {marker.object.setIcon(visible);}
  		else if (tag == "trail" && tTrail) 
        {marker.object.setIcon(visible);}
  		else if (tag == "other" && tOther) 
        {marker.object.setIcon(visible);}
      else {marker.object.setIcon(invisible)};
      if (!tPark && !tRestaurant && !tView && !tMuseum && !tTrail && !tOther) {marker.object.setIcon(visible)};
    })
  })
};

// create some existing markers using: name, latlng, tags, address, zipcode, reason, picture, object

function createPopup (marker) {
  let innerText = `<p>Name of spot: ` + marker.name + `</p>
  <p>Tags: ` +  marker.tags + `</p>
  <p>Address: ` + marker.address + `</p>
  <p>Zipcode: ` + marker.zipcode + `</p>
  <p>Why it's a happy spot: ` + marker.reason + `</p>
  <p>Photo: <img style="width: 100px; height: 100px" src=` + marker.picture + '>';
  marker.object.bindPopup(innerText);
}

let tempMarker = new Marker ("Cuesta Park", [37.371935, -122.080657], ["park"], "Cuesta Park, Mountain View", 94041, "I enjoy exploring the large park and climbing all of the hills.", "", L.marker([37.371935, -122.080657]).addTo(map));
createPopup(tempMarker);
markers.push(tempMarker);

tempMarker = new Marker ("Seven Seas Park", [37.398710, -122.016080], ["park"], "1010 Morse Ave, Sunnyvale, CA", 94089, "It is a great place to go if you want to spend some time with your dog outside!", "https://lh4.googleusercontent.com/-4Rx2jiap5KI/WHWy3I3xEhI/AAAAAAAAkls/nbCm9sYWvRoNqWLOH07dnIyg_knZAyIbQCLIB/photo.jpg", L.marker([37.398710, -122.016080]).addTo(map));
createPopup(tempMarker);
markers.push(tempMarker);

tempMarker = new Marker ("Blue Line Pizza", [37.394350, -122.078760], ["restaurant"], "146 Castro Street, Mountain View, CA", 94041, "A few years ago I ordered the garlic bread from here and it has been my favorite dish since. Which is ironic considering it's a pizza restaurant....", "", L.marker([37.394350, -122.078760]).addTo(map));
createPopup(tempMarker);
markers.push(tempMarker);

tempMarker = new Marker ("Long Ridge", [37.267123, -122.160703], ["view", "trail"], "Long Ridge Open Space Preserve, La Honda", 94020, "There is a beautiful view of the valley from the top of the ridge.", "", L.marker([37.267123, -122.160703]).addTo(map));
createPopup(tempMarker);
markers.push(tempMarker);

tempMarker = new Marker ("Computer History Museum", [37.414399, -122.077666], ["museum"],"Computer History Museum, 1401 N Shoreline Blvd, Mountain View, CA", 94043, "A great place to learn about the history of computer science!", "", L.marker([37.414399, -122.077666]).addTo(map));
createPopup(tempMarker);
markers.push(tempMarker);

tempMarker = new Marker ("Winchester Mystery House", [37.318950, -121.950600], ["other"], "525 S Winchester BvlD, San Jose, CA, US", 95128, "This is one of the coolest (and weirdest) places I've ever been, and it's right in our backyard! Go check it out at Halloween for an even spookier experience.", "", L.marker([37.318950, -121.950600]).addTo(map));
createPopup(tempMarker);
markers.push(tempMarker);
