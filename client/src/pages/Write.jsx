import axios from 'axios'
import moment from 'moment'
import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useLocation, useNavigate } from 'react-router-dom'

const Write = () => {
    const state = useLocation().state
    const navigate = useNavigate()

    const [value, setValue] = useState(state?.desc || '')
    const [title, setTitle] = useState(state?.title || '')
    const [file, setFile] = useState(null)
    const [cat, setCat] = useState(state?.cat || '')

    const upload = async () => {
        try {
            const formData = new FormData()
            formData.append('picture', file)
            const res = await axios.post('/upload', formData)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    const handleClick = async (e) => {
        e.preventDefault()
        let imgUrl
        if (file) {
            imgUrl = await upload()
            console.log(imgUrl)
        } else {
            imgUrl = null
        }

        try {
            state
                ? await axios.put('/posts/' + state.id, {
                      title,
                      desc: value,
                      img: file ? imgUrl : '',
                      cat,
                  })
                : await axios.post('/posts/', {
                      title,
                      desc: value,
                      img: file ? imgUrl : '',
                      cat,
                      date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
                  })
        } catch (error) {
            console.log(error)
        }
        navigate('/')
    }
    return (
        <div className='add'>
            <div className='content'>
                <input
                    type='text'
                    placeholder='Заголовок'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <div className='editorContainer'>
                    <ReactQuill className='editor' theme='snow' value={value} onChange={setValue} />
                </div>
            </div>
            <div className='menu'>
                <div className='item'>
                    <h1>Опубликовать</h1>
                    {/* <span>
                        <b>Status: </b>Черновик
                    </span>
                    <span>
                        <b>Visibility: </b> Public
                    </span> */}
                    <input
                        type='file'
                        id='file'
                        accept='image/*'
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <label htmlFor='file' className='file'>
                        Загрузить изображение
                    </label>
                    <div className='buttons'>
                        {/* <button>Сохранить как черновик</button> */}
                        <button onClick={handleClick}>Опубликовать</button>
                    </div>
                </div>
                <div className='item'>
                    <h2>Категории</h2>
                    <div className='cat'>
                        <input
                            checked={cat === 'childholid'}
                            type='radio'
                            name='cat'
                            value='childholid'
                            id='childholid'
                            onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor='childholid'>Детские праздники</label>
                    </div>
                    <div className='cat'>
                        <input
                            checked={cat === 'newyearholid'}
                            type='radio'
                            name='cat'
                            value='newyearholid'
                            id='newyearholid'
                            onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor='newyearholid'>Новый Год</label>
                    </div>
                    <div className='cat'>
                        <input
                            checked={cat === 'profholid'}
                            type='radio'
                            name='cat'
                            value='profholid'
                            id='profholid'
                            onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor='profholid'>Профессиональные праздники</label>
                    </div>
                    <div className='cat'>
                        <input
                            checked={cat === 'sportholid'}
                            type='radio'
                            name='cat'
                            value='sportholid'
                            id='sportholid'
                            onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor='sportholid'>Спортивные праздники</label>
                    </div>
                    <div className='cat'>
                        <input
                            checked={cat === 'publholid'}
                            type='radio'
                            name='cat'
                            value='publholid'
                            id='publholid'
                            onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor='publholid'>Государственные праздники</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Write
