$(document).ready(function () {
    var url_string = window.location.href;
	var url = new URL(url_string);
	var id = url.searchParams.get("id");

	var idCookie = getCookie("id");
	var userCookie = getCookie("username");

	if(idCookie && idCookie !== "" && (!id || id === "")){
		window.location.replace("/?id="+idCookie);
	}

	if((id === "" || id === null) && !idCookie){
		window.location.replace("/login.html");
	}

	if(userCookie && userCookie !== ""){
		$("#user").text(userCookie);
	}
	else{
		$("#user").text("GUEST");
	}

	$("#logout").click(function(){
		window.location.replace("/login.html");
		document.cookie = "id=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
		document.cookie = "username=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
	});

	$('#change-username').click(function(){
        usernameChange();
    });
    $('#change-password').click(function(){
        passwordChange();
    });
});

function usernameChange(){
    let userinfo ={
		id: getCookie("id"),
        username:$('#newUsername').val(),
        userPassword:$('#password').val(),
    };
    let req = $.post('/updateUsername',userinfo);

    req.then(function(data){
		if(data.affectedRows < 1 || data === "Duplicate entry"){
			$("#user-change-err").show();
		}
		else{
			document.cookie = "username="+$('#newUsername').val();
			alert("Username change successful!");
		}
    });
    req.fail(function () {
       console.log("failed");
    });
}

function passwordChange(){
    let userinfo ={
		id: getCookie("id"),
        oldPass: $('#oldPassword').val(),
        newPass: $('#newPassword').val()
    };
    let req = $.post('/updatePassword',userinfo);
    req.then(function(data){
		if(data.affectedRows < 1){
			$("#pass-change-err").show();
		}
		alert("Password change successful!");
    });
    req.fail(function () {
        console.log("failed");
    });
}

function getCookie(field) {
	var name = field + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var cookies = decodedCookie.split(';');
	for(var i = 0; i <cookies.length; i++) {
	var c = cookies[i];
	while (c.charAt(0) == ' ') {
		c = c.substring(1);
	}
	if (c.indexOf(name) == 0) {
		return c.substring(name.length, c.length);
	}
	}
	return "";
}