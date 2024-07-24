import { NextRequest } from "next/server";
import { Producto } from "@prisma/client";
const secret = process.env.NEXTAUTH_SECRET;
import { getToken } from "next-auth/jwt";
import { prisma } from "@/app/api/auth/client";
import { backendClient } from "../../edgestore/[...edgestore]/edgestore-server";
const POST = async (request: NextRequest) => {
    const token = await getToken({ req: request, secret })
    if (token) {
        let { id } = await request.json();
        try {
            await prisma.producto.delete({ where: { id } });
            return Response.json({ error: false, mensaje: `Producto eliminado con éxito.` })
        } catch (error) {
            console.log(error)
            return Response.json({ error: true, mensaje: 'Error al eliminar producto' })
        }
    }
    else
        return Response.json({ message: 'Token de acceso no válido' }, { status: 403 });
}
export { POST };