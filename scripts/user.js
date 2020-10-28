// TODO refreshování accesTokenu https://accounts.spotify.com/api/token
// https://developer.spotify.com/documentation/general/guides/authorization-guide/



/**
 * Získá url pro zobrazení přihlašovací stránky Spotify.
 */
user.spotify.newLogin = async function (update = false) {
    // get access token from browser storage
    /*user.spotify.accessToken = localStorage.getItem(program.spotify.const.accessToken);
    user.spotify.accessTokenExpires = localStorage.getItem(program.spotify.const.accessTokenExpires);

    if (user.spotify.accessToken) {
        // access token exists
        return null;
    }*/
    // PŘIHLÁŠENÍ -> krok 2
    // kontrola přihlášení
    /*if (userAccess) {
        // uživatel je přihlášen
        return null;
    }*/

    // TODO aktaulizace access tokenu: if (update === true) = access token vypršel, zaktualizuj ho a zálohuj již načtené věci z api

    // zapíše do lokálního úložiště náhodnou hodnotu
    var stateValue = await program.generateRandomString(16);
    localStorage.setItem(program.spotify.const.stateKey, stateValue);

    // otevře přihlašovací okno do spotify a získá access token
    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(api.spotify.id);
    //url += '&scope=' + encodeURIComponent(api.spotify.scope);
    url += '&redirect_uri=' + encodeURIComponent(api.spotify.redirect);
    url += '&state=' + encodeURIComponent(stateValue);

    // TODO parametry url: uložit aktuální parametry url a po úspěšném načtení na ně navigovat

    // TODO přihlašovací okno: otevřít jako okno viz https://medium.com/@leemartin/creating-a-simple-spotify-authorization-popup-in-javascript-7202ce86a02f
    // -> nebo možná nechat tak jak mám? uvidím
    /*popup = window.open(
        loginUrl,
        'Login with Spotify',
        'width=800,height=600'
      )*/

    // navigate to new page
    window.location = url;
};

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
        if (Date.now() >= (user.spotify.accessTokenExpires + 5)) {
            // access token expires
            // get new access token and save informations from spotify
            await user.spotify.newLogin(true);
            return;
        }

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
    // get current url
    var currentUrl = window.location.href;

    // check if spotify login page returns access token or login errors
    if (currentUrl.includes('access_denied')) {
        // user doesnt accept permissions
        //elementError.text('Failed to login, you must accept the premissions.');
        return;
    }
    if (currentUrl.includes('?error')) {
        // error from spotify login
        //elementError.text('Failed to login, please try it again.');
        return;
    }
    if (currentUrl.includes('#access_token=') && currentUrl.includes('&token_type=') && currentUrl.includes('&expires_in=') && currentUrl.includes('&state=')) {
        // successfully get new access token
        // parse new access token from url
        await user.spotify.parseUrl();
        await user.spotify.login();
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
    return;
}

/**
 * Click to login button. 
 */
el.user.login.spotify.click(async function () {
    // update information about logged in user = true
    await user.spotify.login(true);

    // get access token from browser storage
    /*user.spotify.accessToken = localStorage.getItem(program.spotify.const.accessToken);
    user.spotify.accessTokenExpires = localStorage.getItem(program.spotify.const.accessTokenExpires);

    if (user.spotify.accessToken) {
        // access token exists

        if (Date.now() >= (user.spotify.accessTokenExpires + 5)) {
            // access token expires
            console.log("expirace");
            // TODO kontrola
            await user.spotify.parseUrl();
        }
        else {
            // access token is ok
            console.log("OK -> získám info z api");
            // get info about user from spotify api 
            await api.spotify.getUser();
        }
        return;
    }
    // get spotify login link
    var loginUrl = await user.spotify.getLoginUrl();
    if (loginUrl) {
        // naviguje na přihlašovací stránku Spotify

        // TODO uložit aktuálníparametry url a po úspěšném načtení na ně navigovat

        // TODO otevřít jako okno viz https://medium.com/@leemartin/creating-a-simple-spotify-authorization-popup-in-javascript-7202ce86a02f
        // -> nebo možná nechat tak jak mám? uvidím
        /*popup = window.open(
            loginUrl,
            'Login with Spotify',
            'width=800,height=600'
          )*/

    // navigate to new page
    /*window.location = loginUrl;
}
else {
    // uživatel je přihlášen
    //loginGetUserInfo();
}*/
});


/**
 * Page loads.
 * Check Spotify login.
 */
$(document).ready(async function () {
    // check spotify login (update access token, get info about user from api, ...)
    user.spotify.login();
});

/**
 * Zachytí odpověď přihlašovací stránky Spotify.
 */
user.spotify.parseUrl = async function () {
    var timeNow = Date.now();
    // zobrazí příslušné informace po přihlášení

    // získá hodnotu úloženou v úložišti
    // odstraní z úložiště kontrolní string
    var stateKey = localStorage.getItem(program.spotify.const.stateKey);
    localStorage.removeItem(program.spotify.const.stateKey);
    localStorage.removeItem(program.spotify.const.accessToken);
    localStorage.removeItem(program.spotify.const.accessTokenExpires);
    user.spotify.accessToken = null;
    user.spotify.accessTokenExpires = null;

    // rozdělí získanou adresu a získá z ní parametry
    var params = await program.getHashParams();
    var newAccessToken = params.access_token;
    //var accessTokenExpires = params.expires_in;
    var newAccessTokenExpires = timeNow + params.expires_in * 1000;
    // clear url
    window.location.replace('');

    // TODO parametry url: getLoginUrl -> navázat na uložení parametrů, zde obnovit uložené parametry


    if (newAccessToken) {
        // existuje userAccess
        if (params.state !== null && params.state === stateKey) {
            // získal jsem hodnotu ze spotify loginu
            // a shoduje s náhodným stringem v místním úložišti
            // -> uloží do úložiště
            console.log(newAccessToken);
            console.log(newAccessTokenExpires);
            localStorage.setItem(program.spotify.const.accessToken, newAccessToken);
            localStorage.setItem(program.spotify.const.accessTokenExpires, newAccessTokenExpires);
            user.spotify.accessToken = newAccessToken;
            user.spotify.accessTokenExpires = newAccessTokenExpires;
            // získá z api info o uživateli
            //api.spotify.getUser();
        }
        else {
            // nezískal jsem nebo se neschoduje
            // -> chyba
            //elementError.text('Failed to login, please try it again.');
            console.log('Failed to login, please try it again.');
        }
        return;
    }
    // neexistující userAccess
    //elementError.text('Failed to login, please try it again.');
    console.log('Failed to login, please try it again.');
    //console.log("odstranění loginPAreseUrl");
}
/**
 * Zachytí odpověď přihlašovací stránky Spotify.
 */
user.spotify.parseUrl_old = async function () {
    // PŘIHLÁŠENÍ -> krok 4
    var timeNow = Date.now();
    // zobrazí příslušné informace po přihlášení

    // získá aktuální url adresu
    var currentUrl = window.location.href;

    // získá hodnotu úloženou v úložišti
    // odstraní z úložiště kontrolní string
    var stateKey = localStorage.getItem(program.spotify.const.stateKey);
    localStorage.removeItem(program.spotify.const.stateKey);
    localStorage.removeItem(program.spotify.const.accessToken);
    localStorage.removeItem(program.spotify.const.accessTokenExpires);

    user.spotify.accessToken = null;

    if (currentUrl.includes('access_denied')) {
        // nesouhlas s podmínkami
        //elementError.text('Failed to login, you must accept the premissions.');
        console.log("access_denied");
        return;
    }
    if (currentUrl.includes('?error')) {
        // nastala chyba
        //elementError.text('Failed to login, please try it again.');
        console.log("error");
        return;
    }
    if (!currentUrl.includes('#access_token=') || !currentUrl.includes('&token_type=') || !currentUrl.includes('&expires_in=') || !currentUrl.includes('&state=')) {
        console.log("bad url");
        return;
    }
    // úspěšné přihlášení
    // -> získá userAccess

    // rozdělí získanou adresu a získá z ní parametry
    var params = await program.getHashParams();
    var accessToken = params.access_token;
    //var accessTokenExpires = params.expires_in;
    var accessTokenExpires = timeNow + params.expires_in * 1000;

    // clear url
    //window.location.replace('');


    if (accessToken) {
        // existuje userAccess
        if (params.state !== null && params.state === stateKey) {
            // získal jsem hodnotu ze spotify loginu
            // a shoduje s náhodným stringem v místním úložišti
            // -> uloží do úložiště
            console.log(accessToken);
            console.log(accessTokenExpires);
            localStorage.setItem(program.spotify.const.accessToken, accessToken);
            localStorage.setItem(program.spotify.const.accessTokenExpires, accessTokenExpires);
            user.spotify.accessToken = accessToken;
            user.spotify.accessTokenExpires = accessTokenExpires;
            // získá z api info o uživateli
            api.spotify.getUser();
        }
        else {
            // nezískal jsem nebo se neschoduje
            // -> chyba
            //elementError.text('Failed to login, please try it again.');
            console.log('Failed to login, please try it again.');
        }
        return;
    }
    // neexistující userAccess
    //elementError.text('Failed to login, please try it again.');
    console.log('Failed to login, please try it again.');
    //console.log("odstranění loginPAreseUrl");
}

/**
 * Získá informace ze Spotify API o aktuálním uživateli (pomocí userAccess)
 */
// TODO změnit funkci
api.spotify.getUser = async function () {
    // PŘIHLÁŠENÍ -> krok 6
    console.log("info z api");
    console.log(user.spotify.accessToken);
    // získá informace o uživateli
    api.spotify.options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + user.spotify.accessToken
        }
    };
    var json = await fetchJson(api.spotify.url + '/me', api.spotify.options, 'Failed to login, please try it again.');

    if (json == null) {
        // chyba získání informací
        /*localStorage.removeItem(USER_ACCESS);
        userAccess = null;*/
        console.log("json api null");
        return;
    }
    // úspěšně získané informace
    //console.log(json);
    //user.spotify = json;
    //user.spotify = { ...user.spotify, ...json };
    user.spotify.api = json;
    console.log(user.spotify);

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