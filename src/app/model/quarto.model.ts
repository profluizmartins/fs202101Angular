import { CategoriaQuarto } from "../enum/categoriaQuarto.enum";
import { Hotel } from "./hotel.model";

export interface Quarto {
    idQuarto?: number;
    hotel: Hotel;
    categoriaQuarto: CategoriaQuarto;
    nrQuarto: number,
    qtdLeito: number;
    prDiaria: number;
}


