angular.module('app', [])
.controller('testCtrl', function($scope) {
    this.hiduke = new Date();
    this.year = this.hiduke.getFullYear();
    this.month = this.hiduke.getMonth()+1;
    this.day = this.hiduke.getDate();
    this.ed = 0;
    this.ppp = 0;
    this.state = "Today";
    this.mapShots = ["－","◯","✕"];
    this.mapPlaces = ["－","↑","↗","→","↘","↓","↙","←","↖"];
    if(localStorage.getItem("bstore") == null){
        localStorage.setItem("bstore", "[]");
    }
    this.scores = [
        {"kind":"tati", "order":"1st", "date":"2016.02.27", "Shots":[1,2,0,0], "Places":[2,3,6,4]}
    ];
    this.scores = JSON.parse(localStorage.getItem("bstore"));
    this.dateInit = function(){
        $scope.newDate=this.year+"." + this.month+"." + this.day;
    }
    this.addNewScore = function(){
        if(this.ed == 0){
            this.scores.unshift({"kind":$scope.newStyle, "order":$scope.newOrder, "date":$scope.newDate, "Shots":indexH,  "Places":indexP, "memo":$scope.newMemo});
            this.Initialize();
            localStorage.setItem("bstore", JSON.stringify(this.scores));
            this.rateReflesh();
            closeForm();
        } else if(this.ed == 1){
            this.scores.splice(this.ppp,1);
            this.scores.splice(this.ppp,0,{"kind":$scope.newStyle, "order":$scope.newOrder, "date":$scope.newDate, "Shots":indexH,  "Places":indexP, "memo":$scope.newMemo});
            this.Initialize();
            localStorage.setItem("bstore", JSON.stringify(this.scores));
            this.rateReflesh();
        }
    }
    this.Initialize = function(){
        $scope.newStyle = '';
        $scope.newOrder = '';
        $scope.newDate = '';
        $scope.newMemo = '';
        $("#1Hit").text(hits[0]);
        $("#2Hit").text(hits[0]);
        $("#3Hit").text(hits[0]);
        $("#4Hit").text(hits[0]);
        $("#1Place").text(arrows[0]);
        $("#2Place").text(arrows[0]);
        $("#3Place").text(arrows[0]);
        $("#4Place").text(arrows[0]);
        indexH = [0,0,0,0]
        indexP = [0,0,0,0]
        this.ppp = 0;
        this.pp = 0;
        this.ed = 0;
        this.hitPoint = 0;
        this.shotPoint = 0;
    }
    this.import = function(){
       this.scores = JSON.parse($scope.import);
    localStorage.setItem("bstore",$scope.import);
       closePort();
       $scope.import = "";
   }
    this.export = function(){
       $scope.export = JSON.stringify(this.scores);
   }
    this.cp = function(){
       $scope.import = "";
       $scope.export = "";
   }
    this.rateReflesh = function(){
        this.hitPoint = 0;
        this.shotPoint = 0;
        switch(this.state){
            case "Today":
                for(var i =0, len = this.scores.length; i < len; i++){
                    if(this.scores[i].date == this.year+"."+this.month+"."+this.day){
                        var arr = this.scores[i].Shots;
                        for(var n = 0; n < 3; n++){
                            if(arr[n] == 1){
                                this.hitPoint ++;
                                this.shotPoint ++;
                            } else if(arr[n] == 2){
                                this.shotPoint ++;
                            }
                        }
                    }
                }
            break;
            case "Tachi":
                for(var i =0, len = this.scores.length; i < len; i++){
                    if(this.scores[i].kind == "tati"){
                        var arr = this.scores[i].Shots;
                        for(var n = 0; n < 3; n++){
                            if(arr[n] == 1){
                                this.hitPoint ++;
                                this.shotPoint ++;
                            } else if(arr[n] == 2){
                                this.shotPoint ++;
                            }
                        }
                    }
                }
            break;
                case "Practice":
                for(var i =0, len = this.scores.length; i < len; i++){
                    if(this.scores[i].kind == "rensyu"){
                        var arr = this.scores[i].Shots;
                        for(var n = 0; n < 3; n++){
                            if(arr[n] == 1){
                                this.hitPoint ++;
                                this.shotPoint ++;
                            } else if(arr[n] == 2){
                                this.shotPoint ++;
                            }
                        }
                    }
                }
            break;
            default:
                for(var i =0, len = this.scores.length; i < len; i++){
                        var arr = this.scores[i].Shots;
                        for(var n = 0; n < 3; n++){
                            if(arr[n] == 1){
                                this.hitPoint ++;
                                this.shotPoint ++;
                            } else if(arr[n] == 2){
                                this.shotPoint ++;
                            }
                        }
                }
            break; 
        }
        this.ratio = Math.round(this.hitPoint / this.shotPoint * 10000) / 100;
        console.log(this.hitPoint);
        console.log(this.shotPoint);
    localStorage.setItem("bstore", JSON.stringify(this.scores));
    }
    this.Sorts = function(e){
        this.state = e;
    }
    this.sort = function(e){
        if(this.state == "Today"){
            if(e.date == this.year+"."+this.month+"."+this.day){
                return true;
            }
        } else if(this.state == "Tachi"){
            if(e.kind == "tati"){
                return true;
            }
        } else if(this.state == "Practice"){
            if(e.kind == "rensyu"){
                return true;
            }
        } else{
            return true;
        }
    }
    this.del = function(f){
        if(window.confirm('本当に削除しますか？')){
            this.scores.splice(f,1)
        }
    }
    this.edit = function(o,n){
        this.ed = 1;
        this.ppp = n;
        $scope.newStyle = o.kind;
        $scope.newOrder = o.order;
        $scope.newDate = o.date;
        $scope.newMemo = o.memo;
        indexH = o.Shots.map(function(x){return x - 1;});
        indexP = o.Places.map(function(x){return x - 1;});
        changeHit("#1Hit",0);
        changeHit("#2Hit",1);
        changeHit("#3Hit",2);
        changeHit("#4Hit",3);
        changePlace("#1Place",0);
        changePlace("#2Place",1);
        changePlace("#3Place",2);
        changePlace("#4Place",3);
        openForm();
    }
    this.rateReflesh();
})

window.addEventListener("load", function() {
    setTimeout(function() {
        scrollTo(0, 1);
    }, 100);
}, false);
var hits = ["－","◯","✕"];
var indexH = [0,0,0,0];
function changeHit(tag, n){
    indexH[n] ++;
    var e = indexH[n] % 3;
    $(tag).text(hits[e]);
}
var arrows = ["－","↑","↗","→","↘","↓","↙","←","↖"];
var indexP = [0,0,0,0];
function changePlace(tag, n){
    indexP[n] ++;
    var e = indexP[n] % 9;
    $(tag).text(arrows[e]);
}
function openForm(){
    $("#form").css('display', 'block').animate({
        top: 0 
        }, 300 );
}
function closeForm(){
    $("#form").animate({
        top: 1920 
        }, 500 );
    setTimeout( function(){
    $("#form").css('display', 'none');
       },500);
}
function openPort(){
    $("#port").css('display', 'block').animate({
        top: 0 
        }, 300 );
}
function closePort(){
    $("#port").animate({
        top: 1920 
        }, 500 );
    setTimeout( function(){
    $("#port").css('display', 'none');
       },500);
}
var menu = 0;
function openMenu(){
    if(menu % 2 == 0){
        $("#today").animate({
    top:"-=3em"
}, 100);
    $("#tachi").delay(50).animate({
    top:"-=1.5em",
    right:"+=3em"
}, 100);
    $("#practice").delay(100).animate({
    top:"+=1.5em",
    right:"+=3em"
}, 100);
    $("#all").delay(150).animate({
    top:"+=3em"
}, 100);
        menu += 1;
    } else{
        $("#today").animate({
    top:"+=3em"
}, 100);
    $("#tachi").delay(50).animate({
    top:"+=1.5em",
    right:"-=3em"
}, 100);
    $("#practice").delay(100).animate({
    top:"-=1.5em",
    right:"-=3em"
}, 100);
    $("#all").delay(150).animate({
    top:"-=3em"
}, 100);
        menu += 1;
    }
}
