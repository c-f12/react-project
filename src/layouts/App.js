import React from 'react'

import Header from '../components/Header'

const App = props => {
    return (
        <section class="main-section">
            <Header />
            <section class="container">
                {props.children}
            </section>
        </section>
    )
}

export default App