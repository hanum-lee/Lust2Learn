$(document).ready(function () {
    $('#create').click(function(){
        createID();
    });
    $('#create-lobby').click(function(){
        createLobby();
    })
    $('#join-lobby').click(function(){
        joinLobby();
    });
});

let uniqueID;

function createID(){
    // Create random lobby id (may need to change if lobbyname is too long)
    let req1 = $.get('/createID');
    req1.then(function(data){
        uniqueID = data;
        $("#lobbyID").html(uniqueID);
    });
}

function createLobby(){
    let lobbyinfo ={
        lobbyID: uniqueID,
        lobbyPassword:$('#create-lobby-password').val()
    };

    let req = $.post('/createLobby', lobbyinfo);
    req.then(function(data){
        window.location.replace("/?id="+uniqueID);
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
        if(data.length < 1){
            $('#no-lobby-err').show();
        }
		else{
			window.location.replace("/?id="+data[0].id);
		}
    });
    req.fail(function() {
        console.log("failed");
    });
}