import { NextRequest } from "next/server";
const secret = process.env.NEXTAUTH_SECRET;
import { getToken } from "next-auth/jwt";
import { prisma } from "@/app/api/auth/client";
const POST = async (request: NextRequest) => {
    const token = await getToken({ req: request, secret })
    if (token) {
        let { modo, ganador, id, segundo, tercero, totalIngresos } = await request.json();
        try {
            await prisma.ticket.deleteMany({
                where: { rifaId: id }
            })
            let Rifa = await prisma.rifa.update({
                where: { id },
                data: {
                    modo, ganador: ganador.toString(), estado: false,
                    segundo: (segundo || '').toString(), tercero: (tercero || '').toString(),
                    totalIngresos
                }
            })
            return Response.json({ error: false, mensaje: `Rifa ${Rifa.id} concluido.` })
        } catch (error) {
            console.log(error)
            return Response.json({ error: true, mensaje: 'Error al concluir la rifa.' })
        }
    }
    else
        return Response.json({ message: 'Token de acceso no válido' }, { status: 403 });
}
export { POST };