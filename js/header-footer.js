fetch("/partials/header.html")
    .then(response => response.text())
    .then(html => {
        document.getElementById('site-header').insertAdjacentHTML('afterbegin', html);
        highlightActiveNav();
    });

fetch("/partials/footer.html")
    .then(response => response.text())
    .then(html => {
        document.getElementById('site-footer').insertAdjacentHTML('afterbegin', html);
    });

function highlightActiveNav() {
    const currentPage = window.location.pathname.split("/").pop();

    document.querySelectorAll('.navbar-links a').forEach(link => {
        const linkPage = link.getAttribute('href');

        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
}
