import Client from "./Client";
import { prisma } from "@/app/api/auth/client";
interface Props {
    params: { id: string }
}
const obtenerTicket = async (id: string) => {
    return await prisma.ticket.findUnique({ where: { id } })
}
export default async function Page({ params: { id } }: Props) {
    let Ticket = await obtenerTicket(id);
    return (

        <Client Ticket={Ticket as any} />
    );
}
