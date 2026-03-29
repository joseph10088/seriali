import React, { useState } from 'react'
import { findAllApparati } from '../repository/NomeApparatoRepo';
import { creaNomeApparato } from '../service/NomeApparatoService';

const CreaNomeApparato = () => {
    const [apparato, setApparato] = useState("");
    const [error, setError] = useState("");


    async function salvaApparato(e) {
        e.preventDefault()

        try {
            if (apparato === "") {
                setError("non puo essere vuoto!");
                return;
            }

            const cercaApparati = await findAllApparati();
            const apparatoEsistente = cercaApparati.find(a => a.nome === apparato);

            if (apparatoEsistente) {
                setError("apparato gia esistente!");
                return;
            }

            await creaNomeApparato(apparato);

            setError("");
            setApparato("");
            console.log("salvato con successo");
        } catch (err) {
            console.error("errore salvataggio:", err);
            setError("errore durante il salvataggio");
        }
    }
    return (
        <form onSubmit={salvaApparato} className='flex'>
            <input onChange={(e) => setApparato(e.currentTarget.value)} className='card input-apparato' type="text" />
            <button type='submit' className='card salva-apparato'>SALVA</button>
            <p className='error'>{error}</p>
        </form>
    )
}

export default CreaNomeApparato