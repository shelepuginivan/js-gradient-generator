window.addEventListener('keypress', pressed => {
    switch (pressed.key) {
        case 'Enter':
            renderLinearGradient(true)
            break
        case ' ':
            changeMenuVisibility()
            break
        default:
            break
    }
})

window.addEventListener('load', () => {
    const hash = document.location.hash
    renderLinearGradient(hash === '', hash)
})

const renderLinearGradient = (generateNew, colorsHash, addHash = true) => {
    const colors = (colorsHash === '' || generateNew) ? generateLinearGradient() : colorsHash.replace('#', '').split(',')
    const cssValue = `linear-gradient(90deg, ${colors.map(color => `#${color}`).join(', ')})`

    const sourceCode = document.getElementById('source-code')
    sourceCode.innerText = cssValue + ';'

    document.body.style.background = cssValue

    if (addHash) {
        document.location.hash = colors.join(',')
    }
}

const generateLinearGradient = () => {
    const colorCount = document.getElementById('color-count-input').value || 2
    const colors = []
    for (let i = 0; i < colorCount; i++) {
        colors.push(Math.floor(Math.random() * 0xffffff).toString(16))
    }
    return colors
}

const changeMenuVisibility = () => {
    const menu = document.getElementById('gradient-info')
    const isMenuVisible = menu.dataset.visible
    if (isMenuVisible === 'true') {
        menu.style.display = 'none'
        menu.dataset.visible = 'false'
    } else {
        menu.style.display = 'flex'
        menu.dataset.visible = 'true'
    }
}

const copyToClipboard = () => {
    const sourseCode = document.getElementById('source-code').textContent
    navigator.clipboard.writeText(sourseCode)
}