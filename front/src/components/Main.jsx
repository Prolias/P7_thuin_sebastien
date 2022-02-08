import { Button, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import NewPost from './NewPost';
import Post from './Post';

import '../sass/layout/Main.scss'

const apiUrl = 'http://localhost:3000/api'

const Main = () => {
    const [posts, setPosts] = useState([])
    const [newPost, setNewPost] = useState(false)

    useEffect(() => {
        fetchAllPosts()
    }, [])

    const fetchAllPosts = async () => {
        const result = await fetch(`${apiUrl}/post/`)
        const data = await result.json()
        setPosts(data.data)
    }

    return (
        <Box component="main" className="main">
            {!newPost && 
                <Box className="main__create">
                    <Button color='success' variant='contained' onClick={() => setNewPost(true)}>Créer un nouveau post</Button>
                </Box>
            }
            {newPost && 
                <NewPost fetchPost={fetchAllPosts} setNewPost={setNewPost}/>
            }
            {posts.map(post => (
                <Post data={post} key={post.id}/>
            ))}
        </Box>
    )
}

export default Main;