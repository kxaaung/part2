import { useEffect, useState } from 'react'
import WeatherService from '../services/WeatherService'
import Weather from './Weather'

const CountryDetail = ({country}) => {
	const lat = country.capitalInfo.latlng[0]
	const lng = country.capitalInfo.latlng[1]
	const [weather, setWather] = useState(null)
	
	useEffect(() => {
		WeatherService
			.getInfo(lat, lng)
			.then(response => {
				setWather(response)
			})
	}, [])

	if (weather) {
		console.log(weather)
	}

	return (
		<div>
			<h1>{country.name.common}</h1>
			<p>capital {country.capital[0]}</p>
			<p>area {country.area}</p>

			<h3>languages:</h3>
			<ul>
				{
					Object.keys(country.languages).map(lanKey => <li key={lanKey}>{country.languages[lanKey]}</li>)
				}
			</ul>
			<img src={country.flags.png} alt={country.flags.alt} height="200px" />
			{
				weather
				? <Weather weather={weather} capital={country.capital[0]} />
				: null
			}
		</div>
	)
}

export default CountryDetail