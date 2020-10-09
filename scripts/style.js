/** STYLE
 *  Scripts for styles webpage.
 */

/**
 * Hover login button. Change background color.
 */
elLoginMenu
    .mouseover(function () {
        elLoginButton.addClass('hover');
    })
    .mouseout(function () {
        if (!elLoginMenu.hasClass('show')) {
            elLoginButton.removeClass('hover');
        }
    });

/**
 * Click to login button. Show/hide login options.
 */
elLoginButton.click(function () {
    event.stopPropagation();
    elLoginMenu.toggleClass('show');
    elLoginButton.toggleClass('hover');
});
/**
 * Click everywhere. Hide login options.
 */
$(document).click(function () {
    elLoginMenu.removeClass('show');
    elLoginButton.removeClass('hover');
});

/**
 * Click to clickable buttons. Add/remove "active" class.
 */
elClickableButtons.click(function () {
    // remove all "active" class
    elClickableButtons.removeClass('active');
    // add "active" class to clicked button
    var elClicked = $(this);
    elClicked.addClass('active');
});

/**
 * Click to date mobile menu. Show/hide date menu.
 */
elDateMenuMobile.click(function () {
    if (elDateMenu.is(':visible')) {
        elDateMenu.hide();
        elDateMenuMobile.attr({ 'title': 'Show date menu.' });
    }
    else {
        elDateMenu.show();
        elDateMenuMobile.attr({ 'title': 'Hide date menu.' });
    }
});

/**
 * Click to year in date menu. Show/hide months. Add/remove "active" class.
 */

elDateMenuYear.click(function () {
    // remove all "active" class
    elDateMenuYear.removeClass('active');
    elDateMenuMonth.removeClass('active');
    // add "active" class to clicked button
    var elClicked = $(this);
    elClicked.addClass('active');
    // hide months
    elDateMenuMonths.addClass('hidden');
    // show current year months
    var selectedYear = $(this).attr('id');
    selectedYear = selectedYear.split('-')[2];
    var selectedMonth = $('#m-months-' + selectedYear);
    selectedMonth.removeClass('hidden');
});

/**
 * Click to month in date menu. Add/remove "active" class.
 */
elDateMenuMonth.click(function () {
    // remove all "active" class
    elDateMenuMonth.removeClass('active');
    // add "active" class to clicked button
    var elClicked = $(this);
    elClicked.addClass('active');
});