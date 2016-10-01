const randomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const getCoord = coord => coord >= 0 ? coord + randomInt(1, 99999999)/100000000 : coord - randomInt(1, 99999999)/100000000;

export function genZoom() {
  return randomInt(6, 16);
}

export function genGeocode(coords){
  return `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=AIzaSyAKvQ74lV2z8AuM6ERIearPxOPWBzuRVfo`;
}

export function genGlobalCoords(){
  return {lat: getCoord(randomInt(-70, 70)), lng: getCoord(randomInt(-180, 180))};
}

export function genUsCoords() {
  return {lat: getCoord(randomInt(25, 49)), lng: getCoord(randomInt(-125, -69))};
}
