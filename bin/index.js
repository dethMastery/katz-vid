const fs = require('fs')
const path = require('path')

const consoleColor = require('./consoleColor')
const videoGen = require('./src/canvas')

function canvasGen(dataPath) {
  const imagePattern = /\.(jpg|png|jpeg)$/i
  const songPattern = /\.(mp3|wav)$/i
  
  if(imagePattern.test(dataPath.imagePath)) {
    if (songPattern.test(dataPath.songPath)) {
      videoGen(dataPath.imagePath, dataPath.songPath, dataPath.scale)
    }
    else {
      console.log(`${consoleColor.redBan}Canvas Error: ${consoleColor.logReset}Music file type is not accepted. Please use '.mp3' or '.wav' `);  
    }
  } else {
    console.log(`${consoleColor.redBan}Canvas Error: ${consoleColor.logReset}Image file type is not accepted. Please use '.jpg', '.jpeg' or '.png' `);
  }
}

module.exports = canvasGen