import { NextRequest } from "next/server";
import { prisma } from "../../auth/client";
const POST = async (request: NextRequest) => {
    try {
        const Productos = await prisma.producto.findMany();
        return Response.json(Productos);
    } catch (error) {
        console.log(error)
        return Response.json([])
    }
}

export { POST };