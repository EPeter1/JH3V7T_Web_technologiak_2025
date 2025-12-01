document.addEventListener('DOMContentLoaded', function() {
    const articles = document.querySelectorAll('.article');
    const navItems = document.querySelectorAll('.sidebar ul li');

    const firstArticle = document.getElementById('article1');
    const firstNavItem = document.querySelector('li[data-target="article1"]');
    
    firstArticle.classList.add('active');
    firstNavItem.classList.add('active');

    navItems.forEach(item => {
        item.addEventListener('click', function() {
            articles.forEach(article => article.classList.remove('active'));
            navItems.forEach(nav => nav.classList.remove('active'));

            const targetArticle = document.getElementById(item.getAttribute('data-target'));
            targetArticle.classList.add('active');
            item.classList.add('active');
        });
    });
});

var videoPlayer;

function onYouTubeIframeAPIReady() {
    videoPlayer = new YT.Player('player', {
        videoId: 'yv4DbU1CWAY',
        height: '315',
        width: '560',
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    document.getElementById('seekButton').addEventListener('click', function() {
        videoPlayer.seekTo(65);
    });
}
