document.addEventListener('DOMContentLoaded', function() {
        const clients = JSON.parse(localStorage.getItem('clients')) || [];
        const payments = JSON.parse(localStorage.getItem('payments')) || [];
        const clientList = document.getElementById('clientList');

        // Fonction pour calculer le chiffre d'affaires
        function calculateRevenue() {
            const today = new Date();
            const currentMonth = today.getMonth(); // Mois actuel
            const currentYear = today.getFullYear(); // Année actuelle

            console.log("Mois actuel:", currentMonth, "Année actuelle:", currentYear);

            // Filtrage des paiements pour le mois et l'année en cours
            const monthlyPayments = payments.filter(p => {
                const paymentDate = new Date(p.date);
                const paymentMonth = paymentDate.getMonth();
                const paymentYear = paymentDate.getFullYear();

                console.log(`Paiement pour ${p.client} - Date: ${paymentDate} - Mois: ${paymentMonth} - Année: ${paymentYear}`);

                return paymentMonth === currentMonth && paymentYear === currentYear;
            });

            console.log("Paiements du mois actuel:", monthlyPayments);

            // Calcul du chiffre d'affaires mensuel
            const monthlyRevenue = monthlyPayments.reduce((sum, p) => sum + parseFloat(p.amount), 0);

            console.log("Chiffre d'affaire mensuel calculé:", monthlyRevenue);

            // Calcul du chiffre d'affaires annuel
            const annualRevenue = payments.reduce((sum, p) => sum + parseFloat(p.amount), 0);

            // Mise à jour de l'interface utilisateur
            document.getElementById('monthlyRevenue').textContent = monthlyRevenue.toLocaleString() + ' FCFA';
            document.getElementById('annualRevenue').textContent = annualRevenue.toLocaleString() + ' FCFA';
            document.getElementById('totalClients').textContent = clients.length;

            renderClientList();
            updateChart();
        }

        // Fonction pour afficher la liste des clients
        function renderClientList() {
            clientList.innerHTML = '';
            clients.forEach(client => {
                const li = document.createElement('li');
                li.className = 'list-group-item';
                li.textContent = `${client.name} - ${client.phone}`;
                clientList.appendChild(li);
            });
        }

        // Fonction pour mettre à jour le graphique des paiements
        function updateChart() {
            const ctx = document.getElementById('paymentChart').getContext('2d');
            const labels = payments.map(p => p.date);
            const data = payments.map(p => p.amount);

            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Montants des Paiements',
                        data: data,
                        borderColor: '#007bff',
                        borderWidth: 2,
                        fill: false
                    }]
                }
            });
        }

        // Formulaire pour enregistrer un paiement
        document.getElementById('paymentForm').onsubmit = function(e) {
            e.preventDefault();
            const payment = {
                client: document.getElementById('paymentClient').value,
                amount: document.getElementById('paymentAmount').value,
                date: document.getElementById('paymentDate').value
            };

            if (confirm('Êtes-vous sûr de vouloir enregistrer ce paiement ?')) {
                payments.push(payment);
                localStorage.setItem('payments', JSON.stringify(payments));
                calculateRevenue();
                e.target.reset();  // Réinitialiser le formulaire de paiement après validation
            }
        };

        // Formulaire pour ajouter un client
        document.getElementById('clientForm').onsubmit = function(e) {
            e.preventDefault();
            const client = {
                name: document.getElementById('clientName').value,
                phone: document.getElementById('clientPhone').value
            };

            if (confirm('Êtes-vous sûr de vouloir ajouter ce client ?')) {
                clients.push(client);
                localStorage.setItem('clients', JSON.stringify(clients));
                calculateRevenue();
                e.target.reset();  // Réinitialiser le formulaire d'ajout de client après validation
            }
        };

        // Calcul initial du chiffre d'affaires
        calculateRevenue();
    });