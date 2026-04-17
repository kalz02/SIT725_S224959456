document.addEventListener('DOMContentLoaded', () => {
    fetchBooks();
});

const fetchBooks = async () => {
    try {
        const response = await fetch('/api/books');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const books = await response.json();

        // Remove the loading spinner
        const loader = document.getElementById('loader');
        if (loader) loader.remove();

        renderStats(books);
        renderBooks(books);
    } catch (error) {
        console.error('Could not fetch books:', error);
        const booksList = document.getElementById('books-list');
        booksList.innerHTML = `
            <div style="text-align:center; padding:3rem 0; color:#ef4444;">
                <p>Failed to load books. Please try again later.</p>
            </div>
        `;
    }
};

/**
 * Render a small stats bar above the list
 */
const renderStats = (books) => {
    const statsBar = document.getElementById('stats-bar');

    // Count unique genres
    const genres = [...new Set(books.map(b => b.genre))];

    // Oldest & newest year
    const years = books.map(b => b.year);
    const oldest = Math.min(...years);
    const newest = Math.max(...years);

    statsBar.innerHTML = `
        <span class="stat-chip"><strong>${books.length}</strong> books</span>
        <span class="stat-chip"><strong>${genres.length}</strong> genres</span>
        <span class="stat-chip"><strong>${oldest}</strong> – <strong>${newest}</strong></span>
    `;
};

/**
 * Render the list of book cards
 */
const renderBooks = (books) => {
    const booksList = document.getElementById('books-list');

    if (books.length === 0) {
        booksList.innerHTML = '<p style="text-align:center; padding:2rem;">No books available.</p>';
        return;
    }

    books.forEach((book, index) => {
        // Card wrapper
        const card = document.createElement('div');
        card.className = 'book-card';
        card.setAttribute('data-index', index + 1);

        // Header row (title + badges)
        const header = document.createElement('div');
        header.className = 'book-header';

        const titleEl = document.createElement('h2');
        titleEl.className = 'book-title';
        titleEl.textContent = book.title;

        const badges = document.createElement('div');
        badges.className = 'book-badges';
        badges.innerHTML = `
            <span class="badge badge-genre">${book.genre}</span>
            <span class="badge badge-year">${book.year}</span>
        `;

        header.appendChild(titleEl);
        header.appendChild(badges);

        // Author
        const authorEl = document.createElement('p');
        authorEl.className = 'book-author';
        authorEl.innerHTML = `By <span>${book.author}</span>`;

        // Summary
        const summaryEl = document.createElement('p');
        summaryEl.className = 'book-summary';
        summaryEl.textContent = book.summary;

        // Assemble
        card.appendChild(header);
        card.appendChild(authorEl);
        card.appendChild(summaryEl);

        booksList.appendChild(card);
    });
};
