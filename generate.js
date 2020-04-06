const fs = require('fs')
const path = require('path')

const files = fs.readdirSync('kjv')

const output = {}

for (let file of files) {
    if (file.slice(-4) !== 'json' || file === 'ordered-books.json') continue

    const data = fs.readFileSync(path.join(__dirname, 'kjv', file), 'utf8')
    const { book, chapters } = JSON.parse(data)

    output[book] = {}

    for (let chapter of chapters) {

        let frequencyMap = chapter.verses
            .map(v => v.text)
            .join()
            .replace(/,/g, ' ') // There were some floating commas in the data
            .split(' ')
            .map(s => s.replace(/\u2019/g, "'")) // TODO: Figure out a solution for apostrophe'd words
            .map(s => s.replace(/[^A-Za-z]/g, ""))
            .map(s => s.toUpperCase() === s ? s : s.toLowerCase())
            .filter(s => s)
            .reduce((acc, word) => {
                if (!acc[word]) acc[word] = 0;
                acc[word]++;
                return acc
            }, {})

        output[book][chapter.chapter] = Object.entries(frequencyMap).sort((a, b) => a[1] > b[1] ? -1 : 1)
    }
}

fs.writeFileSync('word-frequency-by-chapter.json', JSON.stringify(output))
