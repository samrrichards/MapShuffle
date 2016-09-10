const randomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

export function genZoom() {
  return randomInt(6, 16);
}

export function genCoords() {
  const getCoord = coord => coord >= 0 ? coord + randomInt(1, 99999999)/100000000 : coord - randomInt(1, 99999999)/100000000;
  const coordObj =  {lat: getCoord(randomInt(25, 49)), lng: getCoord(randomInt(-69, -125))};

  if (coordObj.lat < 40.54 && coordObj.lng > -73.94) {
    console.log("Long Island recursion!");
    return genCoords();
  }

  if (coordObj.lat < 38.45 && coordObj.lng > -75.05) {
    console.log("Maryland/Delaware recursion!");
    return genCoords();
  }

  if (coordObj.lat < 33.5 && coordObj.lng > -79) {
    console.log("South Carolina recursion!");
    return genCoords();
  }

  if (coordObj.lat < 29 && coordObj.lng < -82.77) {
    if (coordObj.lng > -95.1 || coordObj.lng < -100) {
      console.log("Gulf of Mexico recursion!");
      return genCoords();
    } else if (coordObj.lat < 27.3) {
      console.log("Texas recursion!");
      return genCoords();
    }
  }

  if (coordObj.lat > 45 && coordObj.lng > -83) {
    if (coordObj.lng < -70.8) {
      console.log("French Canada recursion!");
      return genCoords();
    }
  }

  if (coordObj.lat < 31.33 && coordObj.lng < -105.94) {
    console.log("Sonora recursion!");
    return genCoords();
  }

  if (coordObj.lat < 32.5 && coordObj.lng < -114.82) {
    console.log("Baja recursion!");
    return genCoords();
  }

  if (coordObj.lat < 34.55 && coordObj.lng < -120.62) {
    console.log("Lompoc recursion!");
    return genCoords();
  }

  if (coordObj.lat < 36.3 && coordObj.lng < -121.9) {
    console.log("Big Sur recursion!");
    return genCoords();
  }

  return coordObj;
}
