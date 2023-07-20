function authen() {
    const root = document.querySelector(".root");
    const signupBtn = root.querySelector(".header .action .signup");
    const signinBtn = root.querySelector(".header .action .signin");
    signupBtn.onclick = () => {

        root.classList.add("signup")
        root.classList.remove("login")
    }
    signinBtn.onclick = () => {

        root.classList.remove("signup")
        root.classList.add("login")
    }
}
authen()