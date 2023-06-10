const { createCanvas, Image } = require('canvas')
const fs = require('fs')
const { execSync } = require('child_process')

const consoleColor = require('../consoleColor')

async function videoGen(image, song, scale) {
  const sptPath = song.split('/').slice(0, -1)
  const dirPath = sptPath.join('/')
  const outPath = `${dirPath}`
  const fileName = `${outPath}/temp/cover.png`
  const vidFile = song.split('/').pop()
  const vidName = `${outPath}/temp/rendered.mp4`

  let canvasReso = (scale == 'square') ? [1080, 1080] : [1920, 1080]
  const imagePattern = /\.(jpg|jpeg)$/i

  const canvas = createCanvas(canvasReso[0], canvasReso[1])
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#2e2f2f'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  let imageType

  if (imagePattern.test(image)) {
    imageType = 'jpeg'
  } else {
    imageType = 'png'
  }

  var img = new Image()
  img.src = `data:image/${imageType};base64,${fs
    .readFileSync(image)
    .toString('base64')}`

  let ratio = img.height / img.width
  var imgReso = [canvas.width, canvas.height * ratio]

  var imagePosition = [0, (canvas.height - imgReso[1]) / 2]

  await ctx.drawImage(img, imagePosition[0], imagePosition[1], imgReso[0], imgReso[1])

  const buffer = canvas.toBuffer('image/png')
  if (!fs.existsSync(outPath + '/temp')) {
    fs.mkdirSync(outPath + '/temp')
    fs.writeFileSync(`${fileName}`, buffer)
  } else {
    fs.writeFileSync(`${fileName}`, buffer)
  }

  fs.copyFileSync(song, outPath + '/temp/song.' + song.split('.').reverse()[0])

  const ffmpegCommand = `ffmpeg -loop 1 -i ${fileName} -i ${outPath + '/temp/song.' + song.split('.').reverse()[0]} -c:v libx264 -tune stillimage -c:a aac -b:a 192k -pix_fmt yuv420p -shortest ${vidName}`
  if (fs.existsSync(vidName)) {
    fs.unlinkSync(vidName)
  }

  await execSync(ffmpegCommand)

  await fs.rename(vidName, outPath + '/' + vidFile.split()[0] + '.mp4', (err) => {
    if (err) {
      console.error(`${consoleColor.redBan}Error: ${consoleColor.logReset}${err}`);
    } else {
      console.log(`${consoleColor.greenSuccess}Success: ${consoleColor.logReset}Rendered Success @ '${outPath}/${vidFile}'`);
    }
  })

  let listing = await fs.readdirSync(outPath + '/temp')

  for (file of listing) {
    if (file != 'rendered.mp4') {
      await fs.unlinkSync(outPath + '/temp/' + file)
      console.log(`${consoleColor.greenSuccess}Success: ${consoleColor.logReset}${file} deleted..`); 
    } else {
      console.log(`${consoleColor.redBan}Skipped: ${consoleColor.logReset}${file} skipped..`); 
    }
  }

  await fs.rmdirSync(outPath + '/temp')

  console.log(`${consoleColor.greenSuccess}Success: ${consoleColor.logReset}Temp files removed!`);
}

module.exports = videoGen