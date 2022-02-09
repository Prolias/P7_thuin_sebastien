import { Box, Button } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import '../sass/layout/Header.scss'

const Header = ({logged, setLogged}) => {

    const navigate = useNavigate()

    const disconnect = () => {
        localStorage.removeItem('token')
        setLogged(false)
    }

    return (
        <header className="header">
            <Box className="header__logo">
                <Link to="/" >
                    <img src={require('../assets/icon-left-font-monochrome-black.webp')} alt="" />
                </Link>
            </Box>
            <Box className="header__nav">
                {logged && 
                    <>
                        <Button variant="contained" onClick={() => navigate('/profile')}>
                            Mon compte
                        </Button>
                        <Button variant="contained" color="error" onClick={disconnect}>
                            Se déconnecter
                        </Button>
                    </>
                }
                {!logged &&
                    <Button variant="contained" color="success" onClick={() => navigate('/login')}>
                        Se connecter / S'inscrire
                    </Button>
                }
            </Box>
        </header>
    )
}

export default Header;