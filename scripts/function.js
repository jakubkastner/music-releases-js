
/**
 * Click to release menu. Change title.
 */
el.menu.releases.click(function () {
    // TODO přidat změnu title i pro měsíce, případně přidat celé do nějaké funkce
    // add "active" class to clicked button
    var elClickedText = $(this).text();
    el.main.title.text(elClickedText);

    // TODO change url
    //window.location.replace('#release=' + elClickedText);
    history.pushState(null, null, elClickedText);
    // location.hash
    //history.replaceState(null, null, elClickedText);
    el.menu.secondary.toggleClass('hidden');
});

/**
 * Click to release tracklist. Show tracklist, hide other.
 */
el.release.buttons.tracklist.click(async function () {
    // TODO před spuštěním = skrejto nahradit hidden
    // get current button
    var elCurrentButton = $(this);
    // get release
    var release = await getReleaseID(elCurrentButton);

    // TODO change title
    elCurrentButton.prop('title', '');

    // change button
    elCurrentButton.toggleClass('active');
    // change other buttons
    $('#' + release.elID + ' .button.playlist').removeClass('active');

    // hide playlists
    $('#' + release.elID + ' .content.playlists').addClass('hidden');
    // show/hide tracklist
    $('#' + release.elID + ' .content.tracklist').toggleClass('hidden');
});


/**
 * Click to release playlist. Show playlists, hide other.
 */
el.release.buttons.playlist.click(async function () {
    // TODO před spuštěním = skrejto nahradit hidden
    // get current button
    var elCurrentButton = $(this);
    // get release
    var release = await getReleaseID(elCurrentButton);

    // change button
    elCurrentButton.toggleClass('active');
    // change other buttons
    $('#' + release.elID + ' .button.tracklist').removeClass('active');

    // hide playlists
    $('#' + release.elID + ' .content.tracklist').addClass('hidden');
    // show/hide tracklist
    $('#' + release.elID + ' .content.playlists').toggleClass('hidden');
});

/**
 * Get ID, type of current release and ID of release element from parent element.
 * @param {*} elChild child clicked element of release
 */
async function getReleaseID(elChild) {
    var elRelease = elChild.parents('.content .release');
    var release = {};
    release.elID = elRelease.attr('id');
    var elReleaseIDsplit = release.elID.split('-');
    release.type = elReleaseIDsplit[0];
    release.id = elReleaseIDsplit[1];
    return release;
}


/**
 * Click to add release to playlist.
 */
el.release.playlistAddRemove.click(async function () {
    // get current button
    var elCurrentButton = $(this);
    if (elCurrentButton.hasClass('c-r-p-remove')) {
        playlistRemove(elCurrentButton);
    }
    else {
        playlistAdd(elCurrentButton);
    }
});
function playlistAdd(elCurrentButton) {
    // change add/remove class and remove "active" class to current element
    elCurrentButton.removeClass('add');
    elCurrentButton.addClass('c-r-p-remove');
    elCurrentButton.addClass('active');

    // chage title
    var playlistName = elCurrentButton.text();
    elCurrentButton.prop('title', 'Remove release from playlist \'' + playlistName + '\'');

    // change icon
    elCurrentButton.children('i').removeClass('fa-plus').addClass('fa-minus');
}
function playlistRemove(elCurrentButton) {
    // change add/remove class and add "active" class to current element
    elCurrentButton.removeClass('c-r-p-remove');
    elCurrentButton.addClass('add');
    elCurrentButton.removeClass('active');

    // chage title
    var playlistName = elCurrentButton.text();
    elCurrentButton.prop('title', 'Add release to playlist \'' + playlistName + '\'');

    // change icon
    elCurrentButton.children('i').removeClass('fa-minus').addClass('fa-plus');
}
// TODO custom playlist


/**
 * Click to settings - theme button.
 */
el.settings.theme.click(async function () {
    // get current button
    var elCurrentButton = $(this);

    // change active class
    el.settings.theme.removeClass('active');
    elCurrentButton.addClass('active');

    // change icon
    el.settings.theme.children('i').removeClass('fa-check').addClass('fa-plus');
    elCurrentButton.children('i').removeClass('fa-plus').addClass('fa-check');


    // auto dark mode
    if (elCurrentButton.hasClass('c-s-t-system')) {
        // change theme
        elBody.removeClass('light').removeClass('dark');
    }
    // light mode
    else if (elCurrentButton.hasClass('c-s-t-light')) {
        // change theme
        elBody.removeClass('dark').addClass('light');
    }
    // dark mode
    else {
        // change theme
        elBody.removeClass('light').addClass('dark');
    }
});

/**
 * Click to settings - notifications button.
 */
el.settings.notifications.click(async function () {
    // get current button
    var elCurrentButton = $(this);

    if (elCurrentButton.hasClass('active')) {
        //elCurrentButton.text('Notifications enabled');
        await elCurrentButton.prop('title', 'Click to enable notifications');
        await elCurrentButton.children('span').text('Notifications disabled');
    }
    else {
        //elCurrentButton.text('Notifications disabled');
        await elCurrentButton.prop('title', 'Click to disable notifications');
        await elCurrentButton.children('span').text('Notifications enabled');
    }

    // change active class
    await elCurrentButton.toggleClass('active');

    // change icon
    elCurrentButton.children('i').toggleClass('fa-plus', 'fa-check');
});


el.menu.filter.click(async function () {
    el.menu.secondary.toggleClass('hidden');
});