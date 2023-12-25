import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Menu = ({ cat, postId }) => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('/posts/?cat=' + cat)
                setPosts(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [cat])

    return (
        <div className='menu'>
            <h2>Другие сценарии по этой тематике</h2>
            {posts.map((post) => {
                if (post.id === Number(postId)) return false
                return (
                    <div className='post' key={post.id}>
                        <img src={`http://localhost:8801/pictures/${post.img}`} alt='' />
                        <Link className='link' to={'/post/' + post.id}>
                            <h2>{post.title}</h2>
                        </Link>
                        <Link className='link' to={'/post/' + post.id}>
                            <button>Читать</button>
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}

export default Menu
