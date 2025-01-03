//---------------------
// |                 |
// |    Calculate    |
// |                 |
// -------------------
const inputField = document.getElementById('primogems-input');
const clearButton = document.getElementById('btn-clear');
const waitTimeDailyElement = document.getElementById('wait-time-daily');
const waitTimeWelkinElement = document.getElementById('wait-time-welkin');
const intertwinedFate = document.getElementById('intertwined-fate');
const acquaintFate = document.getElementById('acquaint-fate');

function calculateDays() {
    const totalPrimogemsNeeded = 14400;
    const dailyCommissionPrimogems = 60;
    const welkinPrimogems = 90;

    let inputPrimogems = parseInt(inputField.value, 10) || 0;
    if (inputPrimogems < 0) {
        inputPrimogems = 0;
        inputField.value = 0;
        return;
    }
    const remainingPrimogems = Math.max(totalPrimogemsNeeded - inputPrimogems, 0);
    const daysRequired = remainingPrimogems / dailyCommissionPrimogems;
    const daysWelkinRequired = remainingPrimogems / (dailyCommissionPrimogems + welkinPrimogems);

    if (Math.ceil(daysRequired) === 0) {
        waitTimeDailyElement.innerHTML = `You have <span class="hl-wait-time-daily">ENOUGH!</span> Primogems.`;
    } else {
        waitTimeDailyElement.innerHTML = `
            It will take approximately <span class="hl-wait-time-daily">${Math.ceil(daysRequired)} days</span> to save enough Primogems for your next 5-star character.
            `;
    }
    if (Math.ceil(daysWelkinRequired) === 0) {
        waitTimeWelkinElement.innerHTML = `You have <span class="hl-wait-time-daily">ENOUGH!</span> Primogems.`;
    } else {
        waitTimeWelkinElement.innerHTML = `
            It will take approximately <span class="hl-wait-time-daily">${Math.ceil(daysWelkinRequired)} days</span> to save enough Primogems for your next 5-star character.
            `;
    }

    if (inputPrimogems > 0) {
        clearButton.classList.remove('disabled');
        let fateAmount = Math.floor(inputPrimogems / 160);
        intertwinedFate.innerHTML = `x ${fateAmount.toLocaleString()}`
        acquaintFate.innerHTML = `x ${fateAmount.toLocaleString()}`
    } else {
        clearButton.classList.add('disabled');
        intertwinedFate.innerHTML = `x 0`
        acquaintFate.innerHTML = `x 0`
    }
}

function clearForm() {
    if (clearButton.classList.contains('disabled')) return;
    inputField.value = '';
    waitTimeDailyElement.innerHTML = `It will take approximately <span class="hl-wait-time-daily"> 240 days</span> to save enough Primogems for your next 5-star character.`;
    waitTimeWelkinElement.innerHTML = `It will take approximately <span class="hl-wait-time-daily"> 96 days</span> to save enough Primogems for your next 5-star character.`;
    intertwinedFate.innerHTML = `x 0`
    acquaintFate.innerHTML = `x 0`
    clearButton.classList.add('disabled');
}

//---------------------
// |                 |
// |    Primogems    |
// |                 |
// -------------------
const pmgSubBtnHundreds = document.getElementById("pmg-sub-hundreds");
const pmgAddBtnHundreds = document.getElementById("pmg-add-hundreds");
const pmgSubBtnThousands = document.getElementById("pmg-sub-thousands");
const pmgAddBtnThousands = document.getElementById("pmg-add-thousands");

function pmgSubHundreds() {
    let inputPrimogems = parseInt(inputField.value, 10) || 0;
    if (inputPrimogems == 0) return;
    inputPrimogems -= 100;
    if (inputPrimogems < 0) inputPrimogems = 0;
    inputField.value = inputPrimogems;
    calculateDays();
}

function pmgAddHundreds() {
    let inputPrimogems = parseInt(inputField.value, 10) || 0;
    inputPrimogems += 100;
    inputField.value = inputPrimogems;
    calculateDays();
}

function pmgSubThousands() {
    let inputPrimogems = parseInt(inputField.value, 10) || 0;
    if (inputPrimogems === 0) return;
    inputPrimogems -= 1000;
    if (inputPrimogems < 0) inputPrimogems = 0;
    inputField.value = inputPrimogems;
    calculateDays();
}

function pmgAddThousands() {
    let inputPrimogems = parseInt(inputField.value, 10) || 0;
    inputPrimogems += 1000;
    inputField.value = inputPrimogems;
    calculateDays();
}

pmgSubBtnHundreds.addEventListener("click", pmgSubHundreds);
pmgAddBtnHundreds.addEventListener("click", pmgAddHundreds);
pmgSubBtnThousands.addEventListener("click", pmgSubThousands);
pmgAddBtnThousands.addEventListener("click", pmgAddThousands);

//---------------------
// |                 |
// |  Change content |
// |                 |
// -------------------
function switchContent(target) {
    const allContents = document.querySelectorAll('.content');
    const allMenu = document.querySelectorAll('.menu');
    allContents.forEach(content => {
        if (content.id === target) {
            content.style.display = 'flex';
        } else {
            content.style.display = 'none';
        }
    });
    targetMenu = `menu-${target}`;
    allMenu.forEach(content => {
        if (content.id === targetMenu) {
            content.classList.add('li-active');
        } else {
            content.classList.remove('li-active');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    inputField.addEventListener('input', calculateDays);
    clearButton.addEventListener('click', clearForm);

    // Initial state
    calculateDays();
});