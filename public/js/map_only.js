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

  // Función para agregar marcadores
  function agregarMarcadores(datos, iconoDefecto, tipoContenido) {
    datos.forEach((dato) => {
      const marker = new google.maps.Marker({
        position: { lat: dato.lat, lng: dato.lng },
        map: map,
        title: dato.nombre,
        icon: dato.icono || iconoDefecto, // Usa el icono del JSON o el icono por defecto
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `<h4>${dato.nombre}</h4><p>${tipoContenido}</p>`,
      });

      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });
    });
  }

  // Cargar parques
  fetch("/map_only/parques.json")
    .then((response) => {
      if (!response.ok) throw new Error("Error en la respuesta del servidor.");
      return response.json();
    })
    .then((parques) => {
      agregarMarcadores(
        parques.map((p) => ({ ...p, icono: "https://maps.google.com/mapfiles/ms/icons/green-dot.png" })),
        null,
        "Parque para perros"
      );
    })
    .catch((error) => console.error("Error al cargar los parques:", error));

  // Cargar veterinarios/hospitales
  fetch("/map_only/veterinarios_hospitales.json")
    .then((response) => {
      if (!response.ok) throw new Error("Error en la respuesta del servidor.");
      return response.json();
    })
    .then((veterinarios) => {
      agregarMarcadores(
        veterinarios.map((v) => ({ ...v, icono: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png" })),
        null,
        "Veterinario u hospital"
      );
    })
    .catch((error) => console.error("Error al cargar veterinarios:", error));

  // Cargar eventos caninos
  fetch("/map_only/eventos_caninos.json")
    .then((response) => {
      if (!response.ok) throw new Error("Error en la respuesta del servidor.");
      return response.json();
    })
    .then((eventos) => {
      agregarMarcadores(
        eventos.map((e) => ({ ...e, icono: "https://maps.google.com/mapfiles/ms/icons/orange-dot.png" })),
        null,
        "Evento canino"
      );
    })
    .catch((error) => console.error("Error al cargar eventos caninos:", error));

  // Cargar usuarios cercanos
  fetch("/map_only/usuarios_cercanos.json")
    .then((response) => {
      if (!response.ok) throw new Error("Error en la respuesta del servidor.");
      return response.json();
    })
    .then((usuarios) => {
      agregarMarcadores(
        usuarios.map((u) => ({ ...u, icono: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png" })),
        null,
        "Usuario cercano con su perro"
      );
    })
    .catch((error) => console.error("Error al cargar usuarios cercanos:", error));
}

// Ejecutar el script al cargar la página
window.onload = initMap;
