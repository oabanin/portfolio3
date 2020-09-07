import './sass/style.scss';

import $ from 'jquery';

import 'jquery-mousewheel';
//import 'jquery-touchswipe';
import 'slick-carousel';

import arrowLeft from "./img/arrow-left.svg";

const initPageSlider = () => {

  const $slider = $('.page-slider--js');
  const $navToggle = $('.nav-toggle');
  const $perspective__menu = $('.perspective__menu');
  const $perspective__menu_li_nodes = $perspective__menu.find("li");

  const $perspective = $('.perspective');
  const $header__hirebutton = $('.header__hire-button');

 
    //Options
  $slider.slick({
    slidesToShow: 1,
    arrows: false,
    //fade: true,
    speed: 300,
    touchTreshold: 800,
    vertical: true,
    infinite: false,
    verticalSwiping: true,
  });

  //On mousewheel
  $slider.mousewheel(function (e) {
    e.preventDefault();
    if (e.deltaY < 0) {
      $(this).slick('slickNext');
      $(this).slick('setPosition');
      

    }
    else {
      $(this).slick('slickPrev');
      $(this).slick('setPosition');
    }
  });

  //Click toggle
  $navToggle.click(function () {
    $perspective__menu.addClass('is_visible');
    $perspective.addClass('is-active');
  })


  $slider.on('afterChange', function(event, slick, currentSlide, nextSlide){
    
    //remove headwer button on slides not equal first and last
    //add button on first and last slides
    const lastSlide = slick.slideCount - 1;
    if(currentSlide !== 0 && currentSlide !== lastSlide) {
      $header__hirebutton.addClass('active');
    } 
    else {
       $header__hirebutton.removeClass('active');
    }

    //Changing active in perspective menu
    $perspective__menu_li_nodes.removeClass('active');
    $perspective__menu_li_nodes.eq(currentSlide).addClass('active');
  });

  //Slick slider Goto
  $perspective__menu_li_nodes.click(function(){
    const slideIndex = $(this).index();

    //$slider.slick('slickGoTo', parseInt(slideIndex) );
    $perspective.removeClass('is-active',1000, "easeOutSine");
    //$perspective__menu.removeClass('is_visible');
    



  })


}; //end initPageSlider;

//slider on page2 inside slider1
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
    "fade": true,
    "prevArrow": '<span class="work-arrow is-prev"><img src="' + arrowLeft + '"></span>',
    "nextArrow": '<span class="work-arrow is-next"><img src="' + require("./img/arrow-right.svg").default + '"></span>'
  }
  );

}

$(document).ready(function () {
  initPageSlider();
  initWorkSlider();


});

