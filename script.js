document.addEventListener("DOMContentLoaded", function () {
  const seatContainer = document.querySelector('.seat-map');
  const bookButton = document.getElementById('book-btn');
  const popup = document.getElementById('popup');
  const seatSelectionPopup = document.getElementById('seat-selection-popup');

  // Generate seat map and add to DOM
  const seatMap = generateSeatMap();
  seatContainer.innerHTML = seatMap;

  // ✅ Load booked seats AFTER seats exist in DOM
  loadBookedSeats();

  // Event listeners
  seatContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('seat')) {
      if (!e.target.classList.contains('booked')) {
        toggleSeatSelection(e.target);
        updateBookButtonText();
        showSeatSelectionPopup();
      } else {
        handleBookedSeatClick(e.target);
        updateBookButtonText();
      }
    }
  });

  bookButton.addEventListener('click', function () {
    bookSelectedSeats();
    updateBookButtonText();
    showPopup('Thanks for booking!');
    hideSeatSelectionPopup();
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      bookButton.click();
    }
  });

  // Functions
  function generateSeatMap() {
    let seatMapHTML = '';
    const rows = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','AA','AB'];
    const seatsPerRow = [32,28,28,28,28,28,28,20,20,20,20,20,20,20,20,28,28,28,28,28,28,28,28,28,28,28,26,22];
    
    for (let i = 0; i < rows.length; i++) {
      let rowClass = (rows[i] === 'O') ? 'row-O' : '';
      seatMapHTML += `<div class="row ${rowClass}">`;
      seatMapHTML += `<div class="row-name">${rows[i]}</div>`;
      
      if (['H','I','J','K','L','M','N','O'].includes(rows[i])) {
        seatMapHTML += `<div class="offset"></div>`.repeat(4);
      }
      if (rows[i] === 'AA') seatMapHTML += `<div class="offset"></div>`;
      if (rows[i] === 'AB') seatMapHTML += `<div class="offset"></div>`.repeat(3);

      for (let j = 1; j <= seatsPerRow[i]; j++) {
        seatMapHTML += `<div class="seat" data-seat="${rows[i]}${j}" data-click-count="0">${j}</div>`;
        if ((rows[i] === 'H' && j === 10) || (['I','J','K','L','M','N','O'].includes(rows[i]) && j === 10)) {
          seatMapHTML += `<div class="gap"></div>`;
        } else if (rows[i] === 'O' && j === seatsPerRow[i]) {
          seatMapHTML += `<div class="gap"></div>`;
        } else if ((rows[i] === 'B' && j === 14) || (rows[i] === 'C' && j === 14) || (rows[i] === 'D' && j === 14) ||
                   (rows[i] === 'E' && j === 14) || (rows[i] === 'F' && j === 14) || (rows[i] === 'G' && j === 14) ||
                   (rows[i] === 'P' && j === 14) || (rows[i] === 'Q' && j === 14) || (rows[i] === 'R' && j === 14) ||
                   (rows[i] === 'S' && j === 14) || (rows[i] === 'T' && j === 14) || (rows[i] === 'U' && j === 14) ||
                   (rows[i] === 'V' && j === 14) || (rows[i] === 'W' && j === 14) || (rows[i] === 'X' && j === 14) ||
                   (rows[i] === 'Y' && j === 14) || (rows[i] === 'Z' && j === 14) || (rows[i] === 'AA' && j === 13) ||
                   (rows[i] === 'AB' && j === 11)) {
          seatMapHTML += `<div class="gap"></div>`;
        }
      }
      seatMapHTML += `</div>`;
    }
    return seatMapHTML;
  }

  function toggleSeatSelection(seat) {
    seat.classList.toggle('selected');
  }

  function bookSelectedSeats() {
    const selectedSeats = document.querySelectorAll('.seat.selected');
    let bookedSeats = JSON.parse(localStorage.getItem('bookedSeats')) || [];

    selectedSeats.forEach(seat => {
      seat.classList.remove('selected');
      seat.classList.add('booked');
      seat.dataset.clickCount = '0';
      if (!bookedSeats.includes(seat.dataset.seat)) {
        bookedSeats.push(seat.dataset.seat);
      }
    });

    localStorage.setItem('bookedSeats', JSON.stringify(bookedSeats));
  }

  function loadBookedSeats() {
    let bookedSeats = JSON.parse(localStorage.getItem('bookedSeats')) || [];
    bookedSeats.forEach(seatNumber => {
      const seatElement = document.querySelector(`[data-seat="${seatNumber}"]`);
      if (seatElement) seatElement.classList.add('booked');
    });
  }

  function handleBookedSeatClick(seat) {
    let clickCount = parseInt(seat.dataset.clickCount, 10);
    clickCount++;
    if (clickCount >= 4) {
      seat.classList.remove('booked');
      seat.dataset.clickCount = '0';
      let bookedSeats = JSON.parse(localStorage.getItem('bookedSeats')) || [];
      bookedSeats = bookedSeats.filter(num => num !== seat.dataset.seat);
      localStorage.setItem('bookedSeats', JSON.stringify(bookedSeats));
    } else {
      seat.dataset.clickCount = clickCount;
    }
  }

  function updateBookButtonText() {
    const selectedSeats = document.querySelectorAll('.seat.selected');
    const count = selectedSeats.length;
    bookButton.textContent = count === 0 ? 'BOOK' : `${count} seat${count > 1 ? 's' : ''} selected`;
  }

  function showPopup(message) {
    popup.textContent = message;
    popup.classList.add('show');
    setTimeout(() => popup.classList.remove('show'), 2000);
  }

  function showSeatSelectionPopup() {
    const selectedSeats = document.querySelectorAll('.seat.selected:not(.booked)');
    let seatNumbers = Array.from(selectedSeats).map(seat => seat.dataset.seat).join(', ');
    seatSelectionPopup.textContent = `Seats selected: ${seatNumbers}`;
    seatSelectionPopup.classList.add('show');
  }

  function hideSeatSelectionPopup() {
    seatSelectionPopup.classList.remove('show');
  }
});
