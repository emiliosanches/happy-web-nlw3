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
            <Route path="/orphanages/create" component={CreateOrphanage} />
            <Route path="/orphanages/:id" component={Orphanage} />
        </Switch>
    </BrowserRouter>
)