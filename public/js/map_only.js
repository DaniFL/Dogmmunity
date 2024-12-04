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

  // Cargar puntos de interés
  fetch("/contact_us/puntos-de-interes")
    .then((response) => {
      if (!response.ok) throw new Error("Error en la respuesta del servidor.");
      return response.json();
    })
    .then((data) => {
      data.forEach((punto) => {
        let iconUrl;
        if (punto.tipo === "Veterinario") {
          iconUrl = "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"; // Azul para veterinarios
        } else if (punto.tipo === "Parque") {
          iconUrl = "https://maps.google.com/mapfiles/ms/icons/green-dot.png"; // Verde para parques
        }

        agregarMarcadores(
          [{ ...punto, icono: iconUrl }],
          null,
          `Tipo: ${punto.tipo}`
        );
      });
    })
    .catch((error) =>
      console.error("Error al cargar los puntos de interés:", error)
    );

  // Cargar usuarios cercanos
  fetch("/contact_us/usuarios-cercanos")
    .then((response) => {
      if (!response.ok) throw new Error("Error en la respuesta del servidor.");
      return response.json();
    })
    .then((usuarios) => {
      agregarMarcadores(
        usuarios,
        "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
        "Usuario cercano con su perro"
      );
    })
    .catch((error) => console.error("Error al cargar usuarios cercanos:", error));

  // Cargar eventos caninos
  fetch("/contact_us/eventos-caninos")
    .then((response) => {
      if (!response.ok) throw new Error("Error en la respuesta del servidor.");
      return response.json();
    })
    .then((eventos) => {
      agregarMarcadores(
        eventos,
        "https://maps.google.com/mapfiles/ms/icons/purple-dot.png",
        "Evento canino"
      );
    })
    .catch((error) => console.error("Error al cargar eventos caninos:", error));
}

// Ejecutar el script al cargar la página
window.onload = initMap;
