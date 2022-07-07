
import { getSession } from 'next-auth/react';
import dbcopycat from 'dbcopycat';

const handler = async (req, res) => {
    const session = await getSession({ req })
    if (!session.user) {
        return res.status(401).send("Giriş yapınız");
    }

    const updateList = dbcopycat.update('lists', req.body.list);

    return res.status(200).send(updateList);
}

export default handler;