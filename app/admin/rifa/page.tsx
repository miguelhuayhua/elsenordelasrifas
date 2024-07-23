import { prisma } from "@/app/api/auth/client";
import Client from "./Cliente";
const obtenerRifas = async () => {
    return await prisma.rifa.findMany({
        include: {
            DetalleRifa: { include: { Producto: true }, orderBy: { podio: 'asc' } },
            Ticket: true
        }
    });
}
export default async function Page() {
    let Rifa = await obtenerRifas();
    return (

        <Client Rifas={Rifa as any} />
    );
}
