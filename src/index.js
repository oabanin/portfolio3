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
  const $perspective = $('.perspective');
  const $header__hirebutton = $('.header__hire-button');

  

  
  



  // children().each(function(num, node){
  //   console.log(node);
  // })

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
    "fade": true,
    "prevArrow": '<span class="work-arrow is-prev"><img src="' + arrowLeft + '"></span>',
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


  $(window).scroll(function(a){
    // Get container scroll position
    var fromTop = $(this).scrollTop();
    console.log(a);
    // Get id of current scroll item
    // var cur = scrollItems.map(function(){
    //   if ($(this).offset().top < fromTop)
    //     return this;
    // });
    // // Get the id of the current element
    // cur = cur[cur.length-1];
    // var id = cur && cur.length ? cur[0].id : "";
    
    // if (lastId !== id) {
    //     lastId = id;
    //     // Set/remove active class
    //     menuItems
    //       .parent().removeClass("active")
    //       .end().filter("[href='#"+id+"']").parent().addClass("active");
    // }                   
 });
});

