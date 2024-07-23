import { NextRequest } from "next/server";
const secret = process.env.NEXTAUTH_SECRET;
import { getToken } from "next-auth/jwt";
import { prisma } from "@/app/api/auth/client";
import { Ticket } from "@prisma/client";
const POST = async (request: NextRequest) => {
    const token = await getToken({ req: request, secret })
    if (token) {
        let { codigo, nombre, rifaId } = await request.json() as Ticket;
        try {
            await prisma.ticket.create({
                data: { codigo, nombre, rifaId }
            })
            return Response.json({ error: false, mensaje: 'Ticket creado con éxito' })
        } catch (error) {
            console.log(error)
            return Response.json({ error: true, mensaje: 'Error al cambiar estado de la rifa' })
        }
    }
    else
        return Response.json({ message: 'Token de acceso no válido' }, { status: 403 });
}
export { POST };