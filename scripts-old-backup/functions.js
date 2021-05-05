
/**
 * Vygeneruje náhodný string o zadané délce.
 * @param {*} length délka vygenerovaného stringu
 * @returns vygenerovaný náhodný string
 */
program.generateRandomString = async function (length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

/**
 * Získá parametry z aktuální url adresy.
 * @returns objekt získaných parametrů aktuální url adresy
 */
program.getHashParams = async function () {
    var hashParams = {};
    var e,
        r = /([^&;=]+)=?([^&;]*)/g, q = window.location.hash.substring(1);
    while (e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
}


/**
 * Načte JSON pomocí Spotify api.
 * @param {*} url url dotazu api
 * @param {*} errorText text, pokud se nezdaří získání json
 * @returns
 *  json = úspěšně se podařilo získat data za api /
 *  null = chyba dotazu
 */
async function fetchJson(url, options, errorText) {
    // odpověď požadavku
    // uloží hlavičku pro dotazy api
    let response = await fetch(url, options);

    // získaný json
    let json = await response.json();

    console.log(json);
    if (!json) {
        // nepodařilo se získat json
        /*hideLoading(elementError.text() + '\n' + errorText + '\nCan not get JSON from Spotify API');*/
        console.log('fetch error - from url: ' + url);
        return null;
    }

    if (json.error) {
        // chyba získávání dat
        if (json.error.status === 429) {
            // api - moc dotazů
            return await fetchJson(url, errorText);
            // TODO UPOZORNĚNÍ -> HROZÍ NEKONEČNÁ SMYČKA
        }
        if (json.error.status === 401) {
            // vypršela platnost access tokenu
            // TODO získat nový access token a uložit prozatím získan data
            
            await user.spotify.newLogin(true);
            console.log("expires access token")
            return null;
            localStorage.removeItem(USER_ACCESS);
            userAccess = null;
            // získá stránku pro přihlášení do spotify
            var url = await loginGetUrl();

            if (url) {
                // naviguje na přihlašovací stránku Spotify
                //window.location = url;
                console.log("naviguji");
            }
            else {
                // uživatel je přihlášen
                // loginGetUserInfo(); došlo by k zacyklení
                console.log('Spotify login error');
            }
            return await fetchJson(url, errorText);
            // UPOZORNĚNÍ -> HROZÍ NEKONEČNÁ SMYČKA
        }
        // jiná chyba
        //hideLoading(elementError.text() + '\n' + errorText + '\n' + json.error.message);
        console.log('fetch error - from spotify: ' + json.error.message);
        console.log(json.error);
        return null;
    }
    return json;
}
