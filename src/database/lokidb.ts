import Loki from 'lokijs';

interface Todo {
  id: number;
  todo: string;
  done: boolean;
}

let todoDocuments: Collection<Todo>;

function databaseInitialize(): void {
  const todos = db.getCollection<Todo>('todos');
  if (todos === null) {
    db.addCollection<Todo>('todos', {
      indices: ['id'], // TODO: indexed the collection for faster retrieval. Possibly overkill, so test and remove if not needed
    });
    console.log('New Collection Created');
  } else {
    console.log('Collection Loaded', todos.count(), 'todos found');
  }
  todoDocuments = todos;
}

const db = new Loki('taskLite.db', {
  autoload: true,
  autoloadCallback: databaseInitialize,
  autosave: true,
  autosaveInterval: 4000,
  persistenceMethod: 'localStorage',
  serializationMethod: 'pretty',
});

export { db, todoDocuments };
