var eliza = new ElizaBot();
var elizaLines = [];

const displayCols = 60;
const displayRows = 20;

// Define a variable string
const honorificE = ">>"; //▓░z█a · ";
const honorificU = ""; //me  · ";

function elizaReset() {
    eliza.reset();
    elizaLines.length = 0;
    elizaStep();
    scrollToBottom();
}

function elizaStep() {
    const form = document.forms.e_form;
    const userInput = form.e_input.value;

    if (eliza.quit) {
        form.e_input.value = '';
        if (confirm("We'll need to terminate this session.\n\nYou obviously said something unnecessary.\n\n\n\nShould we forget everything and start over?")) elizaReset();
        form.e_input.focus();
        return;
    }

    if (userInput !== '') {
        const userText = `${honorificU} ${userInput}`;
        const elizaResponse = `${honorificE} ${eliza.transform(userInput)}`;
        elizaLines.push(userText, elizaResponse);

        // Display nicely (fit to textarea with last line free - reserved for extra line caused by word wrap)
        const temp = [];
        let lineCount = 0;

        for (let i = elizaLines.length - 1; i >= 0; i--) {
            lineCount += 1 + Math.floor(elizaLines[i].length / displayCols);
            if (lineCount >= displayRows) break;
            temp.push(elizaLines[i]);
        }

        elizaLines = temp.reverse();
        form.e_display.value = elizaLines.join('\n');
        scrollToBottom();
    } else if (elizaLines.length === 0) {

        // No input and no saved lines -> output initial
        const initial = `${honorificE} ${eliza.getInitial()}`;
        elizaLines.push(initial);
        form.e_display.value = `${initial}\n`;
        scrollToBottom();
        
    }

    form.e_input.value = '';
    form.e_input.focus();
}

function scrollToBottom() {
    var textarea = document.forms['e_form'].elements['e_display'];
    textarea.scrollTop = textarea.scrollHeight;
}
