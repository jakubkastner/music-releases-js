// TODO refreshování accesTokenu https://accounts.spotify.com/api/token
// https://developer.spotify.com/documentation/general/guides/authorization-guide/



/**
 * Získá url pro zobrazení přihlašovací stránky Spotify.
 * @returns
 *  null = uživatel je již přihlášen /
 *  url = url přihlašovací stránky Spotify 
 */
user.spotify.getLoginUrl = async function () {
    // PŘIHLÁŠENÍ -> krok 2
    // kontrola přihlášení
    /*if (userAccess) {
        // uživatel je přihlášen
        return null;
    }*/

    // zapíše do lokálního úložiště náhodnou hodnotu
    var stateValue = await generateRandomString(16);
    localStorage.setItem(program.spotify.stateKey, stateValue);

    // otevře přihlašovací okno do spotify a získá access token
    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(api.spotify.id);
    url += '&scope=' + encodeURIComponent(api.spotify.scope);
    url += '&redirect_uri=' + encodeURIComponent(api.spotify.redirect);
    url += '&state=' + encodeURIComponent(stateValue);
    return url;
};


// kliknutí na tlačítko
el.user.login.spotify.click(async function () {
    // PŘIHLÁŠENÍ -> krok 1
    /*if (userId) {
        console.log(user);
        window.open(user.external_urls.spotify, '_blank');
        return;
    }*/
    // získá stránku pro přihlášení do spotify
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

        window.location = loginUrl;
    }
    else {
        // uživatel je přihlášen
        //loginGetUserInfo();
    }
});


/**
 * Načtení stránky.
 */
$(document).ready(async function () {
    // získám z úložiště prohlížeče userAccess
    user.spotify.accessToken = localStorage.getItem(program.spotify.accessToken);
    user.spotify.accessTokenExpires = localStorage.getItem(program.spotify.accessTokenExpires);
    if (user.spotify.accessToken) {
        // uživatel je přihlášen
        // -> získám informace o uživateli
        // PŘIHLÁŠENÍ -> krok 5

        //await loginGetUserInfo();
        console.log("OK -> získám info z api");
    }
    else {
        // uživatel není přihlášen
        // -> zkontoluji, zdali nepřišla odpověď z přihlašovací stránky Spotify
        // PŘIHLÁŠENÍ -> krok 3

        await user.spotify.parseUrl();
    }
});

/**
 * Zachytí odpověď přihlašovací stránky Spotify.
 */
user.spotify.parseUrl = async function () {
    // PŘIHLÁŠENÍ -> krok 4
    // zobrazí příslušné informace po přihlášení

    // získá aktuální url adresu
    var currentUrl = window.location.href;

    if (currentUrl.includes('access_denied')) {
        // nesouhlas s podmínkami
        //elementError.text('Failed to login, you must accept the premissions.');
    }
    else if (currentUrl.includes('?error')) {
        // nastala chyba
        //elementError.text('Failed to login, please try it again.');
    }
    else if (currentUrl.includes('#access_token=') && currentUrl.includes('&token_type=') && currentUrl.includes('&expires_in=') && currentUrl.includes('&state=')) {
        // úspěšné přihlášení
        // -> získá userAccess

        // rozdělí získanou adresu a získá z ní parametry
        var params = getHashParams();
        var accessToken = params.access_token;
        var accessTokenExpires = params.expires_in;

        // clear url
        window.location.replace('');

        // získá hodnotu úloženou v úložišti
        var storedState = localStorage.getItem(program.spotify.stateKey);
        user.spotify.accessToken = null;

        if (accessToken) {
            // existuje userAccess
            if (params.state !== null && params.state === storedState) {
                // získal jsem hodnotu ze spotify loginu
                // a shoduje s náhodným stringem v místním úložišti
                // -> uloží do úložiště
                localStorage.setItem(program.spotify.accessToken, accessToken);
                localStorage.setItem(program.spotify.accessTokenExpires, accessTokenExpires);
            }
            else {
                // nezískal jsem nebo se neschoduje
                // -> chyba
                //elementError.text('Failed to login, please try it again.');
            }
        }
        else {
            // neexistující userAccess
            //elementError.text('Failed to login, please try it again.');
        }
        // odstraní z úložiště kontrolní string
        //console.log("odstranění loginPAreseUrl");
        localStorage.removeItem(program.spotify.stateKey);
    }
}

/**
 * Získá informace ze Spotify API o aktuálním uživateli (pomocí userAccess)
 */
// TODO změnit funkci
 async function loginGetUserInfo() {
    // PŘIHLÁŠENÍ -> krok 6

    // uloží hlavičku pro dotazy api
    options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + userAccess
        }
    };

    // získá informace o uživateli
    var json = await fetchJson(API_URL + '/me', 'Failed to login, please try it again.');

    if (json == null) {
        // chyba získání informací
        localStorage.removeItem(USER_ACCESS);
        userAccess = null;
        return;
    }
    // úspěšně získané informace

    // zobrazí informace a skryje/zobrazí příslušné prvky
    $('#login-button').remove();
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
    hideLoading('Select which releases you want to display.');
}