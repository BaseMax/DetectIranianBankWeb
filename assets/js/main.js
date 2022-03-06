import { banks } from '../../detect-bank.js';

const txtCredits = document.querySelectorAll('.box__input input');
const detectedbank_box = document.querySelector('.box-detectedbank');
let firstNumCredit = undefined;
let checkNumber = false;
const persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
const arabicNumbers  = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];


const ReplaceDigitNumbers = (value) => {
    if(typeof value === "string"){
        for(let i = 0; i < 10; i++){
            value = value.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
        }
    }
    return value;
}

const DetectInput = (event, index) => {
    event.target.value = ReplaceDigitNumbers(event.target.value);
    if(checkNumber){
        if(index === 3){
            return false;
        }
        let valueOfInput = event.target.value;
        if(valueOfInput.length >= 4) {
            event.target.value = valueOfInput.substr(-4);
            txtCredits[index + 1].focus();
            if(index === 0){
                firstNumCredit = valueOfInput;
            }
            if(index === 1){
                DetectCreditCard(event.target.value);
            }
        }
    }
}

const NumberValidation = (event) => {
    let ASCIICode = (event.which) ? event.which : event.keyCode;
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)){
        event.preventDefault();
        checkNumber = false;
    }
    checkNumber = true;
}

const DetectCreditCard = (value) => {
    if(detectedbank_box && value !== undefined){
        const detectbank_logo = detectedbank_box.querySelector('.detectedbank__logo');
        const detectbank_name = detectedbank_box.querySelector('.detectedbank__name');
        let selectBank = [];

        firstNumCredit = firstNumCredit + "" + value.slice(0, 2);

        selectBank = banks.filter(item => item.card_no == firstNumCredit);

        if(selectBank){
            detectbank_logo.src = selectBank[0].bank_logo;
            detectbank_name.innerHTML = selectBank[0].bank_title;
            detectedbank_box.classList.add('active');
        }
    }
}


window.addEventListener('load', ReplaceDigitNumbers);

if(txtCredits){
    txtCredits.forEach((txtCredit, index) => {
        txtCredit.addEventListener('keypress', (e) => NumberValidation(e));
        txtCredit.addEventListener('input', (e) => DetectInput(e, index));
    });
}
