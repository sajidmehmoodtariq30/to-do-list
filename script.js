let body = document.getElementsByTagName('body')[0];
let toggleBtn = document.getElementById('toggle');

// setting initial theme to dark
body.classList.add('dark');
toggleBtn.innerHTML = 'Light Mode';

toggleBtn.addEventListener('click', () => {
    if (body.classList.contains('dark')) {
        body.classList.remove('dark');
        body.classList.add('light');
        toggleBtn.innerHTML = 'Dark Mode';
    } else {
        body.classList.remove('light');
        body.classList.add('dark');
        toggleBtn.innerHTML = 'Light Mode';
    }
});

let input = document.getElementById('input');
let addbtn = document.getElementById('add');
let todoList = document.getElementById('todo-list');

addbtn.addEventListener('click', () => {
    if (input.value == "") {
        alert('Enter an input first')
    } else {
        createTodoItem(input.value);
        input.value = '';
    }
});

function createTodoItem(text) {
    let todo = document.createElement('li');
    let btndiv = document.createElement('div');
    let editbtn = document.createElement('button');
    let checkbtn = document.createElement('button')
    let deletebtn = document.createElement('button')

    todo.className = 'list-item'
    btndiv.className = 'btn-div'
    editbtn.innerText = 'Edit'
    checkbtn.innerText = 'Check'
    deletebtn.innerText = 'Delete'

    todo.textContent = text;
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
    });

    deletebtn.addEventListener('click', () => {
        let question = prompt('Are you Sure');
        if (question) {
            if (question.toLowerCase() === 'yes') {
                todo.remove();
                btndiv.remove()
            }
        } else {
            return;
        }
    });

    checkbtn.addEventListener('click', () => {
        if (todo.style.textDecoration == 'line-through') {
            checkbtn.innerHTML = 'Check'
            todo.style.textDecoration = 'none'
        }
        else {
            checkbtn.innerHTML = 'UnCheck'
            todo.style.textDecoration = 'line-through'
        }
    });
}