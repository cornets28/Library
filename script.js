let myLibrary = [
	new Book(
		0,
		'Sample Book',
		'Sample author',
		100,
		true,
		'https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
	),
	new Book(
		1,
		'Sample Book 1',
		'Sample author 1',
		100,
		true,
		'https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
	),
	new Book(
		2,
		'Sample Book 2',
		'Sample author 2',
		100,
		true,
		'https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
	),
	new Book(
		3,
		'Sample Book 3',
		'Sample author 3',
		100,
		true,
		'https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
	)
];

render();

function render() {
	let library = document.querySelector('.library');
	library.innerHTML = '';
	myLibrary.forEach(book => {
		let bookHtml = `
    <div id=book-${book.id}>
      <p>${book.title}</p>
      <p>${book.author}</p>
      <p>${book.pages}</p>
      <p>Is Read: ${book.isRead}</p>
      <img src=${book.image} alt=${book.name}>
      <button>X</button>
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

	render();
}

document.querySelector('#add-book').addEventListener('click', addBookToLibrary);

document.querySelector('.library').addEventListener('click', event => {
	let deleteId = parseInt(event.target.parentNode.id.split('-')[1]);
	let ids = myLibrary.map(cur => cur.id);
	let index = ids.indexOf(deleteId);
	if (index !== -1) {
		myLibrary.splice(index, 1);
	}
	render();
});
