const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const choices = ['Pedra', 'Papel', 'Tesoura'];

function getUserChoice() {
    return new Promise((resolve) => {
        rl.question('Escolha Pedra, Papel ou Tesoura: ', (answer) => {
            const choice = answer.trim().toLowerCase();
            if (choices.map(c => c.toLowerCase()).includes(choice)) {
                resolve(choice.charAt(0).toUpperCase() + choice.slice(1));
            } else {
                console.log('Escolha inválida, tente novamente.');
                resolve(getUserChoice());
            }
        });
    });
}

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return 'Empate!';
    }

    if (
        (userChoice === 'Pedra' && computerChoice === 'Tesoura') ||
        (userChoice === 'Papel' && computerChoice === 'Pedra') ||
        (userChoice === 'Tesoura' && computerChoice === 'Papel')
    ) {
        return 'Você ganhou!';
    }

    return 'Você perdeu!';
}

async function playRound() {
    const userChoice = await getUserChoice();
    const computerChoice = getComputerChoice();

    console.log(`Você escolheu: ${userChoice}`);
    console.log(`O computador escolheu: ${computerChoice}`);

    const result = determineWinner(userChoice, computerChoice);
    console.log(result);
}

async function playGame() {
    console.log('Bem-vindo ao jogo de Pedra, Papel e Tesoura!');
    let playAgain = 's';

    while (playAgain.toLowerCase() === 's') {
        await playRound();
        await new Promise((resolve) => {
            rl.question('Deseja jogar novamente? (s/n): ', (answer) => {
                playAgain = answer.trim().toLowerCase();
                resolve();
            });
        });
    }

    console.log('Obrigado por jogar! Até a próxima!');
    rl.close();
}

playGame();
