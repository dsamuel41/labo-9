import { pool } from '../data/db/conection.js';
import { generateHash } from '../hashes/index.js';

export const createUser = async (req, res) => {
    const { name, email, password } = req.body

    const passwordToStore = req.passwordValidated ? password : await generateHash(password)

    const result = await pool.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
        [name, email, passwordToStore]
    )
    res.status(201).json(result.rows[0])
}
