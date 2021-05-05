var relType = window.location.pathname.replaceAll('/', '');
console.log(relType);
// save to 

localStorage.removeItem('release_type');
localStorage.setItem('release_type', relType);

window.location.pathname = '';