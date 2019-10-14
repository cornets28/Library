const myLibrary = [];

render();

function render() {
	const library = document.querySelector('.library');
	library.innerHTML = '';

	libraryData = JSON.parse(localStorage.getItem('library') || '[]');

	libraryData.forEach(book => {
		let bookHtml = `
    <div id=book-${book.id}>
      <p>${book.title}</p>
      <p>${book.author}</p>
      <p>${book.pages}</p>
      <p>Is Read: ${book.isRead}</p>
      <img src=${book.image} alt=${book.name}>
      <button id="delete">X</button>
      <button id="toggle-read">${book.isRead ? 'Mark Unread' : 'Mark Read'}</button>
    </div>`;
		library.insertAdjacentHTML('beforeend', bookHtml);
	});
}

function Book(id, title, author, numPages, isRead, image) {
	this.id = id;
	this.title = title;
	this.author = author;
	this.numPages = numPages;
	this.isRead = isRead;
	this.image = image;
}

Book.prototype.toggleRead = function() {
	this.isRead = !this.isRead;
};

function addBookToLibrary(e) {
	e.preventDefault();
	const author = document.querySelector('#book-author').value;
	const title = document.querySelector('#book-title').value;
	const numPages = document.querySelector('#book-numPages').value;
	const isRead = document.querySelector('#book-isRead').checked;
	const image = document.querySelector('#book-image').value;

	// Create id from last item's id
	let id;
	if (myLibrary.length > 0) {
		id = myLibrary[myLibrary.length - 1].id + 1;
	} else {
		id = 0;
	}

	const book = new Book(id, title, author, numPages, isRead, image);
	myLibrary.push(book);

	localStorage.setItem('library', JSON.stringify(myLibrary));

	render();
}

document.querySelector('#add-book').addEventListener('click', addBookToLibrary);

function deleteBook(event) {
	const index = getIndex(event);
	if (index !== -1) {
		myLibrary.splice(index, 1);
	}

	localStorage.setItem('library', JSON.stringify(myLibrary));
	render();
}

function toggleRead(event) {
	const index = getIndex(event);
	if (index !== -1) {
		myLibrary[index].toggleRead();
	}
	localStorage.setItem('library', JSON.stringify(myLibrary));
	render();
}

function getIndex(event) {
	const id = parseInt(event.target.parentNode.id.split('-')[1]);
	const ids = myLibrary.map(cur => cur.id);
	return ids.indexOf(id);
}

document.querySelector('.library').addEventListener('click', event => {
	if (event.target.id === 'delete') {
		deleteBook(event);
	} else if (event.target.id === 'toggle-read') {
		toggleRead(event);
	}
});
