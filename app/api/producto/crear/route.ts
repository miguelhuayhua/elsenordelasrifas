import { NextRequest } from "next/server";
import { Producto } from "@prisma/client";
const secret = process.env.NEXTAUTH_SECRET;
import { getToken } from "next-auth/jwt";
import { prisma } from "@/app/api/auth/client";
import { backendClient } from "../../edgestore/[...edgestore]/edgestore-server";
const POST = async (request: NextRequest) => {
    const token = await getToken({ req: request, secret })
    if (token) {
        let { nombre, imagen } = await request.json() as Producto;
        try {
            await backendClient.publicFiles.confirmUpload({ url: imagen });
            const Producto = await prisma.producto.create({
                data: {
                    nombre, imagen
                }
            });
            return Response.json({ error: false, mensaje: `${Producto.nombre} creado con éxito.` })
        } catch (error) {
            console.log(error)
            return Response.json({ error: true, mensaje: 'Error al insertar un producto' })
        }
    }
    else
        return Response.json({ message: 'Token de acceso no válido' }, { status: 403 });
}
export { POST };