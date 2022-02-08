import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../sass/layout/Login_signup.scss'
import { isLogged } from "../utils/logged"

const apiUrl = 'http://localhost:3000/api'

const Signup = () => {
    const [alert, setAlert] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        if(isLogged()) {
            navigate('/')
        };
    }, [navigate]);
    


    const handleSubmit = async event => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email')
        const password = formData.get('password')
        const result = await fetch(`${apiUrl}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        })
        const data = await result.json()
        if(data.error) setAlert({error: data.error})
        if(data.message) {
            setAlert({message: data.message})
            navigate('/login')
        }
    }
    return (
        <>
            <Box component="form" onSubmit={handleSubmit} noValidate className="formLog" >
                <Typography sx={{ fontSize: 30 }}>
                    Création d'un compte
                </Typography>
                <TextField required label="Email" name="email"/>
                <TextField required type="password" label="Mot de passe" name="password" />
                <Box className="formLog__buttons">
                    <Link to="/login">
                        <Button color="primary">
                            Se connecter
                        </Button>
                    </Link>

                    <Button type="submit" color="success" variant="contained">
                        S'inscrire
                    </Button>
                </Box>
                {alert.error &&
                    <Alert severity="error">{alert.error}</Alert>
                }
                {alert.message &&
                    <Alert severity="success">{alert.message}</Alert>
                }
            </Box>
        </>
    );
};

export default Signup;
