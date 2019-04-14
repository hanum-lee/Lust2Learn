$(document).ready(function () {
    $('#userSignin').click(function(){
        userLogin();
    });
    $('#userCreate').click(function(){
        createUser();
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
			window.location.replace("/?id="+data[0].id);
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
    });
    req.fail(function () {
        console.log("failed");
    });
}