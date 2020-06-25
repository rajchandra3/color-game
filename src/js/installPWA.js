const installBtns = document.querySelectorAll('.install-app-button');
const hideContainer = () => {
    let btns = document
        .querySelectorAll('.install-app-container');
    for(let btn of btns){
        btn.classList.toggle('hidden', true);
    }
};

const showContainer = () => {
    let btns = document
        .querySelectorAll('.install-app-container');
        for(let btn of btns){
            btn.classList.toggle('hidden', false);
        }
};

window.addEventListener('beforeinstallprompt', (event) => {
    console.log('👍', 'beforeinstallprompt', event);
    // Prevent the mini-infobar from appearing on mobile
    event.preventDefault();
    // Stash the event so it can be triggered later.
    window.deferredPrompt = event;
    // Remove the 'hidden' class from the install button container
    showContainer();
});

window.addEventListener('appinstalled', (event) => {
    console.log('👍', 'appinstalled', event);
    mixpanel.track('App Installed');
});

// Track how the PWA was launched #
window.addEventListener('DOMContentLoaded', () => {
    let displayMode = 'browser tab';
    if (navigator.standalone) {
        displayMode = 'standalone-ios';
    }
    if (window.matchMedia('(display-mode: standalone)').matches) {
        displayMode = 'standalone';
    }
    // Log launch display mode to analytics
    mixpanel.track('App Lauched', { mode: displayMode });
    console.log('DISPLAY_MODE_LAUNCH:', displayMode);
});

// Track when the display mode changes
window.addEventListener('DOMContentLoaded', () => {
    window.matchMedia('(display-mode: standalone)').addListener((evt) => {
        let displayMode = 'browser tab';
        if (evt.matches) {
            displayMode = 'standalone';
        }
        // Log display mode change to analytics
        mixpanel.track('Display mode changed', {
            mode: displayMode
        });
        console.log('DISPLAY_MODE_CHANGED', displayMode);
    });
});

for(let installBtn of installBtns){
    installBtn.addEventListener('click',(e) => {
        mixpanel.track('Click: Install App button');
        console.log('Clicked install app button');
        const promptEvent = window.deferredPrompt;
        if (!promptEvent) {
            // The deferred prompt isn't available.
            const reason = `The deferred prompt isn't available.`;
            console.log(reason);
            mixpanel.track('App Installation Failed', { reason });
            hideContainer();
            return;
        }
        // Show the install prompt.
        promptEvent.prompt();
        // Log the result
        promptEvent.userChoice.then((result) => {
            console.log('👍', 'userChoice', result);
            if (result.outcome === 'accepted') {
                console.log('User accepted the install prompt');
                mixpanel.track('Accepted: App Install prompt');
            } else {
                console.log('User dismissed the install prompt');
                mixpanel.track('Declined: App Install prompt');
            }
            // Reset the deferred prompt variable, since
            // prompt() can only be called once.
            window.deferredPrompt = null;
        });
    });
}
