import { Box } from "@mui/material";

import '../sass/layout/Footer.scss'

const Footer = () => {
    return (
        <footer className="footer">
            <Box>
                <Box>
                Qui sommes nous ?
                </Box>
                <Box>
                Mentions légales
                </Box>
                <Box>
                    Nous contacter
                </Box>
            </Box>
            <Box>
                <Box>
                    Facebook
                </Box>
                <Box>
                    Twitter
                </Box>
                <Box>
                    LinkedIn
                </Box>
            </Box>
        </footer>
    )
}

export default Footer;