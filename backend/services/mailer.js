const mongoose = require("mongoose");
const sendgrid = require("sendgrid")("alphaDev","Moqe12zifi!")

module.exports.sendEmailer = function(){

    sendgrid.send({
        to:"aashiq@appsfly.io",
        from:"aashiq.alphaDevs@gmail.com",
        subject:"sample",
        text:"Sample email "
    },function*(err,json){
        if(err) {
            return console.log("err");
        }
        return console.log("hello")
    });



}





