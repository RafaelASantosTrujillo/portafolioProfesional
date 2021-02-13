let curs = document.querySelector('.mouseover-bg');
$('document').ready(function () {
  $('.mouseover-bg').hide();
  $(".container-certificates").mousemove(function (e) {
      $('.mouseover-bg').css({ left: e.pageX - 100, top: e.pageY - 100, opacity:1 }).show();
  });
  $('.container-certificates').mouseout(function () {
      $('.mouseover-bg').hide();
  });
});