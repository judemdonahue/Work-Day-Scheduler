// Sets starting hour of the workday to 9AM
let hourStart = dayjs().startOf('day').add(9,'h');
// totalHours = 9-5 = 9 hour work day
let totalHours = 9;
// Get current hour
let currentHour = dayjs().format('H');

let timeTableElement;
let currentState;

//Display and update current date function
function updateTime() {
    let time = dayjs().format('dddd, MMMM Do, HH:mma')
    $('#currentDay').text(time);
}
setInterval(updateTime, 30000);

function fillTimeTable() {
  for (let hour = 0; hour < totalHours; hour++) { 
    let realHour = hour + 8;
      timeTableElement = hourStart.add(hour, 'h').format('ha');

      // determine the currentState based on the conditions
      if (currentHour == realHour) {
          currentState = 'present';
      } else if (currentHour > realHour) {
          currentState = 'past';
      } else {
          currentState = 'future';
      }

      let appendPreset = 
          `<div id="hour-${realHour}" class="row time-block ${currentState}">
              <div class="col-md-1 hour">${timeTableElement}</div>
              <textarea class="col-md-10 description ${realHour}"></textarea>
              <button class="btn saveBtn col-md-1">
                  <i class="fas fa-save"></i>
              </button>
          </div>`;

      $(".preset").append(appendPreset);
  }
  loadSchedule();
}

// Saves user input in localStorage
function saveSchedule() {
    let keyName = $(this).parent().attr('id');
    let keyValue = $(this).parent().children().eq(1).val();

    localStorage.setItem(keyName, keyValue);
}

// Pulls from localStorage and display in scheduler
function loadSchedule() {

    for (let hour = 0; hour < totalHours; hour++) {
        let realHour = hour + 8;
        let loadedSchedule = localStorage.getItem(`hour-${realHour}`);

        $(`.${realHour}`).val(loadedSchedule);
    }

}

updateTime();
fillTimeTable();
$(document).on('click', '.saveBtn', saveSchedule);



