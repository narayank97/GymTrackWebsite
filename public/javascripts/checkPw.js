function createCORSrequet(method,url){
    let xhr = new XMLHttpRequest();
    xhr.open(method,url,true);
    return xhr; 
}

function verifyPw(){
    let input = document.getElementById("myPassWord").value;
    let url = "/verify?attempt="+input;
    let xhr = createCORSrequet('GET',url);
    console.log("Clicked the button");

    if(!xhr){
        alert("CORS not supported!");
        return;
    }
    xhr.onload = function(){
        let responseString = xhr.responseText; // gets JSON string
        let object = JSON.parse(responseString);
        if(object.success){
            // after i enter pw sent to different page
            window.location.pathname = "/palindrome.html";
        }
    };

    xhr.onerror = function() {
        alert('Woops, there was an error making the request.');
    };

    xhr.send();
}