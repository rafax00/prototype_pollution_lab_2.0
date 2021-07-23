var pages = {
    'home': '<h2 style="text-align: center">Bem vindo ao meu mundo SiDier!</h2><br><h3 style="text-align: center">< SiDivirta /></h3><br><h3 style="text-align: center">< SiDiscubra /></h3><br><h3 style="text-align: center">< SiDedique /></h3>',
    'contact': '<h2 style="text-align: center;">Ola, eu sou o SiDiney!<br><br><br></h2><p><b>E-mail: sidney.sidi@sidi.org.br</b></p>',
    'company': '<h2 style="text-align: center">Olhe meu site favorito!</h2><br><div class="centerDiv"><iframe style="width:100%;height:80%" src="https://sidi.org.br"><iframe></div>',
    'benefits': '<h2 style="text-align: center;">Aqui posso hackear sem ser preso!</h2><br><br><img src="https://i.redd.it/kki8b8j4k1gz.gif">'
}

function init(){
    var urlSearchParams = new URLSearchParams(window.location.search);
    var params = Object.fromEntries(urlSearchParams.entries());
    setCookies(params);
    loadFooter();
    load(params);
}

function handleError(error){
    var err = {"error":error};
    sendLogError(err);
    console.log(error);
}

function loadFooter(){
    /*
      TODO - Finish Footer
    */
    try{
        document.getElementById("footer").innerHTML = "SIDI";
    }catch(err){
      handleError(err);
    }
}

function getPageContent(page){
    try{
        document.getElementById("content").innerHTML = pages[page].toString();
    }catch(err){
      handleError(err);
    }
}

function load(params){
    try{
        if (params["page"] != undefined){
            getPageContent(params["page"]);
        }else{
            var urlSearchParams = new URLSearchParams(window.location.search);
            urlSearchParams.set("page", "home");
            window.location.search = urlSearchParams;
        }
    }catch(err){
      handleError(err);
    }
}

function setCookies(params){
    try{
        if (params["userId"] != undefined){
            document.cookie = "userId=" + params["userId"] + ";";
        }else{
            document.cookie = "userId=Guest";
        }
    }catch(err){
      handleError(err);
    }
}

function append(obj1, obj2) {
    try{
        for(var key in obj2) {
            if(typeof(obj1[key]) === "object" && typeof(obj2[key]) === "object") {
                append(obj1[key], obj2[key]);
            } else {
                obj1[key] = obj2[key];
            }
        }
        return obj1;
    }catch(err){
      handleError(err);
    }
};


function collectErrorLogs(error){
    var trackUserCookie = JSON.parse('{"userId": "' + document.cookie.split(";")[0].split("=")[1] + '"}');    
    var logs = append(error, trackUserCookie);

    return logs;
}

function makeRequest(url){
    try{
        var req = new XMLHttpRequest();
        req.open("GET", url, false);
        req.send();
    }catch(err){
      handleError(err);
    }
}

function sendLogError(error){
    logs = collectErrorLogs(error);
    var url = "https://logs.collect-everything.com/?log=" + encodeURI(logs);
    /* TODO - Implement send log to server
    makeRequest(url);
    */
}

init();
