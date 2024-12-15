import Loki from 'lokijs';

const db = new Loki('taskLite.db');

const todoDocuments = db.addCollection('todos');

export { db, todoDocuments };
