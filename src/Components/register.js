import React from 'react'
import './register.css'

function register(props) {
    let msgClass = ["text-center"];
    if(props.type){
        msgClass.push("text-success");
    }else{
        msgClass.push("text-danger");
    }
    return (
        <div className='container'>
            <h2>Create Account</h2>
            <p>Get started with your free account</p>
            <p className={msgClass.join(" ")}>{props.message}</p>
            <form className='signin' onSubmit={props.register}>
                <button type='button' className='btn1' onClick={props.google}>Signup via Google</button>
                <button type='button' className='btn2'>Signup via facebook</button>
                <p className='divider-text'><span className='bg-light'>OR</span></p>
                <input type='email' name='email' id='emailId' placeholder='Email address' autoComplete='off' required/>
                <input type='password' name='password' placeholder='Create Password' autoComplete='off' required/>
                <input type='password' name='confirmPassword' placeholder='Repeat Password' autoComplete='off' required/>
                <button type='submit' className='btn3'>Create Account</button>
                <p>Have an account? <a href='login' onClick={props.switch}>Log in</a></p>
            </form>
           
        </div>        
    );
  }

export default register