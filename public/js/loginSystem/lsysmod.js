
$(document).ready(function () {

    function getFormattedDate() {
        const currentDate = new Date();
      
        const options = {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: true
        };
      
        const formattedDate = currentDate.toLocaleString('en-US', options);
        return formattedDate;
    }

    function setdate() {
        const formattedDate = getCurrentFormattedDate();
        var dhold = document.getElementById('dholder');
        if (dhold !== null) {
            dhold.innerText = formattedDate;
        }
    }

    function updateDatePeriodically() {
        setdate();
    }

    setdate(); // Initial call to set the date

    setInterval(updateDatePeriodically, 1000); // Call setdate() every 1000ms




    //check if library login system is set 
    if (isCookieInitialized('Library') & isCookieInitialized('Section')) {
        console.log('Library cookie is initialized.');
        var library = getCookie('Library');
        var Section = getCookie('Section');

        $('#chold').empty().text(library);
        $('#lib').empty().val(library);
        $('#sec').empty().val(Section);
        $('#floor').empty().text(Section);
       

    } else {
        console.log('Library cookie is not initialized.');
        alert('Library is not setup in this computer');
        window.location.href = '/lsystem/setup';
    }

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
            type: "POST", // or "GET" depending on your form method
            url: "/lsystem/mod",
            data: $(this).serialize(), // Serialize form data
            success: function (response) {
                // Handle the success response from the server
                //console.log("Form submitted successfully:", response);
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
                    $("#playButton").trigger("click");

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
                    $("#playButton2").trigger("click");
                }
                
            },
            error: function (error) {
                // Handle errors here
                console.error("Error submitting form:", error);
            }
        });

    })

    var x = $("#myAudio")[0]; // Get the DOM element for the audio

    $("#playButton").click(function() {
      x.play();
    });
  
    $("#pauseButton").click(function() {
      x.pause();
    });


    var x2 = $("#myAudio2")[0]; // Get the DOM element for the audio

    $("#playButton2").click(function() {
      x2.play();
    });






})