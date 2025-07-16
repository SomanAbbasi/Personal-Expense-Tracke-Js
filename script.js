
//DOM Elements

const titleInput=document.getElementById('title');
const amountInput=document.getElementById('amount');
const expenseList = document.querySelector('.expense-list');

const totalAmount=document.getElementById('totalAmount');
const filterOption=document.getElementById('filterOption');

//Try to get saved expenses from local storage if null then it initlizes an empty array
let expenses=JSON.parse(localStorage.getItem('expenses')|| []);

function saveToLocalStorage()
{
    localStorage.setItem('expenses',JSON.stringify(expenses));
}

function addExpense()
{
    const title=titleInput.value.trim();
    let amount = parseFloat(amountInput.value.trim());

    if(!title || isNaN(amount) || amount<=0)
    {
        alert("Please enter a valid title and amount.");
        return;
    }

    const now=new Date();
    const date=now.toLocaleDateString();
    const time=now.toLocaleTimeString();

    const expense={
        id:Date.now(),
        title,
        amount,
        date,
        time

    };
    expenses.push(expense);
    saveToLocalStorage();

    renderExpense();
    titleInput.value='';
    amountInput.value='';

}

document.addEventListener('keydown',function(e){
    if(e.key=='Enter'){
        addExpense();
    }
})

function deleteExpense(id)
{
    //Create a new Array with all expense except the one matching id
    expenses=expenses.filter(exp=>exp.id!=id);
    saveToLocalStorage();
    renderExpense();
}

function renderExpense()
{
    expenseList.innerHTML=''; //Remove all current expense items

    let total=0;
    const filter=filterOption.value;
    const todayDate=new Date().toLocaleDateString();

    const filtered=expenses.filter(exp=>{
        return filter==='all' || exp.date===todayDate;
    });

    filtered.forEach(element => {
        total+=element.amount;

        const item=document.createElement('div');
        item.className='expense-item';
        item.innerHTML=`
        <div class="expense-item-details" >
        <span>${element.title} - Rs ${element.amount.toFixed(2)}</span>
        <span class="timestamp">${element.date} at ${element.time}</span>
        </div>
         <button class="delete-btn" onclick="deleteExpense(${element.id})">&times;</button>
        
        `
        expenseList.appendChild(item);

        
    });

    totalAmount.textContent=`Total: Rs ${total.toFixed(2)}`;

}

renderExpense(); //Load exiting data