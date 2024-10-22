// Arrays para guardar las transacciones de ingresos y egresos
let incomeTransactions = [];
let egressTransactions = [];

let totalIncome = 0;
let totalEgress = 0;

//-------- Funciones --------//

// Función para actualizar la lista de transacciones
function addTransaction() {
  // Obtener los valores de los campos del formulario
  const type = document.getElementById("transactionType").value;
  const description = document.getElementById("transactionDescription").value;
  const amount = parseFloat(document.getElementById("transactionAmount").value);

  // Valida que los campos no estén vacíos y que el monto sea un número positivo
  if (!type || !description || isNaN(amount) || amount <= 0) {
    alert("Por favor ingresa valores válidos en los campos.");
    return;
  }

  // Crea un nuevo objeto de transacción
  const transaction = {
    type: type,
    description: description,
    amount: amount,
  };

  // Añade la transacción al array correspondiente
  if (type === "income") {
    incomeTransactions.push(transaction);
  } else if (type === "egress") {
    egressTransactions.push(transaction);
  }

  // Update the transactions display and totals
  updateTransactionsList();
  updateTotals();

  // Clear the form fields
  document.getElementById("transactionType").value = "";
  document.getElementById("transactionDescription").value = "";
  document.getElementById("transactionAmount").value = "";
}

// Función para actualizar la lista de transacciones
function updateTransactionsList() {
    const incomeContainer = document.getElementById('income-entries');
    const egressContainer = document.getElementById('egress-entries');

    // Limpia las entries actuales
    incomeContainer.innerHTML = '';
    egressContainer.innerHTML = '';

    // Añade entries de income
    incomeTransactions.forEach((transaction, index) => {
        const entry = document.createElement('div');
        entry.className = 'entry';
        entry.innerHTML = `<span>${transaction.description}</span><span class="amount text-success">+ $${transaction.amount.toFixed(2)}</span>`;
        incomeContainer.appendChild(entry);
    });

    // Añade entries de egress
    egressTransactions.forEach((transaction, index) => {
        const entry = document.createElement('div');
        entry.className = 'entry';
        entry.innerHTML = `<span>${transaction.description}</span><span class="amount text-danger">- $${transaction.amount.toFixed(2)}</span>`;
        egressContainer.appendChild(entry);
    });
}

// Actualiza los totales de ingresos, egresos y %balance
function updateTotals() {
    // Calcula total de income y egress
    const totalIncome = incomeTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    const totalEgress = egressTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);

    // Actualiza las labels
    document.getElementById('total-income').textContent = `Total Income: $${totalIncome.toFixed(2)}`;
    document.getElementById('total-egress').textContent = `Total Egress: $${totalEgress.toFixed(2)}`;

    // calcula el balance
    const balance = totalIncome - totalEgress;
    document.getElementById('balance-label').textContent = `Balance: $${balance.toFixed(2)}`;

    // Verifica que el total de ingresos sea mayor a 0 para calcular el porcentaje de egresos
    const percentageEgress = totalIncome > 0 ? (totalEgress / totalIncome) * 100 : 0;
    document.getElementById('expense-percentage').textContent = `${percentageEgress.toFixed(2)}%`;
}

// Event listener for processing the transaction
document.querySelector('button').addEventListener('click', addTransaction);

// Cargar la fecha actual en el título de la página
document.addEventListener("DOMContentLoaded", function () {
  const currentDate = new Date();
  const options = { month: "long", year: "numeric" };
  const formattedDate = currentDate.toLocaleDateString("es-ES", options);

  // Insert the formatted date into the title
  document.getElementById(
    "budget-title"
  ).textContent = `Presupuesto para ${formattedDate}`;

  // Cambiar la vista de las transacciones a la derecha
  // Muestra las transacciones de ingresos
  document
    .getElementById("switch-income")
    .addEventListener("click", function () {
      document.getElementById("income-entries").style.display = "block";
      document.getElementById("egress-entries").style.display = "none";
    });

  // Muestra las transacciones de egresos
  document
    .getElementById("switch-egress")
    .addEventListener("click", function () {
      document.getElementById("income-entries").style.display = "none";
      document.getElementById("egress-entries").style.display = "block";
    });
});

//-------- Parte de arriba del archivo --------//

// Cambia las labels de ingresos y egresos
document.getElementById(
  "total-income"
).textContent = `Total Income: $${totalIncome.toFixed(2)}`;
document.getElementById(
  "total-egress"
).textContent = `Total Egress: $${totalEgress.toFixed(2)}`;

// Calcular el balance y actualizar
let balance = totalIncome - totalEgress;
document.getElementById(
  "balance-label"
).textContent = `Balance: $${balance.toFixed(2)}`;

// Calcula el porcentaje de gastos
let percentageEgress = (totalEgress / totalIncome) * 100;
document.getElementById(
  "expense-percentage"
).textContent = `${percentageEgress.toFixed(2)}%`;
