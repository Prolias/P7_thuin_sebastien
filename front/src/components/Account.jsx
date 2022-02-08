import { Alert, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { DatePicker, LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import React, { useEffect, useState } from 'react';
import frLocale from 'date-fns/locale/fr'

import '../sass/layout/Account.scss'
import { useNavigate } from 'react-router-dom';
import { isLogged } from '../utils/logged';

const urlApi = 'http://localhost:3000/api'

const Account = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if(!isLogged()) {
            navigate('/')
        }
    }, [navigate])

    const [alert,setAlert] = useState({})
    const [user, setUser] = useState(null)

    const token = localStorage.getItem('token')

    const updateUser = async () => {
        const userBody = {
            "firstName": user.firstName??null,
            "lastName": user.lastName??null,
            "birthDate": user.birthDate??null
        }
        const response = await fetch(`${urlApi}/user/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(userBody)
        })

        const result = await response.json()
        setAlert(result)
    }

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(`${urlApi}/user/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
    
            if(response.ok) {
                const result = await response.json()
                setUser(result.data)
            }
        }

        fetchUser()
    }, [token]);

    if(user) return (
        <Box component="form" noValidate className="formUser" >
            <Box className="formUser__field">
                <TextField 
                    label="Email"
                    name="email"
                    value={user.email}
                    disabled
                />
                <TextField
                    label="Prénom"
                    name="firstName"
                    value={user.firstName??''}
                    onChange={(event) => setUser({...user, firstName: event.target.value})}
                />
                <TextField
                    label="Nom"
                    name="lastName"
                    value={user.lastName??''}
                    onChange={(event) => setUser({...user, lastName: event.target.value})}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
                    <DatePicker
                        label="Date de naissance"
                        value={user.birthDate??null}
                        onChange={(birthDate) => setUser({...user, birthDate: birthDate})}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </Box>
            <Button variant="contained" onClick={updateUser}>
                Mettre à jour
            </Button>
            {alert.error &&
                    <Alert severity="error">{alert.error}</Alert>
                }
                {alert.message &&
                    <Alert severity="success">{alert.message}</Alert>
                }
        </Box>)
    else return (
        <Box className="waitingData">
            <CircularProgress color='warning'/>
            <Typography>
                Récupération des données
            </Typography>
        </Box>
    )
};

export default Account;
