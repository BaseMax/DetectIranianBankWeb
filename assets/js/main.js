import { banks } from '../../detect-bank.js';

const txtCredits = document.querySelectorAll('.box__input input');
const detectedbank_box = document.querySelector('.box-detectedbank');
let firstNumCredit = undefined;


const DetectInput = (event, index) => {
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

const DetectCreditCard = (value) => {
    if(detectedbank_box && value !== undefined){
        const detectbank_logo = detectedbank_box.querySelector('.detectedbank__logo')
        const detectbank_name = detectedbank_box.querySelector('.detectedbank__name')
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

if(txtCredits){
    txtCredits.forEach((txtCredit, index) => {
        txtCredit.addEventListener('input', (e) => DetectInput(e, index));
    })
}


console.log(banks);