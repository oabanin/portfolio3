import _ from 'lodash';
import './style.css';
import Icon from './icon.jpg';
import printF from './print.js';

  function component() {
    const element = document.createElement('div');
    const btn = document.createElement("button");

    btn.innerHTML="Click me";
    btn.onclick = printF;
    

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello')

    const myImage = new Image();
    myImage.src=Icon;
    element.appendChild(myImage);
    element.appendChild(btn);

    return element;
  }
  
  document.body.appendChild(component());

