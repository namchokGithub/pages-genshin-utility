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

//---------------------
// |                  |
// | Resin calculator |
// |                  |
// -------------------
let countdownInterval;
function startCountdown(targetValue, currentValue, incrementInterval) {
    const updateCountdown = () => {
        const difference = targetValue - currentValue;
        const totalSeconds = difference * incrementInterval * 60; // Calculate total seconds

        if (totalSeconds <= 0) {
            clearInterval(countdownInterval);
            document.querySelector('.hour-count-down').textContent = '00';
            document.querySelector('.min-count-down').textContent = '00';
            document.querySelector('.sec-count-down').textContent = '00';
            return;
        }

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.floor(totalSeconds % 60);

        document.querySelector('.hour-count-down').textContent = hours.toString().padStart(2, '0');
        document.querySelector('.min-count-down').textContent = minutes.toString().padStart(2, '0');
        document.querySelector('.sec-count-down').textContent = seconds.toString().padStart(2, '0');
        currentValue += incrementInterval / 60;
    };

    clearInterval(countdownInterval); // Clear any existing interval to avoid duplicates
    countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();
}
function calculateTargetTime() {
    let currentValue = parseInt(document.getElementById('current-resin-input').value);
    let targetValue = parseInt(document.getElementById('target-resin-input').value);
    if (isNaN(currentValue) || currentValue > targetValue) {
        currentValue = 0;
    }
    if (isNaN(targetValue) || targetValue > 200) {
        targetValue = 200;
    }
    document.getElementById("current-resin-input").value = currentValue;
    document.getElementById("target-resin-input").value = targetValue;

    const incrementInterval = 8; // Fixed increment interval in minutes
    const difference = targetValue - currentValue;
    const totalMinutes = difference * incrementInterval;
    const totalSeconds = difference * incrementInterval * 60;

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const seconds = totalSeconds % 60;

    const now = new Date();
    const targetTime = new Date(now.getTime());
    targetTime.setHours(now.getHours() + hours);
    targetTime.setMinutes(now.getMinutes() + totalMinutes);
    targetTime.setSeconds(now.getSeconds() + totalSeconds);
    const formattedTargetTime = targetTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    const isTomorrow = targetTime.getDate() !== now.getDate() || targetTime.getMonth() !== now.getMonth() || targetTime.getFullYear() !== now.getFullYear();
    const finalTargetTime = isTomorrow ? `<i>Tomorrow</i>, ${formattedTargetTime}` : formattedTargetTime;

    document.getElementById('output').innerHTML = `
    <p class="total-time">
        Total Time: [ ${hours.toString().padStart(2, '0')}
        <span class="time-unit">Hr(s)</span>
        ${minutes.toString().padStart(2, '0')}
        <span class="time-unit">Min(s)</span> ]
    </p>
    <p>
        <span class="hour-count-down">${hours.toString().padStart(2, '0')}</span> <span class="time-unit">Hr(s)</span>
        <span class="min-count-down">${minutes.toString().padStart(2, '0')}</span> <span class="time-unit">Min(s)</span>
        <span class="sec-count-down">${seconds.toString().padStart(2, '0')}</span> <span class="time-unit">Sec(s)</span>
    </p>
     <p id="target-time" style="font-size: 14px; margin-bottom: 15px;">Target Time: ${finalTargetTime}</p>
    `;
    clearInterval(countdownInterval);
    startCountdown(totalMinutes, 0, 1);
}
function clearForm() {
    const clearButton = document.getElementById('resin-btn-clear');
    if (clearButton.classList.contains('disabled')) {
        return;
    }
    document.getElementById('current-resin-input').value = '';
    document.getElementById('target-resin-input').value = '';
    clearInterval(countdownInterval);
    document.getElementById('output').innerHTML = `
        <p class="total-time">
            Total Time: [ 00
            <span class="time-unit">Hr(s)</span>
            00
            <span class="time-unit">Min(s)</span> ]
        </p>
        <p>
            <span class="hour-count-down">00</span> <span class="time-unit">Hr(s)</span>
            <span class="min-count-down">00</span> <span class="time-unit">Min(s)</span>
            <span class="sec-count-down">00</span> <span class="time-unit">Sec(s)</span>
        </p>
        <p id="target-time" style="font-size: 14px; margin-bottom: 15px;">Target Time: 0:00 AM</p>
    `;
}
const currentResinInput = document.getElementById("current-resin-input");
const targetResinInput = document.getElementById("target-resin-input");
const resinSubBtnTen = document.getElementById("rs-sub-ten");
const resinAddBtnTen = document.getElementById("rs-add-ten");
const resinSubBtnHundreds = document.getElementById("rs-sub-hundreds");
const resinAddBtnHundreds = document.getElementById("rs-add-hundreds");
function resinSubTen() {
    let currentResin = parseInt(currentResinInput.value, 10) || 0;
    if (currentResin == 0) return;
    currentResin -= 10;
    if (currentResin < 0) currentResin = 0;
    currentResinInput.value = currentResin;
}
function resinAddTen() {
    let currentResin = parseInt(currentResinInput.value, 10) || 0;
    currentResin += 10;
    if (currentResin > 200) currentResin = 200;
    currentResinInput.value = currentResin;
}
function resinSubHundreds() {
    let currentResin = parseInt(currentResinInput.value, 10) || 0;
    if (currentResin === 0) return;
    currentResin -= 100;
    if (currentResin < 0) currentResin = 0;
    currentResinInput.value = currentResin;
}
function resinAddHundreds() {
    let currentResin = parseInt(currentResinInput.value, 10) || 0;
    currentResin += 100;
    if (currentResin > 200) currentResin = 200;
    currentResinInput.value = currentResin;
}
resinSubBtnTen.addEventListener("click", resinSubTen);
resinAddBtnTen.addEventListener("click", resinAddTen);
resinSubBtnHundreds.addEventListener("click", resinSubHundreds);
resinAddBtnHundreds.addEventListener("click", resinAddHundreds);
currentResinInput.addEventListener("input", () => {
    currentResinInput.value = Math.max(0, Math.min(currentResinInput.value, 200));
});
targetResinInput.addEventListener("input", () => {
    targetResinInput.value = Math.max(0, Math.min(targetResinInput.value, 200));
});

//---------------------
// |                 |
// |  Current time   |
// |                 |
// -------------------
function getTimezoneName() {
    const today = new Date();
    const short = today.toLocaleDateString(undefined);
    const full = today.toLocaleDateString(undefined, { timeZoneName: 'short' });
    const shortIndex = full.indexOf(short);
    if (shortIndex >= 0) {
        const trimmed = full.substring(0, shortIndex) + full.substring(shortIndex + short.length);
        return trimmed.replace(/^[\s,.\-:;]+|[\s,.\-:;]+$/g, '');
    } else {
        return full;
    }
}
function updateTime() {
    const currentTimeElement = document.getElementById('current-time');
    const now = new Date(); // Automatically uses the user's local timezone
    let formattedTime = now.toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: '2-digit' });
    formattedTime = formattedTime.replace(' am', ' AM').replace(' pm', ' PM');
    currentTimeElement.textContent = `⏲️ Current Time (${getTimezoneName()}): ${formattedTime}`;
}
function startMinuteUpdater() {
    updateTime();
    const now = new Date();
    const secondsUntilNextMinute = 60 - now.getSeconds();
    setTimeout(() => {
        updateTime();
        setInterval(updateTime, 60000); // Update every 60 seconds
    }, secondsUntilNextMinute * 1000);
}
startMinuteUpdater();

document.addEventListener('DOMContentLoaded', () => {
    inputField.addEventListener('input', calculateDays);
    clearButton.addEventListener('click', clearForm);

    // Initial state
    calculateDays();
});