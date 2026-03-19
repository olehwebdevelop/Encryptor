const h3 = document.querySelector(".encryptor h3");
const buttons = document.querySelectorAll(".en-btn");
const buttonsWrapper = document.querySelector(".encryptor-buttons");
const input = document.getElementById("text-input");
const output = document.getElementById("output");
const encryptBtn = document.getElementById("enter");
const changeBtn = document.getElementById("change");

let currentCipher = "Caesar";
let isDecryptMode = false;

h3.textContent = currentCipher + " used";

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        if (isDecryptMode) return;

        const newCipher = btn.textContent;

        h3.textContent = newCipher + " used";
        btn.textContent = currentCipher;
        currentCipher = newCipher;
    });
});

function caesarCipher(text, shift = 7) {
    let result = "";

    for (let char of text) {
        if (/[a-zA-Z]/.test(char)) {
            let code = char.charCodeAt(0);

            if (code >= 65 && code <= 90) {
                char = String.fromCharCode(((code - 65 + shift + 26) % 26) + 65);
            }
            else if (code >= 97 && code <= 122) {
                char = String.fromCharCode(((code - 97 + shift + 26) % 26) + 97);
            }
        }
        result += char;
    }

    return result;
}

const normalAlphabet = "abcdefghijklmnopqrstuvwxyz";
const substitutedAlphabet = "qwertyuiopasdfghjklzxcvbnm";

function substitutionCipher(text, decrypt = false) {
    let result = "";

    for (let char of text) {
        let lowerChar = char.toLowerCase();
        let from = decrypt ? substitutedAlphabet : normalAlphabet;
        let to = decrypt ? normalAlphabet : substitutedAlphabet;

        if (from.includes(lowerChar)) {
            let index = from.indexOf(lowerChar);
            let newChar = to[index];

            result += (char === lowerChar)
                ? newChar
                : newChar.toUpperCase();
        } else {
            result += char;
        }
    }

    return result;
}

function atbashCipher(text) {
    let result = "";

    for (let char of text) {
        if (/[a-z]/.test(char)) {
            result += String.fromCharCode(122 - (char.charCodeAt(0) - 97));
        }
        else if (/[A-Z]/.test(char)) {
            result += String.fromCharCode(90 - (char.charCodeAt(0) - 65));
        }
        else {
            result += char;
        }
    }

    return result;
}

function transpositionCipher(text) {
    let result = "";

    for (let i = 0; i < text.length; i += 2) {
        if (i + 1 < text.length) {
            result += text[i + 1] + text[i];
        } else {
            result += text[i];
        }
    }

    return result;
}

encryptBtn.addEventListener("click", () => {
    const text = input.value;

    if (!isDecryptMode) {
        let resultText = "";

        if (currentCipher === "Caesar") {
            resultText = caesarCipher(text, 7);
        }
        else if (currentCipher === "Substitution") {
            resultText = substitutionCipher(text, false);
        }
        else if (currentCipher === "Atbash") {
            resultText = atbashCipher(text);
        }
        else if (currentCipher === "Transposition") {
            resultText = transpositionCipher(text);
        }

        output.textContent = resultText;
    }

    else {

        const caesarResult = caesarCipher(text, -7);
        const substitutionResult = substitutionCipher(text, true);
        const atbashResult = atbashCipher(text);
        const transpositionResult = transpositionCipher(text);

        output.innerHTML = `
        <strong>Caesar (-7):</strong> ${caesarResult} <br>
        <strong>Substitution:</strong> ${substitutionResult} <br>
        <strong>Atbash:</strong> ${atbashResult} <br>
        <strong>Transposition:</strong> ${transpositionResult}
        `;
    }
});

changeBtn.addEventListener("click", () => {

    isDecryptMode = !isDecryptMode;

    if (isDecryptMode) {
        buttonsWrapper.style.opacity = "0";
        h3.textContent = "Decryptor used";
        encryptBtn.textContent = "Decrypt";
        changeBtn.textContent = "Back to encrypt?";
    } else {
        buttonsWrapper.style.opacity = "1";
        h3.textContent = currentCipher + " used";
        encryptBtn.textContent = "Encrypt";
        changeBtn.textContent = "Want to decrypt?";
    }

});