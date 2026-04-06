const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = '<div class="col s12 m4 reveal">' +
            '<div class="card">' +
            '<div class="card-image waves-effect waves-block waves-light">' +
            '<img class="activator" src="' + item.image + '">' +
            '</div>' +
            '<div class="card-content">' +
            '<span class="card-title activator">' + item.title + '<i class="material-icons right">more_vert</i></span>' +
            '<p><a href="#">' + item.link + '</a></p>' +
            '</div>' +
            '<div class="card-reveal">' +
            '<span class="card-title">' + item.title + '<i class="material-icons right">close</i></span>' +
            '<p>' + item.description + '</p>' +
            '</div>' +
            '</div>' +
            '</div>';
        $("#card-section").append(itemToAppend);
    });
}

const formSubmitted = () => {
    let formData = {};
    formData.book_name = $('#book_name').val();
    formData.author_name = $('#author_name').val();
    formData.book_desc = $('#book_desc').val();
    console.log(formData);
    M.toast({html: 'Book submitted for review!', classes: 'rounded'});
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
    $('#formSubmit').click(() => {
        formSubmitted();
    });

    var modalElems = document.querySelectorAll('.modal');
    M.Modal.init(modalElems, {
        opacity: 0.8,
        inDuration: 500
    });

    $.get('/api/books', (response) => {
        if (response.statusCode === 200) {
            addCards(response.data);
            scrollReveal();
        }
    });

    $(window).scroll(scrollReveal);

    $('#clickMeButton').click(() => {
        M.toast({html: 'Insight unlocked!', classes: 'rounded'});
    });
});
