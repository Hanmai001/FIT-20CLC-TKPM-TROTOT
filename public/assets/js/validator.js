
function Validator(options) {
    const formElement = document.querySelector(options.form)
    let selectorRules = {} 

    function validate(inputElement, rule) {
        const errorElement = inputElement.parentElement.querySelector('.form-message')
        let errorMessage 

        const rules = selectorRules[rule.selector]

        for (var i = 0; i < rules.length; i++) {
            errorMessage = rules[i](inputElement.value)
            if (errorMessage) break
        }

        if (errorMessage) {
            errorElement.innerText = errorMessage
            inputElement.parentElement.classList.add('invalid')
            return false
        }
        else {
            errorElement.innerText = ''
            inputElement.parentElement.classList.remove('invalid')
            return true
        }
    }   

    if (formElement) {
        options.rules.forEach(rule => {
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }
            
            const inputElement = formElement.querySelector(rule.selector)

            if (inputElement) {
                inputElement.onblur = () => {
                    validate(inputElement, rule)
                }
                inputElement.oninput = () => {
                    inputElement.parentElement.querySelector('.form-message').innerText = ''
                    inputElement.parentElement.classList.remove('invalid')
                }
            }
        })
        
        formElement.onsubmit = (e) => {
            options.rules.forEach(rule => {
                const inputElement = formElement.querySelector(rule.selector)
                if (validate(inputElement, rule) === false) {
                    e.preventDefault()
                    return
                }
            })
        }
    }

    

}

Validator.isRequired = (selector, message) => {
    return {
        selector,
        test: (value) => {
            return value.trim() ? undefined : message
        }
    }
}

Validator.isEmail = (selector) => {
    return {
        selector,
        test: (value) => {
            const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return value.match(mailFormat) ? undefined : 'Please input correct email format.'
        }
    }
}

Validator.minLength = (selector, min) => {
    return {
        selector,
        test: (value) => {
            return value.length >= min ? undefined : `Please input at least ${min} length.`
        }
    }
}

Validator.isCorrect = (selector, selector2) => {
    return {
        selector,
        test: (value) => {
            return value === document.querySelector(selector2).value ? undefined : `Please input correct new password.`
        }
    }
}


Validator.checkAvailableEmail = (selector) => {
    return {
        selector,
        test: (value) => {
            $.getJSON(`/account/is-available?email=${value}`, function (data) {
                if (data === false) {
                    return 'This email is already used.';
                } 
                return undefined;
            });
        }
    }
}