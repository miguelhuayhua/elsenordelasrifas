import { NextRequest } from "next/server";
import { Producto } from "@prisma/client";
const secret = process.env.NEXTAUTH_SECRET;
import { getToken } from "next-auth/jwt";
import { prisma } from "@/app/api/auth/client";
import { backendClient } from "../../edgestore/[...edgestore]/edgestore-server";
const POST = async (request: NextRequest) => {
    const token = await getToken({ req: request, secret })
    if (token) {
        let { nombre, imagen, id, ImagenPrev, valor, referencia } = await request.json() as Producto & { ImagenPrev: string };
        try {
            if (imagen && ImagenPrev) {
                if (imagen != ImagenPrev) {
                    await backendClient.publicFiles.deleteFile({ url: ImagenPrev });
                    await backendClient.publicFiles.confirmUpload({ url: imagen });

                }
            }
            if (imagen && !ImagenPrev) {
                await backendClient.publicFiles.confirmUpload({ url: imagen });
            }
            const Producto = await prisma.producto.update({
                where: { id },
                data: {
                    nombre, imagen, valor: +valor, referencia
                }
            });
            return Response.json({ error: false, mensaje: `${Producto.nombre} modificado con éxito.` })
        } catch (error) {
            console.log(error)
            return Response.json({ error: true, mensaje: 'Error al modificar un producto' })
        }
    }
    else
        return Response.json({ message: 'Token de acceso no válido' }, { status: 403 });
}
export { POST };