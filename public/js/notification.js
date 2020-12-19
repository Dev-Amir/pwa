const showNotification = (title) => {
  navigator.serviceWorker.ready.then((registration) => {
    registration.showNotification(title, {
      body: 'به وبسایت رویداد ها خوش آمدید',
      dir: 'rtl',
      icon: '/assets/icon-pwa-start192.png',
      image: '/assets/img.jpeg',
      actions: [
        {
          title: 'رویداد ها',
          action: 'events_page',
        },
        {
          title: 'درباره ما',
          action: 'about_us_page',
        },
      ],
    });
  });
};

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const getPushSubscription = async () => {
  try {
    const registration = await navigator.serviceWorker.ready;

    const subscribeOption = {
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        'BPZpuJk1Y4BXEI3rvmbdhbpK-a5JEkTN6SwejDW8ee0VveBEoVa_X8MnLU48tDc_cY9X9gZXa49uXkm682cwweE'
      ),
    };

    const pushSubscription = await registration.pushManager.subscribe(
      subscribeOption
    );

    return pushSubscription;
  } catch {}
};
