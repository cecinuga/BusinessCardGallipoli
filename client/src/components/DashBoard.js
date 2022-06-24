import React from 'react'
import { useNavigate } from 'react-router'
import store from '../store/store'

function DashBoard() {
    const navigate = useNavigate();
    const username = store.getState().email;


    if(store.getState().logged){
        console.log('DashBoard: ',store.getState())
        
        return (
            <div className="DashBoard p-4 font-semibold relative">
                Benvenuto, {username}
            </div>
        );
    } else {
        return '';
    }
    
}

export default DashBoard;