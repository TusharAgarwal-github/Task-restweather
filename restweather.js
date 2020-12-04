async function getcountriesData() {
	let url = 'https://restcountries.eu/rest/v2/all'
	try {
		const Coundataresp = await fetch(url)
		const coundata = await Coundataresp.json()
		//console.log(coundata)
		createPage(coundata)
	} catch (e) {
		console.log(e)
	}
}
getcountriesData()

//Creates individual Card
function createCard(countryObj) {
	const card = createDomElement('div', 'card')
	const cardBody = createDomElement('div', 'card-body')
	const cardTitle = createDomElement('h5', 'card-title')
	if (countryObj.name.length > 15) {
		cardTitle.classList.add('short-title')
	}
	cardTitle.innerHTML = countryObj.name

	const image = createDomElement('img', 'card-img-top')
	image.src = countryObj.flag
	image.alt = countryObj.name

	const cardContents = createDomElement('div', 'card-contents')

	const capitalP = createDomElement('p', 'capital')
	capitalP.innerHTML = 'Capital:'
	const capitalPSpan = createDomElement('span')
	if (!countryObj.capital) {
		capitalPSpan.innerHTML = 'NA'
	} else {
		capitalPSpan.innerHTML = countryObj.capital
	}
	capitalP.append(capitalPSpan)

	const countryCodesP = createDomElement('p')
	countryCodesP.innerHTML =
		'Country Codes: ' + `${countryObj.alpha2Code}, ${countryObj.alpha3Code}`

	const regionP = createDomElement('p')
	regionP.innerHTML = 'Region: ' + countryObj.region

	// var cardFooter = document.createElement('div')
	// cardFooter.classList.add('card-footer', 'text-muted', 'text-center')
	var weatherButton = document.createElement('button')
	weatherButton.setAttribute('type', 'button')
	weatherButton.setAttribute('id', 'weather')
	weatherButton.setAttribute('data-toggle', 'modal')
	weatherButton.setAttribute('data-target', '#displayWeather')
	weatherButton.classList.add('btn', 'btn-primary', 'weatherButton')
	weatherButton.innerHTML = 'Click for Weather!'
	weatherButton.addEventListener('click', function () {
		var temp = getWeatherData(countryObj.latlng[0], countryObj.latlng[1])
		console.log(temp)
	})
	cardContents.append(capitalP, countryCodesP, regionP, weatherButton)
	cardBody.append(cardTitle, image, cardContents)
	card.append(cardBody)

	return card
}

// Creates a Dom element and assigns class and id to it, if they are not empty
function createDomElement(ele, eleClass = '', eleId = '') {
	const element = document.createElement(ele)
	if (eleClass !== '') {
		element.setAttribute('class', eleClass)
	}
	if (eleId !== '') {
		element.setAttribute('id', eleId)
	}
	return element
}

// Generates Body of the document
function createPage(PageData) {
	const container = createDomElement('div', 'container-fluid')
	const row = createDomElement('div', 'row')
	const column = createDomElement('div', 'col-12 countriesInfo')

	PageData.forEach(data => {
		const card = createCard(data)
		column.append(card)
	})

	row.append(column)
	container.append(row)
	document.body.append(container)
}

function getWeatherData(arr, brr) {
	let lat = arr
	let lon = brr
	let ht = 'https://'
	let url = `${ht}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=3ce1c849f7784212f2497377c2ef5afa`
	var request = new XMLHttpRequest()
	request.open('GET', url, true)
	request.send()

	request.onload = function () {
		var data = JSON.parse(this.response)
		var report = data.main.temp
		var report2 = data.weather[0].description
		alert(
			'Weather is ' +
				(report - 273).toFixed(2) +
				' degree celsius with ' +
				report2
		)
	}
}
