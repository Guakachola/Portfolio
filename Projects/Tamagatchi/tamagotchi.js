const term = new Terminal({
    theme: {
        background: "#000000",
        foreground: "#00FF00",
    },
    cursorBlink: true,
    cols: 80,
    rows: 30
});

term.open(document.getElementById("xterm-container"));

// Pet Classes
class Pet {
    constructor(name = "Unknown", color = "Unknown", actionsLeft = 3, hungerVal = 100, sleepyVal = 100, boredVal = 100, happyVal = 100, hours = 0) {
        this.name = name;
        this.color = color;
        this.actionsLeft = actionsLeft;
        this.hungerVal = hungerVal;
        this.sleepyVal = sleepyVal;
        this.boredVal = boredVal;
        this.happyVal = happyVal;
        this.hours = hours;
    }

    getName() { return this.name; }
    getColor() { return this.color; }
    getActionsLeft() { return this.actionsLeft; }
    setActionsLeft(val) { this.actionsLeft = val; }
    getHours() { return this.hours; }
    getHungerVal() { return this.hungerVal; }
    setHungerVal(val) { this.hungerVal = Math.max(0, Math.min(100, val)); }
    getSleepyVal() { return this.sleepyVal; }
    setSleepyVal(val) { this.sleepyVal = Math.max(0, Math.min(100, val)); }
    getBoredVal() { return this.boredVal; }
    setBoredVal(val) { this.boredVal = Math.max(0, Math.min(100, val)); }
    getHappyVal() { return this.happyVal; }
    setHappyVal(val) { this.happyVal = Math.max(0, Math.min(100, val)); }

    isHungry() { return this.hungerVal < 60; }
    isSleepy() { return this.sleepyVal < 60; }
    isBored() { return this.boredVal < 60; }
    isHappy() { return this.happyVal > 40; }

    feed() {
        term.writeln(`${this.name} was fed! ${this.name} feels more full, but a little more sleepy...`);
        this.hungerVal = Math.min(this.hungerVal + 20, 100);
        this.sleepyVal = Math.max(this.sleepyVal - 10, 0);
    }

    play() {
        term.writeln(`${this.name} played! ${this.name} feels more engaged and happy, but a bit more tired...`);
        this.happyVal = Math.min(this.happyVal + 20, 100);
        this.boredVal = Math.min(this.boredVal + 20, 100);
        this.sleepyVal = Math.max(this.sleepyVal - 20, 0);
    }

    sleep() {
        term.writeln(`${this.name} slept! ${this.name} feels more awake, but a little more bored and hungry...`);
        this.sleepyVal = Math.min(this.sleepyVal + 30, 100);
        this.boredVal = Math.max(this.boredVal - 10, 0);
        this.hungerVal = Math.max(this.hungerVal - 10, 0);
    }

    train() {
        term.writeln(`${this.name} trained! ${this.name} feels more engaged but more tired and less happy...`);
        this.boredVal = Math.min(this.boredVal + 35, 100);
        this.sleepyVal = Math.max(this.sleepyVal - 25, 0);
        this.happyVal = Math.max(this.happyVal - 35, 0);
    }

    cuddle() {
        term.writeln(`${this.name} was cuddled! ${this.name} feels happier and more awake, but a little less engaged...`);
        this.happyVal = Math.min(this.happyVal + 40, 100);
        this.sleepyVal = Math.min(this.sleepyVal + 40, 100);
        this.boredVal = Math.max(this.boredVal - 30, 0);
    }

    actionUse() {
        this.actionsLeft--;
    }

    nextHour() {
        this.hungerVal = Math.max(this.hungerVal - 5, 0);
        this.sleepyVal = Math.max(this.sleepyVal - 7, 0);
        this.boredVal = Math.max(this.boredVal - 5, 0);
        this.happyVal = Math.max(this.happyVal - 5, 0);
        
        if (this.isHungry()) {
            term.writeln(`${this.name} is getting hungry! (Fullness: ${this.hungerVal}/100)`);
        }
        if (this.isSleepy()) {
            term.writeln(`${this.name} is getting sleepy! (Alertness: ${this.sleepyVal}/100)`);
        }
        if (this.isBored()) {
            term.writeln(`${this.name} is getting bored! (Engagement: ${this.boredVal}/100)`);
        }
        if (!this.isHappy()) {
            term.writeln(`${this.name} isn't very happy! (Happiness: ${this.happyVal}/100)`);
        }
        this.hours++;
    }

    getType() { return "Pet"; }

    displayStats() {
        term.writeln("||=================================||");
        term.writeln(`|| ${this.name}'s STATUS (${this.getType()}) and is ${this.hours} hour/s old.`);
        term.writeln("||=================================||");
        term.writeln(`|| Fullness:  |${'+'.repeat(Math.floor(this.hungerVal/10))}${' '.repeat(10 - Math.floor(this.hungerVal/10))}| ${this.hungerVal}/100`);
        term.writeln(`|| Alertness: |${'+'.repeat(Math.floor(this.sleepyVal/10))}${' '.repeat(10 - Math.floor(this.sleepyVal/10))}| ${this.sleepyVal}/100`);
        term.writeln(`|| Engagement:|${'+'.repeat(Math.floor(this.boredVal/10))}${' '.repeat(10 - Math.floor(this.boredVal/10))}| ${this.boredVal}/100`);
        term.writeln(`|| Happiness: |${'+'.repeat(Math.floor(this.happyVal/10))}${' '.repeat(10 - Math.floor(this.happyVal/10))}| ${this.happyVal}/100`);
    }

    save() {
        const data = {
            type: this.getType(),
            name: this.name,
            color: this.color,
            actionsLeft: this.actionsLeft,
            hungerVal: this.hungerVal,
            sleepyVal: this.sleepyVal,
            boredVal: this.boredVal,
            happyVal: this.happyVal,
            hours: this.hours
        };
        return JSON.stringify(data);
    }

    load(data) {
        const parsed = JSON.parse(data);
        this.name = parsed.name;
        this.color = parsed.color;
        this.actionsLeft = parsed.actionsLeft;
        this.hungerVal = parsed.hungerVal;
        this.sleepyVal = parsed.sleepyVal;
        this.boredVal = parsed.boredVal;
        this.happyVal = parsed.happyVal;
        this.hours = parsed.hours;
    }
}

class Cat extends Pet {
    constructor(name = "Unknown", color = "Unknown", actionsLeft = 3, hungerVal = 100, sleepyVal = 100, boredVal = 100, happyVal = 100, hours = 0) {
        super(name, color, actionsLeft, hungerVal, sleepyVal, boredVal, happyVal, hours);
        this.purrPower = 50;
    }

    purr() {
        if (this.purrPower >= 15) {
            term.writeln(`${this.name} purrs loudly! ${this.name} seems content.`);
            this.purrPower -= 15;
            this.setHappyVal(this.happyVal + 20);
            this.setBoredVal(this.boredVal + 20);
        } else {
            term.writeln(`${this.name} doesn't have enough energy to purr.`);
        }
    }

    feed() {
        super.feed();
        this.purrPower = Math.min(this.purrPower + 25, 100);
        term.writeln(`${this.name} licks its paws contentedly.`);
    }

    cuddle() {
        super.cuddle();
        this.purrPower = Math.min(this.purrPower + 25, 100);
        term.writeln(`${this.name} makes biscuits on your lap.`);
    }

    play() {
        term.writeln(`${this.name} chases a toy mouse!`);
        this.setBoredVal(this.boredVal + 25);
        this.setHappyVal(this.happyVal + 15);
        this.setSleepyVal(this.sleepyVal - 15);
        this.purrPower = Math.max(0, this.purrPower - 10);
    }

    nextHour() {
        super.nextHour();
        this.purrPower = Math.max(this.purrPower - 5, 0);
        this.setBoredVal(this.boredVal - 10);
        term.writeln(`${this.name} stretches and looks around lazily as time passes...`);
    }

    getType() { return "Cat"; }

    displayStats() {
        super.displayStats();
        term.writeln("||=================================||");
        term.writeln(`|| Purr Power |${'~'.repeat(Math.floor(this.purrPower/10))}${' '.repeat(10 - Math.floor(this.purrPower/10))}| ${this.purrPower}/100`);
        term.writeln("||=================================||");
    }

    drawPet() {
        term.writeln(" /\\_/\\ ");
        term.writeln("( o.o )");
        term.writeln(" > ^ < ");
        term.writeln(`${this.name} the cat`);
    }

    save() {
        const data = JSON.parse(super.save());
        data.purrPower = this.purrPower;
        return JSON.stringify(data);
    }

    load(data) {
        super.load(data);
        const parsed = JSON.parse(data);
        this.purrPower = parsed.purrPower || 50;
    }
}

class Dog extends Pet {
    constructor(name = "Unknown", color = "Unknown", actionsLeft = 3, hungerVal = 100, sleepyVal = 100, boredVal = 100, happyVal = 100, hours = 0) {
        super(name, color, actionsLeft, hungerVal, sleepyVal, boredVal, happyVal, hours);
        this.barkEnergy = 100;
    }

    bark() {
        if (this.barkEnergy >= 10) {
            term.writeln(`${this.name} barks loudly! Woof woof!`);
            this.barkEnergy -= 10;
            this.setBoredVal(this.boredVal + 15);
        } else {
            term.writeln(`${this.name} is too tired to bark.`);
        }
    }

    feed() {
        super.feed();
        this.barkEnergy = Math.min(this.barkEnergy + 30, 100);
        term.writeln(`${this.name} wags its tail happily!`);
    }

    play() {
        term.writeln(`${this.name} fetches a ball with enthusiasm!`);
        this.setBoredVal(this.boredVal + 30);
        this.setHappyVal(this.happyVal + 25);
        this.setSleepyVal(this.sleepyVal - 20);
        this.barkEnergy = Math.max(0, this.barkEnergy - 10);
    }

    nextHour() {
        super.nextHour();
        this.barkEnergy = Math.max(this.barkEnergy - 8, 0);
        this.setSleepyVal(this.sleepyVal - 12);
        term.writeln(`${this.name} pants and wags tail as time passes...`);
    }

    getType() { return "Dog"; }

    displayStats() {
        super.displayStats();
        term.writeln("||=================================||");
        term.writeln(`|| Bark Energy|${'^'.repeat(Math.floor(this.barkEnergy/10))}${' '.repeat(10 - Math.floor(this.barkEnergy/10))}| ${this.barkEnergy}/100`);
        term.writeln("||=================================||");
    }

    drawPet() {
        term.writeln("  / \\__");
        term.writeln(" (    @\\___");
        term.writeln(" /         O");
        term.writeln(`${this.name} the dog`);
    }

    save() {
        const data = JSON.parse(super.save());
        data.barkEnergy = this.barkEnergy;
        return JSON.stringify(data);
    }

    load(data) {
        super.load(data);
        const parsed = JSON.parse(data);
        this.barkEnergy = parsed.barkEnergy || 100;
    }
}

class Dragon extends Pet {
    constructor(name = "Unknown", color = "Unknown", actionsLeft = 3, hungerVal = 100, sleepyVal = 100, boredVal = 100, happyVal = 100, hours = 0) {
        super(name, color, actionsLeft, hungerVal, sleepyVal, boredVal, happyVal, hours);
        this.elixirVal = 100;
    }

    cast() {
        if (this.elixirVal >= 20) {
            term.writeln(`${this.name} shot lightning! ${this.name} is having fun!`);
            this.elixirVal -= 20;
            this.setHappyVal(this.happyVal + 15);
            this.setBoredVal(this.boredVal + 20);
        } else {
            term.writeln(`${this.name} does not have enough elixir to cast.`);
        }
    }

    feed() {
        super.feed();
        this.elixirVal = Math.min(this.elixirVal + 20, 100);
        term.writeln("Magical energy restored!");
    }

    nextHour() {
        super.nextHour();
        this.elixirVal = Math.max(this.elixirVal - 5, 0);
        this.setHungerVal(this.hungerVal - 10);
        term.writeln(`${this.name}'s magical energy wanes slightly as time passes...`);
    }

    getType() { return "Dragon"; }

    displayStats() {
        super.displayStats();
        term.writeln("||=================================||");
        term.writeln(`|| Magick     |${'*'.repeat(Math.floor(this.elixirVal/10))}${' '.repeat(10 - Math.floor(this.elixirVal/10))}| ${this.elixirVal}/100`);
        term.writeln("||=================================||");
    }

    drawPet() {
        term.writeln(" \\    /");
        term.writeln(" )\\__/(");
        term.writeln("(_\\  /_)");
        term.writeln(" \\@  @/");
        term.writeln(" |\\../|");
        term.writeln("  \\VV/");
        term.writeln(`${this.name} the dragon`);
    }

    save() {
        const data = JSON.parse(super.save());
        data.elixirVal = this.elixirVal;
        return JSON.stringify(data);
    }

    load(data) {
        super.load(data);
        const parsed = JSON.parse(data);
        this.elixirVal = parsed.elixirVal || 100;
    }
}

// Game State
let currentPet = null;
let gameState = "main_menu";
let inputBuffer = "";
let petCreateStep = 0;
let petCreateData = {};
let currentDisposable = null;

// Utility functions
function clearScreen() {
    term.clear();
}

function waitForInput(callback) {
    // Dispose of any existing input handler
    if (currentDisposable) {
        currentDisposable.dispose();
    }
    
    currentDisposable = term.onData((key) => {
        if (key === "\r") {
            const input = inputBuffer.trim();
            inputBuffer = "";
            term.writeln("");
            currentDisposable.dispose();
            currentDisposable = null;
            callback(input);
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
}

function showMainMenu() {
    clearScreen();
    term.writeln("Welcome to the Tamagotchi!");
    term.writeln("");
    term.writeln("=== TAMAGOTCHI ===");
    term.writeln("");
    term.writeln("1. New Pet");
    term.writeln("2. Load Pet");
    term.writeln("3. Exit");
    term.writeln("");
    term.write("Choice: ");
    
    waitForInput((choice) => {
        if (choice === "1") {
            createNewPet();
        } else if (choice === "2") {
            loadPet();
        } else if (choice === "3") {
            term.writeln("Thanks for playing, from Clarke!");
        } else {
            term.writeln("Invalid Input! Try again.");
            setTimeout(showMainMenu, 1500);
        }
    });
}

function createNewPet() {
    clearScreen();
    term.writeln("=== CHOOSE PET TYPE ===");
    term.writeln("");
    term.writeln("1. Dragon");
    term.writeln("2. Cat");
    term.writeln("3. Dog");
    term.writeln("");
    term.write("Choice: ");
    
    waitForInput((choice) => {
        if (["1", "2", "3"].includes(choice)) {
            petCreateData.type = choice;
            term.writeln("");
            term.write("Enter pet name: ");
            
            waitForInput((name) => {
                petCreateData.name = name;
                term.writeln("");
                term.write("Enter pet color: ");
                
                waitForInput((color) => {
                    petCreateData.color = color;
                    finalizePetCreation();
                });
            });
        } else {
            term.writeln("Invalid choice! Try again.");
            setTimeout(createNewPet, 1500);
        }
    });
}

function finalizePetCreation() {
    const randomStat = () => Math.floor(Math.random() * 30);
    const happyStat = () => 70 + Math.floor(Math.random() * 31);
    
    switch (petCreateData.type) {
        case "1":
            currentPet = new Dragon(
                petCreateData.name,
                petCreateData.color,
                3,
                randomStat(),
                randomStat(),
                randomStat(),
                happyStat()
            );
            break;
        case "2":
            currentPet = new Cat(
                petCreateData.name,
                petCreateData.color,
                3,
                randomStat(),
                randomStat(),
                randomStat(),
                happyStat()
            );
            break;
        case "3":
            currentPet = new Dog(
                petCreateData.name,
                petCreateData.color,
                3,
                randomStat(),
                randomStat(),
                randomStat(),
                happyStat()
            );
            break;
    }
    
    term.writeln("");
    term.writeln(`Meet your new pet ${currentPet.getName()}!`);
    setTimeout(() => showActionMenu(), 2000);
}

function loadPet() {
    term.writeln("");
    term.write("Enter save data (paste JSON): ");
    
    waitForInput((data) => {
        try {
            const parsed = JSON.parse(data);
            
            switch (parsed.type) {
                case "Dragon":
                    currentPet = new Dragon();
                    break;
                case "Cat":
                    currentPet = new Cat();
                    break;
                case "Dog":
                    currentPet = new Dog();
                    break;
                default:
                    throw new Error("Unknown pet type");
            }
            
            currentPet.load(data);
            term.writeln(`Successfully loaded ${currentPet.getName()}!`);
            setTimeout(() => showActionMenu(), 2000);
        } catch (e) {
            term.writeln("Failed to load pet data! Invalid format.");
            setTimeout(showMainMenu, 2000);
        }
    });
}

function showActionMenu() {
    clearScreen();
    term.writeln(`=== ${currentPet.getName()} ===`);
    term.writeln("||=================================||");
    term.writeln("||                                 ||");
    term.writeln("|| 1. Feed                         ||");
    term.writeln("|| 2. Play                         ||");
    term.writeln("|| 3. Sleep                        ||");
    term.writeln("|| 4. Train                        ||");
    term.writeln("|| 5. Cuddle                       ||");
    
    if (currentPet.getType() === "Dragon") {
        term.writeln("|| 6. Cast Magick                  ||");
    } else if (currentPet.getType() === "Cat") {
        term.writeln("|| 6. Purr                         ||");
    } else if (currentPet.getType() === "Dog") {
        term.writeln("|| 6. Bark                         ||");
    }
    
    term.writeln("|| 7. View Stats                   ||");
    term.writeln("|| 8. Show Pet                     ||");
    term.writeln("||                                 ||");
    term.writeln("|| N. Next Hour                    ||");
    term.writeln("|| S. Save & Quit                  ||");
    term.writeln("|| Q. Quit Without Saving          ||");
    term.writeln("||=================================||");
    term.writeln(`   Actions left: ${currentPet.getActionsLeft()}`);
    term.writeln("");
    term.write("Choice: ");
    
    waitForInput((choice) => {
        const lowerChoice = choice.toLowerCase();
        
        if (currentPet.getActionsLeft() <= 0 && !["n", "s", "q", "7", "8"].includes(lowerChoice)) {
            term.writeln("No actions left, you are exhausted. Choose 'N' to advance to the next hour.");
            setTimeout(() => {
                term.writeln("Press Enter to continue...");
                waitForInput(() => showActionMenu());
            }, 1500);
            return;
        }
        
        switch (lowerChoice) {
            case "1":
                currentPet.feed();
                currentPet.actionUse();
                break;
            case "2":
                currentPet.play();
                currentPet.actionUse();
                break;
            case "3":
                currentPet.sleep();
                currentPet.actionUse();
                break;
            case "4":
                currentPet.train();
                currentPet.actionUse();
                break;
            case "5":
                currentPet.cuddle();
                currentPet.actionUse();
                break;
            case "6":
                if (currentPet.getType() === "Dragon") {
                    currentPet.cast();
                } else if (currentPet.getType() === "Cat") {
                    currentPet.purr();
                } else if (currentPet.getType() === "Dog") {
                    currentPet.bark();
                }
                currentPet.actionUse();
                break;
            case "7":
                currentPet.displayStats();
                break;
            case "8":
                currentPet.drawPet();
                break;
            case "n":
                if (currentPet.getActionsLeft() < 3) {
                    term.writeln("");
                    term.writeln("=== Advancing to the next hour ===");
                    currentPet.nextHour();
                    currentPet.setActionsLeft(3);
                } else {
                    term.writeln("You haven't used any actions this hour!");
                }
                break;
            case "s":
                const saveData = currentPet.save();
                term.writeln("");
                term.writeln("=== SAVE DATA ===");
                term.writeln("Copy this data to load your pet later:");
                term.writeln("");
                term.writeln(saveData);
                term.writeln("");
                term.writeln("Saved successfully! Returning to main menu...");
                setTimeout(showMainMenu, 3000);
                return;
            case "q":
                term.writeln("Exiting to main menu...");
                setTimeout(showMainMenu, 1500);
                return;
            default:
                term.writeln("Invalid input!");
                break;
        }
        
        term.writeln("");
        term.writeln("Press Enter to continue...");
        waitForInput(() => showActionMenu());
    });
}

// Start the game
showMainMenu();