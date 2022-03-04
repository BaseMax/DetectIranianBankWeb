import { banks } from '../../detect-bank.js';

const txtCredits = document.querySelectorAll('.box__input input');
const detectedbank_box = document.querySelector('.box-detectedbank');


const detectInput = (event, index) => {
    console.log(event)
    console.log(index)
}

txtCredits.forEach((txtCredit, index) => {
    txtCredit.addEventListener('input', (e) => detectInput(e, index));
})


console.log(banks);