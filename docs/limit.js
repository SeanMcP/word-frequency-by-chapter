let limitInput = document.getElementById('limit-input')

limitInput.addEventListener('change', event => {
    let { value } = event.target

    let styles = value ? `
        #chapters li:nth-child(n + ${Number(value) + 1}) { display: none }
    ` : ''

    let limitStyles = document.getElementById('limit-styles')

    if (limitStyles) {
        limitStyles.innerHTML = styles
    } else {
        let styleTag = document.createElement('style')
        styleTag.id="limit-styles"
    
        styleTag.innerHTML = styles
    
        document.head.appendChild(styleTag)
    }
})