//the function that will show password when user click on the checkbox
function showPassword(){
  var x = document.getElementById("password");
   if (x.type === "password") {
       x.type = "text";
   } else {
       x.type = "password";
   }
}
