import { Box, Button, TextField, Avatar } from "@mui/material";
import { useEffect, useState } from "react";

import '../sass/layout/Comment.scss'

const urlApi = 'http://localhost:3000/api'

const Comment = ({mainComment, comments, idPost, self, fetchCom}) => {
    const [comment, setComment] = useState(null)
    const [user, setUser] = useState(null)
    const [response, setResponse] = useState(false)
    const [message, setMessage] = useState('')
    const [comMessage, setComMessage] = useState(mainComment.message)
    const [commenter, setCommenter] = useState(false)
    const [modifCom, setModifCom] = useState(false)

    const token = localStorage.getItem('token')

    useEffect(() => {
        setComment(comments.filter(comment => comment.mainCommentId === mainComment.id))
        setCommenter(mainComment.userId === self.id)

        const fetchUser = async () => {
            const res = await fetch(`${urlApi}/user/${mainComment.userId}`)
            const data = await res.json()
            setUser(data.data)
        }

        fetchUser()
    }, []);

    const calcDate = () => {
        const actualDate = new Date()
        const modifDate = new Date(mainComment.createdAt)

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

        return `Il y a ${duree.toFixed(0)} ${denom}`
    }
    
    const submitComment = async () => {
        const res = await fetch(`${urlApi}/post/${idPost}/comment/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                message: message,
                mainCommentId: mainComment.id
            })
        })
        if(res.ok) {
            setResponse(!response)
            
            fetchCom()
        }
    }

    const modifyComment = async () => {
        const res = await fetch(`${urlApi}/post/${idPost}/comment/${mainComment.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                message: comMessage
            })
        })
        if(res.ok){
            mainComment.message = comMessage
            setModifCom(false)
        }
    }

    const getUserName = () => {
        if ((user.firstName || user.lastName) == null) return `${user.email} `
        else return `${user.firstName} ${user.lastName}`
    }

    return (
        <Box className="comment">
            {user &&
                <Box className="comment__info">
                    <Avatar
                        src={`https://avatars.dicebear.com/api/initials/${getUserName()}.svg`}
                        alt={`Avatar for user ${mainComment.userId}`}
                        // variant="rounded"
                        sx={{ width: 24, height: 24, margin: '0 .2em'}}
                        />
                    {`${getUserName()} • ${calcDate()}`}
                </Box>
            }
            {!modifCom &&
                <Box className="comment__comment">
                    {mainComment.message}
                </Box>
            }
            {modifCom && 
                <>
                    <Box>
                        <TextField 
                            label="Commentaire"
                            value={comMessage}
                            onChange={e => setComMessage(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            color="success"
                            disabled={!comMessage}
                            onClick={modifyComment}
                        >
                            Modifier
                        </Button>
                    </Box>
                    <Box>
                        <Button
                            color="error"
                            onClick={() => setModifCom(false)}
                        >
                            Abandonner
                        </Button>
                    </Box>
                </>
            }
            {response &&
                <>
                    <Box className="comment__responseField">
                        <TextField
                            label="Message"
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            onClick={submitComment}
                            disabled={!message}
                        >
                            Répondre
                        </Button>
                    </Box>
                    <Box>
                        <Button color="error" onClick={() => setResponse(!response)}>Abandonner</Button>
                    </Box>
                </>
            }
            <Box>
            {!response &&
                <Button onClick={() => setResponse(!response)}>Répondre</Button>
            }
            {commenter &&
                <>
                    {!modifCom &&
                        <Button
                            color="warning"
                            onClick={() => setModifCom(true)}
                        >
                            Modifier
                        </Button>
                    }
                    <Button color="error">Supprimer</Button>
                </>
            }
            </Box>
            {comment && comment.length > 0 &&
                <>
                    {comment.map(com =>
                        <Comment
                            key={com.id}
                            mainComment={com}
                            comments={comments}
                            idPost={idPost}
                            self={self}
                            fetchCom={fetchCom}
                        />
                    )}
                </>
            }
        </Box>
    )
};

export default Comment;
