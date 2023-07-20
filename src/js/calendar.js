const inputBox = document.querySelector("form input[name='birthday']")


// Final selected from user (initialing)
var chosenDate = new Date(inputBox.value)


// Current selected on calendar
var currentSelect = new Date(chosenDate.getTime())

const inputBirthday = document.querySelector(".form__box.birthday")
inputBirthday.querySelector("span").innerHTML = dateString(chosenDate)

const calendar = document.querySelector(".form__input .calendar")

inputBirthday.querySelector(".form__box.birthday svg").onclick = (e) => {
    e.stopPropagation()
    inputBirthday.querySelector(".form__box.birthday svg").classList.toggle("active")
    currentSelect = new Date(chosenDate.getTime())
    calendar.classList.toggle("calendar--hide")
    renderCalendar()
}

inputBirthday.onclick = () => {
    cancelBtn.onclick()
}

// For Month select box
const selectGroupM = document.querySelector(".select-group.month")
const selectM = selectGroupM.querySelector(".wrapper")
const dropListM = selectGroupM.querySelector(".drop-list")
const [prevM, nextM] = selectGroupM.querySelectorAll(".setting-month")


const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

selectM.onclick = () => {
    dropListM.classList.toggle("drop-list--hide")
    selectM.classList.toggle("active")
    var selectedItem = dropListM.querySelector(".option--selected")
    dropListM.scrollTop = selectedItem.offsetTop
}

dropListM.onclick = (e) => {
    const newMonth = e.target.dataset.value
    currentSelect.setMonth(newMonth)
    renderCalendar()
}

prevM.onclick = () => {
    currentSelect.setMonth(currentSelect.getMonth() - 1)
    renderCalendar()
}

nextM.onclick = () => {
    currentSelect.setMonth(currentSelect.getMonth() + 1)
    renderCalendar()
}

function renderMonth() {
    const monthOptions = months.map((m, i) => {
        if (currentSelect.getMonth() === i) {
            return `<div data-value="${i}" class="option option--selected">${m}</div>`
        }
        else {
            return `<div data-value="${i}" class="option">${m}</div>`
        }
    }).join("")
    dropListM.innerHTML = monthOptions
    selectM.querySelector('span').innerHTML = months[currentSelect.getMonth()]
}

// For Year select box
const selectGroupY = document.querySelector(".select-group.year")
const selectY = selectGroupY.querySelector(".wrapper")
const dropListY = selectGroupY.querySelector(".drop-list")
const [prevY, nextY] = selectGroupY.querySelectorAll(".setting-year")

selectY.onclick = () => {
    dropListY.classList.toggle("drop-list--hide")
    selectY.classList.toggle("active")
    var selectedItem = dropListY.querySelector(".option--selected")
    dropListY.scrollTop = selectedItem.offsetTop
}

dropListY.onclick = (e) => {
    const newYear = e.target.dataset.value
    currentSelect.setFullYear(newYear)
    renderCalendar()
}

prevY.onclick = () => {
    if (currentSelect.getFullYear() - 1 < 1900) return
    currentSelect.setFullYear(currentSelect.getFullYear() - 1)
    renderCalendar()
}

nextY.onclick = () => {
    maxY = new Date(Date.now()).getFullYear() + 50
    if (currentSelect.getFullYear() + 1 > maxY) return
    currentSelect.setFullYear(currentSelect.getFullYear() + 1)
    renderCalendar()
}


function renderYear() {
    const yearOptions = []
    let currentYear = new Date(Date.now())
    for (let i = 1900; i <= currentYear.getFullYear() + 50; i++) {
        if (i === currentSelect.getFullYear()) {
            yearOptions.push(`<div data-value="${i}" class="option option--selected" >${i}</div>`)
        }
        else {
            yearOptions.push(`<div data-value="${i}" class="option " >${i}</div>`)
        }
    }
    dropListY.innerHTML = yearOptions.join("")
    selectY.querySelector('span').innerHTML = currentSelect.getFullYear()
}

// For Date select
const dropListD = document.querySelector(".calendar .days")
function renderDate() {
    let Y = currentSelect.getFullYear()
    let M = currentSelect.getMonth()
    const dateOptions = []

    let lastDateOfM = (new Date(Y, M + 1, 0)).getDate()
    let firstDayOfM = (new Date(Y, M, 1)).getDay()
    let lastDateOfLastM = (new Date(Y, M, 0)).getDate()
    let lastDayOfM = (new Date(Y, M, lastDateOfM)).getDay()


    for (let i = firstDayOfM; i > 0; i--) {
        let data = Date.parse(`${Y} ${M} ${lastDateOfLastM - i + 1}`)
        dateOptions.push(`
            <li
                class="inactive"
                data-value="${data}"
            >
            ${lastDateOfLastM - i + 1}
            </li>`
        )
    }

    for (let i = 1; i <= lastDateOfM; i++) {
        let data = Date.parse(`${Y} ${M + 1} ${i}`)
        if (i === currentSelect.getDate()) {
            dateOptions.push(`
                <li 
                    class="active"
                    data-value="${data}"
                >
                    ${i}
                </li>`
            )
        }
        else {
            dateOptions.push(`
                <li 
                    data-value="${data}"
                >
                    ${i}
                </li>`
            )
        }
    }

    for (let i = lastDayOfM; i < 6; i++) {
        let data = Date.parse(`${Y} ${M + 2} ${i - lastDayOfM + 1}`)
        dateOptions.push(`
            <li 
                class="inactive"
                data-value="${data}"
            >
                ${i - lastDayOfM + 1}
            </li>`
        )
    }

    dropListD.innerHTML = dateOptions.join("")

}

// Change currentDate when click on the date on the calendar
dropListD.onclick = (e) => {
    let selected = e.target.closest("li")
    let selectedDate = new Date(Number(selected.dataset.value))
    currentSelect = selectedDate
    renderCalendar()
}

// Render calendar
function renderCalendar() {
    renderMonth()
    renderYear()
    renderDate()
}


// Don't save currentDate -> chosenDate
const cancelBtn = calendar.querySelector(".calendar__cancel")
cancelBtn.onclick = () => {
    calendar.classList.add("calendar--hide")
    inputBirthday.querySelector(".form__box.birthday svg").classList.remove("active")
}

// Save currentDate -> chosenDate
const saveBtn = calendar.querySelector(".calendar__ok")


saveBtn.onclick = () => {
    chosenDate = new Date(currentSelect.getTime())
    inputBox.value = toInputDateFormat(chosenDate)
    calendar.classList.add("calendar--hide")
    inputBirthday.querySelector("span").innerHTML = dateString(chosenDate)
    inputBirthday.querySelector(".form__box.birthday svg").classList.remove("active")
}

function dateString(chosenDate) {
    var month = `${chosenDate.getMonth() + 1 <= 9 ? "0" : ""}${chosenDate.getMonth() + 1}`
    var date = `${chosenDate.getDate() <= 9 ? "0" : ""}${chosenDate.getDate()}`
    var year = `${chosenDate.getFullYear()}`

    return `${month}/${date}/${year}`
}

function toInputDateFormat(chosenDate) {
    var month = `${chosenDate.getMonth() + 1 <= 9 ? "0" : ""}${chosenDate.getMonth() + 1}`
    var date = `${chosenDate.getDate() <= 9 ? "0" : ""}${chosenDate.getDate()}`
    var year = `${chosenDate.getFullYear()}`

    return `${year}-${month}-${date}`
}

function setValue(value) {
    inputBox.value = value
    chosenDate = new Date(inputBox.value)
    currentSelect = new Date(chosenDate.getTime())
    inputBirthday.querySelector("span").innerHTML = dateString(chosenDate)
}

export default setValue

