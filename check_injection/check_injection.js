module.exports.checksql_html = function(content){

    if(content == "" || content == "[]") {
        console.log(null);
        return true;                                         // rỗng thì return false
    }

    if( content.toLowerCase().indexOf("select") !== -1      ||
        content.toLowerCase().indexOf("drop")   !== -1      ||
        content.toLowerCase().indexOf("delete") !== -1      ||
        content.toLowerCase().indexOf("alter")  !== -1      ||
        content.toLowerCase().indexOf("union")  !== -1      ||
        content.toLowerCase().indexOf("insert") !== -1      ||
        content.toLowerCase().indexOf("update") !== -1      ||
        content.toLowerCase().indexOf("excute") !== -1      ||
        content.toLowerCase().indexOf("create") !== -1      ||
        content.toLowerCase().indexOf("grant")  !== -1      ||
        content.toLowerCase().indexOf("cursor") !== -1      
    ){
        console.log("injection");       
        return true                 // return true nếu phát hiên injection
    } else {
        console.log("non injection"); 
        return content.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
};

module.exports.checkphone = function(phone){

    if(phone == "") {
        console.log(null);
        return true;         // rỗng thì return true
    }
    var phone_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;

    if(phone_regex.test(phone) == false){       //không đúng định dạng => injection = true
        console.log("injection");    
        return true;
    } else {
        console.log("non injection"); 
        return phone;                //không phát hiện injection
    }
};


module.exports.checkemail = function(email){

    if(email == "") {
        console.log(null);
        return true;         // rỗng thì return true
    }
    const mail_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(mail_regex.test(email) == false){       //không đúng định dạng => injection = true
        console.log("injection");    
        return true;
    } else {
        console.log("non injection");    
        return email;                //không phát hiện injection
    }
};

