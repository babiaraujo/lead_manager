chrome.action.onClicked.addListener(() => {
  chrome.windows.create({
    url: 'login.html', // Redireciona para a tela de login primeiro
    type: 'popup',
    width: 320,
    height: 480,
    left: screen.availWidth - 330,
    top: screen.availHeight - 490
  });
});
