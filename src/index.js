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

const initWorkSlider = () => {
  const $slider = $('.js-work-slider');

  $slider.slick({centerMode: true,
    centerPadding: '60px',
    slidesToShow: 2,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: true,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }
    ]
  });

}

$(document).ready(function () {
  initPageSlider();
  initWorkSlider();
});

