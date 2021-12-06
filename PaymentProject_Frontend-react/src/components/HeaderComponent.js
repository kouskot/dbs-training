import React from 'react'
import { Link } from 'react-router-dom'

function HeaderComponent() {
    return (
        <div>
            <header className="header">
                <div>
                <Link to="/" className="navbar-brand">DBS Payment System</Link>
                </div>
            </header>
        </div>
    )
}

export default HeaderComponent