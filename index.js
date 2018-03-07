#!/usr/bin/env node
const fs = require('fs')
const argv = require('optimist').argv
const csv = require('csv')

fs.createReadStream(argv._[0])
  .pipe(csv.parse({ columns: true, relax_column_count: true, delimiter: '\t' }))
  .pipe(csv.transform((record) => {
    const [Buy, CurB] = record.Amount.split(' ')
    const [Total, CurS] = record.Total.split(' ')
    const [Fee, CurF] = record.Fee.split(' ')
    return {
      Type: 'Trade',
      Sell: Number(Total) - Number(Fee),
      CurS,
      Buy,
      CurB,
      Fee,
      CurF,
      Exchange: 'Idex',
      Group: '',
      Comment: '',
      'Trade ID': record['Transaction ID'],
      Date: record.Date
    }
  }))
  .pipe(csv.stringify({ header: true }))
  .pipe(fs.createWriteStream(`${argv._[0].split('.')[0]}FormatedForCoinTracking.csv`))
