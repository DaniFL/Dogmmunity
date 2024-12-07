function initMap() {
  const mapDiv = document.getElementById("map");
  if (!mapDiv) {
    console.error("El elemento con id 'map' no existe en el DOM.");
    return;
  }

  const map = new google.maps.Map(mapDiv, {
    center: { lat: 40.416775, lng: -3.703790 }, // Coordenadas de Madrid
    zoom: 12,
  });

  const markers = {
    parques: [],
    veterinarios: [],
    usuarios: [],
    eventos: [],
  };

  function agregarMarcadores(datos, tipo, icono, visible = true) {
    datos.forEach((dato) => {
      const marker = new google.maps.Marker({
        position: { lat: dato.lat, lng: dato.lng },
        map: visible ? map : null,
        title: dato.nombre,
        icon: icono,
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `<h4>${dato.nombre}</h4>
                  <p>${dato.descripcion || "Sin descripción"}</p>
                  <p><b>Dirección:</b> ${dato.direccion || "No disponible"}</p>`,
      });

      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });

      markers[tipo].push(marker);
    });
  }

  function toggleMarkers(tipo, visible) {
    markers[tipo].forEach((marker) => {
      marker.setMap(visible ? map : null);
    });
  }

  // Cargar datos
  fetch("/map_only/parques.json")
    .then((response) => response.json())
    .then((parques) => {
      agregarMarcadores(parques, "parques", "https://maps.google.com/mapfiles/ms/icons/green-dot.png");
    });

  fetch("/map_only/veterinarios_hospitales.json")
    .then((response) => response.json())
    .then((veterinarios) => {
      agregarMarcadores(veterinarios, "veterinarios", "https://maps.google.com/mapfiles/ms/icons/blue-dot.png");
    });

  fetch("/map_only/usuarios_cercanos.json")
    .then((response) => response.json())
    .then((usuarios) => {
      agregarMarcadores(usuarios, "usuarios", "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png");
    });

  fetch("/map_only/eventos_caninos.json")
    .then((response) => response.json())
    .then((eventos) => {
      agregarMarcadores(eventos, "eventos", "https://maps.google.com/mapfiles/ms/icons/orange-dot.png");
    });

  // Filtros
  document.getElementById("filter-parques").addEventListener("change", (e) => {
    toggleMarkers("parques", e.target.checked);
  });
  document.getElementById("filter-veterinarios").addEventListener("change", (e) => {
    toggleMarkers("veterinarios", e.target.checked);
  });
  document.getElementById("filter-usuarios").addEventListener("change", (e) => {
    toggleMarkers("usuarios", e.target.checked);
  });
  document.getElementById("filter-eventos").addEventListener("change", (e) => {
    toggleMarkers("eventos", e.target.checked);
  });

  // Búsqueda
  document.getElementById("search-box").addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    map.setZoom(12);
    for (const tipo in markers) {
      markers[tipo].forEach((marker) => {
        if (marker.getTitle().toLowerCase().includes(query)) {
          map.setCenter(marker.getPosition());
          map.setZoom(15);
        }
      });
    }
  });
}

window.onload = initMap;
