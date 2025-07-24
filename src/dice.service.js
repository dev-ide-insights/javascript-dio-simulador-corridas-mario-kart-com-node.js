class DiceService {
    MAX_NUMBER = 6;

    async rollIt() {
        return Math.floor(Math.random() * this.MAX_NUMBER) + 1;
    }
}

module.exports = DiceService;