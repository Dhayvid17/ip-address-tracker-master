const key = 'at_TRh26xWJHVP5C6OiMK5hf6midhmIX';
// const ipAddress = '8.8.8.8';

const getLocation = async (ipAddress) => {
    const base = 'https://geo.ipify.org/api/v2/country,city';
    const query = `?apiKey=${key}&ipAddress=${ipAddress}`;
    
    const response = await fetch(base + query);
    const data = await response.json();
    return data;
}

// getLocation('192.212.174.101')
// .then(data => console.log(data))
// .catch(err => console.log(err));
