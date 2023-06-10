#! /usr/bin/env node

const yargs = require('yargs')

const consoleColor = require('./consoleColor')

const opt = yargs
  .usage("\x1b[32mUsage: 'katzVid <imagePath> <songPath>'\x1b[0m")
  .option('scaling', {
    alias: 's',
    describe: 'scaling options: `square`, `landscape` ',
    type: 'string',
    demandOption: false
  })
  .argv

const scaling = (opt.s == undefined) ? 'square' : opt.s

const dataPath = {
  imagePath: opt._[0],
  songPath: opt._[1],
  scaling: scaling
}

console.log(dataPath);

if (dataPath.imagePath != undefined) {
  if (dataPath.songPath != undefined) {
    
  } else {
    console.log(`${consoleColor.redBan}Error: ${consoleColor.logReset}Path of song input not found`);
  }
} else {
  console.log(`${consoleColor.redBan}Error: ${consoleColor.logReset}Path of image input not found`);
}