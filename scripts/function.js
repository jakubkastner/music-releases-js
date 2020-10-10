
/**
 * Click to release menu. Change title.
 */
elReleasesMenu.click(function () {
    // TODO přidat změnu title i pro měsíce, případně přidat celé do nějaké funkce
    // add "active" class to clicked button
    var elClickedText = $(this).text();
    elTitle.text(elClickedText);
});