import { banks } from '../../detect-bank.js';

const txtCredits = document.querySelectorAll('.box__input input');
const detectedbank_box = document.querySelector('.box-detectedbank');


const DetectInput = (event, index) => {
    let valueOfInput = event.target.value;
    if(valueOfInput.length >= 4) {
        event.target.value = valueOfInput.substr(-4);
        txtCredits[index + 1].focus();

        if(index >= 3){
            txtCredits[3].blur();
        }
    }
}

// const DetectCreditCard = () => {}

txtCredits.forEach((txtCredit, index) => {
    txtCredit.addEventListener('input', (e) => DetectInput(e, index));
})


console.log(banks);