/* =========================================================
   PacketVision — Landing page interactions
   ========================================================= */
(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", function () {
        setCurrentYear();
        wireNavMenu();
        animateCounters();
    });

    /* Footer year ------------------------------------------------ */
    function setCurrentYear() {
        var el = document.getElementById("year");
        if (el) {
            el.textContent = new Date().getFullYear();
        }
    }

    /* Mobile nav: close after tapping a link --------------------- */
    function wireNavMenu() {
        var toggle = document.getElementById("nav-toggle");
        if (!toggle) return;

        var links = document.querySelectorAll(".nav-links a");
        links.forEach(function (link) {
            link.addEventListener("click", function () {
                toggle.checked = false;
            });
        });
    }

    /* Animated hero stat counters -------------------------------- */
    function animateCounters() {
        var counters = document.querySelectorAll("[data-counter]");
        if (!counters.length) return;

        var reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (reduceMotion || !("IntersectionObserver" in window)) {
            counters.forEach(function (el) {
                el.textContent = formatValue(el);
            });
            return;
        }

        var observer = new IntersectionObserver(
            function (entries, obs) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        runCount(entry.target);
                        obs.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.4 }
        );

        counters.forEach(function (el) {
            observer.observe(el);
        });
    }

    function runCount(el) {
        var target = parseInt(el.getAttribute("data-counter"), 10) || 0;
        var duration = 1400;
        var start = null;

        function step(timestamp) {
            if (start === null) start = timestamp;
            var progress = Math.min((timestamp - start) / duration, 1);
            // easeOutCubic
            var eased = 1 - Math.pow(1 - progress, 3);
            var current = Math.round(eased * target);
            el.textContent = withSuffix(el, current);

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = formatValue(el);
            }
        }

        requestAnimationFrame(step);
    }

    /* Helpers ---------------------------------------------------- */
    function formatValue(el) {
        var target = parseInt(el.getAttribute("data-counter"), 10) || 0;
        return withSuffix(el, target);
    }

    function withSuffix(el, value) {
        var formatted = value.toLocaleString("en-US");
        // Uptime stat reads as a percentage
        var label = el.previousElementSibling;
        if (label && /uptime/i.test(label.textContent)) {
            return formatted + "%";
        }
        return formatted;
    }
})();
