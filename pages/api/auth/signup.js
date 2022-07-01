import dbcopycat from 'dbcopycat';
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid';

const handler = (req, res) => {
    if (req.method !== 'POST') { return; }
    const { name, email, password } = req.body;

    if (!name || !email || !email.includes('@') || !password || password.trim().length < 3) {
        res.status(422).json({
            message: 'Validation error'
        });
        return;
    }

    const existingUser = dbcopycat.find('users', x => x.email == email);

    if (existingUser) {
        res.status(422).json({
            message: 'User exists already!'
        });
        return;
    }

    const user = dbcopycat.add('users', {
        id: uuidv4(),
        name,
        email,
        password: bcrypt.hashSync(password),
        isAdmin: false
    })

    res.status(200).send({
        message: 'Created user!',
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    })

}

export default handler;