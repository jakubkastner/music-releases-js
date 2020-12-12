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
        el.menu.show(el.menu.date);
    }
    else {
        // hide the menu
        el.menu.hide(el.menu.date);
    }
});


el.menu.artists.button.click(function () {
    if (el.menu.artists.menu.hasClass('hidden')) {
        // show the menu
        el.menu.show(el.menu.artists);
    }
    else {
        // hide the menu
        el.menu.hide(el.menu.artists);
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

$(window).resize(function () {
    if (window.innerHeight < pcWidth) {
        el.menu.hide(el.menu.date);
        el.menu.hide(el.menu.artists);
    }
    else {
        el.menu.show(el.menu.date);
        el.menu.show(el.menu.artists);
    }
});


$(document).ready(async function () {
    if (window.innerHeight < pcWidth) {
        el.menu.hide(el.menu.date);
        el.menu.hide(el.menu.artists);
    }
});

// only right and left (date and artists) menu
el.menu.show = function (menu) {
    if (window.innerHeight < pcWidth) {
        el.content.addClass('hidden');
        el.menu.date.menu.addClass('hidden');
        el.menu.artists.menu.addClass('hidden');
    }
    menu.menu.removeClass('hidden');
    menu.button.attr({ 'title': 'Hide ' + menu.text + ' menu.' });
}
el.menu.hide = function (menu) {
    if (window.innerHeight < pcWidth) {
        el.content.removeClass('hidden');
        el.menu.date.menu.addClass('hidden');
        el.menu.artists.menu.addClass('hidden');
    }
    menu.menu.addClass('hidden');
    menu.button.attr({ 'title': 'Show ' + menu.text + ' menu.' });
}