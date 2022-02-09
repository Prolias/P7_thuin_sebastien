import { Button, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import NewPost from './NewPost';
import Post from './Post';

import '../sass/layout/Main.scss'

const urlApi = 'http://localhost:3000/api'

const Main = () => {
    const [posts, setPosts] = useState(null)
    const [self, setSelf] = useState(null)
    const [newPost, setNewPost] = useState(false)

    
    useEffect(() => {
        const token = localStorage.getItem('token')

        const fetchSelf = async () => {
            const response = await fetch(`${urlApi}/user/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
    
            if(response.ok) {
                const result = await response.json()
                setSelf(result.data)
            }
        }

        if(token) fetchSelf()
        fetchAllPosts()
    }, [])

    const fetchAllPosts = async () => {
        const result = await fetch(`${urlApi}/post/`)
        const data = await result.json()
        setPosts(data.data)
    }

    return (
        <Box component="main" className="main">
            {self &&
                <>
                    {!newPost && 
                        <Box className="main__create">
                            <Button color='success' variant='contained' onClick={() => setNewPost(true)}>Créer un nouveau post</Button>
                        </Box>
                    }
                    {newPost && 
                        <NewPost fetchPost={fetchAllPosts} setNewPost={setNewPost}/>
                    }
                </>
            }
            {posts && posts.map(post => (
                <Post data={post} key={post.id} self={self}/>
            ))}
        </Box>
    )
}

export default Main;