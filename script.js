// Helper function to generate a random string
function generateRandomString(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// Function to generate a random Gmail address
function generateRandomEmail() {
    return generateRandomString(10) + '@gmail.com';
}

// Function to display the generated email
function displayGeneratedEmail(email) {
    document.getElementById('email-output').textContent = email;
}

// Function to save the generated email to localStorage
function saveEmailToHistory(email) {
    let history = JSON.parse(localStorage.getItem('emailHistory')) || [];
    history.push(email);
    localStorage.setItem('emailHistory', JSON.stringify(history));
    updateHistoryList();
}

// Function to update the history list
function updateHistoryList() {
    const history = JSON.parse(localStorage.getItem('emailHistory')) || [];
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    history.forEach(email => {
        const li = document.createElement('li');
        li.textContent = email;
        historyList.appendChild(li);
    });
}

// Function to handle the email generation and saving
function handleGenerateEmail() {
    const email = generateRandomEmail();
    displayGeneratedEmail(email);
    saveEmailToHistory(email);
    simulateMessageReception(email); // Simulate receiving a message for the new email
}

// Function to simulate receiving a message
function simulateMessageReception(email) {
    let messages = JSON.parse(localStorage.getItem('messages')) || {};
    if (!messages[email]) {
        messages[email] = [];
    }
    // Simulate adding a message to the email
    messages[email].push(`Mensaje de prueba para ${email}`);
    localStorage.setItem('messages', JSON.stringify(messages));
}

// Function to handle viewing messages for the current email
function handleViewMessages() {
    const email = document.getElementById('email-output').textContent;
    const messages = JSON.parse(localStorage.getItem('messages')) || {};
    const messageList = document.getElementById('message-list');
    messageList.innerHTML = '';
    if (messages[email]) {
        messages[email].forEach(msg => {
            const li = document.createElement('li');
            li.textContent = msg;
            messageList.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = 'No hay mensajes para este correo.';
        messageList.appendChild(li);
    }
}

// Function to handle showing the history container
function handleViewHistory() {
    document.getElementById('history-container').classList.toggle('hidden');
    document.getElementById('messages-container').classList.add('hidden');
}

// Function to handle clearing the email history
function handleClearHistory() {
    localStorage.removeItem('emailHistory');
    updateHistoryList();
}

// Function to handle user registration
function handleRegister(event) {
    event.preventDefault();
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    localStorage.setItem('user', JSON.stringify({ email, password }));
    alert('Registro exitoso. Ahora puedes iniciar sesión.');
    switchToLogin();
}

// Function to handle user login
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.email === email && user.password === password) {
        document.getElementById('auth-section').classList.add('hidden');
        document.getElementById('app-section').classList.remove('hidden');
    } else {
        alert('Credenciales incorrectas.');
    }
}

// Function to switch to the login section
function switchToLogin() {
    document.getElementById('register-section').classList.add('hidden');
    document.getElementById('login-section').classList.remove('hidden');
}

// Function to switch to the registration section
function switchToRegister() {
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('register-section').classList.remove('hidden');
}

// Initialize event listeners
document.getElementById('register-form').addEventListener('submit', handleRegister);
document.getElementById('login-form').addEventListener('submit', handleLogin);
document.getElementById('switch-to-login').addEventListener('click', switchToLogin);
document.getElementById('switch-to-register').addEventListener('click', switchToRegister);
document.getElementById('generate-email').addEventListener('click', handleGenerateEmail);
document.getElementById('view-messages').addEventListener('click', handleViewMessages);
document.getElementById('view-history').addEventListener('click', handleViewHistory);
document.getElementById('clear-history').addEventListener('click', handleClearHistory);

// Initial update of history list on page load
updateHistoryList();
