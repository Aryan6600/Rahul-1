const navTogglers = document.querySelectorAll(".navbar-toggler");
const links = document.querySelectorAll(".link");

navTogglers.forEach((toggler) => {
    toggler.addEventListener("click", () => {
        let target = toggler.getAttribute("data-toggle");
        document.getElementById(target).classList.toggle("active");
    });
});

links.forEach((link) => {
    link.addEventListener("click", () => {
        let target = link.getAttribute("data-redirect");
        window.location.href+= '/'+target
    });
});