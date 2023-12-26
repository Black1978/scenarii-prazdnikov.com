import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ReCAPTCHA from 'react-google-recaptcha'

import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/
const EMAIL_REGEX = /^\S+@\S+\.\S+$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

const REGISTER_URL = `${process.env.REACT_APP_API_URL }auth/register`

const Register = () => {
    const [captchaDone, setCaptchaDone] = useState(false)

    const [submitting, setSubmiting] = useState(false)

    const navigate = useNavigate()
    const userRef = useRef()
    const errRef = useRef()

    const [user, setUser] = useState('')
    const [validName, setValidName] = useState(false)
    const [userFocus, setUserFocus] = useState(false)

    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false)
    const [emailFocus, setEmailFocus] = useState(false)

    const [pwd, setPwd] = useState('')
    const [validPwd, setValidPwd] = useState(false)
    const [pwdFocus, setPwdFocus] = useState(false)

    const [matchPwd, setMatchPwd] = useState('')
    const [validMatch, setValidMatch] = useState(false)
    const [matchFocus, setMatchFocus] = useState(false)

    const [errMsg, setErrMsg] = useState('')

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user)
        setValidName(result)
    }, [user])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email)
        setValidEmail(result)
    }, [email])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd)
        setValidPwd(result)
        const match = pwd === matchPwd
        setValidMatch(match)
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('')
    }, [user, pwd, matchPwd, email])

    const handleSubmit = async (e) => {
        setSubmiting(true)
        e.preventDefault()
        const v1 = USER_REGEX.test(user)
        const v2 = EMAIL_REGEX.test(email)
        const v3 = PWD_REGEX.test(pwd)
        if (!v1 || !v2 || !v3) {
            setErrMsg('Invalid Entry')
            return
        }
        try {
            const response = await axios.post(
                REGISTER_URL,
                JSON.stringify({ username: user, password: pwd, email }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            )
            console.log(response)
            navigate('/success')
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Responce')
            } else if (err.response.status === 409) {
                setErrMsg('Имя пользователя или e-mail уже заняты')
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus()
        }
        setSubmiting(false)
    }

    const onChangeCaptcha = () => {
        setCaptchaDone(true)
    }

    return (
        <div className='auth'>
            <h1>Регистрация</h1>
            <form onSubmit={handleSubmit}>
                <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live='assertive'>
                    {errMsg}
                </p>
                <div className='formInput'>
                    <label htmlFor='username'>
                        Username: &nbsp;
                        <span className={validName ? 'valid' : 'hide'}>
                            <FontAwesomeIcon icon={faCheck} className='icons iconGreen' />
                        </span>
                        <span className={validName || !user ? 'hide' : 'invalid'}>
                            <FontAwesomeIcon icon={faTimes} className='icons iconRed' />
                        </span>
                    </label>
                    <input
                        type='text'
                        id='username'
                        ref={userRef}
                        autoComplete='off'
                        onChange={(e) => setUser(e.target.value)}
                        required
                        aria-invalid={validName ? 'false' : 'true'}
                        aria-describedby='uidnote'
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                    />
                    <p
                        id='uidnote'
                        className={userFocus && user && !validName ? 'insturctions' : 'offscreen'}
                    >
                        <FontAwesomeIcon icon={faInfoCircle} className='icons' />
                        От 4 до 24 символа латиницы.
                        <br />
                        Должно начинаться с буквы. <br />
                        Буквы, цифры, нижнее подчеркивание, дефизы допускаются.
                    </p>
                </div>

                <div className='formInput'>
                    <label htmlFor='email'>
                        e-mail: &nbsp;
                        <span className={validEmail ? 'valid' : 'hide'}>
                            <FontAwesomeIcon icon={faCheck} className='icons iconGreen' />
                        </span>
                        <span className={validEmail || !email ? 'hide' : 'invalid'}>
                            <FontAwesomeIcon icon={faTimes} className='icons iconRed' />
                        </span>
                    </label>
                    <input
                        type='email'
                        id='email'
                        autoComplete='off'
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        aria-invalid={validEmail ? 'false' : 'true'}
                        aria-describedby='uidnote'
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                    />
                    <p
                        id='emaildnote'
                        className={
                            emailFocus && email && !validEmail ? 'insturctions' : 'offscreen'
                        }
                    >
                        <FontAwesomeIcon icon={faInfoCircle} className='icons' />
                        Должен быть валидный e-mail адрес. <br />
                    </p>
                </div>

                <div className='formInput'>
                    <label htmlFor='password'>
                        Password: &nbsp;
                        <span className={validPwd ? 'valid' : 'hide'}>
                            <FontAwesomeIcon icon={faCheck} className='icons iconGreen' />
                        </span>
                        <span className={validPwd || !pwd ? 'hide' : 'invalid'}>
                            <FontAwesomeIcon icon={faTimes} className='icons iconRed' />
                        </span>
                    </label>
                    <input
                        type='password'
                        id='password'
                        onChange={(e) => setPwd(e.target.value)}
                        required
                        aria-invalid={validPwd ? 'false' : 'true'}
                        aria-describedby='pwdnote'
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                    />
                    <p
                        id='pwdnote'
                        className={pwdFocus && !validPwd ? 'insturctions' : 'offscreen'}
                    >
                        <FontAwesomeIcon icon={faInfoCircle} className='icons' />
                        От 4 до 24 символа латиницы.
                        <br />
                        Должен включать буквы верхнего и нижнего регистров, а также цифры и
                        специальный символ
                        <br />
                        <span aria-label='exclamation mark'>!</span>{' '}
                        <span aria-label='at symbol'>@</span>
                        <span aria-label='hashtag'>#</span>
                        <span aria-label='dollar sign'>$</span>
                        <span aria-label='percent'>%</span>
                    </p>
                </div>

                <div className='formInput'>
                    {' '}
                    <label htmlFor='confirm_pwd'>
                        Confirm Password: &nbsp;
                        <span className={validMatch && matchPwd ? 'valid' : 'hide'}>
                            <FontAwesomeIcon icon={faCheck} className='icons iconGreen' />
                        </span>
                        <span className={validMatch || !matchPwd ? 'hide' : 'invalid'}>
                            <FontAwesomeIcon icon={faTimes} className='icons iconRed' />
                        </span>
                    </label>
                    <input
                        type='password'
                        id='confirm_pwd'
                        onChange={(e) => setMatchPwd(e.target.value)}
                        required
                        aria-invalid={validMatch ? 'false' : 'true'}
                        aria-describedby='confirmnote'
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                    />
                    <p
                        id='confirmnote'
                        className={matchFocus && !validMatch ? 'instructions' : 'offscreen'}
                    >
                        <FontAwesomeIcon icon={faInfoCircle} className='icons' />
                        Должен совпадать с верхнем полем пароля.
                    </p>
                </div>

                <ReCAPTCHA
                    sitekey={process.env.REACT_APP_CAPTCHA_KEY}
                    onChange={onChangeCaptcha}
                    style={{ transform: 'scale(0.75)', transformOrigin: '0 0', maxWidth: '240px' }}
                />
                {captchaDone && (
                    <button
                        disabled={
                            !validEmail || !validName || !validPwd || !validMatch || submitting
                                ? true
                                : false
                        }
                    >
                        Регистрация
                    </button>
                )}

                <span>
                    У Вас есть аккаунт?{' '}
                    <Link className='link' to='/login'>
                        Логин
                    </Link>
                </span>
                <p>
                    <Link className='link' to='/'>
                        Главная страница
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default Register
