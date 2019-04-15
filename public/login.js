$(document).ready(function () {
    $('#userSignin').click(function(){
        userLogin();
    });
    $('#userCreate').click(function(){
        createUser();
    });
	$('#guestSignin').click(function(){
        document.cookie = "id=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
		document.cookie = "username=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    });
	$('#ghostSignin').click(function(){
        document.cookie = "id=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
		document.cookie = "username=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    });
});


function userLogin(){
    let logininfo ={
        userID:$('#loginUsername').val(),
        userPassword:$('#loginPassword').val()
    };
    let req = $.post('/login',logininfo);

    req.then(function(data){
		if (data.length < 1){
			$("#no-user-err").show();
		}
		else{
			document.cookie = "username="+data[0].username;
			document.cookie = "id="+data[0].id;
			window.location.replace("/lobby.html");
		}
    });
    req.fail(function () {
       console.log("failed");
    });
}

function createUser(){
    let createUser ={
        userEmail: $('#userEmail').val(),
        userID: $('#signupUsername').val(),
        userPassword:$('#signupPassword').val()
    };
    let req = $.post('/createUser',createUser);
    req.then(function(data){
        if(data === "Duplicate entry"){
			$("#dup-user-err").show();
		}
		else{
			alert("Registration successful!")
		}
    });
    req.fail(function () {
        console.log("failed");
    });
}