import _ from 'lodash';
import './style.css';
import Icon from './icon.jpg';
import printF from './print.js';
import './sass/style.scss';


import $ from 'jquery';

import 'jquery-mousewheel';
import 'jquery-touchswipe';
import 'slick-carousel';


const initPageSlider = () => {
  const $slider = $('.page-slider--js');

  $slider.slick({
    arrows: false,
    vertical: true,
    infinite: false,
  });

  $slider.mousewheel(function (e) {
    e.preventDefault();
    if (e.deltaY < 0) {
      $(this).slick('slickNext');
    }
    else {
      $(this).slick('slickPrev');
    }
  });

  $slider.swipe({
    //Generic swipe handler for all directions
    swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
      if (direction === "up") {
        $(this).slick('slickNext');
      }
      else if (direction === "down") {
        $(this).slick('slickPrev');
      }
    },
    threshold: 50
  });


};

$(document).ready(function () {
  initPageSlider();
});

