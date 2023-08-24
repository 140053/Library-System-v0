
function showDmodal(){
    $('#modal-default').modal('show');
}

$(document).ready(function(){
    var Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
    });
    Toast.fire({
        icon: 'success',
        title: 'Welcome'
    })


    $('#addItem').on("click", function(){       
        $('#modal-default').modal('show');
        $('#itype').empty().val('boardgames');        
    })

    $('#addItem1').on("click", function(){       
        $('#modal-default').modal('show');
        $('#itype').empty().val('computer');        
    })

    $('#addItem2').on("click", function(){       
        $('#modal-default').modal('show');
        $('#itype').empty().val('key');        
    })

    $('#addItem3').on("click", function(){       
        $('#modal-default').modal('show');
        $('#itype').empty().val('equipment');        
    })

    $('.adel0').on('click', function(){
        Toast.fire({
            icon: 'danger',
            title: 'About to delete'
        })
    })





});