/**
 * Click to Spotify login button.
 * Login or update information about user.
 */
el.user.login.spotify.forEach(el => el.addEventListener('click', async function () {
    await user.spotify.login(true);
}));

/**
 * Page loads.
 * Check Spotify login.
 */
document.addEventListener('DOMContentLoaded', async function (event) {
    // check spotify login (update access token, get info about user from api, ...)
    await user.spotify.login();
});

/**
 * Update expired access token.
 * Get new access token from url.
 * Get info about user from spotify api.
 * @param {*} newLogin false (default); true = user clicked to login, new login is required
 */
user.spotify.login = async function (newLogin = false) {
    // get access token from browser storage
    user.spotify.accessToken = localStorage.getItem(program.spotify.const.accessToken);
    user.spotify.accessTokenExpires = localStorage.getItem(program.spotify.const.accessTokenExpires);

    // user is logged in

    if (user.spotify.accessToken) {
        // access token exists
        /*if (Date.now() > user.spotify.accessTokenExpires) {
            // access token expires
            // get new access token and save informations from spotify
            await user.spotify.newLogin(true);
            return;
        }*/

        // access token is ok
        if (!user.spotify.api) {
            // no info about user from api
            // get info about user from spotify api
            await api.spotify.getUser();
            return;
        }

        // info about user from spotify api is ok
        return;
    }

    // user is not logged in

    // get stored state key from browser storage
    var storedStateKey = localStorage.getItem(program.spotify.const.stateKey);

    // if stored state exists, user clicked to login button
    if (storedStateKey) {
        // get current url
        var currentUrl = window.location.href;

        // new access token is in url
        if (currentUrl.includes('#access_token=') && currentUrl.includes('&token_type=') && currentUrl.includes('&expires_in=') && currentUrl.includes('&state=')) {
            // parse new access token from url
            if (await user.spotify.parseUrl() === true) {
                // successfully get new access token
                await user.spotify.login();
                return;
            }
            // login failed
            //elementError.text('Failed to login, please try it again.');
        }
        // check if spotify login page returns access token or login errors
        else if (currentUrl.includes('access_denied')) {
            // user doesnt accept permissions
            //elementError.text('Failed to login, you must accept the premissions.');
        }
        else if (currentUrl.includes('?error')) {
            // error in url from spotify login
            //elementError.text('Failed to login, please try it again.');
        }
        else {
            // login failed
            //elementError.text('Failed to login, please try it again.');
        }

        localStorage.removeItem(program.spotify.const.stateKey);
        history.replaceState(null, null, window.location.pathname);
        return;
    }


    // user is logged out

    // new login is required
    if (newLogin === true) {
        // navigate to login page
        await user.spotify.newLogin();
        return;
    }

    // new login isnt required
    // nothing
}

/**
 * Get spotify login url.
 * Navigate to spotify login url.
 * @param {*} update false (default); true = update access token (save history)
 */
user.spotify.newLogin = async function (update = false) {
    // TODO aktaulizace access tokenu: if (update === true) = access token vypršel, zaktualizuj ho a zálohuj již načtené věci z api
    // refreshování accesTokenu https://accounts.spotify.com/api/token
    // https://developer.spotify.com/documentation/general/guides/authorization-guide/

    // TODO parametry url: uložit aktuální parametry url a po úspěšném načtení na ně navigovat

    localStorage.removeItem(program.spotify.const.stateKey);
    localStorage.removeItem(program.spotify.const.accessToken);
    localStorage.removeItem(program.spotify.const.accessTokenExpires);

    // clear spotify user variables
    user.spotify.accessToken = null;
    user.spotify.accessTokenExpires = null;
    user.spotify.api = null;

    // generate new state value (random string) and save to browser storage
    var stateValue = await program.generateRandomString(16);
    localStorage.setItem(program.spotify.const.stateKey, stateValue);

    // get spotify login url
    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(api.spotify.id);
    url += '&scope=' + encodeURIComponent(api.spotify.scope);
    url += '&redirect_uri=' + encodeURIComponent(api.spotify.redirect);
    url += '&state=' + encodeURIComponent(stateValue);

    // TODO přihlašovací okno: ??? možná otevřít jako okno viz https://medium.com/@leemartin/creating-a-simple-spotify-authorization-popup-in-javascript-7202ce86a02f
    /*popup = window.open(
        loginUrl,
        'Login with Spotify',
        'width=800,height=600'
      )*/

    // navigate to spotify login page
    window.location = url;
};


/**
 * Parse url from spotify login.
 * Get new access token and time when expires.
 * @returns true = successfuly get access token; false = login failed
 */
user.spotify.parseUrl = async function () {
    // get current time
    var timeNow = Date.now();

    // get state key and remove other login values from browser storage
    var storedStateKey = localStorage.getItem(program.spotify.const.stateKey);
    localStorage.removeItem(program.spotify.const.stateKey);
    localStorage.removeItem(program.spotify.const.accessToken);
    localStorage.removeItem(program.spotify.const.accessTokenExpires);

    // clear spotify user variables
    user.spotify.accessToken = null;
    user.spotify.accessTokenExpires = null;
    user.spotify.api = null;

    // get parameters (access token and time when expires from url
    var params = await program.getHashParams();
    var accessTokenExpires = timeNow + params.expires_in * 1000;

    // clear url
    //window.location.replace('');
    history.replaceState(null, null, window.location.pathname);
    // TODO parametry url: getLoginUrl -> navázat na uložení parametrů, zde obnovit uložené parametry

    // access token doesnt exists
    if (!params.access_token) {
        // show error
        console.log('Failed to login, please try it again.');
        return false;
    }

    // state key in params doesnt exist or value doesnt equal with stored state key
    if (params.state === null || params.state !== storedStateKey) {
        // show error
        //elementError.text('Failed to login, please try it again.');
        console.log('Failed to login, please try it again.');
        return false;
    }

    // succesfully get new access token

    // store new acces token to browser storage and variables
    localStorage.setItem(program.spotify.const.accessToken, params.access_token);
    localStorage.setItem(program.spotify.const.accessTokenExpires, accessTokenExpires);
    user.spotify.accessToken = params.access_token;
    user.spotify.accessTokenExpires = accessTokenExpires;
    return true;
}

/**
 * User clicked to logout from Spotify button.
 */
el.user.logout.forEach(el => el.addEventListener('click', async function () {
    // logout spotify user
    await user.spotify.logout();
}));

/**
 * Logout the user from Spotify
 */
user.spotify.logout = async function () {
    localStorage.removeItem(program.spotify.const.stateKey);
    localStorage.removeItem(program.spotify.const.accessToken);
    localStorage.removeItem(program.spotify.const.accessTokenExpires);

    // clear spotify user variables
    user.spotify.accessToken = null;
    user.spotify.accessTokenExpires = null;
    user.spotify.api = null;
}



/**
 * Get informations about logged in user from API
 */
// TODO změnit funkci
api.spotify.getUser = async function () {
    // api headers
    api.spotify.options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + user.spotify.accessToken
        }
    };
    // get json with user info from api
    var json = await api.fetchJson(api.spotify.url + '/me', api.spotify.options, 'Failed to login, please try it again.');

    if (json == null) {
        // api error
        /*localStorage.removeItem(USER_ACCESS);
        userAccess = null;*/
        console.log("json api null");
        return;
    }
    // succesfully get user info
    //console.log(json);
    //user.spotify = json;
    //user.spotify = { ...user.spotify, ...json };
    user.spotify.api = json;

    // save user info to local database
    // save user info to local database
    if (!window.indexedDB) {
        console.log("Your browser does not support IndexedDB");
        return;
    }
    json = JSON.stringify(json);
    json = JSON.parse(json);
    const dbName = "users2";
    var request = indexedDB.open(dbName, 3);

    request.onupgradeneeded = async function (event) {
        var db = event.target.result;
        var objStore = db.createObjectStore("users", { autoIncrement: true });
        await asyncForEach(json, async user => {
            objStore.add(user.id);
        });
    };

    // zobrazí informace a skryje/zobrazí příslušné prvky
    /*$('#login-button').remove();
    elementError.text('');

    var elementUser = $('#user');
    elementUser.attr('title', 'Logged in as "' + json.display_name + '"');

    var elementUserName = $('#user p');
    elementUserName.html(json.display_name);

    var elementUserIcon = $('#user i');

    if (json.images.length > 0) {
        elementUserIcon.remove();
        elementUser.prepend(`<img src="` + json.images[0].url + `" alt="">`);
    }
    else {
        // <i class="fab fa-spotify"></i>
        // <i class="fas fa-user"></i>
        elementUserIcon.removeClass('fab');
        elementUserIcon.addClass('fas');
        elementUserIcon.removeClass('fa-spotify');
        elementUserIcon.addClass('fa-user');
    }

    //var elementMenu = $('.menu-user'); nová verze
    var elementMenu = $('header .in-main');
    elementMenu.append(`<nav class="nav-user"><a class="button settings-button hidden-menu">Settings</a><a class="button" id="logout">Logout</a></nav>`);
    elementMessage.text('User @' + json.display_name + ' has been successfully logged in.');

    elementSettingsButton = $('.settings-button');
    elementHiddenMenu = $('.hidden-menu');

    // nastavení
    elementSettingsButton.click(function () {
        showSettings();
    });

    // uloží stát a id
    userCountry = json.country;
    userId = json.id;
    user = json;

    // získá interprety z knihovny uživatele
    await libraryGetArtists();
    // získá playlisty uživatele
    await libraryGetPlaylists();
    // získá výstupní zařízení uživatele
    await getDevices();
    hideLoading('Select which releases you want to display.');*/
}


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