// TODO change this !!! doesnt work ok
/**
 * Hide content on mobile when date or artists menu is displayed.
 */
 el.menu.hideContent = function (mobileMenu) {
    mobileMenu.forEach(function (menu) {
        menu.addEventListener('click', function () {
            el.menu.mobile.forEach(function (menuMobil) {
                // active -> hide menu
                if (menuMobil.classList.contains('active')) {
                    // hide all buttons
                    menuMobil.classList.remove('active');
                }
                // inactive -> show menu
                else {
                    menuMobil.classList.add('active');
                }
            });
        });
    });
};

el.menu.hideContent(el.menu.date.mobile);
el.menu.hideContent(el.menu.artists.mobile);




// scripts-old/testing.js
window.addEventListener("load",function() {
    setTimeout(function(){
        // This hides the address bar:
        window.scrollTo(0, 1);
    }, 0);
});

/* NEW: */
el.menu.add = function (newMenu) {
    const toggleActiveMenu = function() {
        newMenu.menu.forEach(menu => menu.classList.toggle('active'));
    }

    newMenu.button.forEach(btn => btn.addEventListener('click', toggleActiveMenu));
};

class Menu {
    constructor(class, id) {
        this.class = class;
        this.id = id;
        this.add()
    }

    add() {
        const toogleActiveMenu = function() {
            newMenu.menu.forEach(menu => menu.classList.toggle('active'));
        }

        elements.menu.button.forEach(btn => btn.addEventListener('click', toggleActiveMenu))
    }
}

document.querySelectorAll('.button.tracklist').addEventListener('click', function(e) {
    var id = e.target.closest('.release').dataset.id;
 })

 // new end