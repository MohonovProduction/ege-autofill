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

// if (chrome.storage.local.get(['lastName'])[0] !== undefined) {
//     const data = chrome.storage.local.get(['lastName', 'series', 'number'])
//     ex_lastName.value = data.lastName
//     ex_series.value = data.series
//     ex_number.value = data.number
// }

ex_saveData.addEventListener('click', async () => {
    chrome.storage.local.set({
        lastName: ex_lastName.value,
        series: ex_series.value,
        number: ex_number.value
    })
})

ex_fillData.addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    console.log(tab.id)

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: fill,
    })
})

function fill() {
    const lastName = document.querySelector('#pLastName')
    const series = document.querySelector('#Series')
    const number = document.querySelector('#Number')
}
