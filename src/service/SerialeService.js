import { eliminaSeriale, findAllSeriali, findSerialiById, modificaSeriale, salvaSeriale } from "../repository/SerialiRepo"
import { findApparatiById } from "../repository/NomeApparatoRepo"
import { Seriale } from "../models/Seriale"

export async function creaSeriale(
    nomeApparato,
    nomeSeriale
) {

    const findNomeApparato = await findApparatiById(nomeApparato);

    const apparatoTrovato = findNomeApparato.id

    const seriale = new Seriale(nomeSeriale, apparatoTrovato, "disponibile");

    const id = await salvaSeriale(seriale);

    return seriale;

}

export async function modSeriale(id, stato) {

    const cercaSeriale = await findSerialiById(id);

    cercaSeriale.stato = stato;

    await modificaSeriale(cercaSeriale);
}