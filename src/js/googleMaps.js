export function initMap() {
  // eslint-disable-next-line no-new
  new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}
