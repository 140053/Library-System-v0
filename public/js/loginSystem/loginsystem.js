function getCurrentFormattedDate() {
    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
    };

    const formattedDate = new Intl.DateTimeFormat('en-PH', options).format(new Date());

    return formattedDate;
}



////++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Function to set a cookie
function setCookie(name, value, days) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);

    const cookieValue = encodeURIComponent(value) + (days ? `; expires=${expirationDate.toUTCString()}` : '');
    document.cookie = `${name}=${cookieValue}; path=/`;
}

// Function to get the value of a cookie
function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null; // Cookie not found
}

// Function to clear a cookie
function clearCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

// Function to check if a cookie is initialized (both set and has a value)
function isCookieInitialized(name) {
    const cookieValue = getCookie(name);
    return cookieValue !== null && cookieValue !== '';
}


//validate setup login page
function validateInput(inputElement) {
    const inputValue = inputElement.value.trim();
  
    // Regular expression to match only numbers
    const regex = /^[0-9]*$/;
  
    if (regex.test(inputValue)) {
      document.getElementById("errorSpan").textContent = "";
    } else {
      document.getElementById("errorSpan").textContent = "Please enter a valid number.";
    }
  }
  



// Usage example
//setCookie('Library', 'Pili', 1);

// Usage example
/*
const username = getCookie('username');
if (username) {
  console.log(`Welcome back, ${username}!`);
} else {
  console.log('Cookie not found or expired.');
}


// Usage example
clearCookie('Library'); // This clears the cookie named "username"

// Usage example
if (isCookieInitialized('Library')) {
    console.log('Library cookie is initialized.');
} else {
    console.log('Library cookie is not initialized.');
}
*/



////////////////////////////////////////////////////////////////////////////////////




$(document).ready(function () {

   
    $('#customSwitch1').on('click', function () {
        var ind = $('#slabel').text();
        var body = $('#body');
        //alert(ind.t);

        if (ind == 'Light') {
            $('#body').addClass('dark-mode');
            $('#slabel').text('Dark');
        }

        if (ind == 'Dark') {
            body.removeClass('dark-mode');
            $('#slabel').empty().text('Light')
        }

    })
});