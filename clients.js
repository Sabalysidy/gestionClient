function getClients() {
    return JSON.parse(localStorage.getItem('clients')) || [];
}

function getPayments() {
    return JSON.parse(localStorage.getItem('payments')) || [];
}

function saveClients(clients) {
    localStorage.setItem('clients', JSON.stringify(clients));
}

function savePayments(payments) {
    localStorage.setItem('payments', JSON.stringify(payments));
}

function renderClientList() {
    const clients = getClients();
    const clientList = document.getElementById('clientList');
    clientList.innerHTML = '';

    clients.forEach(client => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `${client.name} - ${client.phone} 
            <button class="btn btn-sm btn-primary btn-action" onclick="viewClientDetails(${client.id})">Détails</button>
            <button class="btn btn-sm btn-danger btn-action" onclick="deleteClient(${client.id})">Supprimer</button>`;
        clientList.appendChild(li);
    });
}

function deleteClient(clientId) {
    let clients = getClients();
    let payments = getPayments();
    clients = clients.filter(client => client.id !== clientId);
    payments = payments.filter(payment => payment.clientId !== clientId);
    saveClients(clients);
    savePayments(payments);
    renderClientList();
}

function viewClientDetails(clientId) {
    const clients = getClients();
    const payments = getPayments().filter(payment => payment.clientId === clientId);
    const client = clients.find(client => client.id === clientId);

    let details = `Nom: ${client.name}\nTéléphone: ${client.phone}\n\nPaiements:\n`;
    payments.forEach(payment => {
        details += `- ${payment.amount} FCFA, Date: ${payment.date}\n`;
    });

    alert(details);
}

document.addEventListener('DOMContentLoaded', function() {
    renderClientList();
});