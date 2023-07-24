const API_URL = 'https://v6.exchangerate-api.com/v6/72b705c9060d09cbcebf52e7/latest/PLN'
const selectFrom = document.getElementById('from')
const selectTo = document.getElementById('to')
const submitBtn = document.querySelector('#submit_button')
const swapBtn = document.querySelector('#swap_button')

currencies.forEach(currency => {
	const option = document.createElement('option')
	option.value = currency
	option.text = currency
	selectFrom.add(option)
})

currencies.forEach(currency => {
	const option = document.createElement('option')
	option.value = currency
	option.text = currency
	selectTo.add(option)
})

selectFrom.value = 'PLN'

let swap = () => {
	let temporaryValue = selectTo.value
	selectTo.value = selectFrom.value
	selectFrom.value = temporaryValue
}

let convert = () => {
	const amount = document.getElementById('amount').value
	const fromValue = selectFrom.value
	const toValue = selectTo.value

	if (amount.length != 0) {
		fetch(API_URL)
			.then(res => res.json())
			.then(data => {
				let fromExchangeRate = data.conversion_rates[fromValue]
				let toExchangeRate = data.conversion_rates[toValue]
				const convertedAmount = (amount / fromExchangeRate) * toExchangeRate
				result.innerHTML = `${amount} ${fromValue} = ${convertedAmount.toFixed(2)} ${toValue}`
			})
	} else {
		result.innerHTML = 'Please fill the input value'
	}
}

console.log(submitBtn)
submitBtn.addEventListener('click', convert)
swapBtn.addEventListener('click', swap)
// window.addEventListener('load', convert)
