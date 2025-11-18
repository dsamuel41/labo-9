import { pool } from '../data/db/conection.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../keys.js'

export const signin = async (req, res) => {
    const { email, password } = req.body

    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1 LIMIT 1',
            [email]
        )

        const user = result.rows[0]
        if (!user) return res.status(401).json({ message: 'Usuario no encontrado' })

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) return res.status(401).json({ message: 'Credenciales inválidas' })

        const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, JWT_SECRET, { expiresIn: '1h' })
        res.status(200).json({ token })
    } catch (err) {
        res.status(500).json({ message: 'Error en el servidor', error: err.message })
    }
}
