const names = document.querySelectorAll('.name');
let isFirstNameValid = true;
let isLastNameValid = true;

names.forEach(input => {
    input.addEventListener('input', function() {
        const nameInput = input.value;
        const nameRegex = /^[\p{L}\s]+$/u;
        const isValid = nameRegex.test(nameInput);

        if (input.id === 'first-name') {
            isFirstNameValid = isValid;
        }
        else {
            isLastNameValid = isValid;
        }

        if (nameInput && !isValid) {
            input.style.border = '2px solid red';
        }
        else {
            input.style.border = '2px solid #ccc';
        }

        const nameWarning = document.getElementById('name-warning');

        if ((isFirstNameValid && isLastNameValid) || (names[0].value === '' && names[1].value === '') ||
            (isFirstNameValid && names[1].value === '') || (names[0].value === '' && isLastNameValid)) {
            nameWarning.style.display = 'none';
        }
        else {
            nameWarning.style.display = 'block';
        }
    });
});

const email = document.getElementById('email');
const emailList = document.getElementById('email-list');
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

email.addEventListener('input', function() {
    const emailInput = email.value;

    if (emailInput.indexOf('@') === -1) {
        emailList.style.display = 'flex';
    }
    else {
        emailList.style.display = 'none';
    }

    const emailWarning = document.getElementById('email-warning');

    if (emailInput && !emailRegex.test(emailInput)) {
        emailWarning.style.display = 'block';
        email.style.border = '2px solid red';
    }
    else {
        emailWarning.style.display = 'none';
        email.style.border = '2px solid #ccc';
    }
});

email.addEventListener('focus', function() {
    if (email.value.indexOf('@') === -1) {
        emailList.style.display = 'flex';
    }
});

email.addEventListener('blur', function() {
    setTimeout(() => {
        emailList.style.display = 'none';
    }, 200);
});

const listItems = emailList.querySelectorAll('li');

listItems.forEach(item => {
    item.addEventListener('click', function() {
        email.value += item.textContent;

        const event = new Event('input');
        email.dispatchEvent(event);
    });
});

const phone = document.getElementById('phone-number');
const phoneRegex = /^(\d{2})\/(\d{3})-(\d{4})$/;

phone.addEventListener('input', function(event) {
    let phoneInput = event.target.value.replace(/\D/g, '');

    if (phoneInput.length > 9) {
        phoneInput = phoneInput.slice(0, 9);
    }

    if (phoneInput.length <= 2) {
        phoneInput = phoneInput.replace(/(\d{1,2})/, '$1');
    }
    else if (phoneInput.length <= 5) {
        phoneInput = phoneInput.replace(/(\d{2})(\d{1,3})/, '$1/$2');
    }
    else {
        phoneInput = phoneInput.replace(/(\d{2})(\d{3})(\d{1,4})/, '$1/$2-$3');
    }

    event.target.value = phoneInput;

    const phoneWarning = document.getElementById('phone-warning');

    if (phoneInput && !phoneRegex.test(phoneInput)) {
        phoneWarning.style.display = 'block';
        phone.style.border = '2px solid red';
    }
    else {
        phoneWarning.style.display = 'none';
        phone.style.border = '2px solid #ccc';
    }
});

const message = document.getElementById('message');
const charCount = document.getElementById('char-count');

message.addEventListener('input', function() {
    charCount.textContent = message.value.length;
});

const form = document.querySelector('form');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const emailInput = email.value;

    if (emailInput && !emailRegex.test(emailInput)) {
        alert('Az e-mail cím formátuma hibás!');
        email.focus();

        return;        
    }

    const phoneInput = phone.value;

    if (phoneInput && !phoneRegex.test(phoneInput)) {
        alert('A telefonszám formátuma hibás!');
        phone.focus();

        return;
    }

    alert('Sikeres küldés!');
    form.submit();
});
