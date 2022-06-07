/* eslint-disable linebreak-style */
import mybooks from './modules/mybooks.js';
import manageLinks from './modules/managelinks.js';
import { DateTime } from './modules/luxon.min.js';

class Books {
  constructor() {
    this.id = '';
    this.author = '';
    this.title = '';
    this.books = [];
  }

  addBook(id, author, title) {
    this.id = id;
    this.author = author;
    this.title = title;
    this.books.push({ id: this.id, author: this.author, title: this.title });
  }

  removeBook(id) {
    this.books = this.books.filter((book) => book.id !== id);
  }

  getBooks() {
    return this.books;
  }

  setBooks(par) {
    this.books = par;
  }
}

const Book = new Books();

if (localStorage.getItem('books') !== null && localStorage.getItem('books') !== undefined) {
  Book.setBooks(JSON.parse(localStorage.getItem('books')));
}
let books = Book.getBooks();

function addbook(title, author) {
  if (title.length < 2 && author.length < 1) {
    const message = document.getElementById('message');
    message.innerHTML = 'please, fill all input fields';
  } else {
    Book.addBook(
      books.length > 0 ? books[books.length - 1].id + 1 : 1,
      author,
      title,
    );
    books = Book.getBooks();
    localStorage.setItem('books', JSON.stringify(books));
    mybooks(books);
  }
}

const submitbtn = document.getElementById('submit');

submitbtn.addEventListener('click', () => {
  const title = document.getElementById('input-title');
  const author = document.getElementById('input-author');
  const titleIpnut = title.value;
  const authorIpnut = author.value;
  addbook(titleIpnut, authorIpnut);
  author.value = '';
  title.value = '';
});

const removeBook = (Book, mybooks) => {
  const allBooks = document.querySelectorAll('.remove-btn');
  allBooks.forEach((oneBook) => {
    oneBook.addEventListener('click', (e) => {
      Book.removeBook(Number(e.target.id));
      const books = Book.getBooks();
      localStorage.setItem('books', JSON.stringify(books));
      mybooks(books);
      window.location.reload();
    });
  });
};

const now = DateTime.now();
const dateTime = document.querySelector('.current-date');
dateTime.innerHTML = `Local date: ${now.toLocaleString(DateTime.DATE_FULL)} - Local time: ${now.hour}:${(now.minute)}:${(now.second)} hrs.`;

mybooks(books);
manageLinks();
removeBook(Book, mybooks);
