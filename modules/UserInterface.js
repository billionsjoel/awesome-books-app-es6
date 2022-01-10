import Book from './Book.js';
import * as luxon from './Date.js';

// import * as luxon from '../node_modules/luxon/src/luxon.js';

const displayBooksHtml = document.querySelector('.books');
const addButton = document.querySelector('.add-btn');
const form = document.getElementById('form');
const listNav = document.querySelector('.list-nav');
const addBookNav = document.querySelector('.add-book-nav');
const contactNav = document.querySelector('.contact-nav');
const booksSection = document.getElementById('books');
const formSection = document.getElementById('add-books-form-section');
const contactSection = document.getElementById('contact');
const dateHtml = document.querySelector('.date');

const id = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
let bookHtml = '';
const storedBooks = JSON.parse(window.localStorage.getItem('addBookToStorage')) || [];
let allBooksList = [];
let backgroundColorChoice = 1;
let setBookBackgroundColor;

// print the date to the dom
dateHtml.innerHTML = `${luxon.today}`;

function showListNav() {
  // console.log('hey');
  if (listNav || addBookNav || contactNav) {
    listNav.style.color = 'blue';
    addBookNav.style.color = 'black';
    contactNav.style.color = 'black';
  }
  if (booksSection || formSection || contactSection) {
    booksSection.style.display = 'block';
    formSection.style.display = 'none';
    contactSection.style.display = 'none';
  }
}

function showAddForm() {
  if (listNav || addBookNav || contactNav) {
    listNav.style.color = 'black';
    addBookNav.style.color = 'blue';
    contactNav.style.color = 'black';
  }

  document.getElementById('add-books-form-section').style.display = 'block';
  document.getElementById('contact').style.display = 'none';
  document.getElementById('books').style.display = 'none';
}

function showContactSection() {
  if (listNav || addBookNav || contactNav) {
    listNav.style.color = 'black';
    addBookNav.style.color = 'black';
    contactNav.style.color = 'blue';
  }

  document.getElementById('add-books-form-section').style.display = 'none';
  document.getElementById('contact').style.display = 'block';
  document.getElementById('books').style.display = 'none';
}

class UI {
  // display books on UI
  static displayBooks() {
    showListNav();
    if (storedBooks !== null && storedBooks.length > 0) {
      storedBooks.forEach((book) => {
        backgroundColorChoice += 1;
        if (backgroundColorChoice % 2 > 0) {
          setBookBackgroundColor = 2;
        } else {
          setBookBackgroundColor = 1;
        }
        UI.printBook(book, setBookBackgroundColor);
      });
    } else {
      bookHtml = ' <div class="book"> <h2 class="book-title"> No books in the store at the moment! </h2> <hr> </div>';
      displayBooksHtml.innerHTML = bookHtml;
    }
  }

  static printBook(book, setBookBackgroundColor) {
    bookHtml = `
      <div class="book bg-${setBookBackgroundColor}"><div class="book-title">"${book.title}"<span class="book-author"> <small> By:  ${book.author} </small></span></div>
      <div><button class="remove-book button" onclick="UI.removeBook(${book.id} );"> Remove </button>
      </div></div>
      `;
    displayBooksHtml.innerHTML += bookHtml;
  }

  // add book to UI
  static addBook() {
    const title = form.elements.title.value;
    const author = form.elements.author.value;
    const book = new Book(id, title, author);

    allBooksList = storedBooks || [];

    allBooksList.push(book);

    localStorage.setItem('addBookToStorage', JSON.stringify(allBooksList));
    UI.printBook(book);
    form.reset();
    window.location.reload();
  }

  // remove book from UI
  static removeBook(bookId) {
    const result = storedBooks.filter(
      (storedBooks) => storedBooks.id !== bookId,
    );
    localStorage.setItem('addBookToStorage', JSON.stringify(result));
    window.location.reload();
  }
}

if (addButton) {
  addButton.addEventListener('click', UI.addBook);
}

const navGetList = document.querySelector('.list-nav');
if (navGetList) {
  navGetList.addEventListener('click', showListNav);
}

const getFormSection = document.querySelector('.add-book-nav');
if (getFormSection) {
  getFormSection.addEventListener('click', showAddForm);
}

const getContactSection = document.querySelector('.contact-nav');
if (getContactSection) {
  getContactSection.addEventListener('click', showContactSection);
}

const loadPage = document.addEventListener(
  'DOMContentLoaded',
  UI.displayBooks,
);

export { loadPage as default };

// Make UI class global and accessible everywhere
window.UI = UI;
