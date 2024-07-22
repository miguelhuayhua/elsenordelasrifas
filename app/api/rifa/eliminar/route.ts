import { NextRequest } from "next/server";
import { DetalleRifa, Producto, Rifa } from "@prisma/client";
const secret = process.env.NEXTAUTH_SECRET;
import { getToken } from "next-auth/jwt";
import { prisma } from "@/app/api/auth/client";
const POST = async (request: NextRequest) => {
    const token = await getToken({ req: request, secret })
    if (token) {
        let { id } = await request.json();
        try {
            let Rifa = await prisma.rifa.delete({
                where: {
                    id
                }
            })
            return Response.json({ error: false, mensaje: `Rifa ${Rifa.id} eliminado con éxito.` })
        } catch (error) {
            console.log(error)
            return Response.json({ error: true, mensaje: 'Error al crea la rifa' })
        }
    }
    else
        return Response.json({ message: 'Token de acceso no válido' }, { status: 403 });
}
export { POST };