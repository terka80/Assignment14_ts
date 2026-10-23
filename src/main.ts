class User {
  public get age(): number {
    return this._age;
  }

  public set age(value: number) {
    if (value < 18 || value > 60) {
      throw new Error("the age must be between 18 and 60");
    }
    this._age = value;
  }

  private notebooks: NoteBook[] = []; 

  constructor(
    public id: number,
    public name: string,
    public email: string,
    private password: string,
    protected phone: string,
    private _age: number
  ) {
    this.age = _age;
  }

  public displayInfo(): void {
    console.log(`USER INFO : 
        ID : ${this.id}
        NAME: ${this.name}
        EMAIL: ${this.email}
        PHONE: ${this.phone}
        AGE: ${this.age}
        `);
  }

  public addNotebook(notebook: NoteBook): void {
    this.notebooks.push(notebook);
  }

  public getNotebooks(): NoteBook[] {
    return [...this.notebooks];
  }
}

class Admin extends User {
  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    phone: string,
    age: number
  ) {
    super(id, name, email, password, phone, age);
  }

  public manageNotes(notebook: NoteBook): void {
    console.log(`Admin ${this.name} is managing notes...`);
    console.log(`Total notes: ${notebook.getNotesCount()}`);
    notebook.getAllNotes().forEach((note) => {
      console.log(`  - ${note.title}`);
    });
  }
}

class Note {
  constructor(
    public id: number,
    public title: string,
    public content: string,
    public userId: number
  ) {}

  public preview(length: number = 50): string {
    if (this.content.length <= length) {
      return this.content;
    }
    return this.content.substring(0, length) + "...";
  }
}

class NoteBook {
  constructor(private notes: Note[] = []) {}

  public addNote(note: Note): void {
    this.notes.push(note);
    console.log(`Note "${note.title}" added.`);
  }

  public removeNote(noteId: number): void {
    const index = this.notes.findIndex((n) => n.id === noteId);
    if (index !== -1) {
      const removed = this.notes.splice(index, 1)[0];
      console.log(`Note "${removed!.title}" removed.`);
    } else {
      console.log(`Note with ID ${noteId} not found.`);
    }
  }

  public getAllNotes(): Note[] {
    return [...this.notes];
  }

  public getNotesCount(): number {
    return this.notes.length;
  }
}

class Storage<T> {
  private items: T[] = [];

  public addItem(item: T): void {
    this.items.push(item);
  }

  public removeItem(item: T): void {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  public getAllItems(): T[] {
    return [...this.items];
  }
}


const user1 = new User(1, "Mahmoud", "mahmoud@example.com", "terka123", "0101245587", 25);
user1.displayInfo();

const admin = new Admin(2, "Admin User", "admin@example.com", "admin123", "01098765432", 30);
admin.displayInfo();

const notebook1 = new NoteBook();

const note1 = new Note(
  101,
  "First Note",
  "This is the content of the first note. It contains important information about TypeScript OOP.",
  user1.id
);

const note2 = new Note(
  102,
  "Second Note",
  "Another note with different content for testing the preview method and composition.",
  user1.id
);

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

const noteStorage = new Storage<Note>();
noteStorage.addItem(note1);
noteStorage.addItem(note2);
console.log("\nItems in Storage:", noteStorage.getAllItems().length);