//save the information of the users
var uploadDatatoDb = function(data){
  $.post('/project',data,function(result){
    console.log('comlete');
  })
}

function saveUser()
{

/*******************This part save  user information. So it is better to have a database connection**********/

  var userTempInfo=
  {
    userId:"",
    userName:"",
    userPassword:"",
    userEmail:""
  }

  userTempInfo.userId = userInfo.length;
  userTempInfo.userName = document.getElementById("username").value;
  userTempInfo.userEmail = document.getElementById("useremail").value;
  userTempInfo.userPassword = document.getElementById("password").value;
  console.log(userTempInfo);
  userInfo.push(userTempInfo);

  uploadDatatoDb(userTempInfo);
}
