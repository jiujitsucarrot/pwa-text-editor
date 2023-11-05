import { openDB } from 'idb';

// Initialize the database
const initDb = async () => {
  const db = await openDB('jate', 1, {
    upgrade(database) {
      const store = database.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      store.createIndex('content', 'content');
    },
  });
  return db;
};

// Save content to the database
export const putDb = async (content) => {
  const db = await initDb();
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  await store.put({ content });
  await tx.done;
};

// Get all content from the database
export const getDb = async () => {
  const db = await initDb();
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  return store.getAll();
};

export const clearDb = async () => {
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  await store.clear();
  await tx.done;
};
