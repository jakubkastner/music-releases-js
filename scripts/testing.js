/** TESTING
 *  Only for development testing.
 */

// s ikonou pak nejde pracovat dál (měnit třídu atd...)
/**
 * Get child icon of current clicked element.
 * @param {*} elCurrent current clicked element
 */
/*async function getIcon(elCurrent) {
    var elIcon = elCurrent.children('i');
    elIcon.removeClass('fa-plus');    
    return elIcon;
}*/


// pwa background sync
/*$(document).on('click', '#settings-background', async function (e) {
    console.log("click");
    Notification.requestPermission(permission => {
        if (permission === 'granted') { registerBackgroundSync() }
        else console.error("Permission was not granted.")
    })

});
function registerBackgroundSync() {
    if (!navigator.serviceWorker) {
        return console.error("Service Worker not supported")
    }

    navigator.serviceWorker.ready
        .then(registration => registration.sync.register('syncAttendees'))
        .then(() => console.log("Registered background sync"))
        .catch(err => console.error("Error registering background sync", err))
}
self.addEventListener('sync', function (event) {
    console.log("sync event", event);
    if (event.tag === 'syncAttendees') {
        event.waitUntil(syncAttendees()); // sending sync request
    }
});
function syncAttendees() {
    return update({ url: `https://reqres.in/api/users` })
        .then(refresh)
        .then((attendees) => self.registration.showNotification(
            `${attendees.length} attendees to the PWA Workshop`
        ))
}
*/