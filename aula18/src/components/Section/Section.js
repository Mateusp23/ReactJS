import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from '../Home';
import About from '../About';
import Products from '../Products';
import Contact from '../Contact';
import Login from '../admin/Login';
import HomeAdm from '../admin/Home';
import { isAdmin } from '../../Auth';
import ContactResponse from "../admin/ContactResponse";
import ContactView from "../admin/ContactView";
import ClientView from '../admin/ClientView';
import ClientAdd from '../admin/ClientAdd';


function Section(){
  return (
    <section id="section" className="container">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/about">
          <About />
        </Route>

        <Route path="/products">
          <Products />
        </Route>

        <Route exact path="/contact">
          <Contact />
        </Route>

        <Route exact path="/user/login">
          <Login />
        </Route>

        <PrivateRoute exact path="/admin/contact/view" component={ContactView} />

        <PrivateRoute exact path="/admin/client/view" component={ClientView} />
        <PrivateRoute exact path="/admin/client/add" component={ClientAdd} />
         
        <PrivateRoute exact path="/admin/home" component={ HomeAdm } />

        <PrivateRoute exact path="/admin/contact/response/:idContact" component={ContactResponse}></PrivateRoute>
      
      </Switch>
    </section>
  );
} 
export default Section;

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route {...rest} render={props => (
      isAdmin() ?
        <Component {...props} />
        : console.log("não logado")
    )} />
  );
};