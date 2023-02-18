function start() {
    getAllStudents();

    document.getElementById('form').addEventListener('submit', createStudent);
}
start();

async function getAllStudents() {
    const students = await fetch('http://localhost:3030/jsonstore/collections/students');
    let res = await students.json();
    const rows = Object.values(res).map(createRow).join('');
    document.querySelector('tbody').innerHTML = rows;
}
function createRow(student) {
    return `<tr>
        <td>${student.firstName}</td>
        <td>${student.lastName}</td>
        <td>${student.facultyNumber}</td>
        <td>${student.grade}</td>
    </tr>`;
}

async function createStudent(event) {
    event.preventDefault();

    let formData = new FormData(event.target);

    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const facultyNumber = formData.get('facultyNumber');
    const grade = formData.get('grade');

    if (firstName && lastName && facultyNumber && Number(grade)) {
        const student = {
            firstName,
            lastName,
            facultyNumber,
            grade,
        };

        let students = await fetch('http://localhost:3030/jsonstore/collections/students', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(student),
        });
        await students.json();

        event.target.reset();
        getAllStudents();
    }
}