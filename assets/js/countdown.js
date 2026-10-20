/**
 * BRIGHTLINGSEA ACADEMY — EVENT COUNTDOWN
 * ---------------------------------------------------------------
 * Ticks the featured-event countdown on index.html (10th Anniversary
 * & Graduation Ceremony, Friday 9 October 2026).
 *
 * Required markup (any page that wants a countdown):
 *
 *   <div id="anniversaryCountdown" data-countdown-target="2026-10-09T09:00:00+00:00">
 *       <span data-countdown="days"></span>
 *       <span data-countdown="hours"></span>
 *       <span data-countdown="minutes"></span>
 *       <span data-countdown="seconds"></span>
 *   </div>
 *
 * Falls back to a static "--" placeholder if the target date is in the
 * past or unsupported, and honours prefers-reduced-motion by updating
 * once per minute instead of once per second.
 */

(function () {
    'use strict';

    function pad(num) {
        return num < 10 ? '0' + num : String(num);
    }

    function initCountdown() {
        var root = document.querySelector('[data-countdown-target]');
        if (!root) return;

        var target = new Date(root.getAttribute('data-countdown-target')).getTime();
        if (isNaN(target)) return;

        var daysEl = root.querySelector('[data-countdown="days"]');
        var hoursEl = root.querySelector('[data-countdown="hours"]');
        var minutesEl = root.querySelector('[data-countdown="minutes"]');
        var secondsEl = root.querySelector('[data-countdown="seconds"]');

        var reduceMotion = window.matchMedia &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        var tickMs = reduceMotion ? 60000 : 1000;

        function set(el, value) {
            if (el && el.textContent !== value) el.textContent = value;
        }

        function tick() {
            var diff = target - Date.now();

            if (diff <= 0) {
                set(daysEl, '00');
                set(hoursEl, '00');
                set(minutesEl, '00');
                set(secondsEl, '00');
                root.classList.add('is-elapsed');
                clearInterval(timer);
                return;
            }

            var totalSeconds = Math.floor(diff / 1000);
            var days = Math.floor(totalSeconds / 86400);
            var hours = Math.floor((totalSeconds % 86400) / 3600);
            var minutes = Math.floor((totalSeconds % 3600) / 60);
            var seconds = totalSeconds % 60;

            set(daysEl, pad(days));
            set(hoursEl, pad(hours));
            set(minutesEl, pad(minutes));
            set(secondsEl, pad(seconds));
        }

        tick();
        var timer = setInterval(tick, tickMs);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCountdown);
    } else {
        initCountdown();
    }
})();