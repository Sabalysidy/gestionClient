document.addEventListener('DOMContentLoaded', function() {
    const payments = JSON.parse(localStorage.getItem('payments')) || [];
    const clientFilter = document.getElementById('clientFilter');
    const dateFilter = document.getElementById('dateFilter');
    const ctx = document.getElementById('paymentChart').getContext('2d');
    let chart;

    function updateChart() {
        const filteredPayments = payments.filter(p => {
            const clientMatch = clientFilter.value === '' || p.client.toLowerCase().includes(clientFilter.value.toLowerCase());
            const dateMatch = dateFilter.value === '' || p.date === dateFilter.value;
            return clientMatch && dateMatch;
        });

        const labels = filteredPayments.map(p => p.date);
        const data = filteredPayments.map(p => p.amount);

        if (chart) chart.destroy();

        chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Montants des Paiements',
                    data: data,
                    backgroundColor: '#007bff',
                    borderColor: '#007bff',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                    title: { display: true, text: 'Historique des paiements' }
                }
            }
        });
    }

    clientFilter.addEventListener('input', updateChart);
    dateFilter.addEventListener('change', updateChart);

    updateChart();
});