function coldAjax(coldAjaxUrl,process){

    const httpRequest = new XMLHttpRequest();

    function loading(){
        if(!httpRequest){
            alert('Request Failed!');
        }
        httpRequest.onreadystatechange = processRequest;
        httpRequest.open("GET",coldAjaxUrl,true);
        httpRequest.send();
    }

    function processRequest(){
        if(httpRequest.readyState == XMLHttpRequest.DONE){
            if(httpRequest.status === 200){
                var data = JSON.parse(httpRequest.responseText);
                var resp = data;
                process(data);
            }else{
                var resp = "Failed Request!";
                process(resp);
            }
        }
    }

    loading();
}

function bing(data){
    console.log(data);
}

coldAjax('php/returnOne.php',bing);