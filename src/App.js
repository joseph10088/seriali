import { useEffect, useState } from 'react';
import './App.css';
import CreaNomeApparato from './components/CreaNomeApparato';
import CreaSeriale from './components/CreaSeriale';
import { eliminaSeriale, findAllSeriali } from './repository/SerialiRepo';
import { modSeriale } from './service/SerialeService';

function App() {

  const [seriali, setSeriali] = useState([]);
  const [page, setPage] = useState("");

  useEffect(() => {
    async function caricaSeriali() {
      const cercaSeriali = await findAllSeriali();

      setSeriali(cercaSeriali)
    }
    caricaSeriali();
  }, [seriali])

  async function modidicaPut(id, stato) {
    await modSeriale(id, stato);
  }

  async function deleteSeriale(id) {
    await eliminaSeriale(id);
  }

  return (
    <>
      <div className="container">
        <div className="flex card nav-btn">
          <button className='card nav' onClick={() => setPage("seriale")}>ADD SERIALE</button>
          <button className='card nav' onClick={() => setPage("nome-apparato")}>ADD NOME APPARATO</button>
          <button className='card nav' onClick={() => setPage("")}>LISTA NOME APPARATI</button>
        </div>
        <div className="mt">
          {page === "seriale" ? (
            <CreaSeriale />
          ) : (
            <CreaNomeApparato />
          )}
        </div>
      </div>
      <div className="container">
        {seriali.length === 0 ? (
          <p>SERIALI NON TROVATI</p>
        ) : (
          <div className="card flex card-seriali">
            {seriali.map((serialeTrovato) => (
              <div key={serialeTrovato.id} className="card flex w100">
                <p className='card w50'>{serialeTrovato.nomeApparatoId}</p>
                <p className='card w50'>{serialeTrovato.stato.toUpperCase()}</p>
                <p className='card w100'>{serialeTrovato.seriale}</p>

                <div className="flex seriale w100">
                  <button
                    className='card w50 delete'
                    onClick={() => deleteSeriale(serialeTrovato.id)}
                  >
                    DELETE
                  </button>

                  {serialeTrovato.stato === "assegnato" ? (
                    <button
                      className='card put w50'
                      onClick={() => modidicaPut(serialeTrovato.id, "disponibile")}
                    >
                      SET DISPONIBILE
                    </button>
                  ) : (
                    <button
                      className='card put w50'
                      onClick={() => modidicaPut(serialeTrovato.id, "assegnato")}
                    >
                      ASSEGNA
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
