function Showlender(){
    $('#lendermodal').modal('show');
}

$('#idin').on('keyup', function (){
    var bal = $('#idin').val()
    if (bal.toUpperCase().match("GM")){
        $('#typeid').val('bgame')
    }
    if (bal.toUpperCase().match("SL")){
        $('#typeid').val('bgame')
    }
    if (bal.toUpperCase().match("CH")){
        $('#typeid').val('bgame')
    }
    if (bal.toUpperCase().match("SC")){
        $('#typeid').val('bgame')
    }

    if (bal.toUpperCase().match("-")){
        $('#typeid').val('SID')
    }

    if (bal.toUpperCase().match("LK")){
        $('#typeid').val('LK')
    }

})









function lenderReturn(id,bgame, equip, rooom){
    alert('return')
    $.post("/api/returnlender",{
        IDnum: id,
        Barcode: bgame,
        equipment: equip,
        room:rooom
    }, function(data, status){
        console.log(data)
        window.location.href = '/lenderV2';
    })

}


