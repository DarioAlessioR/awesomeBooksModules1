/* eslint-disable linebreak-style */

import MyLinks from './modules/MyLinks.js';
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

const submitbtn = document.getElementById('submit');

function Mybooks() {
  if (books && books.length >= 0) {
    const displyBooks = document.querySelector('.bookslist');
    displyBooks.innerHTML = '';
    books.forEach((book) => {
      const list = document.createElement('li');
      const author = document.createElement('p');
      const btn = document.createElement('button');
      btn.innerHTML = 'Remove';
      author.innerHTML = `"${book.title}" by ${book.author}`;
      btn.setAttribute('id', book.id);
      btn.setAttribute('class', 'remove-btn');
      btn.setAttribute('onclick', `removeme(${book.id});`);
      list.appendChild(author);
      list.appendChild(btn);
      displyBooks.appendChild(list);
    });
  }
}

function addbook(title, author) {
  if (title.length < 2 && author.length < 1) {
    const message = document.getElementById('message');
    message.innerHTML = 'please, fill all input fields';
  } else {
    Book.addBook(books && books.length > 0 ? books[books.length - 1].id + 1 : 1, author, title);
    books = Book.getBooks();
    localStorage.setItem('books', JSON.stringify(books));
    Mybooks();
  }
}

submitbtn.addEventListener('click', () => {
  const title = document.getElementById('input-title');
  const author = document.getElementById('input-author');
  const titleIpnut = title.value;
  const authorIpnut = author.value;
  addbook(titleIpnut, authorIpnut);
  author.value = '';
  title.value = '';
});

function removeme(id) {
  Book.removeBook(Number(id));
  books = Book.getBooks();
  localStorage.setItem('books', JSON.stringify(books));
  Mybooks();
}

const Links = document.querySelectorAll('.links');
Links.forEach(MyLinks);

/*
function MyLinks(link) {
  link.addEventListener('click', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach((sec) => {
      sec.classList.add('hide');
      if (sec.classList.contains('showElement')) {
        sec.classList.remove('showElement');
      }
    });
    const section = document.querySelector(`section.${link.classList[1]}`);
    section.classList.add('showElement');
  });
}
*/

/*
const Links = document.querySelectorAll('.links');
Links.forEach((link) => {
  link.addEventListener('click', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach((sec) => {
      sec.classList.add('hide');
      if (sec.classList.contains('showElement')) {
        sec.classList.remove('showElement');
      }
    });
    const section = document.querySelector(`section.${link.classList[1]}`);
    section.classList.add('showElement');
  });
});
*/

/*

const aa = document.querySelector('.add-section');
const ll = document.querySelector('.list-section');
const cc = document.querySelector('.contact-section');
const lissec = document.querySelector('.books', '.list-section')
const lisadd = document.querySelector('.add', '.add-section')
const liscon = document.querySelector('.contact', '.contact-section')

ll.addEventListener('click', () => {
  lissec.classList.add('showElement');
  lissec.classList.remove('hide');
  lisadd.classList.add('hide');
  lisadd.classList.remove('showElement');
  liscon.classList.add('hide');
  liscon.classList.remove('showElement');
});

aa.addEventListener('click', () => {
  lissec.classList.add('hide');
  lissec.classList.remove('showElement');
  lisadd.classList.add('showElement');
  lisadd.classList.remove('hide');
  liscon.classList.add('hide');
  liscon.classList.remove('showElement');
});

cc.addEventListener('click', () => {
  lissec.classList.add('hide');
  lissec.classList.remove('showElement');
  lisadd.classList.add('hide');
  lisadd.classList.remove('showElement');
  liscon.classList.add('showElement');
  liscon.classList.remove('hide');
});
*/

const now = DateTime.now();
const dateTime = document.querySelector('.current-date');
dateTime.innerHTML = `Local date: ${now.toLocaleString(DateTime.DATE_FULL)} - Local time: ${now.hour}:${(now.minute)}:${(now.second)} hrs.`;

/*
dateTime.innerHTML = `${new Date().toLocaleDateString()},  ${new Date().toLocaleTimeString()}`;
*/

removeme();
Mybooks();
