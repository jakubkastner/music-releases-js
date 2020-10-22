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
    localStorage.setItem(program.spotify.const.stateKey, stateValue);

    // otevře přihlašovací okno do spotify a získá access token
    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(api.spotify.id);
    //url += '&scope=' + encodeURIComponent(api.spotify.scope);
    url += '&redirect_uri=' + encodeURIComponent(api.spotify.redirect);
    url += '&state=' + encodeURIComponent(stateValue);
    return url;
};


// kliknutí na tlačítko
el.user.login.spotify.click(async function () {
    // získám z úložiště prohlížeče userAccess
    user.spotify.accessToken = localStorage.getItem(program.spotify.const.accessToken);
    user.spotify.accessTokenExpires = localStorage.getItem(program.spotify.const.accessTokenExpires);
    // PŘIHLÁŠENÍ -> krok 1
    if (user.spotify.accessToken) {
        // uživatel je přihlášen
        // -> získám informace o uživateli
        // PŘIHLÁŠENÍ -> krok 5

        if (Date.now() >= (user.spotify.accessTokenExpires + 5)) {
            // eccessToken expiroval nebo již za 5 sekund expiruje, získej nový
            console.log("expirace");
            await user.spotify.parseUrl();
        }
        else {
            console.log("OK -> získám info z api");
            await api.spotify.getUser();
        }
        return;
    }
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
    user.spotify.accessToken = localStorage.getItem(program.spotify.const.accessToken);
    user.spotify.accessTokenExpires = localStorage.getItem(program.spotify.const.accessTokenExpires);
    if (user.spotify.accessToken) {
        // uživatel je přihlášen
        // -> získám informace o uživateli
        // PŘIHLÁŠENÍ -> krok 5

        if (Date.now() >= (user.spotify.accessTokenExpires + 5)) {
            // eccessToken expiroval nebo již za 5 sekund expiruje, získej nový
            console.log("expirace");
            await user.spotify.parseUrl();
        }
        else {
            console.log("OK -> získám info z api");
            await api.spotify.getUser();
        }
    }
    else {
        // uživatel není přihlášen
        // -> zkontoluji, zdali nepřišla odpověď z přihlašovací stránky Spotify
        // PŘIHLÁŠENÍ -> krok 3

        console.log("novy login");
        await user.spotify.parseUrl();
    }
});

/**
 * Zachytí odpověď přihlašovací stránky Spotify.
 */
user.spotify.parseUrl = async function () {
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
    }
    else if (currentUrl.includes('?error')) {
        // nastala chyba
        //elementError.text('Failed to login, please try it again.');
    }
    else if (currentUrl.includes('#access_token=') && currentUrl.includes('&token_type=') && currentUrl.includes('&expires_in=') && currentUrl.includes('&state=')) {
        // úspěšné přihlášení
        // -> získá userAccess

        // rozdělí získanou adresu a získá z ní parametry
        var params = await getHashParams();
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
                console.log("TEď");
                localStorage.setItem(program.spotify.const.accessToken, accessToken);
                localStorage.setItem(program.spotify.const.accessTokenExpires, accessTokenExpires);
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
        //console.log("odstranění loginPAreseUrl");
    }
}

/**
 * Získá informace ze Spotify API o aktuálním uživateli (pomocí userAccess)
 */
// TODO změnit funkci
api.spotify.getUser = async function () {
    // PŘIHLÁŠENÍ -> krok 6

    // získá informace o uživateli
    api.spotify.options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + api.spotify.accessToken
        }
    };
    var json = await fetchJson(api.spotify.url + '/me', api.spotify.options, 'Failed to login, please try it again.');

    if (json == null) {
        // chyba získání informací
        /*localStorage.removeItem(USER_ACCESS);
        userAccess = null;*/
        return;
    }
    // úspěšně získané informace
    console.log(json);

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