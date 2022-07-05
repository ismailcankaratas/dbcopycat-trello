import { getSession, useSession } from "next-auth/react"
import dbcopycat from 'dbcopycat';
import { v4 as uid4 } from "uuid";

const handler = async (req, res) => {
    const session = await getSession({ req });
    if (!session.user) {
        return res.status(401).send({ message: "Giriş yapınız." })
    }
    const userList = dbcopycat.getById('lists', req.body.listId);
    if (userList.userId != session.user.id) {
        return res.status(500).send({ message: "List kullanıcıya ait değil" })
    }

    userList.tasks.push({
        id: uid4(),
        text: req.body.taskText,
    });
    dbcopycat.update('lists', userList);
    return res.status(201).send(userList)

}

export default handler;