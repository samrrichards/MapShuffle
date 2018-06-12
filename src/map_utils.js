const randomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const getCoord = coord => coord >= 0 ? coord + randomInt(1, 99999999)/100000000 : coord - randomInt(1, 99999999)/100000000;

export const genZoom = () => randomInt(6, 16);

export const genGeocode = (coords, apiKey) => `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${apiKey}`;

export const genGlobalCoords = () => ({lat: getCoord(randomInt(-56, 66)), lng: getCoord(randomInt(-180, 180))});

export const genUsCoords = () => ({lat: getCoord(randomInt(25, 49)), lng: getCoord(randomInt(-125, -69))});
