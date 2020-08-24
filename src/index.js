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
    $('.page-slider--js').slick();


};

$(document).ready(function (){
  initPageSlider();
});

