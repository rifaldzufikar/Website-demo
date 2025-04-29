let display = document.calcForm.display;
let justCalculated = false;
let historyDiv = document.getElementById("history"); // Get the story element

function appendToDisplay(value) {
    if (justCalculated && /[0-9.]/.test(value)) {
        display.value = value;
    } else {
        display.value += value;
    }
    justCalculated = false;
}

function clearDisplay() {
    display.value = '';
    historyDiv.innerText = ''; // clear history too
    justCalculated = false;
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        let rawExp = display.value;
        let expression = rawExp.replace(/x/g, '*').replace(/÷/g, '/').replace('%', '/100');
        let result = eval(expression);

        // Tambahkan spasi antara angka dan operator untuk tampilan history
        let prettyExp = rawExp
            .replace(/x/g, ' x ')
            .replace(/\//g, ' ÷ ')
            .replace(/\+/g, ' + ')
            .replace(/-/g, ' - ')
            .replace(/%/g, ' % ');

        historyDiv.innerText = `${prettyExp} = ${result}`;
        display.value = result;
        justCalculated = true;
    } catch (e) {
        display.value = "Error";
        justCalculated = true;
    }
}
