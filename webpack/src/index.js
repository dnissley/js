import _ from 'lodash';
import printMe from './print.js';
import './style.css';
import MyImage from './image.jpeg';

function appendChildrenWithDiv(parent, children) {
  var d = document.createElement('div');
  children.forEach((child) => d.appendChild(child));
  parent.appendChild(d);
}

function component() {
  var container = document.createElement('div');

  var header = document.createElement('h1');
  header.innerHTML = _.join(['Hello', 'webpack'], ' ');
  container.appendChild(header);

  var styledTextDesc = document.createElement('h2');
  styledTextDesc.innerHTML = 'Importing css';
  var styledText = document.createElement('div');
  styledText.innerHTML = 'This text demonstrates how styles can be imported.';
  styledText.classList.add('hello');
  appendChildrenWithDiv(container, [styledTextDesc, styledText]);
  
  var imgDesc = document.createElement('h2');
  imgDesc.innerHTML = 'Importing images';
  var img = new Image();
  img.src = MyImage;
  appendChildrenWithDiv(container, [imgDesc, img]);

  var btnDesc = document.createElement('h2');
  btnDesc.innerHTML = 'Importing js';
  var btn = document.createElement('button');
  btn.innerHTML = 'Click me and check the console.';
  btn.onclick = printMe;
  appendChildrenWithDiv(container, [btnDesc, btn]);

  return container;
}

document.body.appendChild(component());

