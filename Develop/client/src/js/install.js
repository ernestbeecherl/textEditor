const butInstall = document.getElementById('buttonInstall');

// Event listener for the 'beforeinstallprompt' event, which fires when the app becomes eligible for installation
window.addEventListener('beforeinstallprompt', (event) => {
    console.log('hit'); // Log to indicate that the event was triggered
    console.log("event" + event); // Log the event object for debugging
    event.preventDefault(); // Prevent the default behavior of the event

    // Store the event for later use
    window.deferredPrompt = event;

    // Make the install button visible by removing the 'hidden' class
    butInstall.classList.toggle('hidden', false);
});

// Event listener for clicks on the install button
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        return; // Exit if there is no deferred prompt event
    }

    // Show the installation prompt to the user
    promptEvent.prompt();

    // Reset the deferred prompt variable as it can only be used once
    window.deferredPrompt = null;

    // Hide the install button again
    butInstall.classList.toggle('hidden', true);
});

// Event listener for the 'appinstalled' event, which fires after the app has been successfully installed
window.addEventListener('appinstalled', (event) => {
    console.log('install hit'); // Log to indicate that the app has been installed
    window.deferredPrompt = null; // Reset the deferred prompt variable
});