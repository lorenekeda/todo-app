const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const dateTime = document.getElementById("datetime-picker")


function addTask(){
    if(inputBox.value === ''){
        alert("Please input an entry");
        return;
    } if(dateTime.value === ''){
        alert("Please select a date and time");
        return;

    }else {
        let li = document.createElement("li");
        li.innerHTML = `
        <span class="task-text">${inputBox.value}</span>
        <span class="task-datetime">${formatDateTime(dateTime.value)}</span>`;
        
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        span.classList.add("delete");
        li.appendChild(span);
        listContainer.appendChild(li);

        inputBox.value = "";
        dateTime.value="";
        saveData();
    }
    
}
function formatDateTime(dateTime){
    const options = {year: 'numeric', month: 'long', day: 'numeric', hour:'2-digit', minute: '2-digit'};
    return new Date(dateTime).toLocaleString(undefined,options);
}

listContainer.addEventListener("click", function(e){
    if(e.target.classList.contains("task-text") || e.target.classList.contains("task-datetime")){
        // Toggle the "checked" state of the task when clicking on text or datetime
        e.target.closest("li").classList.toggle("checked");
        saveData();
    } else if(e.target.classList.contains("delete")){
        // Remove the task when the delete button (×) is clicked
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}
function showList(){
    listContainer.innerHTML = localStorage.getItem("data") || "";
    
}
showList();