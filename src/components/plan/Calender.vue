<script setup>
import {ref} from "vue";
const currentMonth = ref("");
const calendarDays = ref("");

//let calendarDays = document.querySelector(".calendar-days");
let today = new Date();
let date = new Date();

console.log(today);
console.log(date);

currentMonth.value = date.toLocaleDateString("en-US", {month:'long', year:'numeric'});
console.log("month: "+currentMonth.value);
today.setHours(0,0,0,0);

renderCalendar();

function renderCalendar(){
    const prevLastDay = new Date(date.getFullYear(),date.getMonth(),0).getDate();
    const totalMonthDay = new Date(date.getFullYear(),date.getMonth()+1,0).getDate();
    const startWeekDay = new Date(date.getFullYear(),date.getMonth(),0).getDay();

    calendarDays.value="";

    let totalCalendarDay = 6 * 7;
    for (let i = 0; i < totalCalendarDay; i++) {
        let day = i-startWeekDay;

        if(i <= startWeekDay){
            // adding previous month days
            calendarDays.value += `${prevLastDay-i}`;
        }else if(i <= startWeekDay+totalMonthDay){
            // adding this month days
            date.setDate(day);
            date.setHours(0,0,0,0);

            let dayClass = date.getTime()===today.getTime() ? 'current-day' : 'month-day';
            calendarDays.value += `${day}`;
        }else{
            // adding next month days
            calendarDays.value += `${day-totalMonthDay}`;
        }
    }
}

document.querySelectorAll(".month-btn").forEach(function (element) {
	element.addEventListener("click", function () {
		date = new Date(currentMonth.value);
        date.setMonth(date.getMonth() + (element.classList.contains("prev") ? -1 : 1));
		currentMonth.value = date.toLocaleDateString("en-US", {month:'long', year:'numeric'});
		renderCalendar();
	});
});

document.querySelectorAll(".btn").forEach(function (element) {
	element.addEventListener("click", function () {
        let btnClass = element.classList;
        date = new Date(currentMonth.value);
        if(btnClass.contains("today"))
            date = new Date();
        else if(btnClass.contains("prev-year"))
            date = new Date(date.getFullYear()-1, 0, 1);
        else
            date = new Date(date.getFullYear()+1, 0, 1);

		currentMonth.value = date.toLocaleDateString("en-US", {month:'long', year:'numeric'});
		renderCalendar();
	});
});
</script>

<template>
  <div>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" rel="stylesheet"/>
    <div class="card">
      <div class="calendar-toolbar">
        <button class="prev month-btn">
          <i class="fas fa-chevron-left"></i>
        </button>
        <div class="current-month" v-html="currentMonth"></div>
        <button class="next month-btn">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
      <div class="calendar">
        <div class="weekdays">
          <div class="weekday-name">Su</div>
          <div class="weekday-name">Mo</div>
          <div class="weekday-name">Tu</div>
          <div class="weekday-name">We</div>
          <div class="weekday-name">Th</div>
          <div class="weekday-name">Fr</div>
          <div class="weekday-name">Sa</div>
        </div>
        <div class="calendar-days">{{ calendarDays }}</div>
      </div>
      <div class="goto-buttons">
        <button type="button" class="btn prev-year">Prev Year</button>
        <button type="button" class="btn today">Today</button>
        <button type="button" class="btn next-year">Next Year</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap");

* {
  margin: 0;
  padding: 0;
}

body {
  height: 100vh;
  background: rgb(238,174,202);
background: radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Quicksand", sans-serif;
  user-select: none;
}

.card {
  width: 316px;
  height: fit-content;
  background-color: #FFFFFF;
  border-radius: 15px;
  box-shadow: 0px 0px 10px #efefef;
}

.calendar-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #efefef;
}

.calendar-toolbar > .current-month {
  font-size: 20px;
  font-weight: bold;
  color: #19181a;
}

.calendar-toolbar > [class$="month-btn"] {
  width: 40px;
  aspect-ratio: 1;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
  color: #19181a;
  background: #f8f7fa;
  border: none;
  border-radius: 15px;
}

.weekdays,
.calendar-days {
  display: flex;
  flex-wrap: wrap;
  padding-inline: 18px;
}
.weekdays {
  padding-top: 12px;
}
.calendar-days {
  padding-bottom: 12px;
}

.weekday-name,
[class$="-day"] {
  width: 40px;
  height: 40px;
  color: #19181a;
  text-align: center;
  line-height: 40px;
  font-weight: 500;
  font-size: 1rem;
}

.weekday-name {
  color: #19181a;
  font-weight: 700;
}

.current-day {
  background-color: rgb(112, 71, 235);
  color: #f8f7fa;
  border-radius: 15px;
  font-weight: 700;
  transition: 0.5s;
  cursor: pointer;
}

.padding-day {
  color: #a5a5a5;
  user-select: none;
}

.calendar-toolbar > [class$="month-btn"]:hover,
.month-day:hover,
.btn:hover {
  border-radius: 15px;
  background-color: #f8f7fa;
  color: rgb(112, 71, 235);
  transition: 0.1s;
  cursor: pointer;
  box-shadow: inset 0px 0px 0px 1.5px rgb(112, 71, 235);
}

.calendar-toolbar > [class$="month-btn"]:focus,
.month-day:focus,
.btn:focus {
  border-radius: 15px;
  background-color: rgb(112, 71, 235);
  color: #f8f7fa;
}

.goto-buttons {
  border-top: 1px solid #efefef;
  padding-block: 18px;
  display: flex;
  justify-content: space-evenly;
}

.btn {
  background: #f8f7fa;
  border: none;
  border-radius: 15px;
  padding: 11px 13px;
  color: #19181a;
  font-family: "Quicksand", sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  margin-right: 1px;
  box-shadow: 0px 0px 0px #efefef;
}
</style>