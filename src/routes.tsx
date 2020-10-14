import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CreateOrphanage from './pages/CreateOrphanage';
import { LandingPage } from './pages/Landing';
import Orphanage from './pages/Orphanage';
import { OrphanagesMap } from './pages/OrphanagesMap';

export const Router = () => (
    <BrowserRouter>
        <Switch>    
            <Route path="/" exact component={LandingPage}/>
            <Route path="/app" component={OrphanagesMap} />
            <Route path="/app" component={Orphanage} />
            <Route path="/app" component={CreateOrphanage} />
        </Switch>
    </BrowserRouter>
)