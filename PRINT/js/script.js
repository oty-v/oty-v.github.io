var app = new Vue({
  el: '#app',
    data: {
        fw: 't-shirts',
        fh: 'front',
        coins: '1690'
  },
    methods: {
        fwt: function() {
            this.fw = 't-shirts',
            this.coins = '1690'
        },
        fwh: function() {
            this.fw = 'hoodie',
            this.coins = '3890'
        },
        fws: function() {
            this.fw = 'sweatshirts',
            this.coins = '3290'
        }
    }
});
var scroller = new Vue({
  el: '.stamp-icon-img'
});

window.onscroll = function() {
    var btnsElem = document.getElementById('btns');
var btnsimgElem = document.getElementById('btns-img');
var screh = document.documentElement.scrollHeight - document.documentElement.clientHeight - document.getElementById('ftr').clientHeight;
var btnsSourceBottom = btnsElem.getBoundingClientRect().bottom + window.pageYOffset;
    if ((screh > window.pageYOffset)&&(window.pageYOffset > btnsSourceBottom)) {
        btnsimgElem.classList.add('btns-fixed');
        btnsimgElem.classList.remove('btns-fixed-top');
      } else if (window.pageYOffset <= btnsSourceBottom) {
        btnsimgElem.classList.remove('btns-fixed');
        btnsimgElem.classList.remove('btns-fixed-top');
      } else if (screh <= window.pageYOffset) {
        btnsimgElem.classList.remove('btns-fixed');
        btnsimgElem.classList.add('btns-fixed-top');
      };
};