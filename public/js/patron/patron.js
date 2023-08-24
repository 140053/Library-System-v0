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



    //manual add patron 

     //submit form
     $("#idnum").keypress(function (event) {
        if (event.which === 13) { // 13 corresponds to the Enter key
            event.preventDefault();
            $("#attForm").submit();
        }
        if( $('#sts').hasClass('d-none') == false){
            $('#sts').addClass('d-none')
        }  
    });
  


    $('#attForm').submit(function (event) {
        event.preventDefault();

        $.ajax({
            type: "post", // or "GET" depending on your form method
            url: "/patron/add",
            data: $(this).serialize(), // Serialize form data
            success: function (response) {
                // Handle the success response from the server
                console.log("Form submitted successfully:", response);
                /*
                if(response.status == true){
                    $('#sts').removeClass().addClass('alert alert-success').text('Login Successfull');
                    $("#idnum").empty().val('');

                    $('#name').empty().text(response.data.name)
                    $('#IDnum').empty().text(response.data.IDnum)
                    $('#User_Class').empty().text(response.data.User_Class)
                    $('#Degree_Course').empty().text(response.data.Degree_Course)
                    $('#mode').empty().text(response.rdata.mode.toUpperCase())
                    $('#reg_date').empty().text(getFormattedDate())
                    $('#Section').empty().text(getCookie('Section'));

                }
                if(response.status == false){
                    $('#sts').removeClass().addClass('alert alert-danger').text('ID number Not found!!');
                    $('#name').empty().text("-")
                    $("#idnum").empty().val('');
                    $('#IDnum').empty().text("-")
                    $('#User_Class').empty().text("-")
                    $('#Degree_Course').empty().text("-")
                    $('#reg_date').empty().text("-")
                    $('#Section').empty().text("-");
                }
                */
                
            },
            error: function (error) {
                // Handle errors here
                console.error("Error submitting form:", error);
            }
        });

    })




    
});
