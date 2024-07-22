import Client from "./Client";
import { prisma } from "@/app/api/auth/client";
interface Props {
    params: { id: string }
}
const obtenerRifa = async (id: string) => {
    return await prisma.rifa.findUnique({ where: { id }, include: { DetalleRifa: { include: { Producto: true } } } })
}
export default async function Page({ params: { id } }: Props) {
    let Rifa = await obtenerRifa(id);
    return (

        <Client Rifa={Rifa as any} />
    );
}
