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
    // Cambiar la posición de las fotos para formar una esfera
    photos.forEach((src, index) => {
      const photo = document.getElementsByClassName('photo')[index];
      const angle = (index / photos.length) * 2 * Math.PI;
      const x = 40 * Math.cos(angle) + 45; // Coordenadas x para formar círculo
      const y = 40 * Math.sin(angle) + 45; // Coordenadas y para formar círculo

      photo.style.left = `${x}vw`;
      photo.style.top = `${y}vh`;
      photo.style.transition = 'left 2s, top 2s'; // Transición suave para el movimiento

      photo.style.animation = 'none';
    });

    // Mostrar el mensaje
    finalMessage.classList.remove('hidden');
    finalMessage.style.opacity = 1;
  }, 5000); // Tiempo adicional para que las fotos lleguen a sus posiciones
}
