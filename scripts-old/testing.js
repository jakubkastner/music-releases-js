/** TESTING
 *  Only for development testing.
 */

el.menu.mobile.moreButton.click(function () {
    el.menu.mobile.hoverMenu.toggleClass('show');
});

el.menu.mobile.settinsButton.click(function () {
    el.menu.mobile.settingsMenu.toggleClass('show');
    el.menu.mobile.settinsButton.toggleClass('active');
});


$('.menu .tracklist').click(function () {
    openFullscreen();
});


function openFullscreen() {
    var elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    }
    else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    }
    else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
}

$(document).ready(async function () {
    var storageReleaseType = localStorage.getItem('release_type');
    localStorage.removeItem('release_type');
    history.pushState(null, null, storageReleaseType);
    // TODO show release type
});


el.user.settings.click(function () {
    // TODO show settings (make class)
    $('.content .releases').toggleClass('skrejto');
    $('.content .settings').toggleClass('skrejto');

});


//Checking for IndexedDB support
/*
if (!window.indexedDB) {
    console.log("Your browser does not support IndexedDB");
}
else {
    const dbName = "users";

    var request = indexedDB.open(dbName, 2);

    request.onerror = function (event) {
        // Handle errors.
    };
    request.onupgradeneeded = function (event) {
        var db = event.target.result;

        // Create an objectStore to hold information about our customers. We're
        // going to use "ssn" as our key path because it's guaranteed to be
        // unique - or at least that's what I was told during the kickoff meeting.
        var objectStore = db.createObjectStore("user", { keyPath: "id" });

        // Create an index to search customers by name. We may have duplicates
        // so we can't use a unique index.
        objectStore.createIndex("id", "id", { unique: true });

        // Create an index to search customers by email. We want to ensure that
        // no two customers have the same email, so use a unique index.
        objectStore.createIndex("email", "email", { unique: true });

        // Use transaction oncomplete to make sure the objectStore creation is
        // finished before adding data into it.
        objectStore.transaction.oncomplete = function (event) {
            // Store values in the newly created objectStore.
            var customerObjectStore = db.transaction("users", "readwrite").objectStore("user");
            customerData.forEach(function (customer) {
                customerObjectStore.add(customer);
            });
        };
    };
}*/


// mobile browsers fix
/*$(document).ready(function () {
    $("html, body").animate({ scrollTop: $(document).height()-$(window).height() });
});*/

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