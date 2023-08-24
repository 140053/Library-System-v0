function changeBgamesType(){
  var bal = $('#dgid').val()
  if (bal.toUpperCase().match("GM")){
      $('#bgamestype').val('gog')
      $('#basic-addon2').empty().text("GOG ID")
  }
  if (bal.toUpperCase().match("SL")){
      $('#bgamestype').val('snakeandlader')
      $('#basic-addon2').empty().text("SL ID")
  }
  if (bal.toUpperCase().match("CH")){
      $('#bgamestype').val('chess')
      $('#basic-addon2').empty().text("Chess ID")
  }
  if (bal.toUpperCase().match("SC")){
      $('#bgamestype').val('scrabble')
  }
  if (bal.toUpperCase().match("COM")){
    $('#bgamestype').val('computer')
    $('#basic-addon2').empty().text("Computer ID")
}     

}


$(function() {
  $('#lendermodal').modal('show');
  $('.modal').on('shown.bs.modal', function() {
    $(this).find('[autofocus]').focus();
  });


  $('.binput').on("keyup", function(){
    changeBgamesType()
  })
});

