/*
 * Particles.js
 * http://vincentgarreau.com/particles.js/
 */

if (document.getElementById('particles-js-hexagon') !== null)
{
	particlesJS.load('particles-js-hexagon', 'assets/js/particles/particles-hexagon.json');
}

if (document.getElementById('particles-js-bubble') !== null)
{
	particlesJS.load('particles-js-bubble', 'assets/js/particles/particles-bubble.json');
}

if (document.getElementById('particles-js-connect') !== null)
{
	particlesJS.load('particles-js-connect', 'assets/js/particles/particles-connect.json');
}

if (document.getElementById('particles-js-diamonds') !== null)
{
	particlesJS.load('particles-js-diamonds', 'assets/js/particles/particles-diamonds.json');
}

if (document.getElementById('particles-js-nasa') !== null)
{
	particlesJS.load('particles-js-nasa', 'assets/js/particles/particles-nasa.json');
}

if (document.getElementById('particles-js-snow') !== null)
{
	particlesJS.load('particles-js-snow', 'assets/js/particles/particles-snow.json');
}

$(function($)
{

  /*
   * Ekko Lightbox
   * http://ashleydw.github.io/lightbox/
   */

  $(document).delegate('*[data-toggle="lightbox"]', 'click', function(event) {
    var self = $(this);
    $(this).attr('href', $(this).attr('src'));

    $('*[data-gallery]').each(function() {
      $(this).attr('href', $(this).attr('src'));
    });

    event.preventDefault();
    $(self).ekkoLightbox();
  });

  /*
   * Owl Carousel
   * https://owlcarousel2.github.io/OwlCarousel2/
   */

	if ($('.owl-carousel').length) {
    $('.owl-carousel').owlCarousel({
      loop: true,
      nav: false,
      responsive:{
        0:{
          items:1
        },
        600:{
          items:3
        },
        1000:{
          items:5
        }
      }
    });
  }

  /*
   * Typed.js
   * http://www.mattboldt.com/demos/typed-js/
   */

	if ($('.typed').length) {
    $('.typed').each(function() {

      var strings = eval($(this).attr('data-text'));

      $(this).typed({
        strings: strings,
        typeSpeed: 50,
        // time before typing starts
        startDelay: 1000,
        // backspacing speed
        backSpeed: 10,
        // time before backspacing
        backDelay: 1500,
        // loop
        loop: true,
        // false = infinite
        loopCount: false,
      });

    });
  }

  /*
   * Flat Surface Shader
   * http://matthew.wagerfield.com/flat-surface-shader/
   */

	if ($('.polygon-bg').length) {
    $('.polygon-bg').each(function() {

      var color_bg = ($(this).is('[data-color-bg]')) ? $(this).attr('data-color-bg') : '29a9e1';
      var color_light = ($(this).is('[data-color-light]')) ? $(this).attr('data-color-light') : '2db674';

      var container = $(this)[0];
      var renderer = new FSS.CanvasRenderer();
      var scene = new FSS.Scene();
      var light = new FSS.Light(color_bg, color_light);
      var geometry = new FSS.Plane(3000, 1000, 60, 22);
      var material = new FSS.Material('FFFFFF', 'FFFFFF');
      var mesh = new FSS.Mesh(geometry, material);
      var now, start = Date.now();

      function initialiseFss() {
        scene.add(mesh);
        scene.add(light);
        container.appendChild(renderer.element);
        window.addEventListener('resize', resizeFss);
      }

      function resizeFss() {
        renderer.setSize(container.offsetWidth, container.offsetHeight);
      }

      function animateFss() {
        now = Date.now() - start;
        light.setPosition(300*Math.sin(now*0.001), 200*Math.cos(now*0.0005), 60);
        renderer.render(scene);
        requestAnimationFrame(animateFss);
      }

      initialiseFss();
      resizeFss();
      animateFss();
    });
	}

  /*
   * Countdown timer
   */

	if ($('div[data-countdown]').length) {
    $('div[data-countdown]').each(function() {
      var that = $(this);
      var countdown = $(this).attr('data-countdown');
      var clientTime = new Date().getTime();

      var dateTimePartsCountdown = countdown.split(' '),
          timePartsCountdown = dateTimePartsCountdown[1].split(':'),
          datePartsCountdown = dateTimePartsCountdown[0].split('-'),
          counterEnds;

      counterEnds = new Date(datePartsCountdown[0], parseInt(datePartsCountdown[1], 10) - 1, datePartsCountdown[2], timePartsCountdown[0], timePartsCountdown[1]);
      counterEnds = counterEnds.getTime();

      var serverTime = new Date().getTime();

      if ($(this)[0].hasAttribute('data-server-time')) {
        serverTime = $(this).attr('data-server-time');

        var dateTimePartsServerTime = serverTime.split(' '),
            timePartsServerTime = dateTimePartsServerTime[1].split(':'),
            datePartsServerTime = dateTimePartsServerTime[0].split('-'),

        serverTime = new Date(datePartsServerTime[0], parseInt(datePartsServerTime[1], 10) - 1, datePartsServerTime[2], timePartsServerTime[0], timePartsServerTime[1]);
        serverTime = serverTime.getTime();
      }

      var end = counterEnds - serverTime + clientTime;

      var _second = 1000;
      var _minute = _second * 60;
      var _hour = _minute * 60;
      var _day = _hour * 24
      var timer;

      function showRemaining() {
        var now = new Date();
        var distance = end - now;
        if (distance < 0) {
          // Countdown is zero
        }
        var days = Math.floor(distance / _day);
        var hours = Math.floor( (distance % _day ) / _hour );
        var minutes = Math.floor( (distance % _hour) / _minute );
        var seconds = Math.floor( (distance % _minute) / _second );

        if (hours < 10) hours = '0' + hours;
        if (minutes < 10) minutes = '0' + minutes;
        if (seconds < 10) seconds = '0' + seconds;

        $(that).find('.day').text(days);
        $(that).find('.hour').text(hours);
        $(that).find('.minute').text(minutes);
        $(that).find('.second').text(seconds);
      }

      timer = setInterval(showRemaining, 1000);

    });
	}

});