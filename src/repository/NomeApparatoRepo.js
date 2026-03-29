import { openDatabase } from "../db/Database"

export async function salvaApparato(apparato) {
    const db = await openDatabase();
    console.log(apparato);


    return new Promise((resolve, reject) => {
        const transaction = db.transaction("nome_apparato", "readwrite");
        const store = transaction.objectStore("nome_apparato");
        const request = store.add(apparato);

        request.onsuccess = () => {
            resolve(request.result);
        }

        request.onerror = () => {
            reject(request.error);
        }
    })
}

export async function findAllApparati() {
    const db = await openDatabase();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction("nome_apparato", "readonly");
        const store = transaction.objectStore("nome_apparato");
        const request = store.getAll();

        request.onsuccess = () => {
            resolve(request.result);
        }

        request.onerror = () => {
            reject(request.error);
        }
    })
}

export async function findApparatiById(id) {
    const db = await openDatabase();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction("nome_apparato", "readonly");
        const store = transaction.objectStore("nome_apparato");
        const request = store.get(id);

        request.onsuccess = () => {
            resolve(request.result);
        }

        request.onerror = () => {
            reject(request.error);
        }
    })
}