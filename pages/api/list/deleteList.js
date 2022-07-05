import { getSession } from "next-auth/react"
import dbcopycat from 'dbcopycat';

const handler = async (req, res) => {
    const session = await getSession({ req });
    if (!session.user) {
        return res.status(401).send({ message: "Lütfen giriş yapınız" });
    }
    const list = dbcopycat.getById('lists', req.body.listId);
    if (list.userId != session.user.id) {
        return res.status(401).send({ message: "Bu işlem için yetkiniz yok." });
    }

    dbcopycat.deleteById('lists', req.body.listId);

    return res.status(201).send("Liste başarıyla silindi.");
}
export default handler;