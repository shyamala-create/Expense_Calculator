let expense = null;
const API_URL = "https://68554bf86a6ef0ed6632039e.mockapi.io/expenses/expenses";

// Fetch expense by ID
async function fetchExpenses(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();
    console.log("Fetched expense:", data);
    return data;
  } catch (error) {
    console.error("Error fetching expense:", error);
  }
}

// Fetch and display all categories
// Fetch and display all categories with delete option
async function fetchCategories() {
  try {
    const response = await fetch("https://68554bf86a6ef0ed6632039e.mockapi.io/expenses/categories");
    const categories = await response.json();

    const categoryContainer = document.querySelector('.categories');
    categoryContainer.innerHTML = ''; // Clear existing content

    const createUl = document.createElement('ul');
    categoryContainer.appendChild(createUl);

    categories.forEach((cat) => {
      const createLi = document.createElement('li');

      // Text content
      const text = document.createElement('span');
      text.textContent = `Category: ${cat.category}, Amount: ₹${cat.amount}`;
      text.style.flex = '1';

      // Delete icon
      const deleteBtn = document.createElement('span');
      deleteBtn.innerHTML = '🗑️';
      deleteBtn.style.cursor = 'pointer';
      deleteBtn.title = 'Delete this category';

      deleteBtn.addEventListener('click', async () => {
        const confirmed = confirm(`Are you sure you want to delete "${cat.category}"?`);
        if (!confirmed) return;

        try {
          const res = await fetch(`https://68554bf86a6ef0ed6632039e.mockapi.io/expenses/categories/${cat.category_id}`, {
            method: 'DELETE',
          });

          if (res.ok) {
            createLi.remove(); // Remove from UI
            alert("Category deleted successfully.");
          } else {
            alert("Failed to delete category.");
          }
        } catch (err) {
          console.error("Error deleting category:", err);
        }
      });

      // Style container
      createLi.style.display = 'flex';
      createLi.style.justifyContent = 'space-between';
      createLi.style.alignItems = 'center';
      createLi.style.padding = '0.5rem';
      createLi.style.borderBottom = '1px solid #ccc';

      createLi.appendChild(text);
      createLi.appendChild(deleteBtn);
      createUl.appendChild(createLi);
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}


// Update UI with fetched expense
function renderExpense(expense) {
  const incomeSpan = document.querySelector("#total-income");
  const expenseSpan = document.querySelector("#total-expense");
  const balanceSpan = document.querySelector("#net-balance");

  const incomeValue = parseFloat(expense.income || 0);
  const expenseValue = parseFloat(expense.amount || 0);

  incomeSpan.textContent = incomeValue;
  expenseSpan.textContent = expenseValue;
  balanceSpan.textContent = incomeValue - expenseValue;
}

// Main initializer
async function Main() {
  const params = new URLSearchParams(window.location.search);
  const ID = params.get("id");

  if (ID) {
    expense = await fetchExpenses(ID);
    renderExpense(expense);
  } else {
    console.warn("No ID found in query params");
  }

  document.querySelector(".AddExpenseButton").addEventListener("click", () => {
    window.location.href = "/pages/createForm.html";
  });

  fetchCategories();
}

Main();
