import React from 'react'
import './register.css'

function login(props) {
    let msgClass = ["text-center"];
    if(props.type){
        msgClass.push("text-success");
    }else{
        msgClass.push("text-danger");
    }
    return (
        <div className='container1'>
            
            <form className='signin' onSubmit={props.login}>
                <h2>Log In</h2>
                <p className={msgClass.join(" ")}>{props.message}</p>
                <button type='button' className='btn1' onClick={props.google}>Login via Google</button>
                <button type='button' className='btn2'>Login via facebook</button>
                <p className='divider-text'><span className='bg-light'>OR</span></p>
                <input type='email' name='email' id='emailId' placeholder='Email address' autoComplete='off' required/>
                <input type='password' name='password' id='passwordId' placeholder='Password' autoComplete='off' required/>
                <button type='submit' className='btn3'>Login</button>
                <p><a href='log' onClick={props.switch}>Create an account</a></p>
            </form>
            
        </div>        
    );
}

export default login