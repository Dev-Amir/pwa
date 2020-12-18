const pwaInstallationBtn = document.querySelector('#pwa-installation');

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('js/sw.js')
    .then((registration) => {
      console.log(true);
    })
    .catch(function (err) {
      console.warn('Error whilst registering service worker', err);
    });
}

let installPromptEvent;
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();

  installPromptEvent = event;
});

pwaInstallationBtn.addEventListener('click', () => {
  alert(installPromptEvent);
  if (installPromptEvent) {
    alert('installPromptEvent');
  }
});
