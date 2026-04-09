const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend =
            '<div class="col s12 m4 reveal">' +
            '<div class="card">' +
            '<div class="card-image waves-effect waves-block waves-light">' +
            '<img class="activator" src="' + item.image + '">' +
            '</div>' +
            '<div class="card-content">' +
            '<span class="card-title activator">' + item.title + '<i class="material-icons right">more_vert</i></span>' +
            '<p><span class="genre-badge">' + item.genre + '</span> &nbsp;' +
            '<span class="year-text">' + item.year + '</span></p>' +
            '</div>' +
            '<div class="card-reveal">' +
            '<span class="card-title">' + item.title + '<i class="material-icons right">close</i></span>' +
            '<p><strong>Author:</strong> ' + item.author + '</p>' +
            '<p><strong>Genre:</strong> ' + item.genre + ' &nbsp;|&nbsp; <strong>Year:</strong> ' + item.year + '</p>' +
            '<p>' + item.description + '</p>' +
            '</div>' +
            '</div>' +
            '</div>';
        $("#card-section").append(itemToAppend);
    });
}

const getBooks = () => {
    $.get('/api/books', (response) => {
        if (response.statusCode === 200) {
            addCards(response.data);
            scrollReveal();
        }
    });
}

const formSubmitted = () => {
    const title = $('#book_name').val().trim();
    const author = $('#author_name').val().trim();
    const genre = $('#book_genre').val().trim();
    const year = parseInt($('#book_year').val().trim());
    const description = $('#book_desc').val().trim();

    if (!title || !author || !genre || !year || !description) {
        M.toast({ html: '⚠️ Please fill in all fields!', classes: 'rounded red darken-2' });
        return;
    }

    const bookData = {
        title: title,
        author: author,
        genre: genre,
        year: year,
        image: 'images/hp1.png',  // default image for user-submitted books
        description: description
    };

    $.ajax({
        url: '/api/books',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(bookData),
        success: function (response) {
            if (response.statusCode === 201) {
                M.toast({ html: '📖 Book added to the Library!', classes: 'rounded' });
                
                // Close the modal
                var modal = M.Modal.getInstance(document.getElementById('modal1'));
                if (modal) modal.close();

                // Add the new card dynamically without page reload
                addCards([response.data]);
                
                // Ensure the new card fades in
                setTimeout(() => {
                    $('.reveal').addClass('active');
                }, 100);

                // Clear form
                $('#book_name').val('');
                $('#author_name').val('');
                $('#book_genre').val('');
                $('#book_year').val('');
                $('#book_desc').val('');
            }
        },
        error: function (xhr) {
            const msg = xhr.responseJSON ? xhr.responseJSON.message : 'Something went wrong.';
            M.toast({ html: '❌ Error: ' + msg, classes: 'rounded red darken-2' });
        }
    });
}

const scrollReveal = () => {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
}

$(document).ready(function () {
    $('.materialboxed').materialbox();

    var modalElems = document.querySelectorAll('.modal');
    M.Modal.init(modalElems, {
        opacity: 0.8,
        inDuration: 500
    });

    $('#formSubmit').click(() => {
        formSubmitted();
    });

    getBooks();

    $(window).scroll(scrollReveal);

    $('#clickMeButton').click(() => {
        $('html, body').animate({ scrollTop: $('#card-section').offset().top - 80 }, 600);
        M.toast({ html: '✨ Welcome to the Archives!', classes: 'rounded' });
    });
});
