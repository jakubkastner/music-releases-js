/** STYLE
 *  Scripts for styles webpage.
 */

// scripts-old/style.js

/**
 * Click to hover menu button. Show menu items.
 */
el.menu.hoverClick = function (hoverMenu) {
    // get menu button
    hoverMenu.button.forEach(function (button) {
        button.addEventListener('click', function () {
            // click on menu button
            hoverMenu.items.forEach(function (item) {
                // show menu items
                item.classList.toggle('active');
            });
            hoverMenu.button.forEach(function (button) {
                // show menu button
                button.classList.toggle('active');
            });
            event.stopPropagation();
        });
        //button.classList.toggle('active');
    });
};

// TODO move to another file
// add hoverable menu click function
el.menu.hoverClick(el.menu.login);
el.menu.hoverClick(el.menu.user);

/**
 * Click everywhere. Hide hover menu.
 */
document.body.addEventListener('click', function () {
    console.log(el.menu.hover);
    el.menu.hover.items.forEach(function (item) {
        // hide menu items
        item.classList.remove('active');
    });
    el.menu.hover.button.forEach(function (button) {
        // hide menu buttons
        button.classList.remove('active');
    });
});
