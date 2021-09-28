const hangs = [
    "./assets/img/Hangman-0.png",
    "./assets/img/Hangman-1.png",
    "./assets/img/Hangman-2.png",
    "./assets/img/Hangman-3.png",
    "./assets/img/Hangman-4.png",
    "./assets/img/Hangman-5.png",
    "./assets/img/Hangman-6.png",
];

const words = [
    "instrument","car","computer","developper","junior","becode","academy","keyboard","keywords","mouse","webcam","coding","elepahnt","phone","headset","meeting","dashboard","translator","javascript","sandman","challenge","introduction","stack","design","style","index","upgrade","space","factory","videogame","store","epicness",
];

let gameOver = false;

let randomWord = words[Math.floor(Math.random() * words.length)];
let randomWordArr = randomWord.split("");

let word = new Array(randomWordArr.length);
for (let a = 0; a < word.length; a++) {
    word[a] = "";
}

let hangmanState = 0;

let hideRandomWord = () => {
    let randomWordHidden = "";

    for (let letter of randomWordArr) {
        if (letter == " ") {
            randomWordHidden += " &nbsp ";
        } else {
            randomWordHidden += " _ ";
        }
    }

    return randomWordHidden;
}

let generateGame = () => {
    let guess = document.getElementById("guess");
    guess.innerHTML = hideRandomWord();
}

let hangmanSet = () => {
    if (hangmanState >= 7) {
        document.getElementById("hangman").setAttribute("src", hangs[6]);
    } else {
        document.getElementById("hangman").setAttribute("src", hangs[hangmanState]);
    }
}

let checkWin = () => {
    if (word.join("") == randomWord) {
        gameOver = true;
        alert("GG! Good Guess!");
    }
    else if (hangmanState >= 7) {
        gameOver = true;
        alert("Oh no! You loose!");
    }
}

document.getElementById("wordBtn").addEventListener("click", (e) => {
    e.preventDefault();

    if (!gameOver) {
        let tryWord = document.getElementById("word").value.toLowerCase();

        if (tryWord == randomWord) {
            gameOver = true;
            alert("GG! Good Guess!");
        }
        else {
            hangmanState += 1;
            hangmanSet();
        }
    }
})

document.getElementById("letterBtn").addEventListener("click", (e) => {
    e.preventDefault();

    if (!gameOver) {
        let tryLetter = document.getElementById("letter").value.toLowerCase();
        let letterIsGood = false;
    
        for (let a = 0; a < randomWordArr.length; a++) {
            if (randomWordArr[a] == tryLetter) {
                letterIsGood = true;
                word[a] = tryLetter;
            }
            else if (randomWordArr[a] == " ") {
                word[a] = " ";
            }
        }
        
        let wordToShow = "";

        for (let letter of word) {
            if (letter == "") {
                wordToShow += "_";
            }
            else if (letter == " ") {
                wordToShow += "!";
            }
            else {
                wordToShow += letter;
            }
        }
    
        if (!letterIsGood) {
            hangmanState += 1;
            hangmanSet();
        }

        let guess = document.getElementById("guess");

        wordToShow = wordToShow.split("");
        wordToShow = wordToShow.join(" ");
        wordToShow = wordToShow.replace("!", "&nbsp");

        guess.innerHTML = wordToShow;
        checkWin();
    }
});

generateGame();
hangmanSet();