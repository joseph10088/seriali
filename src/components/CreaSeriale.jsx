import { useEffect, useState } from "react"
import { findAllApparati } from "../repository/NomeApparatoRepo"
import { creaSeriale } from "../service/SerialeService";
import { findAllSeriali } from "../repository/SerialiRepo";

const CreaSeriale = () => {

    const [NomeApparato, setNomeApparato] = useState([])
    const [seriale, setSeriale] = useState("");
    const [select, setSelect] = useState("1");
    const [error, setError] = useState("");
    console.log(select);


    useEffect(() => {
        async function cercaNomeApparati() {
            const cercaApparati = await findAllApparati();
            setNomeApparato(cercaApparati);
        }
        cercaNomeApparati();
    }, [])

    async function serialeSubmit(e) {
        e.preventDefault();

        const findSeriale = await findAllSeriali();

        const serialeTrovato = findSeriale.find(s => s.seriale === seriale);

        if (seriale === "") {
            setError("seriale e vuoto!")
            return;
        }

        if (serialeTrovato) {
            setError("seriale esistente!")
            return;
        }

        setError("");

        await creaSeriale(Number(select), seriale)
    }

    return (
        <form onSubmit={serialeSubmit} className='form-seriale'>
            <input className="card" type="text" placeholder="SERIALE" onChange={(e) => setSeriale(e.currentTarget.value)} />
            <p className="error">{error.toUpperCase()}</p>
            <div className="flex">
                <select onChange={(e) => setSelect(e.target.value)} value={select} name="nome-apparato" id="nome-apparato" className="card select">
                    {NomeApparato.map((NomeApparato) => {
                        return (
                            <option key={NomeApparato.id} value={NomeApparato.id}>{NomeApparato.nome.toUpperCase()}</option>
                        )
                    })}
                </select>
                <button type="submit" className="card button-salva-seriale">SALVA</button>
            </div>
        </form>
    )
}

export default CreaSeriale