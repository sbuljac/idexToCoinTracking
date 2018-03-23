#!/usr/bin/env node
const fs = require('fs')
const argv = require('optimist').argv
const csv = require('csv')

fs.createReadStream(argv._[0])
  .pipe(csv.parse({columns: true, relax_column_count: true, delimiter: '\t'}))
  .pipe(csv.transform((record) => {
    let [Fee] = record.Fee.split(' ')
    const [GFee] = record['Gas Fee'].split(' ')
    Fee = Number(Fee) + Number(GFee)

    let Buy, CurB, Sell, CurS
    if (record.Type === 'Buy') {
      [Buy, CurB] = record.Amount.split(' ');
      [Sell, CurS] = record.Total.split(' ')
    } else if (record.Type === 'Sell') {
      [Sell, CurS] = record.Amount.split(' ');
      [Buy, CurB] = record.Total.split(' ')
    }

    return {
      Type: 'Trade',
      Buy,
      CurB,
      Sell,
      CurS,
      Fee,
      CurF: CurB,
      Exchange: 'Idex',
      Group: '',
      Comment: '',
      'Trade ID': record['Transaction ID'],
      Date: record.Date
    }
  }))
  .pipe(csv.stringify({header: true}))
  .pipe(fs.createWriteStream(
    `${argv._[0].split('.')[0]}FormatedForCoinTracking.csv`))
