import { getSession, useSession } from "next-auth/react"
import dbcopycat from 'dbcopycat';

const handler = async (req, res) => {
    const session = await getSession({ req });
    if (!session.user) {
        return res.status(401).send({ message: "Giriş yapınız." })
    }

    const userLists = dbcopycat.filter('lists', x => x.userId == session.user.id);
    return res.status(201).send(userLists);

}

export default handler;