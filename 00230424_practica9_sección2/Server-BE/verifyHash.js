import bcrypt from 'bcrypt'

const storedHash = '$2b$10$XOHI0.vg73ve9Oy73lqU5.W//tVQuqMIAKJn3n25ZA2DUF.YGm6vq'

const posiblesPasswords = [
  '123456',
  '123456789',
  '123123',
  'password',
  'qwerty',
  'admin',
  'admin123',
  'admin@123',
  'contraseña',
  'mipassword',

  'jerry',
  'jerry1',
  'jerry123',
  'jerry@123',
  'Jerry123',

  'nodejs',
  'nodejs123',
  'express',
  'express123',
  'postgres',
  'postgresql',
  'api123',
  'api2024',
  'crudapi',

  'logrocket',
  'logrocket123',
  'tania',
  'tania123',
  'taniadev',
  'taniadev123',

  '2024',
  'jan2024',
  'enero2024',
  '26012024',
  '26jan',

  'tania@2024',
  'devjerry',
  'rocketapi',
  'adminjerry',
  'apiadmin',
]

const verificar = async () => {
  for (const intento of posiblesPasswords) {
    const match = await bcrypt.compare(intento, storedHash)
    if (match) {
      console.log(`✅ ¡Contraseña encontrada! Es: "${intento}"`)
      return
    } else {
      console.log(`❌ No coincide: "${intento}"`)
    }
  }

  console.log('🚫 Ninguna coincidió.')
}

verificar()
