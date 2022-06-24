import React from 'react';
import logo from '../public/logo.png'
import { useNavigate } from 'react-router'
import store from '../store/store'
//import '/src/css/MagicBorder.css'

export default function Header() {
    const navigate = useNavigate();
    
    async function registrati () { navigate('/registrazione') }
    async function login () { navigate('/login') }
    async function dashboard () { navigate('/dashboard') }
    async function logout () { store.dispatch({ type:"LOGGEDOUT" }) }
    async function home() { navigate('/') }

    store.subscribe(function(){
        if(store.getState().logged==true){
            document.getElementById('Header-signin').style.display = 'none';
            document.getElementById('Header-login').innerHTML = 'Logout';
            document.getElementById('Header-login').onclick = ()=>{logout()}
        } else {
            document.getElementById('Header-signin').style.display = 'inline-block';
            document.getElementById('Header-login').innerHTML = 'Login';
            document.getElementById('Header-login').onclick = ()=>{login()}
        }
    })

    return(
        <div className="Header h-16">
            <div className="Route inline-block relative top-3 ml-2 font-semibold text-lg">
                <button onClick={home} className="MagicBorderBtn text-2xl font-semibold mr-4 inline-block relative border-b-2 border-solid border-amber-600 first-letter:text-yellow-600">
                    Gallipoli
                    <div className="MagicBorder border-b-2 border-solid border-yellow-500 z-2 absolute"></div>
                </button>
                <button onClick={dashboard} className="MagicBorderBtn text-lg font-semibold relative top-2 border-b-2 border-solid border-amber-500">
                    Dashboard
                    <div className="MagicBorder border-b-2 border-solid border-amber-600 z-2 absolute"></div>
                </button>
            </div>
            <div className="Login absolute right-0 bottom-3 inline-block registrati">
                
            </div>
        </div>
    );
}