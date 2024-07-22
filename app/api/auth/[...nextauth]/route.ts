import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from "../client";
import bcrypt from 'bcrypt';
//IMPORTACIÓN DE BCRYPT
const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'credenciales',
            credentials: {
                usuario: { label: 'Usuario', type: 'text', placeholder: 'Introduzca su usuario' },
                password: { label: 'Contraseña', type: 'password' }
            },
            async authorize(credentials) {
                const usuario = credentials?.usuario as string;
                const password = credentials?.password;
                const res = await prisma.usuario.findFirst({
                    where: {
                        usuario: usuario.trim()
                    }

                });
                console.log(res)
                if (res) {
                    if (bcrypt.compareSync(password as string, res.password)) {
                        console.log('entra')
                        return {
                            id: res.id,
                            name: res.usuario
                        };
                    }
                    else {
                        console.log('error');
                        throw new Error('redirect');
                    }
                }
                else {
                    console.log('error');
                    throw new Error('redirect');
                }
            },
        }),

    ],
    pages: {
        signIn: '/entrejefe',
        newUser: '/',
    }
})

export { handler as GET, handler as POST };