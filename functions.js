// back-to-top button functionality
const backToTopButton = document.getElementById("back-to-top");

window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
};

backToTopButton.onclick = function() {
    document.body.scrollTop = 0; // Safari
    document.documentElement.scrollTop = 0; // Chrome, Firefox, IE, and Opera
};

// add widont functionality
document.addEventListener("DOMContentLoaded", function() {
    const elements = document.querySelectorAll("p.bio");
    elements.forEach(function(el) {
        el.innerHTML = widont(el.innerHTML, "html", 2);
    });
});

// mobile menu toggle
const menuToggle = document.getElementById("menu-toggle");
const tabs = document.querySelector(".tabs");
const buttons = document.querySelectorAll(".tabs .button");

menuToggle.addEventListener("click", () => {
    tabs.classList.toggle("show");
});

document.addEventListener("click", (e) => {
    if (!menuToggle.contains(e.target) && !tabs.contains(e.target)) {
        tabs.classList.remove("show");
    }
});

buttons.forEach(button => {
    button.addEventListener("click", () => {
    })
})

buttons.forEach(button => {
    button.addEventListener("click", () => {
        tabs.classList.remove("show");
    });
});