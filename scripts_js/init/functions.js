/**
 * Generate random string by the specified length.
 * @param {*} length length of the string
 * @returns random string
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
 * Get parameters from url
 * @returns parameters object
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
 * Asynchronous foreach.
 * @param {*} array array to browse
 * @param {*} callback function to execute
 */
async function asyncForEach(array, callback) {
    // projde pole forem
    for (let index = 0; index < array.length; index++) {
        // vykoná funkci a čeká, dokuď se neprovede
        await callback(array[index], index, array);
    }
}