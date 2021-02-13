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


document.body.addEventListener('click', function (event) {
    console.log(event);
    el.menu.hover.forEach(function (elem) {
        event.stopPropagation();
        elem.classList.remove('active');
    });
});
