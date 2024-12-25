const container = document.getElementById('container');
const finalMessage = document.getElementById('final-message');

// Lista de fotos obtenida de Google Drive
const photos = [];
for (let i = 1; i <= 39; i++) {
  const num = String(i).padStart(5, '0'); // Agrega ceros para completar 5 dígitos
  photos.push(`./img/img${num}.jpg`);
}

let imagesLoaded = 0;

// Función para cargar las imágenes de manera segura
function loadImage(src) {
  const img = new Image();
  img.src = src;
  img.onload = () => { 
    imagesLoaded++;
    if (imagesLoaded === photos.length) {
      showFinalMessage();
    }
  };
  img.onerror = () => { 
    console.error(`Error cargando imagen: ${src}`);
    imagesLoaded++;
    if (imagesLoaded === photos.length) {
      showFinalMessage();
    }
  };
  return img;
}

// Crear y mostrar las imágenes dinámicamente
photos.forEach((src, index) => {
  console.log("Cargando imagen:", src);
  const photo = document.createElement('div');
  photo.classList.add('photo');
  photo.style.backgroundImage = `url(${src})`;

  // Distribuir las imágenes aleatoriamente
  photo.style.left = `${Math.random() * 90}vw`;
  photo.style.top = `${Math.random() * 90}vh`;

  container.appendChild(photo);

  setTimeout(() => {
    photo.style.opacity = 1;
    photo.style.transform = 'scale(1)';
  }, 100 * index);

  loadImage(src);
});

// Mostrar el mensaje final después de cargar y formar la esfera
function showFinalMessage() {
  setTimeout(() => {
    // Mostrar el mensaje final
    finalMessage.classList.remove('hidden');
    finalMessage.style.opacity = 1;

    // Cambiar las fotos a posiciones aleatorias (sin rotación)
    setInterval(() => {
      const container = document.getElementById('container');
      const containerWidth = container.offsetWidth;  // Ancho del contenedor
      const containerHeight = container.offsetHeight;  // Alto del contenedor

      photos.forEach((src, index) => {
        const photo = document.getElementsByClassName('photo')[index];

        // Generar posiciones aleatorias dentro del contenedor
        const randomX = Math.floor(Math.random() * (containerWidth - 100));  // Ancho aleatorio
        const randomY = Math.floor(Math.random() * (containerHeight - 100));  // Alto aleatorio

        // Aplicar las posiciones aleatorias sin transformaciones adicionales
        photo.style.left = `${randomX}px`;
        photo.style.top = `${randomY}px`;
        photo.style.opacity = 1; // Asegurarse de que las fotos sean visibles
        photo.style.transition = 'left 2s, top 2s'; // Transición suave para el movimiento
        photo.style.animation = 'none';
      });
    }, 4000); // Movimiento aleatorio de las fotos cada 3 segundos
  }, 5000); // Mostrar mensaje después de 5 segundos
}
