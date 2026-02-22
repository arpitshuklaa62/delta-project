

document.addEventListener("DOMContentLoaded", function () {
  const mapElement = document.getElementById("map");

  if (!mapElement) return;

  const map = L.map("map").setView([28.6139, 77.2090], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

 L.marker([lat, lon])
  .addTo(map)
  .bindPopup(`
    <div style="color:red; font-weight:bold;">
      <%= listing.title %>
    </div>
  `)
  .openPopup();

});
