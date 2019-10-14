let myLibrary = [];

function Book(name, description, imageUrl) {
	this.name = name;
	this.description = description;
	this.imageUrl = imageUrl;
}

function addBookToLibrary() {
	const name = document.querySelector('#book-name').value;
	const description = document.querySelector('#book-description').value;
	const image = document.querySelector('#book-image').value;

	const book = new Book(name, description, image);

	myLibrary.push(book);
}

document.querySelector('#add-book').addEventListener('click', addBookToLibrary);
