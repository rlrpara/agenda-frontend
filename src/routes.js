import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Logon from './pages/Logon';
import Register from './pages/register';
import Agenda from './pages/agenda';
import NewAgenda from './pages/NewAgenda';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={ Logon } />
                <Route path="/register" component={ Register } />
                <Route path="/agenda/new" component={ NewAgenda } />  {/* Quando tiver um sub-diretorio, colocar sempre acima, ou nao vai funcionar */}
                <Route path="/agenda" component={ Agenda } />
            </Switch>
        </BrowserRouter>
    )
}