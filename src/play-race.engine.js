const DiceService = require('./dice.service');
const PlayersManagementService = require('./players.management.service');

class PlayRaceEngine {
    MAX_ROUNDS = 5;
    dice = new DiceService();
    playersManService = new PlayersManagementService();

    async start() {
        
        const player1Name = this.playersManService.getPlayerName(1);
        const player2Name = this.playersManService.getPlayerName(2);
        console.log(`🏁 🚨 Corrida entre ${player1Name} e ${player2Name} começando... \n`);
        for (let round = 1; round <= this.MAX_ROUNDS; round++) {
            console.log(`🚦 Rodada ${round}`);
            const block = await this.getRandomBlock();
            console.log(`Bloco: ${block}`);
            this.playersManService.setLuckyNumber(1, await this.dice.rollIt());
            this.playersManService.setLuckyNumber(2, await this.dice.rollIt());
            const skillIncreased = await this.checkSkills(block);
            let isContest = null;
            if (block === 'CONFRONTO') {
                console.log(`${player1Name} confrontou com ${player2Name}`);
                isContest = true;
            }
            [1,2].forEach(playerId => {
                let playerName = this.playersManService.getPlayerName(playerId);
                let playerLuckyNumber = this.playersManService.getLuckyNumber(playerId);
                let playerSkillData = this.playersManService.getSkillData(playerId, skillIncreased);
                let totalTestSkill = playerLuckyNumber + playerSkillData;
                
                console.log(`${playerName} 🎲 rolou um dado de ${skillIncreased} ${playerLuckyNumber} + ${playerSkillData} = ${totalTestSkill}`);
            })
            const scorer = this.playersManService.scorePoint(isContest);
            switch (true) {
                case scorer === null: 
                    console.log(`Houve um empate. Ninguém marcou um ponto!`);
                    break;
                case block === 'CONFRONTO':
                    console.log(`${scorer.winner} venceu o confronto! ${scorer.looser} perdeu 1 ponto 🐢`);
                    break;
                default:
                    console.log(`${scorer.winner} marcou um ponto!`);
                    break;
            }
            
            console.log('-------------------------------');
            
        }
        const gameStatistics = this.playersManService.declareWinner();
        console.log('Resultado final: ');
        console.log(`${gameStatistics.player1.nome}: ${gameStatistics.player1.pontos} ponto(s)`);
        console.log(`${gameStatistics.player2.nome}: ${gameStatistics.player2.pontos} ponto(s)`);
        console.log(gameStatistics.winner ? `${gameStatistics.winner} ganhou a corrida! 🏆` : `A corrida terminou em empate.`);
    }

    async getRandomBlock() {
        const randomValue = Math.random();
        let result = "CONFRONTO";
        result = randomValue < 0.66 ? "RETA" : result;
        result = randomValue < 0.33 ? "CURVA" : result;
        return result;
    }

    async checkSkills(block) {
        let skillName;
        if (block === "RETA") skillName = 'VELOCIDADE';
        if (block === "CURVA") skillName = 'MANOBRABILIDADE';
        if (block === "CONFRONTO") skillName = 'PODER';

        this.playersManService.increaseTotalTestSkill(1, skillName);
        this.playersManService.increaseTotalTestSkill(2, skillName);
        return skillName;
    }
}

module.exports = PlayRaceEngine;