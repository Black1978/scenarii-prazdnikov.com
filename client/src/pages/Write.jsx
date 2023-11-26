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
            formData.append('file', file)
            const res = await axios.post('/upload', formData)
            return res.data
        } catch (error) {}
    }

    const handleClick = async (e) => {
        e.preventDefault()
        const imgUrl = await upload()
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
                      date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
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
                        style={{ display: 'none' }}
                        type='file'
                        id='file'
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
                            checked={cat === 'art'}
                            type='radio'
                            name='cat'
                            value='art'
                            id='art'
                            onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor='art'>Детские праздники</label>
                    </div>
                    <div className='cat'>
                        <input
                            checked={cat === 'science'}
                            type='radio'
                            name='cat'
                            value='science'
                            id='science'
                            onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor='science'>Новый Год</label>
                    </div>
                    <div className='cat'>
                        <input
                            checked={cat === 'technology'}
                            type='radio'
                            name='cat'
                            value='technology'
                            id='technology'
                            onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor='technology'>Профессиональные праздники</label>
                    </div>
                    <div className='cat'>
                        <input
                            type='radio'
                            name='cat'
                            value='cinema'
                            id='cinema'
                            onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor='cinema'>Спортивные праздники</label>
                    </div>
                    <div className='cat'>
                        <input
                            checked={cat === 'design'}
                            type='radio'
                            name='cat'
                            value='design'
                            id='design'
                            onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor='design'>Государственные праздники</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Write
