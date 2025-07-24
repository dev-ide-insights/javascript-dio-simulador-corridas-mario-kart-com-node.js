const Characters = require('./characters');

class PlayersManagementService {
    players = new Characters();
    currentPlayersData = {};


    constructor() {
        const players = this.players.getRandomContenders();
        this.addPlayers(players);
    }

    addPlayers(contenders) {
        contenders.forEach((char, index) => {
            index += 1;
            this.currentPlayersData['player'+index] = char;
            this.currentPlayersData['player'+index].luckyNumber = 0;
            this.currentPlayersData['player'+index].totalTestSkill = 0;
            this.currentPlayersData['player'+index].points = 0;
        });
    }
    
    getPlayerName(playerId) {
        return this.currentPlayersData['player'+playerId].NAME;
    }

    setLuckyNumber(playerId, number) {
        this.currentPlayersData['player'+playerId].luckyNumber = number;
    }

    getLuckyNumber(playerId) {
        return this.currentPlayersData['player'+playerId].luckyNumber;
    }

    getSkillData(playerId, skillName) {
        return this.currentPlayersData['player'+playerId][skillName];
    }

    increaseTotalTestSkill(playerId, skillName) {
        const playersData = this.currentPlayersData['player'+playerId];
        playersData.totalTestSkill = playersData.luckyNumber + playersData[skillName];
    }

    scorePoint(contest) {
        const player1Data = this.currentPlayersData['player1'];
        const player2Data = this.currentPlayersData['player2'];
        
        if (player1Data.totalTestSkill === player2Data.totalTestSkill)
            return null;

        if (player1Data.totalTestSkill > player2Data.totalTestSkill) {
            player1Data.points += 1;
            if (contest) player2Data.points -= player2Data.points > 0 ? 1 : 0;
            return { winner: player1Data.NAME, looser: player2Data.NAME } 
        } 
        player2Data.points += 1;
        if (contest) player1Data.points -= player1Data.points > 0 ? 1 : 0;
        return { winner: player2Data.NAME, looser: player1Data.NAME } 
    }

    declareWinner() {
        const player1Data = this.currentPlayersData['player1'];
        const player2Data = this.currentPlayersData['player2'];

        let winner;
        if (player1Data.points === player2Data.points) winner = null;
        if (player1Data.points > player2Data.points) winner = player1Data.NAME;
        else winner = player2Data.NAME;

        return { 
            player1: {nome: player1Data.NAME, pontos: player1Data.points},
            player2: {nome: player2Data.NAME, pontos: player2Data.points},
            winner: winner 
        }
    }




}

module.exports = PlayersManagementService;