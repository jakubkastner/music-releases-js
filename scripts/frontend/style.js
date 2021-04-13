/** STYLE
 *  Scripts for styles webpage.
 */

// scripts-old/style.js

/**
 * Click to hover menu. Show hover menu items and active menu button.
 */
el.menu.hover.clicked = function (hoverMenu) {
    // get menu button
    hoverMenu.button.forEach(function (button) {
        button.addEventListener('click', function () {
            // click on menu button
            hoverMenu.items.forEach(function (item) {
                // show menu items
                item.classList.toggle('active');
            });
            hoverMenu.button.forEach(function (button) {
                // show menu buttons
                button.classList.toggle('active');
            });
            event.stopPropagation();
        });
    });
};

// TODO move to another file
// add hoverable menu click function
el.menu.hover.clicked(el.menu.login);
el.menu.hover.clicked(el.menu.user);

/**
 * Click everywhere. Hide hover menu.
 */
document.body.addEventListener('click', function () {
    el.menu.hover.items.forEach(function (item) {
        // hide menu items
        item.classList.remove('active');
    });
    el.menu.hover.button.forEach(function (button) {
        // hide menu buttons
        button.classList.remove('active');
    });
});

/**
 *
 */
el.menu.showHide = function (artistMenu) {
    // click on artist button
    artistMenu.button.forEach(function (artistButton) {
        artistButton.addEventListener('click', function () {
            // active -> hide menu
            if (artistButton.classList.contains('active')) {
                // hide all buttons
                artistMenu.button.forEach(function (buttonArt) {
                    buttonArt.classList.remove('active');
                    buttonArt.title = 'Show ' + artistMenu.text + ' menu.';
                });
                // hide all menus
                artistMenu.menu.forEach(function (menuArt) {
                    menuArt.classList.remove('active');
                });
            }
            // inactive -> show menu
            else {
                // show all buttons
                artistMenu.button.forEach(function (buttonArt) {
                    buttonArt.classList.add('active');
                    buttonArt.title = 'Hide ' + artistMenu.text + ' menu.';
                });
                // show all menus
                artistMenu.menu.forEach(function (menuArt) {
                    menuArt.classList.add('active');
                });
            }
        });

    });
};

el.menu.showHide(el.menu.artists);
el.menu.showHide(el.menu.date);
el.menu.showHide(el.menu.filter);
el.menu.showHide(el.menu.actions);