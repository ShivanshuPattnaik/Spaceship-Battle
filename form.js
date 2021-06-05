class Form {
    constructor() {
        this.heading1 = createElement("h1");
        this.heading2 = createElement("h1");
        this.next1 = createButton("Next");

        this.objectiveHeading = createElement("h1");
        this.objective = createElement("h2");
        this.next2 = createButton("Next");

        this.instructionsHeading = createElement("h1");
        this.instruction1 = createElement("h3");
        this.instruction2 = createElement("h3");
        this.instruction3 = createElement("h3");
        this.instruction4 = createElement("h3");
        this.instruction5 = createElement("h3");
        this.next3 = createButton("Next");
    }

    hide1() {
        this.heading1.hide();
        this.heading2.hide();
        this.next1.hide();
    }

    hide2() {
        this.objective.hide();
        this.objectiveHeading.hide();
        this.next2.hide();
    }

    hide3() {
        this.instructionsHeading.hide();
        this.instruction1.hide();
        this.instruction2.hide();
        this.instruction3.hide();
        this.instruction4.hide();
        this.instruction5.hide();
        this.next3.hide();
    }

    display() {
        background(bgImg2);

        this.heading1.html("SPACESHIP");
        this.heading1.position(400, 50);

        this.heading2.html("BATTLE");
        this.heading2.position(600, 130);

        this.next1.position(550, 400);
        this.next1.mousePressed(() => {
            gameState = 1;
        });
    }

    display1() {
        background(bgImg2);

        this.objectiveHeading.html("OBJECTIVE");
        this.objectiveHeading.position(450, 50);
        this.objective.html("DESTROY THE OBSTACLES AS MANY AS YOU CAN");
        this.objective.position(210, 200);

        this.next2.position(570, 400);
        this.next2.mousePressed(() => {
            gameState = 2;
        });
    }

    display2() {
        background(bgImg2);

        this.instructionsHeading.html("INSTRUCTIONS");
        this.instructionsHeading.position(400, 10);

        this.instruction1.html("1. Protect Earth from incoming Asteroids.");
        this.instruction1.position(400, 200);

        this.instruction2.html("2. Don't let the asteroids hit you.");
        this.instruction2.position(400, 250);

        this.instruction3.html("3. Press Left Mouse Button to Fire.");
        this.instruction3.position(400, 300);

        this.instruction4.html("4. Collect x2 and x3 Power Ups to Fire more than 1 lasers.");
        this.instruction4.position(400, 350);

        this.instruction5.html("5. There will be a time limit for Power Ups.");
        this.instruction5.position(400, 400);

        this.next3.position(570, 500);
        this.next3.mousePressed(() => {
            gameState = 3;
        });
    }
}