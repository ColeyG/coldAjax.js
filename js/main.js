/*Building the AJAX call*/

/*Destructuring function requires a data parameter*/
function logger(data){
    console.log(data);
}

function loggerTwo(data){
    let dJson = JSON.parse(data);
    console.log(dJson);
}

/*Call with parameters, METHOD, URL, DESTRUCTURING FUNCTION*/
coldAjax("GET",'php/returnOne.php',logger);

coldAjax("GET",'php/returnTwo.php',loggerTwo);