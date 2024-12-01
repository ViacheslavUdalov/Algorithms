import {program} from "commander";

program.option('-ad, --admin <type>', "type of operation");
program.parse();

const options = program.opts();

if (options.admin) {

}


function writeToDb() {

}

function recreateDb() {

}

function DeleteDb() {

}
