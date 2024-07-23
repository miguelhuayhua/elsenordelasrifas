import { DetalleRifa, Producto, Rifa, Ticket } from "@prisma/client";
import { BoxPaper, ButtonFilled } from "../Cajas"
import { Bold, Cursive, Normal } from "../Letras";
import Image from "next/legacy/image";
import { Box } from "@mui/material";
import { indigo, red } from "@mui/material/colors";
import { BsEye } from "react-icons/bs";
import { useRouter } from "next/navigation";
interface Props {
    Rifa: Rifa & { Ticket: Ticket[], DetalleRifa: (DetalleRifa & { Producto: Producto })[] };
}

const RifaBox = ({ Rifa }: Props) => {
    const router = useRouter();
    return (
        <BoxPaper>
            <Image src={Rifa.DetalleRifa[0].Producto.imagen} width={100} height={100} layout="responsive" />
            <Box p={0.5}>
                <Normal>
                    <b>Premio mayor: </b> {Rifa.DetalleRifa[0].Producto.nombre}
                </Normal>
                <Bold>Participantes:</Bold>
                <Bold sx={{ color: indigo[400] }}>
                    {Rifa.Ticket.length} / <span style={{ fontSize: 20, color: red[400] }}>{Rifa.participantes}</span>
                </Bold>
                <Cursive>
                    Valor de inscripción: <span style={{ color: indigo[400], fontSize: 18 }}>{Rifa.monto}</span> Bs.
                </Cursive>
                <ButtonFilled onClick={() => {
                    router.push(`/rifa/${Rifa.id}`)
                }}>
                    <BsEye />
                </ButtonFilled>
            </Box>
        </BoxPaper>
    )
}

export default RifaBox;