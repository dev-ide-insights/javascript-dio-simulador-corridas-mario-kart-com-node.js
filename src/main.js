const PlayRaceEngine = require('./play-race.engine');

class Main {
    raceEngine = new PlayRaceEngine();
    
    run () {
        this.raceEngine.start();
    }
}

const main = new Main();
main.run();

