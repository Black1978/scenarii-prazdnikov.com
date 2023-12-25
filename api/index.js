import express from 'express'
import cors from 'cors'
import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'
import authRoutes from './routes/auth.js'
import updateRoutes from './routes/update.js'

import cookieParser from 'cookie-parser'

import filesPayloadExists from './middleware/filesPayloadExists.js'
import fileExtLimiter from './middleware/fileExtLimiter.js'
import fileSizeLimiter from './middleware/fileSizeLimiter.js'

import fileUpload from 'express-fileupload'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(express.json())
app.use(cookieParser())
const corsConfig = {
    origin: true,
    credentials: true,
  };
  
  app.use(cors(corsConfig));

app.post(
    '/api/upload',
    fileUpload({ createParentPath: true }),
    fileExtLimiter(['.png', '.jpg', '.jpeg']),
    fileSizeLimiter,
    function (req, res) {
        const files = req.files
        let filename
        Object.keys(files).forEach((key) => {
            filename = Date.now() + files[key].name
            const filepath = path.join(__dirname, 'upload', 'pictures', filename)
            files[key].mv(filepath, (err) => {
                if (err) return res.status(500).json({ status: 'error', message: err })
            })
        })
        res.status(200).json(filename)
    }
)

app.post(
    '/api/avatar',
    fileUpload({ createParentPath: true }),
    filesPayloadExists,
    fileExtLimiter(['.png', '.jpg', '.jpeg']),
    fileSizeLimiter,
    function (req, res) {
        const files = req.files
        let filename
        Object.keys(files).forEach((key) => {
            filename = Date.now() + files[key].name
            const filepath = path.join(__dirname, 'upload', 'avatars', filename)
            files[key].mv(filepath, (err) => {
                if (err) return res.status(500).json({ status: 'error', message: err })
            })
        })
        res.status(200).json(filename)
    }
)

app.use('/api/posts', postRoutes)
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/update', updateRoutes)

app.use(express.static(__dirname + '/upload'))

app.listen(process.env.PORT, () => {
    console.log('Connected!')
})
