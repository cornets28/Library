const myLibrary = [];

const render = () => {
	let library = ``;

	const libraryData = JSON.parse(localStorage.getItem('library') || '[]');

	libraryData.forEach(book => {
		let bookHtml = `
    <tr id=book-${book.id}>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.numPages}</p>
	  	<td>Is Read: ${book.isRead}</td>
	  	<td><img width="30" height="40" src=${book.image} alt=${book.name}>
			<td>
				<button id="toggle-read">${book.isRead ? 'Mark Unread' : 'Mark Read'}</button>
				<button id="delete">Delete Book</button>
			</td>

      </td>
    </tr>`;
		library += bookHtml;
	});

	document.getElementById('table-body').innerHTML = library;
};

render();

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

const addBookToLibrary = e => {
	const author = document.querySelector('#book-author');
	const title = document.querySelector('#book-title');
	const numPages = document.querySelector('#book-numPages');
	const isRead = document.querySelector('#book-isRead');
	const image = document.querySelector('#book-image');

	// Create id from last item's id
	let id;
	if (myLibrary.length > 0) {
		id = myLibrary[myLibrary.length - 1].id + 1;
	} else {
		id = 0;
	}

	const book = new Book(id, title.value, author.value, numPages.value, isRead.checked, image.value);
	myLibrary.push(book);
	localStorage.setItem('library', JSON.stringify(myLibrary));

	render();
};

document.querySelector('#add-book').addEventListener('click', addBookToLibrary);

const deleteBook = event => {
	const index = getIndex(event);
	if (index !== -1) {
		myLibrary.splice(index, 1);
	}

	localStorage.setItem('library', JSON.stringify(myLibrary));
	render();
};

const toggleRead = event => {
	const index = getIndex(event);
	if (index !== -1) {
		myLibrary[index].toggleRead();
	}
	localStorage.setItem('library', JSON.stringify(myLibrary));
	render();
};

const getIndex = event => {
	const id = parseInt(event.target.parentNode.parentNode.id.split('-')[1]);
	const ids = myLibrary.map(cur => cur.id);
	return ids.indexOf(id);
};

document.querySelector('#table-body').addEventListener('click', event => {
	if (event.target.id === 'delete') {
		deleteBook(event);
	} else if (event.target.id === 'toggle-read') {
		toggleRead(event);
	}
});
