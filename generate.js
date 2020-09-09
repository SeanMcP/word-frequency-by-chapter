const fs = require('fs')
const path = require('path')

const DATA_DIR = './data'

if (!fs.existsSync(DATA_DIR)){
    fs.mkdirSync(DATA_DIR);
}

const files = fs.readdirSync('kjv')

const output = {}
const allChapters = {}
const chapterCountByBook = {}

for (let file of files) {
    if (file.slice(-4) !== 'json' || file === 'ordered-books.json') continue

    const data = fs.readFileSync(path.join(__dirname, 'kjv', file), 'utf8')
    const { book, chapters } = JSON.parse(data)

    chapterCountByBook[book] = chapters.length

    const temp = {}

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

        const sorted = Object.entries(frequencyMap).sort((a, b) => a[1] > b[1] ? -1 : 1)
        temp[chapter.chapter] = sorted
        allChapters[`${book}/${chapter.chapter}`] = sorted
    }

    output[book] = temp

    fs.writeFileSync(`${DATA_DIR}/${book}.json`, JSON.stringify(temp))
}

fs.writeFileSync(`${DATA_DIR}/chapter-count-by-book.json`, JSON.stringify(chapterCountByBook))
fs.writeFileSync(`${DATA_DIR}/word-frequency-by-chapter.json`, JSON.stringify(output))
fs.writeFileSync(`${DATA_DIR}/all-chapters.json`, JSON.stringify(allChapters))
