'use strict';




let multiItemSlider = (function () {
  return function (selector, _config) {

  let
    slider = document.querySelector(selector),
    sliderItem = slider.querySelectorAll('.item'),
    control = document.querySelectorAll('.control'),
    wrapper = slider.querySelector('.wrapper'),
    itemWidth = parseFloat(getComputedStyle(sliderItem[0]).width),
    dots = document.querySelector('.dots'),
    transform = 0,
    items = [],
    positionLeftItem = 0,
    middle = 2,
    interval = 0,
    dot,
    arrDot = [],
    config = {
      isCycling: true, // автоматическая смена слайдов
      direction: 'left', // направление смены слайдов
      interval: 2000, // интервал между автоматической сменой слайдов
      pause: true // устанавливать ли паузу при поднесении курсора к слайдеру
    };
    console.log(sliderItem[0]);

    for (let key in _config) {
      if (key in config) {
        config[key] = config[key];
      }
    }

    let cycle = function(direction) {
      if (!config.isCycling) {
        return;
      }
      interval = setInterval(function() {
        sliderMainFunk(direction);
      }, config.interval);
    };






    sliderItem.forEach(function(item, index){
      items.push({item: item, position: index, transform: transform});
    })


    let position = {
      getMinItem() {
        let indexItem = 0;
        items.forEach(function(item, index){
          if(item.position < items[indexItem].position){
            indexItem = index;
          }
        })
        return indexItem;
      },
      getMaxItem() {
        let indexItem = items.length - 1;
        items.forEach(function(item, index){
          if(item.position > items[indexItem].position){
            indexItem = index;
          }
        })
        return indexItem;
      },
      getMiddleItem(){
        if(middle > 5){
          return middle = 0;
        }
        if(middle < 0) {
          return middle = 5;
        }
        return middle
      },
      getMin(){
        return items[position.getMinItem()].position;
      },
      getMax(){
        return items[position.getMaxItem()].position;
      }
    };


  sliderItem[position.getMiddleItem()].classList.toggle('itemWidth');



  let sliderMainFunk = function(direction){
    sliderItem[position.getMiddleItem()].classList.toggle('itemWidth');
    arrDot[position.getMiddleItem()].classList.toggle('dotAction');

    if(direction === 'right'){
      positionLeftItem--;
      middle--;
      let index = position.getMaxItem();
      if(positionLeftItem < position.getMin()){
        items[index].position = position.getMin() - 1;
        items[index].transform -= itemWidth * items.length;
        sliderItem[index].style.transform = 'translateX(' +  items[index].transform + 'px)';
      }
      sliderItem[position.getMiddleItem()].classList.toggle('itemWidth');
      arrDot[position.getMiddleItem()].classList.toggle('dotAction');
      transform += itemWidth;
    }

    if(direction === 'left'){
      positionLeftItem++;
      middle++;
      if(positionLeftItem + 4 > position.getMaxItem()){
        let index = position.getMinItem();
        items[index].position = position.getMax() + 1;
        items[index].transform += itemWidth * items.length;
        sliderItem[index].style.transform = 'translateX(' +  items[index].transform + 'px)';
      }
      sliderItem[position.getMiddleItem()].classList.toggle('itemWidth');
      arrDot[position.getMiddleItem()].classList.toggle('dotAction');
      transform -= itemWidth;
    }
      wrapper.style.transform = 'translateX(' +  transform + 'px)';
  }

  let createDot = function(amountDot){

    for(let i = 1; i <= amountDot; i++){
      dot = document.createElement('div');
      dot.className = 'dot';
      dots.appendChild(dot);
      arrDot.push(dot);
    }
  };
  createDot(items.length);
  arrDot[position.getMiddleItem()].classList.toggle('dotAction');

  let clickFunk = function(){
    let direction = this.classList.contains('controlRight') ? 'right' : 'left';
    sliderMainFunk(direction);
    clearInterval(interval);
    cycle(config.direction);
  }

  let setListener = function(){
    control.forEach(function(item){
      item.addEventListener('click', clickFunk);
    });
    if (config.pause && config.isCycling) {
      slider.addEventListener('mouseenter', function () {
        clearInterval(interval);
      });
      slider.addEventListener('mouseleave', function () {
        clearInterval(interval);
        cycle(config.direction);
      });
  }

  }

  // инициализация
  setListener();
  cycle(config.direction);


  }
}());

let slider = multiItemSlider('.container', {
      isCycling: false
    });
