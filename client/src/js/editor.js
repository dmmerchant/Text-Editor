// Import methods to save and get data from the indexedDB database in './database.js'
import { getDb, putDb, getOneDb } from './database';
import { header } from './header';

export default class {
  constructor() {
    const localData = localStorage.getItem('content');
    const selectRecord = document.getElementById('selectRecord');
    //This is the record that is selected. 0 means that a new record is to be created.
    this.currentID = 0;

    // check if CodeMirror is loaded
    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not loaded');
    }

    this.editor = CodeMirror(document.querySelector('#main'), {
      value: '',
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
      readOnly: 'nocursor'
    });


    // When the editor is ready, set the value to whatever is stored in indexeddb.
    // Fall back to localStorage if nothing is stored in indexeddb, and if neither is available, set the value to header.
    getDb().then((data) => {
      console.info('Loaded data from IndexedDB, injecting into editor');
      var dataText = this.parseData(data);
      const records = data.map(data => data.id)
      records.forEach(element => {
        let option = document.createElement("option");
        option.textContent = element;
        option.setAttribute('value',element)
        selectRecord.appendChild(option);

      });
      this.editor.setValue(dataText || localData || header);
    });

    this.editor.on('change', () => {
      localStorage.setItem('content', this.editor.getValue());
    });

    // Save the content of the editor when the editor itself is loses focus. Update the current ID so that if modified, the record gets modified rather than creating a new one.
    this.editor.on('blur', async () => {
      console.log('The editor has lost focus');
      var savedData = await putDb(localStorage.getItem('content'),this.currentID);
      console.log(this.currentID)
      if (this.currentID === 0) {
        let option = document.createElement("option");
        option.textContent = savedData;
        option.setAttribute('value',savedData)
        selectRecord.appendChild(option);
      }
      
      this.currentID = savedData;
    });
  }
  clearData() {
    this.editor.setOption('readOnly', false);
    this.currentID = 0;
    localStorage.setItem('content', '');
    this.editor.setValue(header);
  };

  // //This allows a user to save a record on demand using a button
  // async saveData() {
  //   var savedData = await putDb(localStorage.getItem('content'),this.currentID);
  //   if (this.currentID = 0) {
  //     let option = document.createElement("option");
  //     option.textContent = element;
  //     option.setAttribute('value',element)
  //     selectRecord.appendChild(option);
  //   }
  //   this.currentID = savedData;
  // }

  //This returns all of the records. A user cannot edit when viewing all records.
  getAll() {
    this.editor.setOption('readOnly','nocursor');
    getDb().then((data) => {
      console.info('Loaded data from IndexedDB, injecting into editor');
      var dataText = this.parseData(data);
      this.editor.setValue(dataText || "NO RECORDS IN EDITOR");
    });
  }
  
  //This returns a specific record and allows the user to modify it.
  getOne(id) {
    this.editor.setOption('readOnly', false);
    this.currentID = id
    console.log('this is the id:' + id)
    getOneDb(id).then((data) => {
      console.info('Loaded data from IndexedDB, injecting into editor');
      this.editor.setValue(data.content || "NO RECORD MATCHING THIS ID WAS FOUND");
    })
  }

  //This is a helper function that parses multiple records so that they can be shown in the editor.
  parseData(data) {
    var allResults = '';
    data.forEach(element => {
        allResults = `${allResults}RECORD NUMBER: ${element.id}
_ _ _ _ _ _ _

${element.content}
______________________________________________________________________________________

`
    });
    return allResults;
  }
}
