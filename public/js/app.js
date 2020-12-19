const pwaInstallationBtn = document.querySelector('#pwa-installation');

window.addEventListener('load', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('sw.js')
      .then((registration) => {
        console.log('registration success', registration.scope);
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
    if (installPromptEvent) {
      installPromptEvent.prompt('لطفا اپلیکیشن مارا نصب کنید');
    }
  });
});
