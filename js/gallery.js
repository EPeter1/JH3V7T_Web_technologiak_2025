document.addEventListener('DOMContentLoaded', function () {
    const lightbox = document.getElementById('lightbox');
    const closeButton = document.getElementById('close-button');

    closeButton.addEventListener('click', function() {
        lightbox.style.display = 'none';
    });

    lightbox.addEventListener('click', function(event) {
        if (event.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });

    function openLightbox(source, description) {
        const lightboxImage = document.getElementById('lightbox-image');
        const lightboxDescription = document.getElementById('lightbox-description');

        lightbox.style.display = 'block';
        lightboxImage.src = source;
        lightboxDescription.innerText = description; 
    }

    const gallery = document.getElementById('gallery');

    function loadGallery(category) {
        fetch('data/gallery.json')
            .then(response => response.json())
            .then(data => {
                gallery.innerHTML = '';
                const categoryImages = data[category];

                categoryImages.forEach(image => {
                    const galleryImage = document.createElement('img');

                    galleryImage.src = image.source;
                    galleryImage.alt = image.description;
                    galleryImage.title = image.description;

                    galleryImage.addEventListener('click', function() {
                        openLightbox(image.source, image.description);
                    });

                    gallery.appendChild(galleryImage);
                });
            })
            .catch(error => console.error('Hiba a képek betöltésekor:', error));
    }

    const radioButtons = document.querySelectorAll('input[name="category"]');
    let currentCategory = 'galaxy';

    radioButtons.forEach(button => {
        button.addEventListener('change', function () {
            currentCategory = this.value;
            loadGallery(currentCategory);
        });
    });

    loadGallery(currentCategory);
});
