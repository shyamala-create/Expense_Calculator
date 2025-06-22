//global variables
let API_URL = "https://68554bf86a6ef0ed6632039e.mockapi.io/expenses/expenses";


async function fetchExpenses() {
  try {
    const fetchExpense = await fetch(API_URL);

    const response = await fetchExpense.json();
    console.log("response from apis", response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

function renderExpenses(expense) {
  const getElement = document.querySelector(".lists");
  console.log(getElement);

  expense.forEach((response) => {
    //create list item
    const listTags = document.createElement("li");

    // create anchor tag inside li
    const a = document.createElement("a");
    a.textContent = response.user;

    //set href for a tag
    a.setAttribute("href", `/pages/addExpense.html?id=${response.id}`)

    listTags.appendChild(a);

    getElement.appendChild(listTags);
    console.log(listTags);

  });
}

// starting point
async function Main() {
  expense = await fetchExpenses();
  renderExpenses(expense);
}

Main();
