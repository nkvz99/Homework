
const fetchCountryData = async (countryCode = 'all') => {
    try {
        let url;
        if (countryCode === 'all') {
            url = 'https://restcountries.com/v3.1/all';
        } else {
            url = `https://restcountries.com/v3.1/alpha/${countryCode}`;
        }
        const response = await fetch(url);
        const data = await response.json();


        if (data.length === 0) {
            if (countryCode === 'all') {
                throw new Error('No countries found.');
            } else {
                throw new Error(`No data found for country code: ${countryCode}`);
            }
        }
        return data;
    } catch (error) {
        console.log('Error happened:', error);
        throw error;
    }
};


const hasSelectedCountryCode = (selectedCountryCode) => {
    if (selectedCountryCode) {
        return true;
    }
    console.log('Please select a country.');
    return false;
};


const isCountryDataValid = (country) => {
    if (country && country.length > 0) {
        return true;
    }
    console.log('No valid country data found.');
    return false;
};

const clearCountrySelection = () => {
    const countrySelect = document.getElementById('countrySelect');
    countrySelect.value = '';
};

const fetchAndProcessNeighbours = async (borders) => {
    const neighbourPromises = borders.map(fetchCountryData);
    const neighbours = [];
    for (let i = 0; i < neighbourPromises.length; i++) {
        const neighbour = await neighbourPromises[i];
        neighbours.push(neighbour);
    }
    return neighbours;
};

const displayNeighbours = (neighbours) => {
    const neighborsTableBody = document.getElementById('neighborsTableBody');
    neighborsTableBody.innerHTML = '';
    if (neighbours.length > 0) {
        console.log('Neighbours:', neighbours);
        neighbours.forEach(neighbour => {
            const row = document.createElement('tr');
            const cell = document.createElement('td');
            const neighbourName = neighbour[0] && neighbour[0].name && neighbour[0].name.common;
            cell.textContent = neighbourName || 'Unknown Country';
            row.appendChild(cell);
            neighborsTableBody.appendChild(row);
        });
    } else {
        console.log('No neighbouring countries found.');
        neighborsTableBody.innerHTML = '<tr><td>No neighbouring countries found.</td></tr>';
    }
};


const handleGetNeighbours = async () => {
    const countrySelect = document.getElementById('countrySelect');
    const selectedCountryCode = countrySelect.value;

    if (!hasSelectedCountryCode(selectedCountryCode)) return;

    const country = await fetchCountryData(selectedCountryCode);
    console.log('Fetched Country:', country);

    if (!isCountryDataValid(country)) return;

    const countryData = country[0];
    if (countryData.borders && countryData.borders.length > 0) {
        const neighbours = await fetchAndProcessNeighbours(countryData.borders);
        displayNeighbours(neighbours);
    } else {
        displayNeighbours([]);
    }

    clearCountrySelection();
};


const isValidCountryData = (countries) => {
    return countries && countries.length > 0;
};


const printCountrySelect = (countries, countrySelect) => {
    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country.cca2;
        option.textContent = country.name.common;
        countrySelect.appendChild(option);
    });
};


const setupGetNeighboursButton = () => {
    const getNeighboursButton = document.getElementById('getNeighbours');
    getNeighboursButton.addEventListener('click', handleGetNeighbours);
};


const setupDropDown = async () => {
    const countries = await fetchCountryData();
    const countrySelect = document.getElementById('countrySelect');

    printCountrySelect(countries, countrySelect);
    setupGetNeighboursButton();
};

setupDropDown();
