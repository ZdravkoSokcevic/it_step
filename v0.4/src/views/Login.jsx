import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

function Login() {
    const [redirect, setRedirect] = useState(false);
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState(false);

    function renderRedirect() {
        if (redirect) return (
            <Redirect to='/home' />
        )
    }

    function checkUser() {
        var full = {
            username: user,
            password: pass
        }

        fetch('http://localhost:8000/controller/login.php', {
            method: 'post',
            body: JSON.stringify(full)
        }).then(function (res) {
            return res.json()
        }).then(function(json) {
            localStorage.setItem('employee', JSON.stringify(json));
            console.log(json)
            setRedirect(true);
        })

        if (redirect === false) setError(true);
    }

    return (
        <div className='login'>
            {renderRedirect()}
            <p align='center' className='blue'>it_step</p>
            <p align='center'><input onChange={event => setUser(event.target.value)} type="text" placeholder='Korisničko ime' /></p>
            <p align='center'><input onChange={event => setPass(event.target.value)} type="password" placeholder='Lozinka' /></p>
            <p align='center'><button className="full" type='submit' onClick={checkUser}>PRIJAVI SE</button></p>
            <p align='center' style={{display: error ? 'block':'none'}} className='error'>Uneli ste pogrešno <br/> korisničko ime ili lozinku.</p>
        </div>
    )
}

export default Login;