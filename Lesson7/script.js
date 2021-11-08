// ДЗ по fetch та async/await
// — Потрібно за допомогою fetch та async/await витягнути дані з OMDb API.
// — Витягуємо дані по імені фільму
// — Дані розпарсуємо на сторінці
// — При натисканні на More Details має відкритися модалка з усіма
// даними про той фільм.
// — Все має працювати.

const getS = selector => document.querySelector(selector);
const srch = getS('#searching');
const block = document.getElementsByClassName('block');
const movie_title = document.getElementsByClassName('movie_title');
const type = document.getElementsByClassName('type');
const release = document.getElementsByClassName('release');
const image = document.getElementsByClassName('image');
const details = document.querySelectorAll('#details');
let data;
// get data from OMDb API
const getData = async () => {
    if (srch.value !== '') {
        const res = await fetch(`http://www.omdbapi.com/?s=${srch.value}&plot=full&apikey=c84fb9a6`);
        data = await res.json();
        getS('.wraper').classList.remove('hide');
        for (let i = 0; i < block.length; i++) {
            image[i].setAttribute('style', `background-image: url(${data.Search[i].Poster});`);
            movie_title[i].innerHTML = data.Search[i].Title;
            type[i].textContent = data.Search[i].Type;
            release[i].textContent = data.Search[i].Year;
        }
    } else {
        alert('Please, write movie name');
    }
};
//Details button
for (let i = 0; i < details.length; i++) {
    details[i].addEventListener('click', async function () {
        getS('.modal_window').classList.remove('hide');
        getS('.wraper').classList.add('hide');
        getS('.button_wraper').classList.add('hide');
        $('body').animate({
            backgroundColor: 'rgb(0, 0, 0)'
        }, 1000, function () {
            $('.modal_window').animate({
                opacity: '1.00'
            }, 3000, 'easeOutCubic');
        });
        const detail_res = await fetch(`http://www.omdbapi.com/?t=${data.Search[i].Title}&plot=full&apikey=c84fb9a6`);
        let detail_data = await detail_res.json();
        getS('.modal_image').setAttribute('style', `background-image: url(${data.Search[i].Poster});`);
        getS('.ganre').textContent = detail_data.Genre;
        getS('.modal_title').textContent = detail_data.Title;
        getS('.info').textContent = detail_data.Plot;
        getS('.writer').textContent = `Writen by: ${detail_data.Writer}.`;
        //getS('.info').insertAdjacentHTML('beforeend', `<div class="writer"><b>Writen by: </b> ${data.Writer}</div>`);
        getS('.directed').textContent = `Directed by: ${detail_data.Director}. `;
        getS('.starring').textContent = `Starring: ${detail_data.Actors}.`;
        getS('.box_offise').textContent = `Box_Offise: ${detail_data.BoxOffice}.`;
        getS('.avards').textContent = `Awards: ${detail_data.Awards}.`;
        if (detail_data.Ratings.length === 1) {
            getS('.ratings').innerHTML = `Ratings: ${detail_data.Ratings[0].Source}-${detail_data.Ratings[0].Value};`
        }
        if (detail_data.Ratings.length === 2) {
            getS('.ratings').innerHTML = `Ratings: ${detail_data.Ratings[0].Source}-${detail_data.Ratings[0].Value};
            ${detail_data.Ratings[1].Source}-${detail_data.Ratings[1].Value};`
        }
        if (detail_data.Ratings.length === 3) {
            getS('.ratings').innerHTML = `Ratings: ${detail_data.Ratings[0].Source}-${detail_data.Ratings[0].Value}; 
        ${detail_data.Ratings[1].Source}-${detail_data.Ratings[1].Value}; 
        ${detail_data.Ratings[2].Source}-${detail_data.Ratings[2].Value}.`
        }
    })
};
//Close modal window
$('.close_modal').on('click', function () {
    $('.modal_window').animate({
        opacity: '0.00'
    })
    $('body').animate({
        backgroundColor: 'rgb(92, 92, 92)'
    }, 1000, 'easeOutCubic');
    getS('.modal_window').classList.add('hide');
    getS('.wraper').classList.remove('hide');
    getS('.button_wraper').classList.remove('hide');
});