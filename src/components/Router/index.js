import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import App from '../../layouts/App'
import Home from '../../views/Home'
import NotFound from '../../views/NotFound'

const Router = () => (
    <BrowserRouter>
        <App>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route component={NotFound} />
            </Switch>
        </App>
    </BrowserRouter>
)

export default Router