/**
 * Load JSON from api.
 * @param {*} url api url request
 * @param {*} errorText error text
 * @returns
 *  json = successfully get data from api;
 *  null = request error
 */
api.fetchJson = async function (url, options, errorText) {
    // fetch the api request
    const response = await fetch(url, options);

    // obtained json from api result
    const json = await response.json();

    console.log(json);
    if (!json) {
        // failed to get json
        /*hideLoading(elementError.text() + '\n' + errorText + '\nCan not get JSON from Spotify API');*/
        console.log('fetch error - from url: ' + url);
        return null;
    }

    if (json.error) {
        // failed to get data from json
        if (json.error.status === 429) {
            // api - too many queries
            return await fetchJson(url, errorText);
            // TODO UPOZORNĚNÍ -> HROZÍ NEKONEČNÁ SMYČKA
        }
        if (json.error.status === 401) {
            // the access token has expired
            // TODO získat nový access token a uložit prozatím získaná data

            await user.spotify.newLogin(true);
            console.log("access token expires")
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
        // another error
        //hideLoading(elementError.text() + '\n' + errorText + '\n' + json.error.message);
        console.log('fetch error - from api: ' + json.error.message);
        console.log(json.error);
        return null;
    }
    return json;
}
