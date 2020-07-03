const path = require('path');
class Check {
    constructor(connector, reporter) {
        this.connector = connector;
        this.reporter = reporter;
        
    }

    getCheckName(filename) {
        return path.basename(filename).slice(0, -3);
    }
}

// Export factory class
module.exports = Check;
