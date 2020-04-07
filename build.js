// This will generate an HTML file based on `word-frequency-by-chapter.json`

const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')

const orderedBooks = JSON.parse(fs.readFileSync(path.join(__dirname, 'kjv', 'ordered-books.json'), 'utf8'))
const byChapterData = JSON.parse(fs.readFileSync(path.join(__dirname, 'word-frequency-by-chapter.json'), 'utf8'))


function buildIndex() {
    let body = `
        <h1>Word Frequency by Bible Chapter</h1>
        <p>The most common words in every chapter of the Bible</p>
        <nav>
            <section>
            <h2>Old Testament</h2>
            <ol>
    `

    for (let book of orderedBooks) {
        if (book === 'Matthew') {
            body += `
        </ol>
        </section>
        <section>
            <h2>New Testament</h2>
            <ol>    
        `
        }
        body += `
            <li><a href="${urlSafeName(book)}">${book}</a></li>
        `
    }
    
    body += '</ol></section></nav>'

    body += `
        <section id="about">
            <h2>Why?</h2>
            <p>When reading the Bible with my family, I like to pick out a word that my young son should listen for. I want it to be relevant to the passage and common enough to keep him engaged throughout the reading.</p>
            <p>While it is sometimes easy to scan a chapter and pick a suitable word, often times it is not. This website makes it easier to find the right word for each chapter of the Bible.</p>
            <h2>Why old English?</h2>
            <p>The computer program behind this website reads every chapter of the Bible and counts the word frequency. The only Bible translations that are free and available to use are in the public domain. I chose the King James Version because it meets that criterion and is still used today.</p>
            <p>In my experience, finding the word in my preferred translation has been easy, especially if you are choosing a word that occurs frequently in a chapter.</p>
        </section>
    `

    let html = htmlHead(`<title>Word Frequency by Bible Chapter</title><link rel="stylesheet" href="./styles.css" />`) + htmlBody(body, "home") + htmlTail()
    
    fs.writeFileSync(path.join(__dirname, 'docs', 'index.html'), html)
}

buildIndex()

// Build book pages
for (let book of orderedBooks) {
    let body = `
        <section id="nav">
            <div id="sticky-nav">
                <h1 id="top">${book}</h1>
                <h2 id="toc">Table of Contents</h2>
                <nav>
                    <ol>`

    let chapters = byChapterData[book]

    let chaptersHtml = `
        <section id="chapters">
            <h2>Chapters</h2>`

    for (let chapter in chapters) {
        let chapterAnchor = `ch-${chapter}`
        let chapterName = `${book} ${chapter}`

        body += `
            <li><a href="#${chapterAnchor}" aria-label="${chapterName}">${chapter}</a></li>` // Build TOC

        chaptersHtml += `
            <article>
                <h3 id="ch-${chapter}">${chapterName}</h3>
                <ol>`
        let words = chapters[chapter]

        for (let [word, count] of words) {
            chaptersHtml += `
            <li>${word} (${count})</li>`
        }

        chaptersHtml += `
            </ol>
        </article>`
    }

    body += `
                </ol>
                <a href="../">View all books</a>
                <form id="limit-form">
                    <label for="limit-input">Limit to top</label>
                    <input id="limit-input" name="top" type="text" inputmode="numberic" pattern="[0-9]*" />
                    <button>Go</button>
                </form>
                <script src="../limit.js"></script>
            </nav>
        </div>
    </section>` // Close TOC

    body += chaptersHtml + '</section>'

    body += `<a href="#main" id="back-to-top">Back to top</a>`

    const html = htmlHead(`<title>Most frequent words in ${book}</title><link rel="stylesheet" href="../styles.css" />`) + htmlBody(body, "book") + htmlTail()

    let targetDir = path.join(__dirname, 'docs', urlSafeName(book))

    mkdirp.sync(targetDir)

    fs.writeFileSync(path.join(targetDir, 'index.html'), html)
}


//#region Hoisted utils

function urlSafeName(name) {
    return name.toLowerCase().replace(/\ /g, '-')
}

function htmlHead(head = '') {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    ${head}
</head>
`
}

function htmlBody(body = '', mainClass = '') {
    return `
<body>
    <main class="${mainClass}" id="main">
    ${body}
    </main>
    <footer>
        <p>Made by <a href="https://seanmcp.com">SeanMcP</a></p>
    </footer>
</body>
`
}

function htmlTail() {
    return `
</html>
<!-- SDG -->
`
}

//#endregion
