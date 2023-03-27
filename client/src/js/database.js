import { openDB } from 'idb';

const initdb = async () =>
  openDB('mcte', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('mcte')) {
        console.log('mcte database already exists');
        return;
      }
      db.createObjectStore('mcte', { keyPath: 'id', autoIncrement: true });
      console.log('mcte database created');
    },
  });


export const putDb = async (id, content) => {
  console.log('PUT to the database');
  const mcteDb = await openDB('mcte', 1);
  const tx = mcteDb.transaction('mcte', 'readwrite');
  const store = tx.objectStore('mcte');
  const request = store.put({ id: id, content: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result);
}


export const getDb = async () => {
  console.log('GET from mcte database');
  const mcteDb = await openDB('mcte', 1);
  const transaction = mcteDb.transaction('mcte', 'readonly');
  const store = transaction.objectStore('mcte');
  const request = store.getAll();
  const result = await request;
  //debug
  console.log('result', result);
  return result;
}

initdb();
