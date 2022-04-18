import React,{useEffect,useState} from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

function Logout(){
    useEffect(()=>{
        window.location.href="http://15.207.107.128/";
    },[]);
    return null;
}

export default Logout;