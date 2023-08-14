
$(document).ready(function () {

    const formattedDate = getCurrentFormattedDate();
    var dhold = document.getElementById('dholder');
    if(dhold !== null){
        dhold.innerText = formattedDate;
    }



    //check if library login system is set 
    if (isCookieInitialized('Library') & isCookieInitialized('Section')) {
        console.log('Library cookie is initialized.');
    } else {
        console.log('Library cookie is not initialized.');
        alert('Library is not setup in this computer');
        window.location.href = '/lsystem/setup';
    }
})