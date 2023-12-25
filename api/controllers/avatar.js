import { db } from '../db.js'
import jwt from 'jsonwebtoken'

export const avatar = (req, res) => {
    const token = req.cookies.access_token
    if (!token) return res.status(401).json('Not authenticated')
    jwt.verify(token, process.env.JWTTOKEN, (err, userInfo) => {
        if (err) return res.status(403).json('Token is not valid!')
        const q = 'UPDATE users SET `img`=? WHERE `id` = ?'
        const values = [req.body.img, userInfo.id]
        db.query(q, [...values], (err, data) => {
            if (err) return res.status(500).send(err)
            res.status(200).json('Avatar has been updated!')
        })
    })
}
