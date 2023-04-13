import { html, render } from './node_modules/lit-html/lit-html.js';

let students = Object.values(await getStudents());
let tbody = document.querySelector('tbody');
update();

function update(match = '') {
   let res = students.map(s => template(s, compare(s, match)));
   render(res, tbody);
}

async function getStudents() {
   let response = await fetch('http://localhost:3030/jsonstore/advanced/table');
   return await response.json();
}

function template(student, select) {
   return html`
   <tr class=${select ? 'select' : ''}>
      <td>${student.firstName} ${student.lastName}</td>
      <td>${student.email}</td>
      <td>${student.course}</td>
   </tr>
   `;
}

function compare(student, match) {
   return Object.values(student)
      .some(s => s.toLowerCase().includes(match.toLowerCase()) && match);
}

document.getElementById('searchBtn').addEventListener('click', (e) => {
   e.preventDefault();
   let match = document.getElementById('searchField');
   update(match.value);
   match.value = '';
})