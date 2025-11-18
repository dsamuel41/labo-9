import { pool } from '../data/db/conection.js'
import bcrypt from 'bcrypt'
import { HAS_COMPLEXITY } from '../keys.js'

export const signup = async (req, res) => {
    const { name, email, password } = req.body

    try {
        // revisar si ya existe usuario
        const exists = await pool.query('SELECT id FROM users WHERE email = $1 LIMIT 1', [email])
        if (exists.rows.length) return res.status(409).json({ message: 'El email ya está registrado' })

        const hash = await bcrypt.hash(password, HAS_COMPLEXITY || 10)
        const result = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
            [name, email, hash]
        )

        res.status(201).json(result.rows[0])
    } catch (err) {
        res.status(500).json({ message: 'Error en el servidor', error: err.message })
    }
}
