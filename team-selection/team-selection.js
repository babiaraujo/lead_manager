document.getElementById('confirmTeamBtn').addEventListener('click', function() {
    const selectedTeam = document.getElementById('teamSelect').value;
    localStorage.setItem('selectedTeam', selectedTeam);  // Armazena o time selecionado
    window.location.href = 'popup/popup.html';  // Redireciona para o popup
});
