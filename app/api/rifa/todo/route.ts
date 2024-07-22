import { NextRequest } from "next/server";
import { prisma } from "../../auth/client";
const POST = async (request: NextRequest) => {
    try {
        const Rifas = await prisma.rifa.findMany({
            include: { DetalleRifa: { include: { Producto: true } } }
        });
        return Response.json(Rifas);
    } catch (error) {
        console.log(error)
        return Response.json([])
    }
}

export { POST };