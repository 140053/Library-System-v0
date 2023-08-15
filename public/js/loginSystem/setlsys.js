$(document).ready(function(){    

    if ($('#daysInput').length > 0) {
        $('#daysInput').on('keyup', function () {
            validateInput(this)
        })
    }

    $('#setupsave').on('click', function () {
        var lib = ($('#slib').val() !== "") ? $('#slib').val() : null;
        var sec = ($('#sSec').val() !== "") ? $('#sSec').val() : null;
        var day = ($('#daysInput').val() !== "") ? $('#daysInput').val() : null;

        if(lib !== null & sec !== null & day !== null){
            setCookie('Library', lib, day);
            setCookie('Section', sec, day);
            alert('Done!');
            window.location.href = '/lsystem';
        }

        
    })
})