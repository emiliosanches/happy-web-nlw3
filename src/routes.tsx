import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { LandingPage } from './pages/Landing';
import { OrphanagesMap } from './pages/OrphanagesMap';

export const Router = () => (
    <BrowserRouter>
        <Switch>    
            <Route path="/" exact component={LandingPage}/>
            <Route path="/app" component={OrphanagesMap} />
        </Switch>
    </BrowserRouter>
)