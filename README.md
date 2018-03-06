Converts Idex.market export to CoinTracking compatible format

```bash
npm install -g idexToCoinTracking
```

1. Go to https://idex.market/ and unlock your "wallet"
2. Open your Trade History
3. Select with the mouse the whole table without the table head (Date, Typ, Price...)
4. Copy and paste the content to the template.csv file, make sure your editor is not replacing tabs with spaces

```bash
idexToCoinTracking <csvFilenameToConvert>
```
