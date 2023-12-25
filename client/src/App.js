import './app.css'
import './style.scss'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Register from './pages/Register'
import Login from './pages/Login'
import Success from './pages/Success'
import Single from './pages/Single'
import Home from './pages/Home'
import Write from './pages/Write'
import AvatarChange from './pages/AvatarChange'

const Layout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/post/:id',
                element: <Single />,
            },
            {
                path: '/write',
                element: <Write />,
            },
        ],
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/success',
        element: <Success />,
    },
    {
        path: '/avatarchange',
        element: <AvatarChange />,
    },
])

function App() {
    return (
        <div className='app'>
            <div className='container'>
                <RouterProvider router={router} />
            </div>
        </div>
    )
}

export default App
