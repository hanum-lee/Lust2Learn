
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
       console.log(data);
    });
    req.fail(function () {
       console.log("failed");
    });
    console.log(logininfo);
}

function createUser(){
    let createUser ={
        userEmail: $('#userEmail').val(),
        userID: $('#signupUsername').val(),
        userPassword:$('#signupPassword').val()
    };
    let req = $.post('/createUser',createUser);
    req.then(function(data){
        console.log(data);
    });
    req.fail(function () {
        console.log("failed");
    });
    console.log(createUser);


}