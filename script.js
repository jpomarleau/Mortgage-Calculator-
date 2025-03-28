// Mortgage Calculator Script

// Function to calculate monthly mortgage payment
function calculateMortgage() {
    let loanAmount = parseFloat(document.getElementById('loanAmount').value);
    let interestRate = parseFloat(document.getElementById('interestRate').value) / 100 / 12;
    let loanTerm = parseInt(document.getElementById('loanTerm').value) * 12;

    let monthlyPayment = (loanAmount * interestRate) / (1 - Math.pow(1 + interestRate, -loanTerm));
    document.getElementById('monthlyPayment').innerText = `Monthly Payment: $${monthlyPayment.toFixed(2)}`;
    
    generateGraph(loanAmount, interestRate, loanTerm, monthlyPayment);
}

// Function to generate amortization graph using Chart.js
function generateGraph(loanAmount, interestRate, loanTerm, monthlyPayment) {
    let balance = loanAmount;
    let dataPoints = [];

    for (let i = 0; i < loanTerm; i++) {
        let interestPayment = balance * interestRate;
        let principalPayment = monthlyPayment - interestPayment;
        balance -= principalPayment;
        dataPoints.push(balance > 0 ? balance : 0);
    }

    let ctx = document.getElementById('amortizationChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: loanTerm }, (_, i) => i + 1),
            datasets: [{
                label: 'Remaining Loan Balance',
                data: dataPoints,
                borderColor: 'blue',
                borderWidth: 2,
                fill: false
            }]
        }
    });
}
