<?PHP
if(isset($_COOKIE["username"]) && isset($_COOKIE["password"])){
     session_start();

     // Set session variables
     $_SESSION["id"] =date_default_timezone_get();
     header("location:admin_index.php");
}else{

 $uname=$_POST['username'];
 $pass=$_POST['password'];

 if($uname=='admin'){
     if($pass=='admin'){
        session_start();

        // Set session variables
        $_SESSION["id"] =date_default_timezone_get();
        if(isset($_POST['remember'])){
           setcookie( "username", $uname, strtotime( '+7 days' ) );
           setcookie( "password", $pass, strtotime( '+7 days' ) );
        }
         header("location:admin_index.php");
     }
     else{
        header("location:index.php");
   }   
 }
 else{
      header("location:index.php");
 }
}
 ?>