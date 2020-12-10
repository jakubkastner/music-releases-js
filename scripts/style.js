/** STYLE
 *  Scripts for styles webpage.
 */

/**
 * Hover login button. Change background color.
 */
el.menu.login
    .mouseover(function () {
        el.main.loginButton.addClass('hover');
    })
    .mouseout(function () {
        if (!el.menu.login.hasClass('show')) {
            el.main.loginButton.removeClass('hover');
        }
    });

/**
 * Click to login button. Show/hide login options.
 */
el.main.loginButton.click(function () {
    event.stopPropagation();
    el.menu.login.toggleClass('show');
    el.main.loginButton.toggleClass('hover');
});
/**
 * Click everywhere. Hide login options.
 */
$(document).click(function () {
    el.menu.login.removeClass('show');
    el.main.loginButton.removeClass('hover');
});

/**
 * Click to release menu. Add/remove "active" class.
 */
el.menu.releases.click(function () {
    // remove all "active" class
    //el.menu.releases.removeClass('active');
    // add "active" class to clicked button
    var elClicked = $(this);
    elClicked.toggleClass('active');
    //el.menu.secondary.toggleClass('hidden');
});
/*el.menu.releases.click(function () {
    // remove all "active" class
    el.menu.releases.removeClass('active');
    // add "active" class to clicked button
    var elClicked = $(this);
    elClicked.addClass('active');
    //el.menu.secondary.toggleClass('hidden');
});*/

/**
 * Click to date mobile menu. Show/hide date menu.
 */
el.menu.date.button.click(function () {
    if (el.menu.date.menu.hasClass('hidden')) {
        // show the menu
        el.menu.date.menu.removeClass('hidden');
        el.menu.date.button.attr({ 'title': 'Hide date menu.' });
        el.content.removeClass('menu-date-hidden');
    }
    else {
        // hide the menu
        el.menu.date.menu.addClass('hidden');
        el.menu.date.button.attr({ 'title': 'Show date menu.' });
        el.content.addClass('menu-date-hidden');
    }
});
el.menu.artists.button.click(function () {
    if (el.menu.artists.menu.hasClass('hidden')) {
        // show the menu
        el.menu.artists.menu.removeClass('hidden');
        el.menu.artists.button.attr({ 'title': 'Hide artists menu.' });
        el.content.removeClass('menu-artists-hidden');
    }
    else {
        // hide the menu
        el.menu.artists.menu.addClass('hidden');
        el.menu.artists.button.attr({ 'title': 'Show artists menu.' });
        el.content.addClass('menu-artists-hidden');
    }
});

/**
 * Click to year in date menu. Show/hide months. Add/remove "active" class.
 */

el.menu.date.year.click(function () {
    // remove all "active" class
    el.menu.date.year.removeClass('active');
    el.menu.date.month.removeClass('active');
    // add "active" class to clicked button
    var elClicked = $(this);
    elClicked.addClass('active');
    // hide months
    el.menu.date.months.addClass('hidden');
    // show current year months
    var selectedYear = $(this).attr('id');
    selectedYear = selectedYear.split('-')[2];
    var selectedMonth = $('.menu.date #months-' + selectedYear);
    selectedMonth.removeClass('hidden');
});

/**
 * Click to month in date menu. Add/remove "active" class.
 */
el.menu.date.month.click(function () {
    // remove all "active" class
    el.menu.date.month.removeClass('active');
    // add "active" class to clicked button
    var elClicked = $(this);
    elClicked.addClass('active');
});

el.main.title.click(function () {
    // TODO navigate to top page
});
