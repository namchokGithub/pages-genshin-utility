document.addEventListener('DOMContentLoaded', () => {
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
            intertwinedFate.innerHTML = `x ${fateAmount.toLocaleString() }`
            acquaintFate.innerHTML = `x ${fateAmount.toLocaleString() }`
        } else {
            clearButton.classList.add('disabled');
            intertwinedFate.innerHTML = `x 0`
            acquaintFate.innerHTML = `x 0`
        }
    }

    function clearForm() {
        if (clearButton.classList.contains('disabled')) return;
        inputField.value = '';
        waitTimeDailyElement.innerHTML = `It will take approximately <span class="hl-wait-time-daily"> 0 days</span> to save enough Primogems for your next 5-star character.`;
        waitTimeWelkinElement.innerHTML = `It will take approximately <span class="hl-wait-time-daily"> 0 days</span> to save enough Primogems for your next 5-star character.`;
        intertwinedFate.innerHTML = `x 0`
        acquaintFate.innerHTML = `x 0`
        clearButton.classList.add('disabled');
    }

    inputField.addEventListener('input', calculateDays);
    clearButton.addEventListener('click', clearForm);

    // Initial state
    calculateDays();
});