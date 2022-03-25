let listItem = [];
let totalIncome = 0;
let tboday = document.getElementById("tableBody");

let getAuthUser = JSON.parse(localStorage.getItem("authentication"));
console.log(getAuthUser);

if (getAuthUser) {
    let loginUser = document.getElementById("userData");
    loginUser.innerText = "Hello! " + getAuthUser.username;
}

let getList = localStorage.getItem('data');
if (getList) {
    listItem = JSON.parse(getList);
}

function addExpense() {
    event.preventDefault();

    let title = document.getElementById('inputTitle');
    let income = document.getElementById('inputIncome');
    let expense = document.getElementById('inputExpanse');

    let timeStamp = Date.now();
    let getDate = new Date(timeStamp).toDateString();
    
    console.log(getDate);

    const data = {
        id: Math.floor(Math.random() * 100),
        title: title.value,
        income: income.value,
        expense: expense.value,
        created_at: getDate,
        status: false,
        authenticated_email: getAuthUser.email
    }

    listItem.push(data);
    localStorage.setItem('data', JSON.stringify(listItem));

    title.value = '';
    income.value = '';
    expense.value = '';

    showExpenseList();
}

function showExpenseList() {
    tboday.innerHTML = ''

    let filteredData = listItem.filter(res => {
        return res.authenticated_email === getAuthUser.email
    })
    filteredData.forEach(function({id, title, income, expense, created_at, status}, index) {

        let tableRow = document.createElement("tr");
        tableRow.classList.add("table-row");

        let tableData1 = document.createElement("td");
        tableData1.innerHTML = id;
        tableRow.appendChild(tableData1)

        let tableData2 = document.createElement("td");
        tableData2.innerHTML = title;
        tableRow.appendChild(tableData2);

        let tableData3 = document.createElement("td");
        tableData3.innerHTML = income;
        tableRow.appendChild(tableData3);

        let tableData4 = document.createElement("td");
        tableData4.innerHTML = expense;
        tableRow.appendChild(tableData4);

        let tableData5 = document.createElement("td");
        tableData5.innerHTML = created_at;
        tableRow.appendChild(tableData5);

        let tableData6 = document.createElement("td");
        tableData6.innerHTML = status;
        tableRow.appendChild(tableData6);

        // let tableData7 = document.createElement("td");
        // let iconEdit = document.createElement("i");
        // let iconDelete = document.createElement("i");
        // iconEdit.classList.add("fa-solid",  "fa-pen-to-square");
        // tableData7.appendChild(iconEdit);
        // tableRow.appendChild(tableData7);
        // iconDelete.classList.add("fa-solid", "fa-trash");
        // tableData7.appendChild(iconDelete);
        // tableRow.appendChild(tableData7);

        tboday.appendChild(tableRow);
    });

    let filterList = listItem.filter(res => {
        return res.authenticated_email === getAuthUser.email
    })

    let diplayIncome = document.getElementById("totalIncome");
    diplayIncome.innerHTML = filterList.map(item => item.income).reduce(getSum, 0);
    diplayIncome.classList.add("totals");

    let diplayExpense = document.getElementById("totalExpense");
    diplayExpense.innerHTML = filterList.map(item => item.expense).reduce(getSum, 0);
    diplayExpense.classList.add("totals");

    let remaining = document.getElementById("remaining")
    remaining.innerHTML =  diplayIncome.innerHTML - diplayExpense.innerHTML;
    remaining.classList.add("totals");

    getSum(total, num);
}

function getSum(total, num) {
    return total + Math.round(num);
}
showExpenseList();

function signout() {
    localStorage.removeItem("authentication");
    window.location.href = "/login.html"
}