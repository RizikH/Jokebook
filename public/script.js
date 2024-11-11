'use strict';

document.addEventListener("DOMContentLoaded", () => {
    search();
});

function search() {
    const searchBar = document.querySelector(".search-bar");
    searchBar.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            location.href = `/jokebook?attribute=name&value=${searchBar.value}`;
        }
    });
}
