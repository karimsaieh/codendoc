(function ($) {
  $(function () {

    $('.button-collapse').sideNav();
    $('.collapsible').collapsible();
    $('.button-collapse').sideNav({
      closeOnClick: true
    });
    $('.parallax').parallax();
    $('.tooltipped').tooltip({ delay: 50 });
    $('.dropdown-button').dropdown();
     $('.modal').modal();

  }); // end of document ready
})(jQuery); // end of jQuery name space