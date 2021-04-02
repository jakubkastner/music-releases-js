//import {elements} from '../init/init'
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
/*
el.menu.add = function (newMenu) {
    const toogleActiveMenu = function() {
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
}*/




el.menu.add(el.menu.login);
el.menu.add(el.menu.user);


document.body.addEventListener('click', function (event) {
    console.log(event);
    el.menu.hover.forEach(function (elem) {
        event.stopPropagation();
        elem.classList.remove('active');
    });
});
/*
document.querySelectorAll('.button.tracklist').addEventListener('click', function(e) {
    var id = e.target.closest('.release').dataset.id;
 })*/