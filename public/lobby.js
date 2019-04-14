$(document).ready(function () {
    $('#create').click(function(){
        createLobby();
    });
    $('#join').click(function(){
        joinLobby();
    });
});

function createLobby(){
    // Create random lobby id (may need to change if lobbyname is too long)
    let uniqueID;
    let req1 = $.get('/createID');
    req1.then(function(data){
        console.log(data);
        uniqueID = data;
    });
    var bob = document.getElementById("lobbyID");
    console.log(uniqueID);
    bob.innerHTML(uniqueID);
    //$("#lobbyID").innerText(uniqueID);
    let lobbyinfo ={
        lobbyID: uniqueID,
        lobbyPassword:$('#create-lobby-password').val()
    };
    let req = $.post('/createLobby', lobbyinfo);
    req.then(function(data){
        pass;
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