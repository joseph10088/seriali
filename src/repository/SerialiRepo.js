import { openDatabase } from "../db/Database"

export async function salvaSeriale(seriale) {

    const db = await openDatabase();

    return new Promise((resolve, reject) => {


        const transaction = db.transaction("seriali", "readwrite");

        const store = transaction.objectStore("seriali");

        const request = store.add(seriale);

        request.onsuccess = () => {
            resolve(request.result);
        }

        request.onerror = () => {
            reject(request.error);
        }
    })

}

export async function findAllSeriali() {

    const db = await openDatabase();

    return new Promise((resolve, reject) => {


        const transaction = db.transaction("seriali", "readonly");

        const store = transaction.objectStore("seriali");

        const request = store.getAll();

        request.onsuccess = () => {
            resolve(request.result);
        }

        request.onerror = () => {
            reject(request.error);
        }
    })

}

export async function findSerialiById(id) {

    const db = await openDatabase();

    return new Promise((resolve, reject) => {


        const transaction = db.transaction("seriali", "readonly");

        const store = transaction.objectStore("seriali");

        const request = store.get(id);

        request.onsuccess = () => {
            resolve(request.result);
        }

        request.onerror = () => {
            reject(request.error);
        }
    })

}

export async function modificaSeriale(seriale) {

    const db = await openDatabase();

    return new Promise((resolve, reject) => {


        const transaction = db.transaction("seriali", "readwrite");

        const store = transaction.objectStore("seriali");

        const request = store.put(seriale);

        request.onsuccess = () => {
            resolve(request.result);
        }

        request.onerror = () => {
            reject(request.error);
        }
    })

}

export async function eliminaSeriale(id) {

    const db = await openDatabase();

    return new Promise((resolve, reject) => {


        const transaction = db.transaction("seriali", "readwrite");

        const store = transaction.objectStore("seriali");

        const request = store.delete(id);

        request.onsuccess = () => {
            resolve(request.result);
        }

        request.onerror = () => {
            reject(request.error);
        }
    })

}