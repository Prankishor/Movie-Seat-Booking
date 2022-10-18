//DOM ACCESS

const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');

const count = document.getElementById('count');
const total = document.getElementById('total');

const movieSelect = document.getElementById('movie');

//short way to change string to num is to add + sign infront
let ticketPrice = +movieSelect.value;


//FUNCTIONS

//Update total and Count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll
        ('.row .seat.selected');
    //console.log(selectedSeats);
    const SelectedSeatsCount = selectedSeats.length;
    count.innerText = SelectedSeatsCount;
    total.innerText = SelectedSeatsCount * ticketPrice;
}


//EVENT LISTENERS

//Movie select event
movieSelect.addEventListener('change', (e) => {
    ticketPrice = +e.target.value;
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
