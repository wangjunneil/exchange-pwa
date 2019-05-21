var registerObj = null;

function registerSw() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', e => {
            // 注册"serviceWorker"
            navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                registerObj = registration;
                console.log('Service Worker registration success with scope: ', registration.scope);
            })
            .catch(err => {
                console.log('Service Worker registration failed: ', err);
            });
        });
    }
}

function requestMessage() {
    registerObj.pushManager.getSubscription().then(subscription => {
        if (subscription === null) {
            console.log('User is NOT subscribed.');

            // 解码 https://web-push-codelab.glitch.me/
            let serverPublicKey = 'BJPZgjlU6dpFwaFEDzjNLPaMG5Zs-3R1fnem7tlrQufKkNXPfmJFXkDOiXYcVJBDVqVM50jJfGLPHR6DqfkQfRE';
            const applicationServerKey = urlB64ToUint8Array(serverPublicKey);
            // 订阅
            registerObj.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: applicationServerKey
            })
            .then(subscription => {
                console.log('User is subscribed:', subscription);
                // 实际会将此json发送给后端，测试时也用，这个值每次都会有变化
                let subscription_json = JSON.stringify(subscription);
                console.log(subscription_json);
            })
            .catch(err => {
                // 用户拒绝订阅通知
                // err = DOMException: Registration failed - permission denied
                console.log('Failed to subscribe the user: ', err);
            });
        } else {
            console.log('User IS subscribed.');
        }
    });
}

function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

export { registerSw, requestMessage };
