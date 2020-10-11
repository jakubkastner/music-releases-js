
/**
 * Click to release menu. Change title.
 */
elReleasesMenu.click(function () {
    // TODO přidat změnu title i pro měsíce, případně přidat celé do nějaké funkce
    // add "active" class to clicked button
    var elClickedText = $(this).text();
    elTitle.text(elClickedText);
});

/**
 * Click to release tracklist. Show tracklist, hide other.
 */
elReleaseTracklistButton.click(async function () {
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
    $('#' + release.elID + ' .c-r-b-playlist').removeClass('active');

    // hide playlists
    $('#' + release.elID + ' .c-r-playlists').hide('slow');
    // show/hide tracklist
    $('#' + release.elID + ' .c-r-tracklist').toggle('slow');
});


/**
 * Click to release playlist. Show playlists, hide other.
 */
elReleasePlaylistButton.click(async function () {
    // TODO před spuštěním = skrejto nahradit hidden
    // get current button
    var elCurrentButton = $(this);
    // get release
    var release = await getReleaseID(elCurrentButton);

    // change button
    elCurrentButton.toggleClass('active');
    // change other buttons
    $('#' + release.elID + ' .c-r-b-tracklist').removeClass('active');

    // hide playlists
    $('#' + release.elID + ' .c-r-tracklist').hide('slow');
    // show/hide tracklist
    $('#' + release.elID + ' .c-r-playlists').toggle('slow');
});

/**
 * Get ID, type of current release and ID of release element from parent element.
 * @param {*} elChild child clicked element of release
 */
async function getReleaseID(elChild) {
    var elRelease = elChild.parents('.c-release');
    var release = {};
    release.elID = elRelease.attr('id');
    var elReleaseIDsplit = release.elID.split('-');
    release.type = elReleaseIDsplit[1];
    release.id = elReleaseIDsplit[2];
    return release;
}


/**
 * Click to add release to playlist.
 */
elReleasePlaylistAddRemove.click(async function () {
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
    elCurrentButton.removeClass('c-r-p-add');
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
    elCurrentButton.addClass('c-r-p-add');
    elCurrentButton.removeClass('active');

    // chage title
    var playlistName = elCurrentButton.text();
    elCurrentButton.prop('title', 'Add release to playlist \'' + playlistName + '\'');

    // change icon
    elCurrentButton.children('i').removeClass('fa-minus').addClass('fa-plus');
}
// TODO custom playlist