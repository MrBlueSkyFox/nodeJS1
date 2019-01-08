import React from 'react';
//import {Router, Route} from 'react-router';

import{HashRouter,Route,Switch} from'react-router-dom'
import ListItems from "./components/containers/item-list"
import Test from "./components/containers/item-add"
import Navbar from "./components/containers/Navbar";
import Register from "./components/containers/Register";
import Login from "./components/containers/Login";
import ItemAdd from "./components/containers/item-add"
import ItemPut from "./components/containers/item-put"
import About from "./components/about"

export default  (
     <HashRouter>
        <div>
            <Navbar/>
             <Route exact path="/" component={ListItems}/>
             <Route path="/test" component={Test}/>
            <div className="container">
                <Route exact path="/register" component={ Register }/>
                <Route exact path="/login" component={ Login }/>
                <Route exact path="/add" component={ ItemAdd }/>
                <Route exact path="/edit" component={ ItemPut }/>
                <Route exact path="/about" component={ About }/>
            </div>

        </div>
     </HashRouter>

);
