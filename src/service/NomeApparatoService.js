import { NomeApparato } from "../models/NomeApparato"
import { salvaApparato } from "../repository/NomeApparatoRepo";

export async function creaNomeApparato(nome) {

    const nomeApparato = new NomeApparato(nome, []);

    const id = await salvaApparato(nomeApparato);

    return nomeApparato;
}