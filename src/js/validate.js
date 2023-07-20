import setValue from "./calendar.js"
function validator(formSelector) {

    // Danh sách các hàm để validate
    const validateFunc = {
        required: function (value) {
            return value ? undefined : "Please fill this field!"
        },
        email: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value) ? undefined : "Please check the email format!"
        },
        phone: function (value) {
            var regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
            return regex.test(value) ? undefined : "Please check the phone format!"
        }
    }

    // Chứa rule validate cho mỗi input
    const rulesOnInputs = new Map()

    // Chứa giá trị cho mỗi input khi chưa submit
    const valueOnInputs = new Map()

    var form = document.querySelector("form#profile-form")
    const inputs = form.querySelectorAll("input[name]")
    const cancelBtn = document.querySelector(".form .form__cancel")
    const saveBtn = document.querySelector(".form .form__save")

    inputs.forEach((input) => {
        var rules = input.getAttribute("rules").split(" ")
        rulesOnInputs.set(input, rules)
        if (input.type === "radio") {
            valueOnInputs.set(input, input.checked)
        }
        else {
            valueOnInputs.set(input, input.value)
        }

        // Khi blur khỏi input sẽ validate
        input.onblur = () => {
            validate(input)
        }

        input.oninput = () => {
            var parentElement = getParent(input)

            if (parentElement.classList.contains('invalid')) {
                parentElement.classList.remove('invalid')
            }
        }

    })

    function resetValue() {
        inputs.forEach(input => {

            switch (input.type) {
                case "date":
                    setValue(valueOnInputs.get(input))
                    break;
                case "radio":
                    input.checked = valueOnInputs.get(input)
                    break;
                default:
                    input.value = valueOnInputs.get(input)
            }
            getParent(input).classList.remove("invalid")
        })
    }

    function getParent(input) {
        return input.closest(".form__input")
    }

    function getErrorElement(input) {
        var parentElement = getParent(input)

        var errorSelector = ".input__error"
        var errorElement = parentElement.querySelector(errorSelector)

        return errorElement
    }

    function validate(input) {

        var errorMessage

        for (var rule of rulesOnInputs.get(input)) {

            // Nếu rule chưa tồn tại trong validateFunc
            if (typeof validateFunc[rule] !== 'function') {
                break
            }

            errorMessage = validateFunc[rule](input.value)
            if (errorMessage) {
                break
            }
        }

        if (errorMessage) {
            getParent(input).classList.add("invalid")
            getErrorElement(input).innerText = errorMessage
        }
        else {
            getParent(input).classList.remove("invalid")
            getErrorElement(input).innerText = ""
        }

        return errorMessage
    }

    cancelBtn.onclick = () => {
        resetValue()
    }

    saveBtn.onclick = () => {
        var err
        for (var input of inputs) {
            err = validate(input)
            if (err) {
                break
            }
        }
        if (err) {
            return
        }
        else {
            var data = getFormData()

            inputs.forEach(input => {
                if (input.type === "radio") {
                    valueOnInputs.set(input, input.checked)
                }
                else {
                    valueOnInputs.set(input, input.value)
                }
            })
            resetValue()
            alert(JSON.stringify(data))
        }
    }

    function getFormData() {

        var data = {}
        var inputsNodeList = form.querySelectorAll(`.form input[name]`)
        var inputArray = Array.from(inputsNodeList)
        inputArray.reduce((value, input) => {
            switch (input.type) {
                case 'radio':
                    if (input.checked) {
                        value[input.name] = input.value
                    }
                    break;
                case 'checkbox':
                    if (!value[input.name]) {
                        value[input.name] = []
                    }
                    if (input.checked) {
                        value[input.name].push(input.value)
                    }
                    break
                default:
                    value[input.name] = input.value
                    break;
            }
            return value
        }, data)

        return data

    }


}

validator("#profile-form")