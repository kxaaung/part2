const Weather = ({weather, capital}) => {
	const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`

	return (
		<div>
			<h2>Weather in {capital}</h2>
			<p>temperature: {weather.main.temp - 273.15} Celcius</p>
			<img src={iconUrl} height="200px" alt={weather.weather[0].description} />
			<p>wind: {weather.wind.speed}</p>
		</div>
	)
}

export default Weather