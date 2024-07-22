import { Rifa } from "@prisma/client";
import { BoxPaper } from "../Cajas"

interface Props {
    Rifa: Rifa;
}

const RifaBox = ({ Rifa }: Props) => {
    return (
        <BoxPaper>
            hola
        </BoxPaper>
    )
}

export default RifaBox;