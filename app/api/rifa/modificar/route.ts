import { NextRequest } from "next/server";
import { DetalleRifa, Producto, Rifa } from "@prisma/client";
const secret = process.env.NEXTAUTH_SECRET;
import { getToken } from "next-auth/jwt";
import { prisma } from "@/app/api/auth/client";
const POST = async (request: NextRequest) => {
    const token = await getToken({ req: request, secret })
    if (token) {
        let { id, participantes, DetalleRifa, descripcion } = await request.json() as Rifa & { DetalleRifa: (DetalleRifa & { Producto: Producto })[] };
        try {
            await prisma.detalleRifa.deleteMany({
                where: { rifaId: id }
            });
            let Rifa = await prisma.rifa.update({
                where: { id },
                data: {
                    participantes: +participantes,
                    descripcion,
                    DetalleRifa: { create: DetalleRifa.map(value => ({ podio: value.podio, productoId: value.productoId })) }
                }
            })
            return Response.json({ error: false, mensaje: `Rifa ${Rifa.id} modificado con éxito.` })
        } catch (error) {
            console.log(error)
            return Response.json({ error: true, mensaje: 'Error al editar la rifa' })
        }
    }
    else
        return Response.json({ message: 'Token de acceso no válido' }, { status: 403 });
}
export { POST };