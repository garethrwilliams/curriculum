const content = document.querySelector('.content');
const hour = document.querySelector('.hour');
const minute = document.querySelector('.minute');
const weekday = document.querySelector('.weekday');
const date = document.querySelector('.date');
const month = document.querySelector('.month');
const year = document.querySelector('.year');

content.addEventListener('click', () => {
  content.classList.toggle('full');
});

const d = new Date();
hour.innerText = d.getHours();
const minutes = d.getMinutes() + '';
minute.innerText = minutes.length < 2 ? `0${minutes}` : minutes;
weekday.innerText = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
][d.getDay()];
month.innerText = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
][d.getMonth()];
date.innerText = '' + d.getDate();
year.innerText = d.getFullYear();
