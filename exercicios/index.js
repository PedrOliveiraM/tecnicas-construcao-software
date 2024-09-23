class Pessoa {
    constructor(nome, idade, peso) {
        this.nome = nome;
        this.idade = idade;
        this.peso = peso;
    }

    print() {
        console.log(this.nome);
        console.log(this.idade);
        console.log(this.peso);
    }
}

const fulano = new Pessoa('Pedro', 22, 78);

fulano.print();

let pessoa3 = {
    ...fulano,
    nome: 'Jose',
    idade: 12,
    comando: 'cmd'
};

pessoa3.print = fulano.print;

pessoa3.print();
console.log(pessoa3.comando);
