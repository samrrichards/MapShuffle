const randomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const getCoord = coord => coord >= 0 ? coord + randomInt(1, 99999999)/100000000 : coord - randomInt(1, 99999999)/100000000;

export function genZoom() {
  return randomInt(6, 16);
}

export function genGlobalCoords(){
  return {lat: getCoord(randomInt(-70, 70)), lng: getCoord(randomInt(-180, 180))};
}

export function genCoords() {
  const coordObj =  {lat: getCoord(randomInt(25, 49)), lng: getCoord(randomInt(-125, -69))};

  //Atlantic Ocean off of Long Island
  if (coordObj.lat < 40.54 && coordObj.lng > -73.94) {
    return genCoords();
  }

  //Atlantic Ocean off of Maryland/Delaware
  if (coordObj.lat < 38.45 && coordObj.lng > -75.05) {
    return genCoords();
  }

  //South Atlantic Ocean
  if (coordObj.lat < 33.5 && coordObj.lng > -79) {
    return genCoords();
  }

  //Gulf of Mexico and southern Texas/Mexico border
  if (coordObj.lat < 29 && coordObj.lng < -82.77) {
    if (coordObj.lng > -95.1 || coordObj.lng < -100) {
      return genCoords();
    } else if (coordObj.lat < 27.3) {
      return genCoords();
    }
  }

  //French Canada
  if (coordObj.lat > 45 && coordObj.lng > -83) {
    if (coordObj.lng < -70.8) {
      return genCoords();
    }
  }

  //Sonora
  if (coordObj.lat < 31.33 && coordObj.lng < -105.94) {
    return genCoords();
  }

  //Baja California
  if (coordObj.lat < 32.5 && coordObj.lng < -114.82) {
    return genCoords();
  }

  //Pacific Ocean near Southern California
  if (coordObj.lat < 34.55 && coordObj.lng < -120.62) {
    return genCoords();
  }

  //Pacific Ocean near Big Sur
  if (coordObj.lat < 36.3 && coordObj.lng < -121.9) {
    return genCoords();
  }

  return coordObj;
}
