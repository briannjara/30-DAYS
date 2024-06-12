const passwordBox = document.getElementById("password");
const size = 12;

const upperCase = "ABCDEFGHIJKLMNOPQRSTVUWXYZ"
const lowerCase = "abcdefghijklmnopqrstvuwxyz"
const number = "0123456789"
const symbol = "@~#$%^&*_+=";
const allChars = upperCase + lowerCase + number + symbol;

function createPassword(){
    let password = "";
    password += upperCase[Math.floor(Math.random() * upperCase.length)];
    password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
    password += number[Math.floor(Math.random() * number.length)];
    password += symbol[Math.floor(Math.random() * symbol.length)];

    while(password.length < size){
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }
    passwordBox.value = password;
}

function copyPassword() {
    passwordBox.select();
    if (navigator.clipboard) { // Updated to use the modern Clipboard API
        navigator.clipboard.writeText(passwordBox.value)
            .then(() => {
                console.log('Password copied to clipboard');
            })
            .catch(err => {
                console.error('Could not copy password: ', err);
            });
    } else {
        document.execCommand("copy"); // Kept for older browsers
    }
}

