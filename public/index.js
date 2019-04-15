let id;
$(document).ready(function () {

	id = getID();

	var idCookie = getCookie("id");
	var userCookie = getCookie("username");

	if(idCookie && idCookie !== ""){

		if(!id || id === ""){
			window.location.replace("/?id="+idCookie);
		}

	}
	else{
		$("#save").hide();
		$("#sidemenuBtn").css('visibility','hidden');
	}

	getCanvas(id);
	//getPrevCanvas();

	if(userCookie && userCookie !== ""){
		$("#user").text(userCookie);
	}
	else{
		$("#user").text("GUEST");
	}

	$("#getRoomID").click(function(){
		displayRoomID(id);
	});

	$("#clear-all").click(function(){
		alert("Are you sure you want to clear? (This will clear the canvas for all current users)")
	});


	$("#save").click(function(){
		saveCanvas();
	});

	$("#logoutlobby").click(function(){
		if(userCookie && userCookie !== ""){
			window.location.replace("/lobby.html");
		}
		else{
			window.location.replace("/login.html");
		}
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
	let req = $.post('/saveCanvas',{ id: id,imgdata:imageData});
	// req.then(function (data) {
	// 	console.log(data);
	// })


}

function getCanvas(id){
	let msg = {id: id};
	let req = $.post('/loadCanvas',msg);
	let canvas = document.getElementById('imageView');
	let context = canvas.getContext('2d');
	let img = new Image();

	req.then(function(data){

		img.onload = function(){
			context.drawImage(img,0,0);
		};
		console.log(data);
		img.src = data;

		// if(!data[0].path || data[0].path === ""){
		// 	$("#clear-all").click();
		// }
		// else{
		// 	// var img = new Image();
		// 	// img.onload = function() {
		// 	// 	var ctx = document.getElementById('imageView').getContext('2d');
		// 	// 	ctx.drawImage(img, 0, 0);
		// 	// }
		// 	// img.src = "."+data[0].path;
		//
		// }

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
		else{
			alert("Password change successful!");
		}
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

function getPrevCanvas () {
    let canvas = document.getElementById('imageView');
    let context = canvas.getContext('2d');
    let img = new Image();

    let req = $.get('/canvas');
    req.then(function (data) {
        img.onload = function(){
            context.drawImage(img,0,0);
        };
        img.src = data;
        console.log(data);
    });
}

