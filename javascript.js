var playing = false;
var score;
var action;
var timeremaining = 60;
var correctanswer;


document.getElementById("startreset").onclick = function () {
    if (playing == true)
        location.reload();
    else {
        document.getElementById("startreset").innerHTML = "Reset Game";
        score = 0;
        playing = true;
        hide("gameover");
        show("timeremaining");
        startcountdown();
        generateQA();
    }

}



for (i = 1; i < 5; i++) {
    document.getElementById("box" + i).onclick = function () {
        if (playing == true) {
            if (this.innerHTML == correctanswer) {

                score++;
                document.getElementById("scorevalue").innerHTML = score;
                hide("wrong");
                show("correct");
                setTimeout(function () {
                    hide("correct");
                }, 1000);


                generateQA();
            } else {
                hide("correct");
                show("wrong");
                setTimeout(function () {
                    hide("wrong");
                }, 1000);
            }
        }
    }
}


// functions
function hide(id) {
    document.getElementById(id).style.display = "none";
}

function show(id) {
    document.getElementById(id).style.display = "block";
}

function startcountdown() {
    action = setInterval(function () {
        timeremaining = timeremaining - 1;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        if (timeremaining == 0) {
            stopcountdown();
            hide("score");
            hide("correct");
            hide("wrong");
            hide("timeremaining");
            show("gameover");
            playing = false;
            document.getElementById("gameover").innerHTML = "<p>GAME OVER!</p>YOUR SCORE IS:" + score;
            document.getElementById("startreset").innerHTML = "Start Game";
        }
    }, 1000);
}

function stopcountdown() {
    clearInterval(action);
}

function generateQA() {
    var x = 1 + Math.round(9 * Math.random());
    var y = 1 + Math.round(9 * Math.random());
    correctanswer = x * y;
    document.getElementById("question").innerHTML = x + "x" + y;
    var correctPosition = 1 + Math.round(3 * Math.random());
    document.getElementById("box" + correctPosition).innerHTML = correctanswer;

    var answers = [correctanswer];

    for (i = 1; i < 5; i++) {
        if (i != correctPosition) {
            var wrongAnswer;
            do {
                wrongAnswer = (1 + Math.round(9 * Math.random())) * (1 + Math.round(9 * Math.random()));
            } while (answers.indexOf(wrongAnswer) > -1)
            document.getElementById("box" + i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}
