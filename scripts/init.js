/** INIT
 *  Init some variables - jquery elements, ...
 */

var el = {};
el.main = {};
el.settings = {};
el.menu = {};
el.menu.date = {};
el.release = {};
el.release.buttons = {};
el.settings = {};
el.user = {};
el.user.login = {};

// page body (for light/dark mode)
el.main.body = $('body');

// all buttons, which can be active
el.menu.releases = $('.buttons.releases a, .buttons-user .settings');
el.menu.hover = $('.menu-hover');

// login buttons
el.main.loginButton = $('.login.button');
// left login menu
el.menu.login = $('header .menu-hover');

// page title
el.main.title = $('.primary .title');

el.menu.date.button = $('.buttons.menu .date');
el.menu.date.menu = $('.menu-date');
el.menu.date.year = $('.menu-date .year');
el.menu.date.month = $('.menu-date .month');
el.menu.date.months = $('.menu-date .months');

el.menu.filter = $('.buttons.menu .filter');
el.menu.secondary = $('header .secondary');

// releases tracklist
el.release.buttons.tracklist = $('.release .button.tracklist');
el.release.tracklist = $('.release .content.tracklist');
// releases playlists
el.release.buttons.playlist = $('.release .button.playlist');
el.release.playlists = $('.release .content.playlists');

el.release.playlistAddRemove = $('.add, .c-r-p-remove');


// settings theme
el.settings.theme = $('.settings .theme a');
// settings notifications
el.settings.notifications = $('.settings .notifications');



// user
el.user.login.spotify = $('.buttons.login .spotify');
el.user.logout = $('.buttons-user .logout');
el.user.settings = $('.buttons-user .settings');


el.content = $('main .content');

var user = {};
user.spotify = {};
user.spotify.accessToken = null;


// api
var api = {};
api.spotify = {};


// program
var program = {};
program.spotify = {};