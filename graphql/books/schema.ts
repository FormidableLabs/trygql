import {
  objectType,
  stringArg,
  nonNull,
  booleanArg,
  idArg,
  arg,
  inputObjectType,
} from 'nexus';

import data from './data/data.json';

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.nonNull.list.field('todos', { type: Todo });
    t.nonNull.list.field('writers', { type: Writer });
    t.nonNull.list.field('books', {
      type: Book,
      resolve() {
        return data.books;
      },
    });
    t.nonNull.list.field('stores', { type: Store });
    t.nonNull.list.field('employees', { type: Employee });
    t.nonNull.list.field('authors', { type: Author });
  },
});

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.nonNull.field('addTodo', {
      type: Todo,
      args: {
        text: nonNull(stringArg()),
        complete: nonNull(booleanArg()),
      },
    });
    t.nonNull.field('updateTodo', {
      type: Todo,
      args: {
        id: nonNull(idArg()),
        complete: nonNull(booleanArg()),
      },
    });
    t.nonNull.list.field('addTodos', {
      type: Todo,
      args: {
        newTodos: arg({ type: nonNull(NewTodosInput) }),
      },
    });
    t.nonNull.list.field('addWriters', {
      type: Writer,
      args: {
        newWriters: arg({ type: nonNull(NewWritersInput) }),
      },
    });
    t.nonNull.list.field('addBooks', {
      type: Book,
      args: {
        newBooks: arg({ type: nonNull(NewBooksInput) }),
      },
    });
    t.nonNull.list.field('addStores', {
      type: Store,
      args: {
        newStores: arg({ type: nonNull(NewStoresInput) }),
      },
    });
    t.nonNull.list.field('addEmployees', {
      type: Employee,
      args: {
        newEmployees: arg({ type: nonNull(NewEmployeesInput) }),
      },
    });
    t.nonNull.list.field('addAuthors', {
      type: Author,
      args: {
        newAuthors: arg({ type: nonNull(NewAuthorsInput) }),
      },
    });
  },
});

const Author = objectType({
  name: 'Author',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.string('name');
    t.nonNull.boolean('recognized');
    t.nonNull.field('book', { type: Book });
  },
});

const Book = objectType({
  name: 'Book',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.string('title');
    t.nonNull.boolean('published');
    t.nonNull.string('genre');
    t.nonNull.float('rating');
    t.field('review', { type: Review });
  },
});

const Employee = objectType({
  name: 'Employee',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.string('name');
    t.nonNull.string('origin');
  },
});

const Person = objectType({
  name: 'Person',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.string('name');
    t.nonNull.boolean('verfied');
  },
});

const Review = objectType({
  name: 'Review',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.int('score');
    t.nonNull.string('name');
    t.nonNull.field('reviewer', { type: Person });
  },
});

const Store = objectType({
  name: 'Store',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.string('name');
    t.nonNull.string('country');
  },
});
const Todo = objectType({
  name: 'Todo',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.string('text');
    t.nonNull.boolean('complete');
  },
});
const Writer = objectType({
  name: 'Writer',
  definition(t) {
    t.nonNull.id('id');
    t.string('name');
    t.nonNull.float('amountOfBooks');
    t.nonNull.boolean('recognized');
    t.nonNull.int('number');
    t.nonNull.string('interests');
  },
});

const NewAuthor = inputObjectType({
  name: 'NewAuthor',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.string('name');
    t.nonNull.boolean('recognized');
    t.nonNull.field('book', { type: NewBook });
  },
});
const NewAuthorsInput = inputObjectType({
  name: 'NewAuthorsInput',
  definition(t) {
    t.nonNull.list.field('authors', { type: NewAuthor });
  },
});
const NewBook = inputObjectType({
  name: 'NewBook',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.string('title');
    t.nonNull.boolean('published');
    t.nonNull.string('genre');
    t.nonNull.float('rating');
    t.field('review', { type: NewReview });
  },
});
const NewBooksInput = inputObjectType({
  name: 'NewBooksInput',
  definition(t) {
    t.nonNull.list.field('books', { type: NewBook });
  },
});
const NewEmployee = inputObjectType({
  name: 'NewEmployee',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.string('name');
    t.nonNull.string('origin');
  },
});
const NewEmployeesInput = inputObjectType({
  name: 'NewEmployeesInput',
  definition(t) {
    t.nonNull.list.field('employees', { type: NewEmployee });
  },
});
const NewPerson = inputObjectType({
  name: 'NewPerson',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.string('name');
    t.nonNull.boolean('verified');
  },
});
const NewReview = inputObjectType({
  name: 'NewReview',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.int('score');
    t.nonNull.string('name');
    t.nonNull.field('reviewer', { type: NewPerson });
  },
});
const NewStore = inputObjectType({
  name: 'NewStore',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.string('name');
    t.nonNull.string('country');
  },
});
const NewStoresInput = inputObjectType({
  name: 'NewStoresInput',
  definition(t) {
    t.nonNull.list.field('stores', { type: NewStore });
  },
});
const NewTodo = inputObjectType({
  name: 'NewTodo',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.string('text');
    t.nonNull.boolean('complete');
  },
});
const NewTodosInput = inputObjectType({
  name: 'NewTodosInput',
  definition(t) {
    t.nonNull.list.field('todos', { type: NewTodo });
  },
});
const NewWriter = inputObjectType({
  name: 'NewWriter',
  definition(t) {
    t.nonNull.id('id');
    t.string('name');
    t.nonNull.float('amountOfBooks');
    t.nonNull.boolean('recognized');
    t.nonNull.int('number');
    t.nonNull.string('interests');
  },
});
const NewWritersInput = inputObjectType({
  name: 'NewWritersInput',
  definition(t) {
    t.nonNull.list.field('writers', { type: NewWriter });
  },
});
