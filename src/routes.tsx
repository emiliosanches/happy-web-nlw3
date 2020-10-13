import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { LandingPage } from './pages/Landing';

export const Router = () => (
    <BrowserRouter>
        <Switch>    
            <Route path="/"component={LandingPage}/>
        </Switch>
    </BrowserRouter>
)