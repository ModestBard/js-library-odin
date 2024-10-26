const myLibrary = []

function Book(title, author, pages, status, genre) {
  this.title = title
  this.author = author
  this.pages = pages
  this.status = status
  this.genre = genre
}

function addBookToLibrary(book) {
  myLibrary.push(book)
  displayBooks()
}

function displayBooks() {
  const bookContainer = document.getElementById("book-container")
  bookContainer.innerHTML = ""

  const filterStatus = document.getElementById("filter-status").value
  const filterGenre = document.getElementById("filter-genre").value

  const filteredBooks = myLibrary.filter((book) => {
    return (
      (filterStatus === "All" || book.status === filterStatus) &&
      (filterGenre === "All" || book.genre === filterGenre)
    )
  })

  filteredBooks.forEach((book, index) => {
    const bookCard = document.createElement("div")
    bookCard.classList.add("book-card")

    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Status: ${book.status}</p>
      <p>Genre: ${book.genre}</p>
      <button onclick="removeBook(${index})">Remove</button>
      <button onclick="toggleStatus(${index})">Toggle Status</button>
    `

    bookContainer.appendChild(bookCard)
  })
}

document.getElementById("new-book-btn").addEventListener("click", () => {
  document.getElementById("book-form-container").classList.toggle("hidden")
})

document
  .getElementById("book-form")
  .addEventListener("submit", function (event) {
    event.preventDefault()

    const title = document.getElementById("title").value
    const author = document.getElementById("author").value
    const pages = document.getElementById("pages").value
    const status = document.getElementById("status").value
    const genre = document.getElementById("genre").value

    const newBook = new Book(title, author, pages, status, genre)
    addBookToLibrary(newBook)

    document.getElementById("book-form").reset()
    document.getElementById("book-form-container").classList.add("hidden")
  })

document.getElementById("apply-filter").addEventListener("click", displayBooks)

function removeBook(index) {
  myLibrary.splice(index, 1)
  displayBooks()
}

function toggleStatus(index) {
  const statuses = ["Planning to Read", "Reading", "Read"]
  const currentStatusIndex = statuses.indexOf(myLibrary[index].status)
  myLibrary[index].status = statuses[(currentStatusIndex + 1) % statuses.length]
  displayBooks()
}
