const puzzles = [
    '.blockbusters',
    '.chainreaction',
    '.thechase',
    '.countdown',
    '.familyfeud',
    '.jeopardy',
    '.mastermind',
    '.mervgriffinscrosswords',
    '.pointless',
    '.thepriceisright',
    '.taskmaster',
    '.tenable',
    '.universitychallenge',
    '.theweakestlink',
    '.wheeloffortune',
    '.whowantstobeamillionaire',
]

document.addEventListener('DOMContentLoaded', async () =>
{
    // kill copyjack
    document.querySelectorAll('.clipboard-button').forEach(e =>
    {
        e.parentNode.removeChild(e)
    })

    onHashChange()
})

window.addEventListener('hashchange', onHashChange)

function onHashChange()
{

    hideSolns()

    let puzzle = window.location.hash.slice(1)
    let selector = '.' + puzzle
    if (puzzles.includes(selector))
    {
        let btn = document.querySelector('#toggle-' + puzzle)
        toggleSoln(btn, selector)
    }
}

function hideSolns()
{
    // remove .selected from all 
    document.querySelectorAll('.selected').forEach(e =>
    {
        e.classList.remove('selected')
    })
    for (let selector of puzzles)
    {
        let el = document.querySelector(selector)
        el.style.display = 'none'
    }
}

function toggleSoln(btn, selector, force = false)
{
    let el = document.querySelector(selector)
    if (force || el.style.display == 'none')
    { // show
        hideSolns()

        el.style.display = 'block'
        btn.classList.add('selected')
        window.location.hash = selector.slice(1)
    } else
    { // hide
        hideSolns()
        btn.classList.remove('selected')
        history.pushState({}, '', window.location.href.replace(window.location.hash, '#'))
    }

    if (force)
    {
        window.scrollTo(0, 0)
    }
}

const sleep = ms => new Promise(r => setTimeout(r, ms))