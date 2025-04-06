let grades = {}; // Objekt, um Noten nach Fächern zu speichern

document.getElementById('gradesForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Werte aus den Eingabefeldern holen
    const subject = document.getElementById('subject').value.trim();
    const maxPoints = parseFloat(document.getElementById('maxPoints').value);
    const earnedPoints = parseFloat(document.getElementById('earnedPoints').value);
    const grade = parseFloat(document.getElementById('grade').value);

    // Überprüfen, ob alle Felder ausgefüllt sind
    if (subject && !isNaN(maxPoints) && !isNaN(earnedPoints) && !isNaN(grade)) {
        // Noten in das grades Objekt eintragen
        if (!grades[subject]) {
            grades[subject] = []; // Falls das Fach noch nicht existiert, erstellen wir ein Array
        }
        grades[subject].push(grade);

        // Neue Zeile in der Tabelle einfügen
        const tableBody = document.getElementById('gradesTable').getElementsByTagName('tbody')[0];
        const newRow = tableBody.insertRow();

        newRow.insertCell(0).textContent = subject;
        newRow.insertCell(1).textContent = maxPoints;
        newRow.insertCell(2).textContent = earnedPoints;
        newRow.insertCell(3).textContent = grade;
        newRow.insertCell(4).textContent = calculateSubjectAverage(subject).toFixed(2); // Durchschnitt für Fach

        // Berechnung des Gesamt-Durchschnitts
        updateOverallAverage();

        // Eingabefelder zurücksetzen
        document.getElementById('gradesForm').reset();
    } else {
        alert('Bitte alle Felder ausfüllen!');
    }
});

// Funktion zur Berechnung des Durchschnitts für ein Fach
function calculateSubjectAverage(subject) {
    const subjectGrades = grades[subject];
    if (subjectGrades && subjectGrades.length > 0) {
        const sum = subjectGrades.reduce((acc, grade) => acc + grade, 0);
        return sum / subjectGrades.length;
    }
    return 0;
}

// Funktion zur Berechnung des Gesamt-Durchschnitts
function updateOverallAverage() {
    const allGrades = [];
    
    // Alle Noten aus den einzelnen Fächern sammeln
    for (let subject in grades) {
        allGrades.push(...grades[subject]);
    }

    // Gesamt-Durchschnitt berechnen
    const totalGrades = allGrades.length;
    const totalSum = allGrades.reduce((acc, grade) => acc + grade, 0);
    const overallAverage = (totalGrades === 0) ? 0 : (totalSum / totalGrades).toFixed(2);

    // Gesamt-Durchschnitt auf der Webseite anzeigen
    document.getElementById('averageGrade').textContent = overallAverage;
}
