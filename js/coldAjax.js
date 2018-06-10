function coldAjax(coldAjaxMethod,coldAjaxUrl,coldAjaxProcessor){

    const coldHttpRequest = new XMLHttpRequest();

    function loading(){
        if(!coldHttpRequest){
            alert('Request Failed!');
        }
        coldHttpRequest.onreadystatechange = processRequest;
        coldHttpRequest.open(coldAjaxMethod,coldAjaxUrl,true);
        coldHttpRequest.send();
    }

    function processRequest(){
        if(coldHttpRequest.readyState == XMLHttpRequest.DONE){
            if(coldHttpRequest.status === 200){
                let data = coldHttpRequest.responseText;
                let resp = data;
                coldAjaxProcessor(data);
            }else{
                let resp = "Failed Request!";
                coldAjaxProcessor(resp);
            }
        }
    }

    loading();
}
