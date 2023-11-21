import React from "react";
import "./Login.css"

const Login = () =>{
    return(
<div>
    <div className=" container>">
        <div className="header">

        <div className="input">
    <h2>I am a login</h2>
    <label for="email"><b>Email</b></label>
    <input type = "email" placeholder = "enter rmail" name = "rmail" required></input>
    
    <label for="password"><b>Password</b></label>
    <input type = "password" placeholder = "enter password" name = "rmail" required></input>
    <button type="enter" class="loginbtn">Log In</button>

    </div>
        </div>
    </div>
    
</div>
    )
}



export default Login;