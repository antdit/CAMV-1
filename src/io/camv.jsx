
import fs from 'fs'
import path from 'path'
import zlib from 'zlib'

const { dialog } = require('electron').remote

import JSONStream from 'JSONStream'


exports.loadCAMV = function(fileName, cb) {
  var compressed = fileName.endsWith(".gz");

  let data = fs.createReadStream(
    fileName,
    (compressed ? null : 'utf-8'),
  )
  if (compressed) {
    let gunzip = zlib.createGunzip()
    data = data.pipe(gunzip)
  }

  let parser = JSONStream.parse()
  data.pipe(parser)
  parser.on(
    'data',
    function(data) { if (cb != null) cb(data) },
  )
}

exports.saveCAMV = function(fileName, scanData, peptideData, cb) {
  var compressed = fileName.endsWith(".gz");

  var ws = fs.createWriteStream(
    fileName,
    (compressed ? null : 'utf-8'),
  )

  if (compressed) {
    let gzip = zlib.createGzip()
    ws = gzip.pipe(ws)
  }

  ws.on('error', function(err) {
    dialog.showErrorBox("File Save Error", err.message);
  });

  ws.on('finish', function() {
    if (cb != null) { cb(); }
  })

  let writer = JSONStream.stringify('', '', '')
  writer.pipe(ws)
  ws.write('{\n  "scanData": ')
  writer.write(scanData)
  ws.write(',\n  "peptideData": ')
  writer.write(peptideData)
  ws.write(',\n}\n')
  writer.end()
}
