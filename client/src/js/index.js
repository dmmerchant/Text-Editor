import { Workbox } from 'workbox-window';
import { initdb , deleteJate} from './database'
import Editor from './editor';
import './database';
import '../css/style.css';

//Added new buttons
const butClearDB = document.getElementById('buttonClearDB');
const butGetAllDB = document.getElementById('buttonGetAllDB');
const selectedRecord = document.getElementById('selectRecord');
const butSave = document.getElementById('buttonSave');
const butNew = document.getElementById('buttonNew');


const main = document.querySelector('#main');
main.innerHTML = '';

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

const editor = new Editor();

if (typeof editor === 'undefined') {
  loadSpinner();
}

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // register workbox service worker
  const workboxSW = new Workbox('/src-sw.js');
  workboxSW.register();
} else {
  console.error('Service workers are not supported in this browser.');
}

//Allows the user to clear the database
butClearDB.addEventListener('click', async () => {
  var deleteDB = await deleteJate();
  alert(deleteDB.message)
  if (deleteDB.result){
    await initdb();
    editor.clearData();
    selectRecord.innerHTML = `<option value="0"></option>`;
  }
});

// //Allows the user to save using a button
// butSave.addEventListener('click',async () => {
//   editor.saveData();
// });

//Allows the user to create a new record. The editor is cleared out and only the HEADER is shown.
butNew.addEventListener('click',async () => {
  editor.clearData();
});


//
selectedRecord.addEventListener('change',async (event) => {
  editor.getOne(event.target.value);
});

//User can see all records
butGetAllDB.addEventListener('click',async () => {
  editor.getAll();
});