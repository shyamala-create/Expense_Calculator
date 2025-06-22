function Main() {
    const submitButton = document.querySelector(".submitButton");

    submitButton.addEventListener("click", (event) => {
        event.preventDefault();

        const category = document.querySelector("#category").value;
        const amount = document.querySelector("#amount").value;

        // Make an API call to save the expense
        fetch("https://68554bf86a6ef0ed6632039e.mockapi.io/expenses/categories", {
            method: 'POST',
            body: JSON.stringify({ category, amount }),
            headers: {
                'Content-Type': 'application/json' // fix header key
            }
        })
        .then((res) => res.json())
        .then((data) => {
            alert("New Expense category added");

            // Clear inputs
            document.querySelector("#category").value = "";
            document.querySelector("#amount").value = "";

            // Redirect to previous page
            window.history.back();
        })
        .catch((err) => {
            console.error("Error:", err);
        });
    });
}

Main();
