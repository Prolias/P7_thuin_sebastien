import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { isLogged } from '../utils/logged';

import Footer from './Footer';
import Header from './Header';

const Accueil = () => {
    const location = useLocation();
    const [logged, setLogged] = useState(false)

    useEffect(() => {
        if(isLogged()) {
            setLogged(true)
        }
    }, [logged, setLogged, location])

    return (
        <>
            <Header logged={logged} setLogged={setLogged} />
            <Outlet />
            <Footer />
        </>
    )
}

export default Accueil;