document.addEventListener('DOMContentLoaded', () => {
    const videos = document.querySelectorAll('video');

    // Reproducir el video visible en pantalla
    const playVisibleVideo = () => {
        videos.forEach(video => {
            const rect = video.getBoundingClientRect();
            if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                video.play();
            } else {
                video.pause();
            }
        });
    };

    // Detectar scroll
    window.addEventListener('scroll', playVisibleVideo);

    // Reproducción inicial
    playVisibleVideo();
});