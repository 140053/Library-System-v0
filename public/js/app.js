$(document).ready(function(){
    $('[data-widget="sidebar-search"]').SidebarSearch('search');

    var stepper = new Stepper($('.bs-stepper')[0])

    $(".next").on('click', function(){
      stepper.next();
    })
})

