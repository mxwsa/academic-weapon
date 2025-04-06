let users = JSON.parse(localStorage.getItem("users")) || {};
let currentUser = null;

let users = JSON.parse(localStorage.getItem("users")) || {};
let currentUser = null;

function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}

function toggleAuthForms(form) {
  document.getElementById("register").classList.add("hidden");
  document.getElementById("login").classList.add("hidden");
  document.getElementById(form).classList.remove("hidden");
}

function register() {
  const email = document.getElementById("reg-email").value.trim();
  const username = document.getElementById("reg-username").value.trim();
  const password = document.getElementById("reg-password").value;
  const repeat = document.getElementById("reg-password-repeat").value;

  if (!email || !username || !password || !repeat) {
    alert("Bitte fülle alle Felder aus!");
    return;
  }

  if (password !== repeat) {
    alert("Die Passwörter stimmen nicht überein.");
    return;
  }

  if (users[email]) {
    alert("Ein Benutzer mit dieser E-Mail existiert bereits.");
    return;
  }

  users[email] = {
    username: username,
    password: password,
    noten: [],
    termine: [],
    todos: []
  };

  saveUsers();
  alert("Registrierung erfolgreich. Du kannst dich nun einloggen.");
  toggleAuthForms('login');
}

function login() {
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;

  if (!users[email]) {
    alert("Kein Benutzer mit dieser E-Mail gefunden.");
    return;
  }

  if (users[email].password !== password) {
    alert("Falsches Passwort.");
    return;
  }

  currentUser = email;
  document.getElementById("auth-screen").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
  updateDashboard(); // Diese Funktion musst du selbst erstellen / übernehmen
  updateTodos();     // Diese Funktion ebenfalls
}

function logout() {
  currentUser = null;
  document.getElementById("app").classList.add("hidden");
  document.getElementById("auth-screen").classList.remove("hidden");
}

function toggleMenu() {
  document.getElementById("menu").classList.toggle("hidden");
}

function switchMenu(menuId) {
  document.querySelectorAll(".menu-section").forEach(el => el.classList.add("hidden"));
  document.getElementById(menuId).classList.remove("hidden");
  if (menuId === "uebersicht") updateUebersicht();
  if (menuId === "dashboard") updateDashboard();
  if (menuId === "todo") updateTodos();
}

function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}

function addNote() {
  const fach = document.getElementById("fach").value;
  const zu = parseFloat(document.getElementById("zuPunkte").value);
  const er = parseFloat(document.getElementById("erPunkte").value);
  const note = parseFloat(document.getElementById("note").value);
  users[currentUser].noten.push({ fach, zu, er, note });
  saveUsers();
  alert("Note gespeichert!");
}

function updateUebersicht() {
  const container = document.getElementById("notenliste");
  container.innerHTML = "";
  const noten = users[currentUser].noten;
  const fächer = [...new Set(noten.map(n => n.fach))];
  fächer.forEach(fach => {
    const gruppe = noten.filter(n => n.fach === fach).sort((a, b) => a.note - b.note);
    const block = document.createElement("div");
    block.innerHTML = `<h3>${fach}</h3>` + gruppe.map(n =>
      `<p>${n.note} (${n.er}/${n.zu})</p>`
    ).join("");
    container.appendChild(block);
  });
}

function addTermin() {
  const art = document.getElementById("termin-art").value;
  const datum = document.getElementById("termin-datum").value;
  users[currentUser].termine.push({ art, datum });
  saveUsers();
  alert("Termin hinzugefügt!");
}

function updateDashboard() {
  document.getElementById("greeting").textContent = "Hallo " + currentUser + "!";
  document.getElementById("today-date").textContent = "Heute ist: " + new Date().toLocaleDateString();

  const noten = users[currentUser].noten;
  const schnitt = noten.length ? (noten.reduce((a, b) => a + b.note, 0) / noten.length).toFixed(2) : "-";
  document.getElementById("schnitt").textContent = schnitt;

  const termine = users[currentUser].termine.sort((a, b) => new Date(a.datum) - new Date(b.datum));
  const heute = new Date();
  const liste = document.getElementById("naechste-termine");
  liste.innerHTML = "";
  termine.forEach(t => {
    const diff = Math.ceil((new Date(t.datum) - heute) / (1000 * 60 * 60 * 24));
    const item = document.createElement("li");
    item.textContent = `${t.art} am ${t.datum} – in ${diff} Tag(en)`;
    liste.appendChild(item);
  });
}

function addTodo() {
  const input = document.getElementById("todo-eingabe");
  const task = input.value;
  if (task) {
    users[currentUser].todos.push(task);
    input.value = "";
    updateTodos();
    saveUsers();
  }
}

function updateTodos() {
  const liste = document.getElementById("todo-liste");
  liste.innerHTML = "";
  users[currentUser].todos.forEach((task, i) => {
    const li = document.createElement("li");
    li.textContent = task;
    li.onclick = () => {
      users[currentUser].todos.splice(i, 1);
      updateTodos();
      saveUsers();
    };
    liste.appendChild(li);
  });
}
