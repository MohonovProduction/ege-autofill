const ex_lastName = document.querySelector('#ex_lastName')
const ex_series = document.querySelector('#ex_series')
const ex_number = document.querySelector('#ex_number')

const ex_saveData = document.querySelector('#ex_saveData')
const ex_fillData = document.querySelector('#ex_fillData')

chrome.storage.local.get(['lastName', 'series', 'number'])
    .then(data => {
        console.log(data)
        ex_lastName.value = data.lastName
        ex_series.value = data.series
        ex_number.value = data.number
    })
    .catch(err => console.log(err))

ex_saveData.addEventListener('click', async () => {
    chrome.storage.local.set({
        lastName: ex_lastName.value,
        series: ex_series.value,
        number: ex_number.value
    })
})

ex_fillData.addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    console.log(tab)

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: fill,
    })
})

function fill() {
    const lastName = document.querySelector('#pLastName')
    const series = document.querySelector('#Series')
    const number = document.querySelector('#Number')

    chrome.storage.local.get(['lastName', 'series', 'number'])
        .then(data => {
            console.log(data)
            lastName.value = data.lastName
            series.value = data.series
            number.value = data.number
        })
        .catch(err => console.log(err))
}
