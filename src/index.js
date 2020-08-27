import './sass/style.scss';

import $ from 'jquery';

import 'jquery-mousewheel';
import 'jquery-touchswipe';
import 'slick-carousel';

import arrowLeft from "./img/arrow-left.svg";

console.log(arrowLeft);


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
  const $slider = $('.js-work-slider'),
  		$slide1 = $slider.find('.js-slide-1').html(),
  		$slide2 = $slider.find('.js-slide-2').html(),
  		$slide3 = $slider.find('.js-slide-3').html();

 $slider.html(' ');
 $('<div>').appendTo($slider).append($slide1).append($slide2).append($slide3);
 $('<div>').appendTo($slider).append($slide2).append($slide3).append($slide1);
 $('<div>').appendTo($slider).append($slide3).append($slide1).append($slide2);

  $slider.slick({
  	"fade":true,
  	"prevArrow": '<span class="work-arrow is-prev"><img src="' + arrowLeft +'"></span>',
  	"nextArrow": '<span class="work-arrow is-next"><img src="' + require("./img/arrow-right.svg").default + '"></span>'
  }
  	);

}

$(document).ready(function () {
  initPageSlider();
  initWorkSlider();
});

