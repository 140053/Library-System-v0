



$(document).ready(function () {
  $('[data-widget="sidebar-search"]').SidebarSearch('search');


  if ($('.bs-stepper').length > 0) {
    var stepper = new Stepper($('.bs-stepper')[0])
    $(".next").on('click', function () {
      stepper.next();
    })
    $(".prev").on('click', function () {
      stepper.previous();
    })
  }





})

