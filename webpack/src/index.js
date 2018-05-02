import _ from 'lodash';
import './style.css';
import MyImage from './image.jpeg';

function component() {
  var img = new Image();
  img.src = MyImage;
  var element = document.createElement('div');
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');
  element.appendChild(img);
  return element;
}

document.body.appendChild(component());

