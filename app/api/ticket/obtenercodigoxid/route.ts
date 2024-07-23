import { NextRequest } from "next/server";
const secret = process.env.NEXTAUTH_SECRET;
import { getToken } from "next-auth/jwt";
import { prisma } from "@/app/api/auth/client";
const POST = async (request: NextRequest) => {
    const token = await getToken({ req: request, secret })
    if (token) {
        let { rifaId } = await request.json();
        try {
            let LastTicket = await prisma.ticket.findFirst({
                where: {
                    rifaId
                },
                orderBy: { codigo: 'desc' }
            })
            return Response.json({ codigo: LastTicket ? (LastTicket.codigo + 1) : null })
        } catch (error) {
            console.log(error)
            return Response.json({ error: true, mensaje: 'Error al cambiar estado de la rifa' })
        }
    }
    else
        return Response.json({ message: 'Token de acceso no válido' }, { status: 403 });
}
export { POST };