
const chalk = require('chalk');
const process = require('process');
const os    = require('os');

class Reporter {
    constructor(format) {
        this.format = format;
        this.total = 0;
        this.failed = 0;
        this.passed = 0;
        this.jsonReport = [];

        this.checksResults = [];

        if (os.platform() === 'win32') {
            // ✔
            this.checkMark = chalk`{green √}`;
            this.crossMark = chalk`{red ×}`;
        } else {
            // ❌
            this.checkMark = chalk`{green ✔}`;
            this.crossMark = chalk`{red ✖}`;
        }
    }

    summary() {
        if (this.total === 0) {
            console.log('No checks run.');
        } else {
            let overallPassRate = (this.passed / this.total * 100.0).toFixed(1);

            // set exitCode to 1 if anything failed
            if (this.failed > 0) process.exitCode = 1;

            if (this.format == 'console') {
                console.log();
                console.log(chalk.underline('Summary'));
                console.log();
                console.log(chalk.gray(`\t${overallPassRate}% of all checks passed.`));
                console.log(`\t${chalk.green(this.passed)} ${chalk.gray('passed ·')} ${chalk.red(this.failed)} ${chalk.gray('failed')}`);
            }

            else {
                console.log(JSON.stringify(this.jsonReport, null, 2));
            }
        }
    }

    getStatus(test) {
        if (test) {
            return this.checkMark;
        }
        return this.crossMark;
    }

    report(message, results) {
        const bPassed = results.status
        let status = this.getStatus(bPassed);
        this.checksResults.push(`${status} ${message}`);

        if (this.format == 'console') console.log(`\t    ${status}   ${message}`);

        // Update summary
        this.total += 1;
        if (bPassed) {
            this.passed += 1;
        } else {
            this.failed += 1;
        }

        this.jsonReport.push(results);
    }
}

// Export factory class
module.exports = Reporter;
