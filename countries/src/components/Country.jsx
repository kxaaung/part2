import CountryDetail from './CountryDetail';

const Country = ({ countries, detailOf }) => {
    if (countries.length === 0) {
        return null;
    }

    if (countries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    }

    if (countries.length == 1) {
        return (
            <CountryDetail country={countries[0]} />
        )
    }

    return (
        <>
            {countries.map(country => <p key={country.name.common}>{country.name.common}
                <button onClick={() => detailOf(country.name.common)}>show</button>
            </p>)}
        </>
    )
}

export default Country