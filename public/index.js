$(document).ready(function () {

	var id = getID();

	var idCookie = getCookie("id");
	var userCookie = getCookie("username");

	if(idCookie && idCookie !== ""){

		if(!id || id === ""){
			window.location.replace("/?id="+idCookie);
		}

	}
	else{
		//$("#save").hide();
		$("#logout").hide();
		$("#sidemenuBtn").css('visibility','hidden');
	}

	getCanvas(id);

	if(userCookie && userCookie !== ""){
		$("#user").text(userCookie);
	}
	else{
		$("#user").text("GUEST");
	}

	$("#getRoomID").click(function(){
		displayRoomID(id);
	});

	$("#save").click(function(){
		saveCanvas();
	});

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

function getID(){
    var url_string = window.location.href;
	var url = new URL(url_string);
	var id = url.searchParams.get("id");
	return id;
}

function displayRoomID(id){
	$("#roomID").val(id);
}

function saveCanvas(){
	 let canvas = document.getElementById('imageView');
     let context = canvas.getContext('2d');
	//
    // var dataURL = canvas.toDataURL("image/jpeg");
	//
	// var a = document.createElement('a');
    // a.href = dataURL;
    // a.download = getID()+".jpg";
    // document.body.appendChild(a);
    // a.click();
	//let imageData = context.getImageData(0,0,canvas.width/50,canvas.height/50);

	imageData = canvas.toDataURL();
	console.log(imageData);
	let req = $.post('/saveCanvas',{ imgdata:imageData});
	// req.then(function (data) {
	// 	console.log(data);
	// })


}

function getCanvas(id){
	let msg = {id: id};
	let req = $.post('/getCanvas',msg);

	req.then(function(data){

		if(!data[0].path || data[0].path === ""){
			$("#clear-all").click();
		}
		else{
			var img = new Image();
			img.onload = function() {
				var ctx = document.getElementById('imageView').getContext('2d');
				ctx.drawImage(img, 0, 0);
			}
			img.src = "."+data[0].path;
		}

	});
    req.fail(function () {
       console.log("failed");
    });
}

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