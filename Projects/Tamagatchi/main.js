
const term = new Terminal({
    theme: {
        background: "#000000",
        foreground: "#00FF00",
    },
});

// const fitAddon = new FitAddon();

// term.loadAddon(fitAddon);

term.open(document.getElementById("xterm-container"));

// fitAddon.fit();

let currentPet = null;

let inputBuffer = "";
term.writeln("Welcome to the Tamagatchi!");
function showMainMenu() {
    term.writeln("\n=== TAMAGOTCHI ===");
    term.writeln("\n1. New Pet");
    term.writeln("\n2. Load Pet");
    term.writeln("\n3. Exit");
    term.writeln("\nChoice: ");

}

term.onData((key) => {
    if (key === "\r") {
        const choice = inputBuffer.trim();
        inputBuffer = "";

        if (choice === "1") {
            term.writeln("Creating new pet... ___WIP___");
            //createNewPet();
        } else if (choice === "2") {
            term.writeln("Loading pet... ___WIP___");
            // loadPet();
        } else if (choice === "3") {
            term.writeln("Exiting...");
        } else {
            term.writeln("Invalid Input! Try again.");
            showMainMenu();
    }
} else if (key === "\u007F") {
    if (inputBuffer.length > 0) {
        inputBuffer = inputBuffer.slice(0, -1);
        term.write("\b \b");
    }
} else {
    inputBuffer += key;
    term.write(key);
}
});

showMainMenu();