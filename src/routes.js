import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import Tournaments from './RouteHandlers/Tournaments'
import Tournament from './RouteHandlers/Tournament'

export default (
    <Router history={browserHistory}>
        <Route path='/ids/:sport' component={Tournaments}>  {/*это может быть меню из tournaments со списком всех торнаментов*/}
            <Route path='tournament/:tournamentId' component={Tournament} />
        </Route>
    </Router>
);