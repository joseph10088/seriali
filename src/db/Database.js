const DB_NAME = "seriali";
const DB_VERSION = 1;

export function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = function (event) {
            const db = event.target.result;

            if (!db.objectStoreNames.contains("seriali")) {
                db.createObjectStore("seriali", {
                    keyPath: "id",
                    autoIncrement: true
                });
            }

            if (!db.objectStoreNames.contains("nome_apparato")) {
                db.createObjectStore("nome_apparato", {
                    keyPath: "id",
                    autoIncrement: true
                });
            }
        };

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = () => {
            reject(request.error);
        };
    });
}