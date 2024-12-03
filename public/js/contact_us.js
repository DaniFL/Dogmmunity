function initMap() {
    // Inicializa el mapa centrado en Madrid
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 40.416775, lng: -3.703790 }, // Coordenadas del centro de Madrid
      zoom: 12, // Nivel de zoom
    });
  
    // Obtén los puntos de interés desde el backend
    fetch("/contact_us/puntos-de-interes") // Endpoint configurado en el backend
      .then((response) => response.json())
      .then((data) => {
        // Agrega cada punto de interés como un marcador en el mapa
        data.forEach((punto) => {
          const marker = new google.maps.Marker({
            position: { lat: punto.lat, lng: punto.lng }, // Coordenadas
            map: map, // Asigna el mapa
            title: punto.nombre, // Título al pasar el mouse
            icon: {
              url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png", // Icono del marcador
            },
          });
  
          // Crea una ventana de información para cada marcador
          const infoWindow = new google.maps.InfoWindow({
            content: `<h4>${punto.nombre}</h4><p>Tipo: ${punto.tipo}</p>`, // Contenido de la ventana
          });
  
          // Muestra la ventana de información al hacer clic en el marcador
          marker.addListener("click", () => {
            infoWindow.open(map, marker);
          });
        });
      })
      .catch((error) => console.error("Error al cargar los puntos de interés:", error)); // Maneja errores
  }
  
  // Llama a la función para inicializar el mapa cuando la página se cargue
  window.onload = initMap;
  