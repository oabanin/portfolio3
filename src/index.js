import './sass/style.scss';

import $ from 'jquery';

import 'jquery-mousewheel';
//import 'jquery-touchswipe';
import 'slick-carousel';

import arrowLeft from "./img/arrow-left.svg";

const initPageSlider = () => {

  const $slider = $('.page-slider--js');

  $slider.slick({
    arrows: false,
    touchTreshold: 800,
    vertical: true,
    infinite: false,
    verticalSwiping:true,
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

  // $('input').click(function(event){
  //   event.target.focus();
  // })
});

