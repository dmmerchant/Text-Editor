import { openDB, deleteDB } from 'idb';


// Exported initdb to use in index.js
export const initdb = async () =>
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

//Allows for the user to clear out the database
export const deleteJate = async () => {
  alert("Attempting to delete the database...");
  const deletedDB = await deleteDB('jate');
  return !deletedDB ? {result: true, message:"Database deleted Successfully!"} : {result: false, message:"Database FAILED to delete!"}
}
// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content, thisid) => {
  thisid = parseInt(thisid);
  var record = (thisid === 0) ? {content} : {id: thisid, content};
  console.log(`PUT to the database ${thisid}`);
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put(record);
  const result = await request;
  console.log('🚀 - data saved to the database', result);
  return result;
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET all from the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  // const result = await request;
  const result = await request;
  return result;
};


//Allows the user to find a record
export const getOneDb = async (id) => {
  console.log('GET from the database where ID = ' + id);
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.get(parseInt(id));
  const result = await request;
  return result;
};


initdb();
