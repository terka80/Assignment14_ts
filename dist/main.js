"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    id;
    name;
    email;
    password;
    phone;
    _age;
    get age() {
        return this._age;
    }
    set age(value) {
        if (value < 18 || value > 60) {
            throw new Error("the age must be between 18 and 60");
        }
        this._age = value;
    }
    notebooks = [];
    constructor(id, name, email, password, phone, _age) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this._age = _age;
        this.age = _age;
    }
    displayInfo() {
        console.log(`USER INFO : 
        ID : ${this.id}
        NAME: ${this.name}
        EMAIL: ${this.email}
        PHONE: ${this.phone}
        AGE: ${this.age}
        `);
    }
    addNotebook(notebook) {
        this.notebooks.push(notebook);
    }
    getNotebooks() {
        return [...this.notebooks];
    }
}
class Admin extends User {
    constructor(id, name, email, password, phone, age) {
        super(id, name, email, password, phone, age);
    }
    manageNotes(notebook) {
        console.log(`Admin ${this.name} is managing notes...`);
        console.log(`Total notes: ${notebook.getNotesCount()}`);
        notebook.getAllNotes().forEach((note) => {
            console.log(`  - ${note.title}`);
        });
    }
}
class Note {
    id;
    title;
    content;
    userId;
    constructor(id, title, content, userId) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.userId = userId;
    }
    preview(length = 50) {
        if (this.content.length <= length) {
            return this.content;
        }
        return this.content.substring(0, length) + "...";
    }
}
class NoteBook {
    notes;
    constructor(notes = []) {
        this.notes = notes;
    }
    addNote(note) {
        this.notes.push(note);
        console.log(`Note "${note.title}" added.`);
    }
    removeNote(noteId) {
        const index = this.notes.findIndex((n) => n.id === noteId);
        if (index !== -1) {
            const removed = this.notes.splice(index, 1)[0];
            console.log(`Note "${removed.title}" removed.`);
        }
        else {
            console.log(`Note with ID ${noteId} not found.`);
        }
    }
    getAllNotes() {
        return [...this.notes];
    }
    getNotesCount() {
        return this.notes.length;
    }
}
class Storage {
    items = [];
    addItem(item) {
        this.items.push(item);
    }
    removeItem(item) {
        const index = this.items.indexOf(item);
        if (index !== -1) {
            this.items.splice(index, 1);
        }
    }
    getAllItems() {
        return [...this.items];
    }
}
const user1 = new User(1, "Mahmoud", "mahmoud@example.com", "terka123", "0101245587", 25);
user1.displayInfo();
const admin = new Admin(2, "Admin User", "admin@example.com", "admin123", "01098765432", 30);
admin.displayInfo();
const notebook1 = new NoteBook();
const note1 = new Note(101, "First Note", "This is the content of the first note. It contains important information about TypeScript OOP.", user1.id);
const note2 = new Note(102, "Second Note", "Another note with different content for testing the preview method and composition.", user1.id);
notebook1.addNote(note1);
notebook1.addNote(note2);
console.log("\nPreview of note1:", note1.preview());
console.log("Preview of note2:", note2.preview(40));
user1.addNotebook(notebook1);
console.log(`\nUser ${user1.name} owns ${user1.getNotebooks().length} notebook(s)`);
console.log("\n--- Admin managing notes ---");
admin.manageNotes(notebook1);
console.log("\n--- Removing a note ---");
notebook1.removeNote(101);
const noteStorage = new Storage();
noteStorage.addItem(note1);
noteStorage.addItem(note2);
console.log("\nItems in Storage:", noteStorage.getAllItems().length);
