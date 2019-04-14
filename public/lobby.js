import { PassThrough } from "stream";

$(document).ready(function () {
    $('#create-lobby').click(function(){
        createLobby();
    });
    $('#join-lobby').click(function(){
        joinLobby();
    });
});

function createLobby(){
    let lobbyinfo ={
        lobbyID:$('#create-lobby-name').val(),
        lobbyPassword:$('#create-lobby-password').val()
    };
    let req = $.post('/createLobby', lobbyinfo);
    req.then(function(data){
        if(data === "Duplicate entry"){
            $("#dup-lobby-err").show();
        }
    });
    req.fail(function() {
        console.log("failed");
    });

}

function joinLobby(){
    let lobbyinfo ={
        lobbyID:$('#join-lobby-name').val(),
        lobbyPassword:$('#join-lobby-password').val()
    };
    let req = $.post('/joinLobby', lobbyinfo);
    req.then(function(data){
        if(data === "Not exists"){
            $('#no-lobby-error').show();
        }
    });
    req.fail(function() {
        console.log("failed");
    });
}