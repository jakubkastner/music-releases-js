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
el.menu.releases = $('.buttons.releases a, .settings');

// login buttons
el.main.loginButton = $('.login.button');
// left login menu
el.menu.login = $('.buttons.login');

// page title
el.main.title = $('.title');

el.menu.date.button = $('.buttons.menu .date');
el.menu.date.menu = $('.m-date');
el.menu.date.year = $('.m-year');
el.menu.date.month = $('.m-month');
el.menu.date.months = $('.m-months');

el.menu.filter = $('.buttons.menu .filter');
el.menu.secondary = $('header .secondary');

// releases tracklist
el.release.buttons.tracklist = $('.c-r-b-tracklist');
el.release.tracklist = $('.c-r-tracklist');
// releases playlists
el.release.buttons.playlist = $('.c-r-b-playlist');
el.release.playlists = $('.c-r-playlists');

el.release.playlistAddRemove = $('.c-r-p-add, .c-r-p-remove');


// settings theme
el.settings.theme = $('.c-s-theme a');
// settings notifications
el.settings.notifications = $('.c-s-n');



// user
el.user.login.spotify = $('.buttons.login .spotify');
el.user.logout = $('.buttons-user .logout');


var user = {};
user.spotify = {};
user.spotify.accessToken = null;


// api
var api = {};
api.spotify = {};


// program
var program = {};
program.spotify = {};