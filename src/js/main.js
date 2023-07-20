function main() {
    const root = document.querySelector("#root")

    const tabs = root.querySelectorAll(".posts .header__item")
    if (tabs) {
        tabs.forEach((element, index) => {
            element.onclick = (e) => {
                tabs.forEach((tab, i) => {
                    tab.classList.remove("header__item--selected")
                })
                element.classList.add("header__item--selected")
            }
        });
    }

    const showCommentBtn = root.querySelectorAll(".post .react__comment")
    if (showCommentBtn) {
        showCommentBtn.forEach((element) => {
            element.onclick = () => {
                const post = element.closest(".post")
                const comments = post.querySelector(".comments")
                comments.classList.toggle("comments--hide")
            }
        })
    }

    const navs = root.querySelectorAll("#nav .menu__item")
    if (navs) {
        navs.forEach((element, index) => {
            element.onclick = () => {
                navs.forEach((e) => {
                    e.classList.remove("menu__item--select")
                })
                element.classList.add("menu__item--select")
            }
        })
    }

    const switchBtn = document.querySelector("#switch")
    if (switchBtn) {
        switchBtn.onclick = () => {
            root.classList.toggle("visitor")
        }
    }

    const toggleBtn = document.querySelector("#header .icon")
    const nav = root.querySelector("#nav")
    const toggleInput = document.querySelector("#toggle-nav")
    const modalBG = document.querySelector(".modal-background")

    toggleBtn.onclick = () => {
        console.log(toggleInput.checked);
        toggleInput.checked = !toggleInput.checked
    }

    toggleInput.onchange = () => {
        nav.classList.remove("hide")
        modalBG.classList.remove("hide")
    }

    modalBG.onclick = () => {
        nav.classList.add("hide")
        modalBG.classList.add("hide")
    }
}

main()



