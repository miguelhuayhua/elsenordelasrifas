import { DetalleRifa, Producto, Rifa, Ticket } from "@prisma/client";
import { BoxPaper, ButtonFilled } from "../Cajas"
import { Bold, Cursive, Normal } from "../Letras";
import Image from "next/legacy/image";
import { Box } from "@mui/material";
import { grey, indigo, red } from "@mui/material/colors";
import { useRouter } from "next/navigation";
import { MdRemoveRedEye } from "react-icons/md";
interface Props {
    Rifa: Rifa & { Ticket: Ticket[], DetalleRifa: (DetalleRifa & { Producto: Producto })[] };
}

const RifaBox = ({ Rifa }: Props) => {
    const router = useRouter();
    return (
        <BoxPaper sx={{ opacity: Rifa.estado ? 1 : 0.6, bgcolor: grey[50] }} >
            <Bold sx={{ textAlign: 'center', fontWeight: 900 }}>
                {Rifa.categoria}
            </Bold>
            {Rifa.DetalleRifa[0] ? <Image objectFit="cover" src={Rifa.DetalleRifa[0].Producto.imagen} width={100} height={100} layout="responsive" /> : null}
            <Box p={0.5}>
                <Normal>
                    {
                        Rifa.DetalleRifa[0] ? <>
                            <b>Premio mayor: </b> {Rifa.DetalleRifa[0].Producto.nombre}
                        </> : 'Sin asignar'

                    }
                </Normal>
                <Bold>Participantes:</Bold>
                <Bold sx={{ color: indigo[400] }}>
                    {Rifa.Ticket.length > Rifa.participantes ? Rifa.participantes : Rifa.Ticket.length} / <span style={{ fontSize: 20, color: red[400] }}>{Rifa.participantes}</span>
                </Bold>
                <Cursive>
                    Valor de inscripción: <span style={{ color: indigo[400], fontSize: 18 }}>{Rifa.monto}</span> Bs.
                </Cursive>
                <ButtonFilled disabled={!Rifa.estado} onClick={() => {
                    router.push(`/rifa/${Rifa.id}`)
                }}>
                    <MdRemoveRedEye fontSize={25} />
                </ButtonFilled>
            </Box>
        </BoxPaper>
    )
}

export default RifaBox;