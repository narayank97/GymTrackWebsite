function createCORSrequet(method,url){
    let xhr = new XMLHttpRequest();
    xhr.open(method,url,true);
    return xhr; 
}

function makeCORSrequest(){
    
    let input = document.getElementById("myWord").value;
    let url = "/palindrome?word="+input;
    let xhr = createCORSrequet('GET',url);

    //checks to see if browser does cors
    if(!xhr){
        alert("CORS not supported!");
        return;
    }
    //if it does load this function
    xhr.onload = function(){
        let responseString = xhr.responseText; // gets JSON string
        let object = JSON.parse(responseString);
        let palindromeRes = JSON.stringify(object.Palindrome,undefined,2).slice(1, -1);
        console.log(typeof palindromeRes);
        document.getElementById("palindrome").innerHTML = palindromeRes;

    };

    xhr.onerror = function() {
        alert('Woops, there was an error making the request.');
    };

    xhr.send();
}

function myFunction(){
    console.log("Clicked the button");
}