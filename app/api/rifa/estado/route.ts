import { NextRequest } from "next/server";
const secret = process.env.NEXTAUTH_SECRET;
import { getToken } from "next-auth/jwt";
import { prisma } from "@/app/api/auth/client";
const POST = async (request: NextRequest) => {
    const token = await getToken({ req: request, secret })
    if (token) {
        let { id, checked } = await request.json();
        try {
            await prisma.rifa.update({
                where: { id },
                data: { estado: checked }
            })
            return Response.json({ error: false, mensaje: `Rifa ${id} ${checked ? 'Activado' : 'Desactivado'}` })
        } catch (error) {
            console.log(error)
            return Response.json({ error: true, mensaje: 'Error al cambiar estado de la rifa' })
        }
    }
    else
        return Response.json({ message: 'Token de acceso no válido' }, { status: 403 });
}
export { POST };