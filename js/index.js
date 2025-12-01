const dots = document.querySelectorAll(".side-nav button");

dots.forEach(dot => {
    dot.addEventListener("click", () => {
        document.getElementById(dot.dataset.target)
            .scrollIntoView({ behavior: "smooth" });
    });
});

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");

            const id = entry.target.id;
            dots.forEach(dot =>
                dot.classList.toggle("active", dot.dataset.target === id)
            );
        }
    });
}, { threshold: 0.6 });

const zones = document.querySelectorAll(".zone");
zones.forEach(zone => observer.observe(zone));

$(".content").css("opacity", 0);

$(window).on("scroll", function() {
    $(".content").each(function() {
        var top = $(this).offset().top;
        var scroll = $(window).scrollTop();
        var windowHeight = $(window).height();

        if (scroll + windowHeight > top + 100) {
            $(this).animate({opacity: 1}, 800);
        }
    });
});

$(document).ready(function() {
    var $jumpButton = $("#jump-button");

    $(window).on("scroll", function() {
        if ($(this).scrollTop() > 300) {
            $jumpButton.fadeIn(400);
        } else {
            $jumpButton.fadeOut(400);
        }
    });

    $jumpButton.on("click", function() {
        $("html, body").animate({ scrollTop: 0 }, 600);
    });
});
