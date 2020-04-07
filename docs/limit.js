let limitForm = document.getElementById('limit-form')

limitForm.addEventListener('submit', event => {
    event.preventDefault()

    let formData = new FormData(event.target)
    let top = Number(formData.get('top'))

    let styles = top ? `
        #chapters li:nth-child(n + ${top + 1}) { display: none }
    ` : ''

    let limitStyles = document.getElementById('limit-styles')

    if (limitStyles) {
        limitStyles.innerHTML = styles
    } else {
        let styleTag = document.createElement('style')
        styleTag.id = 'limit-styles'

        styleTag.innerHTML = styles

        document.head.appendChild(styleTag)
    }
})