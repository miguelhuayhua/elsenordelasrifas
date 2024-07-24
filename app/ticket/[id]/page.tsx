import Client from "./Client";
import { prisma } from "@/app/api/auth/client";
interface Props {
    params: { id: string }
}
const obtenerTicket = async (codigo: string) => {
    return await prisma.ticket.findFirst({ where: { codigo: +codigo } })
}
export default async function Page({ params: { id } }: Props) {
    let Ticket = await obtenerTicket(id);
    return (

        <Client Ticket={Ticket as any} />
    );
}
