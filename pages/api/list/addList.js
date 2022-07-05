import { getSession } from "next-auth/react"
import dbcopycat from 'dbcopycat';
import { v4 as uid4 } from "uuid";
import { getError } from '../../../utils/helpers';

const handler = async (req, res) => {
    const session = await getSession({ req });
    if (req.method != "POST") { return; }
    if (!session.user) {
        return res.status(401).send({ message: "Lütfen giriş yapınız." })
    }
    const list = dbcopycat.add('lists', {
        id: uid4(),
        userId: session.user.id,
        tasks: [],
        title: req.body.title
    })
    return res.status(201).send(list)

}

export default handler;