// Import methods to save and get data from the indexedDB database in './database.js'
import { getDb, putDb } from "./database";
import { header } from "./header";

export default class {
  constructor() {
    const localData = localStorage.getItem("content");
    if (typeof CodeMirror === "undefined") {
      throw new Error("CodeMirror is not loaded");
    }

    this.editor = CodeMirror(document.querySelector("#main"), {
      value: "",
      mode: "javascript",
      theme: "monokai",
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    /* When the editor is ready, set the value to whatever is stored in indexeddb.
       If nothing is stored at indexedDB, then load the Figlet Maverick hero text.*/
    getDb().then((data) => {
      console.info("Loaded data from IndexedDB, injecting into editor");
      const newContent = data[0]?.content || header;
      this.editor.setValue(newContent || localData);
    });

    this.editor.on("change", () => {
      localStorage.setItem("content", this.editor.getValue());
    });

    // Save the content of the editor when the editor itself is loses focus
    this.editor.on("blur", () => {
      console.log("The editor has lost focus");
      putDb(1, localStorage.getItem("content"));
    });
    // Save the content whenever there is a mouse down event - more convenient
    this.editor.on("mousedown", () => {
      console.log("mouse down event");
      putDb(1, localStorage.getItem("content"));
    });
  }
}
