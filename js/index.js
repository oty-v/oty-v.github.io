//'use strict';
//
//function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
//
//// ——————————————————————————————————————————————————
//// TextScramble
//// ——————————————————————————————————————————————————
//
//var TextScramble = function () {
//  function TextScramble(el) {
//    _classCallCheck(this, TextScramble);
//
//    this.el = el;
//    this.chars = '!<>-_\\/[]{}—=+*^?#________';
//    this.update = this.update.bind(this);
//  }
//
//  TextScramble.prototype.setText = function setText(newText) {
//    var _this = this;
//
//    var oldText = this.el.innerText;
//    var length = Math.max(oldText.length, newText.length);
//    var promise = new Promise(function (resolve) {
//      return _this.resolve = resolve;
//    });
//    this.queue = [];
//    for (var i = 0; i < length; i++) {
//      var from = oldText[i] || '';
//      var to = newText[i] || '';
//      var start = Math.floor(Math.random() * 40);
//      var end = start + Math.floor(Math.random() * 40);
//      this.queue.push({ from: from, to: to, start: start, end: end });
//    }
//    cancelAnimationFrame(this.frameRequest);
//    this.frame = 0;
//    this.update();
//    return promise;
//  };
//
//  TextScramble.prototype.update = function update() {
//    var output = '';
//    var complete = 0;
//    for (var i = 0, n = this.queue.length; i < n; i++) {
//      var _queue$i = this.queue[i];
//      var from = _queue$i.from;
//      var to = _queue$i.to;
//      var start = _queue$i.start;
//      var end = _queue$i.end;
//      var char = _queue$i.char;
//
//      if (this.frame >= end) {
//        complete++;
//        output += to;
//      } else if (this.frame >= start) {
//        if (!char || Math.random() < 0.2) {
//          char = this.randomChar();
//          this.queue[i].char = char;
//        }
//        output += '<span class="dud">' + char + '</span>';
//      } else {
//        output += from;
//      }
//    }
//    this.el.innerHTML = output;
//    if (complete === this.queue.length) {
//      this.resolve();
//    } else {
//      this.frameRequest = requestAnimationFrame(this.update);
//      this.frame++;
//    }
//  };
//
//  TextScramble.prototype.randomChar = function randomChar() {
//    return this.chars[Math.floor(Math.random() * this.chars.length)];
//  };
//
//  return TextScramble;
//}();
//
//// ——————————————————————————————————————————————————
//// Example
//// ——————————————————————————————————————————————————
//
//    var work = document.querySelector('#container-h1-one');
//    work.onclick = function (){ 
//        var about = ['Работы'];
//        var el = work;
//        var fx = new TextScramble(el);
//        var counter = 0;
//        var next = function next() {
//            fx.setText(about[counter]).then(function () {});
//        };
//    next()};
//    var info = document.querySelector('#container-h1-two');
//    info.onclick = function (){ 
//        var about = ['Информация'];
//        var el = info;
//        var fx = new TextScramble(el);
//        var counter = 0;
//        var next = function next() {
//            fx.setText(about[counter]).then(function () {});
//        };
//    next()};
//    var contact = document.querySelector('#container-h1-three');
//    contact.onclick = function (){ 
//        var about = ['Связь'];
//        var el = contact;
//        var fx = new TextScramble(el);
//        var counter = 0;
//        var next = function next() {
//            fx.setText(about[counter]).then(function () {});
//        };
//    next()};
//    var about_m = document.querySelector('#container-h2-one');
//    about_m.onclick = function (){ 
//        var about = ['Обо мне'];
//        var el = about_m;
//        var fx = new TextScramble(el);
//        var counter = 0;
//        var next = function next() {
//            fx.setText(about[counter]).then(function () {});
//        };
//    next()};
//    var service = document.querySelector('#container-h2-two');
//    service.onclick = function (){ 
//        var about = ['Услуги'];
//        var el = service;
//        var fx = new TextScramble(el);
//        var counter = 0;
//        var next = function next() {
//            fx.setText(about[counter]).then(function () {});
//        };
//    next()};
//    var elone = document.querySelector('#container-h3-one');
//    elone.onclick = function () { 
//        var about = ['Сайт визитка'];
//        var el = elone;
//        var fx = new TextScramble(el);
//        var counter = 0;
//        var next = function next() {
//            fx.setText(about[counter]);
//        };
//    next();};
//    var eltwo = document.querySelector('#container-h3-two');
//    eltwo.onclick = function (){ 
//        var about = ['Одностраничный cайт'];
//        var el = eltwo;
//        var fx = new TextScramble(el);
//        var counter = 0;
//        var next = function next() {
//            fx.setText(about[counter]);
//        };
//    next();};
//    var en = document.querySelector('#en');
//    en.onclick = function (){ 
//        var about = ['Works', 'Info', 'Contacts'];
//        var el = [ work , info , contact ];
//        var i;
//        for (i = 0; i < el.length; ++i) {
//            el[i].innerHTML = about[i];
//        }
//        
//    };
