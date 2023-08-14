var list = [];
var completed_list = [];
var pending_list = [];
var total_list = [];
var add_Button = document.getElementById('addbtn');
var input = document.getElementById('add-input');
var delete_all_button = document.getElementById('delete-all');
var delete_selected_button = document.getElementById('delete-selected');
var all_tasks = document.getElementById('all-tasks');

add_Button.addEventListener('click', add);

delete_all_button.addEventListener('click', deleteall);

delete_selected_button.addEventListener('click', deleteseleted);

document.addEventListener('click', (e) => {
    if(e.target.className.split(' ')[0] == 'complete-task') {
        completeTask(e);
    }
    if(e.target.className.split(' ')[0] == 'delete-task') {
        deleteTask(e)
    }

    if(e.target.id == 'all'){
        viewAll();
    }
    if(e.target.id == 'pend'){
        viewPending();
    }
    if(e.target.id == 'comp'){
        viewCompleted();
    }
});

document.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') {
        add()
    }
});

function update() {
    completed_list = list.filter((e) => {
        return e.complete;
    })
    pending_list = list.filter((e) => {
        return !e.complete;
    })
    total_list = list.filter((e) => {
        return completed_list + pending_list;
    })

    document.getElementById('pend-count').innerText = pending_list.length.toString();
    document.getElementById('comp-count').innerText = completed_list.length.toString();
    document.getElementById('tot-count').innerText = list.length.toString();
}

function add() {
    var value = input.value;
    if(value === ''){
        alert('Please Enter a task :)')
        return;
    }
    list.push({
        task: value,
        id: Date.now().toString(),
        complete: false
    });
    input.value = '';

    update();
    addinmain(list);
}

function addinmain(list) {
    all_tasks.innerHTML = "";
    list.forEach(element => {
        var x = `<li id=${element.id} class="item">
    <p id="task">📝 ${element.complete ? `<strike>${element.task}</strike>` : element.task}</p>
    <div class="todo-actions">
                <button class="complete-task">complete</button>
                <button class="delete-task" >
                Delete</i>
                </button>
            </div>
        </li>`
    all_tasks.innerHTML += x;
    });
}
function deleteTask(e) {
    var deleted = e.target.parentElement.parentElement.getAttribute('id');
    list = list.filter((e) => {
        return e.id != deleted;
    })
    update();
    addinmain(list);
}
function completeTask(e) {
    var completed = e.target.parentElement.parentElement.getAttribute('id');
    list.forEach((obj) => {
        if(obj.id == completed) {
            if(obj.complete == false) {
                obj.complete = true;
                console.log(e.target.parentElement.parentElement);
                e.target.parentElement.parentElement.querySelector('#task').classList.add('Line');
            }
            else {
                obj.complete = false;
                e.target.parentElement.parentElement.querySelector('#task').classList.remove('Line');
            }
        }
    })
    update();
    addinmain(list)
}
function deleteall(task) {
    list = [];
    update();
    addinmain();
}
function deleteseleted(task) {
    list = list.filter((e) => {
        return !e.complete;
    })
    update();
    addinmain(list);
}
function viewCompleted() {
    addinmain(completed_list);
}
function viewPending() {
    addinmain(pending_list);
}
function viewAll() {
    addinmain(total_list);
}