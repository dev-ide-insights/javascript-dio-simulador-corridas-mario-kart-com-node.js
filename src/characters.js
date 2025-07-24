class Characters {
    constructor() {
        this.characters = [
            {
                NAME: 'Mario',
                VELOCIDADE: 4,
                MANOBRABILIDADE: 3,
                PODER: 3,
                PONTOS: 0
            },
            {
                NAME: 'Toad',
                VELOCIDADE: 5,
                MANOBRABILIDADE: 1,
                PODER: 2,
                PONTOS: 0
            },
            {
                NAME: 'Peach',
                VELOCIDADE: 3,
                MANOBRABILIDADE: 4,
                PODER: 2,
                PONTOS: 0
            },
            {
                NAME: 'Yoshi',
                VELOCIDADE: 2,
                MANOBRABILIDADE: 4,
                PODER: 3,
                PONTOS: 0
            },
            {
                NAME: 'Bowser',
                VELOCIDADE: 5,
                MANOBRABILIDADE: 2,
                PODER: 5,
                PONTOS: 0
            },
            {
                NAME: 'Luigi',
                VELOCIDADE: 3,
                MANOBRABILIDADE: 4,
                PODER: 4,
                PONTOS: 0
            },
            {
                NAME: 'Donkey Kong',
                VELOCIDADE: 2,
                MANOBRABILIDADE: 2,
                PODER: 5,
                PONTOS: 0
            }
        ]
    }


    getRandomCharacter() {
        return this.characters[Math.floor(Math.random() * this.characters.length)];
    }

    getRandomContenders() {
        const contender1 = this.getRandomCharacter();
        let contender2 = this.getRandomCharacter();
        while(contender2 === contender1)
            contender2 = this.getRandomCharacter();
        return [ contender1, contender2 ];
    }
}

module.exports = Characters;