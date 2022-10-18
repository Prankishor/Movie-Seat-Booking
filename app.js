//DOM ACCESS

const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');

const count = document.getElementById('count');
const total = document.getElementById('total');

const movieSelect = document.getElementById('movie');


//Populate UI from Local Storage
populateUI();

//short way to change string to num is to add + sign infront
let ticketPrice = +movieSelect.value;


//FUNCTIONS

//Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

//Update total and Count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll
        ('.row .seat.selected');
    //console.log(selectedSeats);

    //spread, map = iterates and returns a value, 
    const seatsIndex = [...selectedSeats].map(function (seat) {

        //returning array with indexs of selected seats
        return [...seats].indexOf(seat);
    });

    //Built in for storing locally
    //setItem stores key value pairs
    //using JSON.stringify to convert the array into storable format
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    //console.log(seatsIndex);

    const SelectedSeatsCount = selectedSeats.length;
    count.innerText = SelectedSeatsCount;
    total.innerText = SelectedSeatsCount * ticketPrice;
}

function populateUI() {
    //Parsing it back to JSON (Object)
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            //if any index we searching for is not there, by default it gives negative 1
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

//EVENT LISTENERS

//Movie select event
movieSelect.addEventListener('change', (e) => {
    ticketPrice = +e.target.value;

    //To save movie, e.target.selectedIndex gives the index 
    setMovieData(e.target.selectedIndex, e.target.value);

    updateSelectedCount();
})

//Seat click event
container.addEventListener('click', (e) => {

    //target gives the info about the element you click on
    //console.log(e.target);

    //See different info you can using event
    //console.log(e);

    if (e.target.classList.contains('seat') &&
        !e.target.classList.contains('occupied')) {
        //console.log(e.target);

        //interchanging seat with selected classname with toggle
        //If you click again, it will change selected to seat
        e.target.classList.toggle('selected');

        updateSelectedCount();

    }
})


//initial count and total after reload
updateSelectedCount();