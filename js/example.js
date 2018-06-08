var thisPack = [];

function contains(string,cont){
    
    return string.indexOf(cont) !== -1;
}

var myApp = {
    vm : new Vue({
        el : "#app",
        data : {
            name : "Hello World!",
            results : [],
            commons : [],
            uncommons : [],
            rares : [],
            partners : [],
            round : 0,
            pickNum : 0,
            amountOfPacks : 0,
            imageLinks : [],
            activePack : [],
            packOne : [],
            packTwo : [],
            packThree : [],
            pickList : []
        },
        methods : {
            getSet: function (event) {
                axios.get("https://api.scryfall.com/cards/search?order=set&q=e%3Abbd&unique=prints").then(response => {
                //this.results.push(response.data.data)
                response.data.data.forEach(element => {
                    this.results.push(element);
                });
                axios.get("https://api.scryfall.com/cards/search?format=json&include_extras=false&order=set&page=2&q=e%3Abbd&unique=prints").then(response => {
                    response.data.data.forEach(element => {
                        this.results.push(element);
                    });
                    this.results.forEach(element => {             
                        if(element.rarity=='common'){
                            this.commons.push(element);
                        }else if(element.rarity=='uncommon'){
                            this.uncommons.push(element);
                        }else{
                            this.rares.push(element);
                        }
                    });
                    })
                })

            },
            getPacks : function (packs){
                console.log('Loading');
                var d = 0;
                // for(var i=0;i<10;i++){
                //     d++;
                //     console.log(d);
                //     //console.log(i);
                //     if(this.rares.length<65){i--;}
                //     // if(this.rares.length<65){i--;}
                //     // if(this.rares.length<65){i--;}
                // }
                thisPack.push(JSON.parse(JSON.stringify(this.rares[Math.floor(Math.random()*this.rares.length)].name)));
                thisPack.push(JSON.parse(JSON.stringify(this.uncommons[Math.floor(Math.random()*this.uncommons.length)].name)));
                thisPack.push(JSON.parse(JSON.stringify(this.uncommons[Math.floor(Math.random()*this.uncommons.length)].name)));
                thisPack.push(JSON.parse(JSON.stringify(this.uncommons[Math.floor(Math.random()*this.uncommons.length)].name)));
                thisPack.push(JSON.parse(JSON.stringify(this.commons[Math.floor(Math.random()*this.commons.length)].name)));
                thisPack.push(JSON.parse(JSON.stringify(this.commons[Math.floor(Math.random()*this.commons.length)].name)));
                thisPack.push(JSON.parse(JSON.stringify(this.commons[Math.floor(Math.random()*this.commons.length)].name)));
                thisPack.push(JSON.parse(JSON.stringify(this.commons[Math.floor(Math.random()*this.commons.length)].name)));
                thisPack.push(JSON.parse(JSON.stringify(this.commons[Math.floor(Math.random()*this.commons.length)].name)));
                thisPack.push(JSON.parse(JSON.stringify(this.commons[Math.floor(Math.random()*this.commons.length)].name)));
                thisPack.push(JSON.parse(JSON.stringify(this.commons[Math.floor(Math.random()*this.commons.length)].name)));
                thisPack.push(JSON.parse(JSON.stringify(this.commons[Math.floor(Math.random()*this.commons.length)].name)));
                thisPack.push(JSON.parse(JSON.stringify(this.commons[Math.floor(Math.random()*this.commons.length)].name)));
                thisPack.push(JSON.parse(JSON.stringify(this.commons[Math.floor(Math.random()*this.commons.length)].name)));
                //console.log(thisPack);
                if(this.packOne==''){
                    this.packOne.push(thisPack);
                    thisPack=[];
                    myApp.vm.getPacks();
                }else if(this.packTwo==''){
                    this.packTwo.push(thisPack);
                    thisPack=[];
                    myApp.vm.getPacks();
                }else{
                    this.packThree.push(thisPack);
                    thisPack=[];
                }
                this.amountOfPacks++;
                this.round=this.amountOfPacks/3;
                if(this.round==1){
                    this.pick();
                }
            },
            pick : function (event){
                if(this.pickNum==0){
                    this.activePack=this.packOne;
                    this.pickNum=1;
                    this.display();
                }
            },
            display : function(){
                var uris=[];
                var actPack =(JSON.parse(JSON.stringify(this.activePack)));
                this.imageLinks=[];
                //console.log(actPack[0]);
                for(i=0;i<actPack[0].length;i++){
                    actPack[0][i]=actPack[0][i].replace(" ","");
                }
                //console.log(actPack[0]);
                for(i=0;i<actPack[0].length;i++){
                    if(this.imageLinks.length===i){
                        console.log('beep');
                    }
                    axios.get("https://api.scryfall.com/cards/search?q="+actPack[0][i]+'&set=bbd').then(response => {
                        var cardWithImg={
                            "name":response.data.data["0"].name,
                            "Image":JSON.parse(JSON.stringify(response.data.data["0"].image_uris.png))
                        }
                        this.imageLinks.push(
                            //response.data.data["0"].name+'%%%'+JSON.parse(JSON.stringify(response.data.data["0"].image_uris.png))
                            cardWithImg
                        );
                        //console.log(response.data.data["0"]);
                    })
                }
            },
            pickThis : function (event){
                event.preventDefault();
                console.log(event.path[1].id);
                var target=event.path[1].id;
                var selected=document.getElementById(target);
                console.log(selected);
                selected.style.display='none';
                // var target=event.path[1].id;
                // selected=document.querySelectorAll('.pickThisButton')[target];
                // //console.log(selected);
                // selected.style.display='none';
                // console.log(this.activePack[0][target]);
                this.pickList.push(target);
                this.pickNum++;
            }
        }
    })
}

myApp.vm.getSet();
//myApp.vm.getPacks();

//non-vue variable declaration
var startButton=document.getElementById('startButton');

function hideThis(){
    //console.log('beep');
}

startButton.addEventListener('click',hideThis,false);