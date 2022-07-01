import NextAuth from "next-auth/next"
import CredentialsProvider from 'next-auth/providers/credentials'
import dbcopycat from 'dbcopycat';
import bcrypt from 'bcryptjs';

export default NextAuth({
    session: { strategy: 'jwt' },
    callbacks: {
        async jwt({ token, user }) {
            if (user?.id) token.id = user.id;
            if (user?.isAdmin) token.isAdmin = user.isAdmin;
            return token;
        },
        async session({ session, token }) {
            if (token?.id) session.user.id = token.id;
            if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
            return session;
        }
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                const user = await dbcopycat.getById('users', x => x.email == credentials.email);

                // const validPassword = bcrypt.compareSync(credentials.password, credentials.password);

                if (user && bcrypt.compareSync(credentials.password, user.password)) {
                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        isAdmin: user.isAdmin
                    }
                }
                throw new Error('Invalid email or password');
            }
        }),
    ]
})