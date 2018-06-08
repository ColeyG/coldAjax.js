(()=>{
    var subReal = document.getElementById('submitReal');
    var sublistId=document.getElementById('subId').value;

    function processYoutube(data){
        console.log(data);
        var submission=[];
        submission.push('fullSubmitYT');
        submission.push(data['title']);
        submission.push(data['author_name']);
        submission.push(data['thumbnail_url']);
        var id=data['thumbnail_url'].split("vi/");
        id=id[1].split("/");
        id=id[0];
        submission.push(id);
        //console.log(submission);
        //console.log(id);
        submitTrack('fullSubmit',submission);
    }

    function submitTrack(someParams,submission){
        var url = document.getElementById('url').value,data="",conType="";
        //console.log(url);
        if(someParams=='fullSubmit'){url=submission}

        const httpRequest = new XMLHttpRequest();

        function loading(){
            if(!httpRequest){
                alert('Request Failed!');
            }

            httpRequest.onreadystatechange = processRequest;
            console.log(url);
            if(url.includes('youtube')){
                httpRequest.open("GET",'phpscripts/youtubeGet.php?url='+url,true);
                conType="youtube";
                httpRequest.send();
            }else if(url[0]=='fullSubmitYT'){
                httpRequest.open("GET",'phpscripts/youtubeSend.php?title='+url[1]+'&auth='+url[2]+'&image='+url[3]+'&contId='+url[4]+'&subId='+sublistId,true);
                conType="return";
                httpRequest.send();
            }else{
                console.log('Failed to find file format.');
            }
        }

        function processRequest(){
            if(httpRequest.readyState == XMLHttpRequest.DONE){
                if(httpRequest.status === 200){
                    console.log(httpRequest.responseText);
                    let data = JSON.parse(httpRequest.responseText);
                    if(conType=="youtube"){
                        processYoutube(data);
                    }else if(conType=="return"){
                        console.log(data);
                    }
                }else{
                    console.log('fail');
                }
            }
        }

        loading();
    }

    subReal.addEventListener("click",submitTrack,false);
})();