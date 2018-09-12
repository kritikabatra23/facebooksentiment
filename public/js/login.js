function userLogin()
{
  if(checkLoginSubmit())
  {

    var email = $('#loginEmail').val();
    var password = $('#loginPassword').val();

    $.ajax
    ({
        type:"get",
        url:"php/checkUser.php",
        async:true,
        data:{lEmail:email, lPassword:password},
        dataType : 'json',
        success:function(res)
        {
          if (res == 1)
          {
            window.location.href='customer-orders.php';
          }
          else if(res ==2)
          {
            alert("Wrong password!")
          }
          else {
            alert("users not exist!");
            window.location.reload();
          }
        },
        error:function(res)
        {
          alert(res);
            console.log(res);
        }
      });
  }
}
