let myLibrary = [
	new Book(
		'Sample book 1',
		'sample description',
		'https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
	),
	new Book(
		'Sample book 2',
		'sample description',
		'https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
	),
	new Book(
		'Sample book 3',
		'sample description',
		'https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
	),
	new Book(
		'Sample book 4',
		'sample description',
		'https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
	),
	new Book(
		'Sample book 5',
		'sample description',
		'https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
	)
];

render();

function render() {
	let library = document.querySelector('.library');
	myLibrary.forEach((book, index) => {
		let bookID = myLibrary.length;
		let bookHtml = `
    <div id=book-${bookID}>
      <p>${book.name}</p>
      <p>${book.description}</p>
      <img src=${book.imageUrl} alt=${book.name}>
    </div>`;
		library.insertAdjacentHTML('beforeend', bookHtml);
	});
}

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

	render();
}

document.querySelector('#add-book').addEventListener('click', addBookToLibrary);
