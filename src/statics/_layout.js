function layout(res, item) {
  const head = `<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${item.title}</title>
  <link rel="stylesheet" href="/css/main">
  ${item.custom}
</head>`

  const body = `<body>
  ${item.body}
</body>`

  const frame = `<!DOCTYPE html>
<html lang="en">
${head}
${body}
</html>`

  res.send(frame)
}

module.exports = layout
