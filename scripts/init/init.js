/** INIT
 *  Init some variables - element selectors, ...
 */

 // TODO remove or delete
var pcWidth = 1025;

/*export const elements */ var el = {
    // TODO move to main
    content: document.querySelectorAll('main .content'),
    // TODO rename to page
    main: {
        // page body (for light/dark mode)
        body: document.querySelectorAll('body'),
        // page title
        title: document.querySelectorAll('.primary .title')
    },
    settings: {
        theme: document.querySelectorAll('.settings .theme a'),
        notifications: document.querySelectorAll('.settings .notifications')
    },
    menu: {
        hover: document.querySelectorAll('.menu.hover'),
        filter: document.querySelectorAll('.buttons.menu .filter'),
        secondary: document.querySelectorAll('header .secondary'),
        releases: document.querySelectorAll('.buttons.releases a, .buttons.user .settings'),
        login: {
            menu: document.querySelectorAll('.login.menu.hover'),
            button: document.querySelectorAll('.login.button')
        },
        user: {
            menu: document.querySelectorAll('.user.menu.hover'),
            button: document.querySelectorAll('.user.button')
        },
        artists: {
            text: 'artists',
            button: document.querySelectorAll('.buttons.menu .artists'),
            menu: document.querySelectorAll('.menu.artists')
        },
        date: {
            text: 'date',
            button: document.querySelectorAll('.buttons.menu .date'),
            menu: document.querySelectorAll('.menu.date'),
            year: document.querySelectorAll('.menu.date .year'),
            month: document.querySelectorAll('.menu.date .month'),
            months: document.querySelectorAll('.menu.date .months')
        },
        mobile: {
            moreButton: document.querySelectorAll('footer .releases.mobile-buttons .more'),
            hoverMenu: document.querySelectorAll('footer .releases.menu.hover'),
            settinsButton: document.querySelectorAll('footer .player .menu.round .menu'),
            settingsMenu: document.querySelectorAll('footer .user.menu.hover')
        },
    },
    release: {
        // TODO rename to button
        buttons: {
            tracklist: document.querySelectorAll('.release .button.tracklist'),
            playlist: document.querySelectorAll('.release .button.playlist')
        },
        tracklist: document.querySelectorAll('.release .content.tracklist'),
        playlists: document.querySelectorAll('.release .content.playlists'),
        playlistAddRemove: document.querySelectorAll('.add, .c-r-p-remove')
    },
    user: {
        login: {
            spotify: document.querySelectorAll('.buttons.login .spotify')
        },
        logout: document.querySelectorAll('.buttons.user .logout'),
        settings: document.querySelectorAll('.buttons.user .settings')
    }
};


// user
var user = {
    spotify: {
        accessToken: null
    }
};


// api
var api = {
    spotify: {}
};


// program
var program = {
    spotify: {}
};