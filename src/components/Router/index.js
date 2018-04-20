import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux' 

import App from '../../layouts/App'
import Home from '../../views/Home'
import Movies from '../../views/Movies'
import Movie from '../../views/Movie'
import Shows from '../../views/Shows'
import Show from '../../views/Show'
import NotFound from '../../views/NotFound'

const Router = ({history}) => (
    <ConnectedRouter history={history}>
        <App>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/shows/:id" component={Show} />
                <Route path="/movies/:id" component={Movie} />
                <Route path="/movies" component={Movies} />
                <Route path="/shows" component={Shows} />
                <Route component={NotFound} />
            </Switch>
        </App>
    </ConnectedRouter>
)

export default Router