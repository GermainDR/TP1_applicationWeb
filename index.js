const toggle = document.getElementById("menu");
const navBar = document.getElementById("navbar");

toggle.addEventListener("click", () => {
    console.log("click");

    if (navBar.style.right === "0px") {
        navBar.style.right = "-300px"; 
        toggle.style.zIndex = 1; 
        navBar.style.zIndex = 0;

        toggle.classList.remove("active");
    } else {
        navBar.style.right = "0px"; 
        toggle.style.zIndex = 99; 
        navBar.style.zIndex = 98;

        toggle.classList.add("active");
    }
});