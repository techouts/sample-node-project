function userDeniedPermission() {
    return { locationAccess: false, latLong: null }
  }
  
  function getPosition(position: { latitude: any; longitude: any }) {
    const lat = position.latitude
    const lng = position.longitude
    return { locationAccess: true, latLong: { lat, lng } }
  }
  
  function showPosition(position: GeolocationPosition) {
    return getPosition(position.coords)
  }
  
  export function checkPermission() {
    return new Promise((res) => {
      if (navigator.permissions) {
        navigator.permissions
          .query({ name: 'geolocation' })
          .then((permissionStatus) => {
          console.log("permissionStatus", permissionStatus);
          res(permissionStatus);
        })
        .catch(() => res(userDeniedPermission()));
    } else {
      if (navigator.geolocation) {
        res({ state: "granted" });
      } else {
        localStorage.setItem("locationPermission", "denied");
        res(userDeniedPermission());
      }
    }
  });
}
 
//get Lat Lng for the current permission
function getLatLng() {
  return new Promise((resolve) => {
    checkPermission()
      .then((permissionStatus: any) => {
        if (permissionStatus.state === "granted") {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              localStorage.setItem("locationPermission", "granted");
              resolve(showPosition(pos));
            },
            (error) => {
              localStorage.setItem("locationPermission", "denied");
              resolve(userDeniedPermission());
            }
          )
        } else if (permissionStatus.state === "prompt") {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              localStorage.setItem("locationPermission", "granted");
              resolve(showPosition(position));
            },
            (error) => {
              localStorage.setItem("locationPermission", "denied");
              resolve(userDeniedPermission());
            }
          );
        } else {
          localStorage.setItem("locationPermission", "denied");
          resolve(userDeniedPermission());
        }
      })
      .catch(() => {
        localStorage.setItem("locationPermission", "denied");
        resolve(userDeniedPermission());
      })
  })
}
 
function getLocation() {
  const savedPermission = localStorage.getItem("locationPermission");
  return new Promise((resolve) => {
    if (!savedPermission) {
      if (navigator.geolocation) {
        getLatLng().then((res) => {
          resolve(res);
        })
      } else {
        localStorage.setItem("locationPermission", "denied");
        resolve(userDeniedPermission());
      }
    }
  });
}
 
  export default getLocation
  