const input_initial = document.querySelector('input#input_initial')
const input_monthly = document.querySelector('input#input_monthly')
const input_period = document.querySelector('input#input_period')
const input_profitability = document.querySelector('input#input_profitability')

const toggle_period = document.querySelector('#toggle_period')
const toggle_period_span = document.querySelector('#toggle_period span')

const form = document.querySelector('form')

const info_h2 = document.querySelector('h2')
const info_container = document.querySelector('div.info_container')

const span_result_total = document.querySelector('span#result_total')
const span_result_invested = document.querySelector('span#result_invested')
const span_result_profit = document.querySelector('span#result_profit')

form.setAttribute('onsubmit', 'calculateTotal(), calculateInvested(), calculateProfit(), showResult(); return false')
toggle_period.setAttribute('onmousedown', 'togglePeriod()')

input_initial.addEventListener("input", function() {
    var cleanValue = input_initial.value.replace(/\D+/g, '')
    input_initial.value = new Intl.NumberFormat('pt-br', {minimumFractionDigits: '2'}).format(cleanValue / 100)
})

input_monthly.addEventListener("input", function() {
    var cleanValue = input_monthly.value.replace(/\D+/g, '')
    input_monthly.value = new Intl.NumberFormat('pt-br', {minimumFractionDigits: '2'}).format(cleanValue / 100)
})

input_period.addEventListener("input", function() {
    var cleanValue = input_period.value.replace(/\D+/g, '')
    input_period.value = new Intl.NumberFormat().format(cleanValue)
})

input_profitability.addEventListener("input", function() {
    var cleanValue = input_profitability.value.replace(/\D+/g, '')
    input_profitability.value = new Intl.NumberFormat('pt-br', {minimumFractionDigits: '2'}).format(cleanValue / 100)
})

var period_amount = 1
function togglePeriod() {
    if(period_amount == 1) {
        period_amount = 12
        toggle_period_span.innerText = 'Anos'
    } else {
        period_amount = 1
        toggle_period_span.innerText = 'Meses'
    }
}

var result_total
function calculateTotal() {
    result_total = Number(input_initial.value.replace(/\D+/g, '')) / 100

    for(i = 0; i < input_period.value * period_amount; i++) {
        result_total += result_total * (Number(input_profitability.value.replace(/\D+/g, '')) / 100 / 100) + Number(input_monthly.value.replace(/\D+/g, '')) / 100
    }
    span_result_total.innerText = new Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(result_total)
}

var result_invested
function calculateInvested() {
    result_invested = Number(input_initial.value.replace(/\D+/g, ''))/100 + (Number(input_monthly.value.replace(/\D+/g, ''))/100 * (Number(input_period.value.replace(/\D+/g, '')) * period_amount))
    span_result_invested.innerText = new Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(result_invested)
}

var result_profit
function calculateProfit() {
    result_profit = result_total - result_invested
    span_result_profit.innerText = new Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(result_profit)
}

function showResult() {
    info_h2.style.display = 'none'
    info_container.style.display = 'flex'
    window.scrollTo(0, document.body.scrollHeight)
}