# coldAjax.js

A customized AJAX caller that is flexible and lightweight. Trying to create an environment for simple XML requests.

# How To:
Set up a function to process the request's data. Example:

>function bing(data){
>    console.log(data);
>}

Then, call the coldAjax request and feed it the function, method, and url like so:

>coldAjax('GET','php/returnOne.php',bing);
