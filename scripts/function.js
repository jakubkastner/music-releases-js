
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

    // change title
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
 * Get child icon of current clicked element.
 * @param {*} elCurrent current clicked element
 */
async function getIcon(elCurrent) {
    var elIcon = elCurrent.children('i');
    return elIcon;
}


/**
 * 
 */
elReleasePlaylistAdd.click(async function () {

});


elReleasePlaylistRemove.click(async function () {

});