$(document).ready(function(){
    $("#example").DataTable();

    $('#smartadd').on('click', function(){
        if($("#madd").hasClass("collapsed-card") == true && $("#sadd").hasClass("collapsed-card") == true){
            $('#smartadd').trigger('click');
        }else{
            //if($("#sadd").hasClass("collapsed-card") == true){
                $('#manualadd').trigger('click');
           // }
        }
       
    })

    $('#manualadd').on('click', function(){
        if($("#sadd").hasClass("collapsed-card") == false){
            $('#smartadd').trigger('click');
        }
    })

    
});
