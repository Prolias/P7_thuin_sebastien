import { Box, Button, MenuItem, TextField } from "@mui/material"
import { useState } from "react";

import '../sass/layout/NewPost.scss'

const urlApi = 'http://localhost:3000/api' 

const mediaType = [
    {
        value: 'TEXT',
        label: 'Texte'
    },
    {
        value: 'IMAGE',
        label: 'Image'
    },
    // {
    //     value: 'VIDEO',
    //     label: 'Vidéo'
    // }
]

const NewPost = ({ fetchPost, setNewPost }) => {
    const [media, setMedia] = useState({
        type: 'TEXT',
        content: ''
    })

    const [title, setTitle] = useState('');
    const [alert, setAlert] = useState({})

    const token = localStorage.getItem('token')

    const createNewPost = async () => {
        if(title === '') setAlert({error: `Champ titre vide !`})
        else {
            const postBody = {
                title: title,
                media: media
            }
            const response = await fetch(`${urlApi}/post/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(postBody)
            })
    
            const result = await response.json()
            setAlert(result)
            fetchPost()
            setNewPost(false)
        }
    }

    return (
        <Box className="createPost">
            <TextField
                label="Titre"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <Box className="createPost__media">
                <TextField
                    select
                    value={media.type}
                    onChange={event => setMedia({...media, type: event.target.value})}
                    className="createPost__media__type"
                >
                    {mediaType.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    label="Content"
                    multiline
                    value={media.content}
                    onChange={e => setMedia({...media, content: e.target.value})}
                    className="createPost__media__content"
                />
            </Box>
            <Box className="createPost__action">
                <Button
                    color="error"
                    onClick={() => setNewPost(false)}
                >
                    Abandonner
                </Button>
                <Button
                    variant="contained"
                    color="success"
                    onClick={createNewPost}
                    disabled={!title}
                >
                    Créer un nouveau post
                </Button>
            </Box>
        </Box>
    )
};

export default NewPost;