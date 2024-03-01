import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Function to put data into the database
export const putDb = async (content) => {
  console.log('PUT to the database'); // Log to indicate putting data into the database

  // Open the database named 'jate' with version 1
  const contactDb = await openDB('jate', 1);

  // Start a transaction in read-write mode
  const tx = contactDb.transaction('jate', 'readwrite');

  // Access the object store named 'jate'
  const store = tx.objectStore('jate');

  // Put the data into the object store with an ID of 1
  const request = store.put({ id: 1, value: content });

  // Wait for the request to complete
  const result = await request;

  // Log the success message along with the result
  console.log('data saved to the database', result);
};

// Function to get data from the database
export const getDb = async () => {
  console.log('GET from the database'); // Log to indicate getting data from the database

  // Open the database named 'jate' with version 1
  const contactDb = await openDB('jate', 1);

  // Start a transaction in read-only mode
  const tx = contactDb.transaction('jate', 'readonly');

  // Access the object store named 'jate'
  const store = tx.objectStore('jate');

  // Get all data from the object store
  const request = store.getAll();

  // Wait for the request to complete
  const result = await request;

  // Log the retrieved data
  console.log('result.value', result);

  // Return the retrieved data (value property of result)
  return result?.value;
};

initdb();