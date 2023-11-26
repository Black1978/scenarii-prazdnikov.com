import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Home = () => {




    const [posts, setPosts] = useState([])
    const cat = useLocation().search

    useEffect(() => {
        const fetchDate = async () => {
            try {
                const res = await axios.get('/posts' + cat)
                setPosts(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchDate()
    }, [cat])

    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html')
        return doc.body.textContent
    }


    

    return (
        <div className='home'>
            <div className='posts'>
                {posts.map((post) => {
                    return (
                        <div className='post' key={post.id}>
                            <div className='img'>
                                <img src={`../upload/${post.img}`} alt='' />
                            </div>
                            <div className='content'>
                                <Link className='link' to={'/post/' + post.id}>
                                    <h2>{post.title}</h2>
                                </Link>
                                <p>{getText(post.desc)}</p>
                                <Link className='link' to={'/post/' + post.id}>
                                    <button>Читать</button>
                                </Link>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Home
