const currentDate=new Date();
const dueDate=new Date(`<%= doc.dueDate%>`);
const statusValue = document.querySelector("#Status");
let handleCompleteStatus = () => {
    if (dueDate<currentDate) {
        statusValue.innerHTML = "Pending";
        statusValue.style.color="red";
    }
    else{
        statusValue.innerHTML="N/A";
        statusValue.style.color="blue";
    }
};

