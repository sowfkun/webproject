module.exports.check = function(key){

    if(typeof key == "number") return "number";

    if( key.toLowerCase().indexOf("select") !== -1      ||
        key.toLowerCase().indexOf("drop")   !== -1      ||
        key.toLowerCase().indexOf("delete") !== -1      ||
        key.toLowerCase().indexOf("alter")  !== -1      ||
        key.toLowerCase().indexOf("or")     !== -1      ||
        key.toLowerCase().indexOf("union")  !== -1      ||
        key.toLowerCase().indexOf("insert") !== -1      ||
        key.toLowerCase().indexOf("update") !== -1      ||
        key.toLowerCase().indexOf(";")      !== -1      ||
        key.toLowerCase().indexOf("excute") !== -1      ||
        key.toLowerCase().indexOf("create") !== -1      ||
        key.toLowerCase().indexOf("grant")  !== -1      ||
        key.toLowerCase().indexOf("cursor") !== -1      
    ){
        return true
    } else {
        return key.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }


};