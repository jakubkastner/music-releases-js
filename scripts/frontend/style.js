/** STYLE
 *  Scripts for styles webpage.
 */

/**
 * Click to hover menu.
 */
el.menu.add = function (newMenu) {
    newMenu.button.forEach(function (button) {
        button.addEventListener('click', function () {
            newMenu.menu.forEach(function (menu) {
                menu.classList.toggle('active');
            });
        });
    });
};

el.menu.add(el.menu.login);
el.menu.add(el.menu.user);

/**
 * Click to login button. Show/hide login options.
 */
/* el.main.loginButton.click(function () {
    event.stopPropagation();
    el.menu.login.toggleClass('show');
    el.main.loginButton.toggleClass('hover');
});*/


document.body.addEventListener('click', function (event) {
    console.log(event);
    el.menu.hover.forEach(function (elem) {
        event.stopPropagation();
        elem.classList.remove('active');
    });
});

/**
 * Click everywhere. Hide login options.
 */
/*$(document).click(function () {
    el.menu.login.removeClass('show');
    el.main.loginButton.removeClass('hover');
});*/
