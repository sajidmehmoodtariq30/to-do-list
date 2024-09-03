
let body = document.getElementsByTagName('body')[0];
let toggleBtn = document.getElementById('toggle');
let app = document.getElementById('app');
let login = document.getElementById('login');
let usrname = document.getElementById('usrname');
let password = document.getElementById('password');
let submit = document.getElementById('submit');
let input = document.getElementById('input');
let addbtn = document.getElementById('add');
let todoList = document.getElementById('todo-list');

// Load theme from localStorage
const theme = localStorage.getItem('theme') || 'dark';
body.classList.add(theme);
toggleBtn.innerHTML = theme === 'dark' ? 'Light Mode' : 'Dark Mode';

toggleBtn.addEventListener('click', () => {
    if (body.classList.contains('dark')) {
        body.classList.remove('dark');
        body.classList.add('light');
        toggleBtn.innerHTML = 'Dark Mode';
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.remove('light');
        body.classList.add('dark');
        toggleBtn.innerHTML = 'Light Mode';
        localStorage.setItem('theme', 'dark');
    }
});

// initial display
app.style.display = 'none'

submit.addEventListener('click', (e) => {
    e.preventDefault();
    if (usrname.value === 'sajidmtariq' && password.value === 'admin') {
        app.style.display = 'block';
        login.style.display = 'none';
    } else{
        alert('Wrong User Name or Password')
    }
});

// Load to-do list from localStorage
const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
storedTodos.forEach(todo => createTodoItem(todo.text, todo.checked));

addbtn.addEventListener('click', () => {
    if (input.value == "") {
        alert('Enter an input first');
    } else {
        createTodoItem(input.value, false);
        saveTodos();
        input.value = '';
    }
});

function createTodoItem(text, checked) {
    let todo = document.createElement('li');
    let btndiv = document.createElement('div');
    let editbtn = document.createElement('button');
    let checkbtn = document.createElement('button');
    let deletebtn = document.createElement('button');

    todo.className = 'list-item';
    btndiv.className = 'btn-div';
    editbtn.innerText = 'Edit';
    checkbtn.innerText = checked ? 'UnCheck' : 'Check';
    deletebtn.innerText = 'Delete';

    todo.textContent = text;
    todo.style.textDecoration = checked ? 'line-through' : 'none';
    todoList.appendChild(todo);
    btndiv.appendChild(editbtn);
    btndiv.appendChild(checkbtn);
    btndiv.appendChild(deletebtn);
    todoList.appendChild(btndiv);

    editbtn.addEventListener('click', () => {
        if (todo.isContentEditable) {
            todo.contentEditable = false;
            editbtn.textContent = todo.contentEditable ? 'Edit' : 'Save';
        } else {
            todo.contentEditable = true;
            editbtn.textContent = todo.contentEditable ? 'Save' : 'Edit';
        }
        saveTodos();
    });

    deletebtn.addEventListener('click', () => {
        let question = prompt('Are you sure?');
        if (question && question.toLowerCase() === 'yes') {
            todo.remove();
            btndiv.remove();
            saveTodos();
        }
    });

    checkbtn.addEventListener('click', () => {
        if (todo.style.textDecoration == 'line-through') {
            checkbtn.innerHTML = 'Check';
            todo.style.textDecoration = 'none';
        } else {
            checkbtn.innerHTML = 'UnCheck';
            todo.style.textDecoration = 'line-through';
        }
        saveTodos();
    });
}

// Save todos to localStorage
function saveTodos() {
    const todos = [];
    document.querySelectorAll('.list-item').forEach((todo, index) => {
        const checked = todo.style.textDecoration === 'line-through';
        todos.push({ text: todo.textContent, checked });
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}