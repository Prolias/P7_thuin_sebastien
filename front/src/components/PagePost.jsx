import { Box, Button, TextField, Backdrop, CircularProgress, Alert, Snackbar, Typography, Avatar } from "@mui/material";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import Comment from "./Comment";
import '../sass/layout/PagePost.scss';

const urlApi = 'http://localhost:3000/api'

const PagePost = () => {
    const { idPost } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState(null);
    const [self, setSelf] = useState(null);
    const [user, setUser] = useState(null);
    const [comments, setComments] = useState(null);
    const [mainComments, setMainComments] = useState(null);
    const [message, setMessage] = useState('');
    const [deleted, setDeleted] = useState(false);
    const [edit, setEdit] = useState(false);
    const [userName, setUserName] = useState('');
    const [date, setDate] = useState('');

    const [postTitle, setPostTitle] = useState('')
    const [postMediaContent, setPostMediaContent] = useState('')

    const token = localStorage.getItem('token')

    const fetchComments = async () => {
        const response = await fetch(`${urlApi}/post/${idPost}/comment`)
        if(response.ok) {
            const result = await response.json()
            setComments(result.data)
            setMainComments(result.data.filter(comment => comment.mainCommentId === null))
        }
    }

    useEffect(() => {
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

        const fetchPost = async () => {
            const response = await fetch(`${urlApi}/post/${idPost}`)
            if(response.ok) {
                const result = await response.json()
                setPost(result.data)
                setPostTitle(result.data.title)
                setPostMediaContent(result.data.mediaContent)
            }
            else {
                navigate('/noPost')
            }
        }

        fetchSelf()
        fetchPost()
        fetchComments()
    }, [idPost, navigate, token]);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch(`${urlApi}/user/${post.userId}`)
            const result = await res.json()
            setUser(result.data)
        }

        if(post) fetchUser()
    }, [post])

    useEffect(() => {
        const calcDate = () => {
            const actualDate = new Date()
            const modifDate = new Date(post.createdAt)
    
            let duree = (actualDate - modifDate)/1000
            let denom = 'sec'
    
            if(duree >= 60) {
                duree = duree/60
                denom = 'min'
                if(duree >= 60) {
                    duree = duree/60
                    denom = 'heures'
                    if(duree >= 24) {
                        duree = duree/24
                        denom = 'jours'
                        if(duree >= 30.416666667) {
                            duree = duree/30.416666667
                            denom = 'mois'
                            if(duree >= 12) {
                                duree = duree/12
                                denom = 'ans'
                            }
                        }
                    }
                }
            }
    
            setDate(`Il y a ${duree.toFixed(0)} ${denom}`)
        }
    
        const getUserName = () => {
            if ((user.firstName || user.lastName) == null) setUserName(`${user.email} `)
            else setUserName(`${user.firstName} ${user.lastName}`)
        }

        if(user) {
            calcDate()
            getUserName()
        }
    }, [post, user])



    const submitComment = async () => {
        const response = await fetch(`${urlApi}/post/${idPost}/comment/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                message: message
            })
        })

        const result = await response.json()
        console.log(result)

        fetchComments()
    }

    const deletePost = async () => {
        const response = await fetch(`${urlApi}/post/${idPost}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        })

        if(response.ok) {
            setDeleted(true)
        }
    }

    const updatePost = async () => {
        const res = await fetch(`${urlApi}/post/${idPost}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                title: postTitle,
                media: {
                    content: postMediaContent
                }
            })
        })
        if(res.ok) {
            post.title = postTitle
            post.mediaContent = postMediaContent
            setEdit(false)
        }
    }

    return (
        <>
            {post &&
                <Box className="post">
                    {self && post.userId === self.id &&
                        <Box className="post__action_button">
                            {!edit &&
                                <>
                                    <Button variant="contained" color="warning" onClick={() => setEdit(true)}>Mettre à jour le poste</Button>
                                    <Button variant="contained" color="error" onClick={deletePost}>Supprimer le poste</Button>
                                </>
                            }
                        </Box>
                    }
                    {user &&
                        <Box className="post__poster">
                            <Typography>
                                Posté par
                            </Typography>
                            <Avatar
                                src={`https://avatars.dicebear.com/api/initials/${userName}.svg`}
                                alt={`Avatar for user ${post.userId}`}
                                sx={{ width: 24, height: 24, margin: '0 .2em'}}
                            />
                            <Typography>
                                {`${userName} • ${date}`}
                            </Typography>
                        </Box>
                    }
                    {!edit &&
                        <Box className="post__content">
                            <h1 className="post__content__title" >
                                {post.title}
                            </h1>
                            {post.mediaType === 'TEXT' &&
                                <Box className="post__content__media">
                                    {post.mediaContent}
                                </Box>
                            }
                            {post.mediaType === 'IMAGE' &&
                                <img 
                                    src={post.mediaContent}
                                    alt={post.title}
                                />
                            }
                        </Box>
                    }
                    {edit &&
                        <Box className="post__contentEdit">
                            <Box className="post__contentEdit__field">
                                <TextField
                                    label="Titre"
                                    value={postTitle}
                                    onChange={e => setPostTitle(e.target.value)}
                                />
                                <TextField
                                    label="Media"
                                    value={postMediaContent}
                                    onChange={e => setPostMediaContent(e.target.value)}
                                />
                            </Box>
                            <Box className="post__contentEdit__action">
                                <Button color="error" onClick={() => setEdit(false)}>Abandonner</Button>
                                <Button color="success" variant="contained" onClick={updatePost}>Modifier</Button>
                            </Box>
                        </Box>
                    }
                    <Box className="post__newComment">
                        <TextField
                            label="Ajouter un commentaire"
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                        />
                        <Button variant="contained" onClick={submitComment} disabled={!message}>Ajouter un commentaire</Button>
                    </Box>
                    {comments && mainComments &&
                        <Box>
                            {mainComments.map(mainComment => 
                                <Comment
                                    key={mainComment.id}
                                    comments={comments}
                                    mainComment={mainComment}
                                    idPost={idPost}
                                    self={self}
                                    fetchCom={fetchComments}
                                />
                            )}
                        </Box>
                    }
                </Box>
            }
            <Backdrop
                open={!post}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar
                anchorOrigin={{horizontal: "center", vertical: "top"}}
                open={deleted}
                autoHideDuration={6000}
                onClose={() => navigate('/')}
            >
                <Alert severity="success" sx={{ width: '100%' }}>
                    Le poste a été supprimé avec succès !
                </Alert>
            </Snackbar>
        </>
    );
};

export default PagePost;
