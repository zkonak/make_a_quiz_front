const isLogin = () => 
    {
    if(localStorage.getItem("token")){
     console.log("true");
        return true;
         
    }else{

       console.log(false);
        return false;
         }
    }


export default isLogin;