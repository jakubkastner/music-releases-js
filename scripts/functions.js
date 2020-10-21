
/**
 * Vygeneruje náhodný string o zadané délce.
 * @param {*} length délka vygenerovaného stringu
 * @returns vygenerovaný náhodný string
 */
async function generateRandomString(length) {
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
function getHashParams() {
    var hashParams = {};
    var e,
        r = /([^&;=]+)=?([^&;]*)/g, q = window.location.hash.substring(1);
    while (e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
}