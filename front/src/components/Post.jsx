import { Avatar, Box } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import '../sass/layout/Post.scss'

const apiUrl = 'http://localhost:3000/api'

const Post = ({data}) => {

    const [user, setUser] = useState({})

    const navigate = useNavigate();
    
    const calcDate = () => {
        const actualDate = new Date()
        const modifDate = new Date(data.createdAt)

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

    const fetchUser = async () => {
        const result = await fetch(`${apiUrl}/user/${data.userId}`)
        const datas = await result.json();
        setUser(datas.data)
    }

    useEffect(() => {
        fetchUser()
        calcDate()
    }, [])

    const getUserName = () => {
        if ((user.firstName || user.lastName) == null) return `${user.email} `
        else return `${user.firstName} ${user.lastName}`
    }

    return (
        <Box className="Post" onClick={() => navigate(`/post/${data.id}`)}>
            {data.mediaType === 'IMAGE' && 
                <Box className="Post__media">
                    <img 
                        src={data.mediaContent}
                        alt={data.title}
                    />
                </Box>
            }
            <Box className="Post__main">
                <Box className="Post__main__info">
                    Posté par
                    <Avatar
                        src={`https://avatars.dicebear.com/api/initials/${getUserName()}.svg`}
                        alt={`Avatar for user ${data.userId}`}
                        // variant="rounded"
                        sx={{ width: 24, height: 24, margin: '0 .2em'}}
                    />
                    {`${getUserName()} ${calcDate()}`}
                </Box>
                <Box className="Post__main__Title">
                    {data.title}
                </Box>
                {data.mediaType === 'TEXT' &&
                    <Box className="Post__main__content">
                        {data.mediaContent}
                    </Box>
                }
            </Box>
        </Box>
    )
}

export default Post