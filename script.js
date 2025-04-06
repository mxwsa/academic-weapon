// Burger Menu Toggle
const burgerMenu = document.getElementById('burger-menu');
const sidebar = document.getElementById('sidebar');
const burgerIcon = document.querySelector('.burger-icon');

burgerMenu.addEventListener('click', () => {
    sidebar.classList.toggle('open-sidebar');
    burgerIcon.classList.toggle('open');
});

// Dashboard Date and Notendurchschnitt
const currentDate = new Date();
const formattedDate = currentDate.toLocaleDateString('de-DE');
document.getElementById('current-date').textContent = formattedDate;

// Noten speichern und anzeigen
const gradeForm = document.getElementById('grade-form');
const subjectSelect = document.getElementById('subject');
const targetPointsInput = document.getElementById('target-points');
const earnedPointsInput = document.getElementById('earned-points');
const gradeInput = document.getElementById('grade');

const notes = [];

gradeForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const subject = subjectSelect.value;
    const targetPoints = targetPointsInput.value;
    const earnedPoints = earnedPointsInput.value;
    const grade = gradeInput.value;

    if (subject && targetPoints && earnedPoints && grade) {
        notes.push({ subject, targetPoints, earnedPoints, grade });
        alert('Note gespeichert!');

        // Clear form
        gradeForm.reset();
    }
});

// Anzeige der Noten und Durchschnitt
const averageGradeElement = document.getElementById('average-grade');
const appointmentsList = document.getElementById('upcoming-appointments');

// Durchschnitt berechnen
const calculateAverageGrade = () => {
    if (notes.length > 0) {
        const totalGrade = notes.reduce((acc, note) => acc + parseFloat(note.grade), 0);
        const average = (totalGrade / notes.length).toFixed(2);
        averageGradeElement.textContent = average;
    } else {
        averageGradeElement.textContent = '-';
    }
};

// Termine
const appointments = [
    { name: 'Mathe Schularbeit', date: '2025-04-10' },
    { name: 'Englisch Referat', date: '2025-04-15' },
];

appointments.forEach(appointment => {
    const li = document.createElement('li');
    const daysLeft = Math.floor((new Date(appointment.date) - new Date()) / (1000 * 60 * 60 * 24));
    li.textContent = `${appointment.name} - Noch ${daysLeft} Tage`;
    appointmentsList.appendChild(li);
});

calculateAverageGrade();
