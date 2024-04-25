import axios from "axios"


const baseUrl = "https://api.openweathermap.org/data/2.5/weather"

const getInfo = (lat, lon) => {
	console.log(lat)
	console.log(import.meta.env.VITE_SOME)
	return axios
		.get(baseUrl, {
			params: { lat, lon, appid: import.meta.env.VITE_SOME }
		})
		.then(response => response.data)
}


export default { getInfo }