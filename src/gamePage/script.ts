let markers: google.maps.Marker[] = []
let coords_serialized: string

const leaningTowerOfPisa = { lat: 43.723109, lng: 10.396403 }
const burjKhalifa = { lat: 25.196132, lng: 55.275384 }
const eiffelTower = { lat: 48.857530, lng: 2.296097 }
const statueOfLiberty = { lat: 40.688852, lng: -74.043912 }
const tajMahal = { lat: 27.174127, lng: 78.042254 }
const goldenGateBridge = { lat: 37.821162, lng: -122.471982 }
const pyramids = { lat: 29.977419, lng: 31.133040 }
const rio = { lat: -22.951914, lng: -43.210758 }
const pigeonRocks = { lat: 33.890161, lng: 35.471704 }
const gardensByTheBay = { lat: 1.281677, lng: 103.863251 }
const stBasilsCathedral = { lat: 55.752418, lng: 37.622395 }
const mtFuji = { lat: 35.412492, lng: 138.758761 }
const colosseum = { lat: 41.891787, lng: 12.491410 }
const angkorWat = { lat: 13.412421, lng: 103.868274 }

const places =  [
  leaningTowerOfPisa,
  burjKhalifa,
  eiffelTower,
  statueOfLiberty,
  tajMahal,
  goldenGateBridge,
  pyramids,
  rio,
  pigeonRocks,
  gardensByTheBay,
  stBasilsCathedral,
  mtFuji,
  colosseum,
  angkorWat
]
const place = Math.round(Math.random() * places.length)
const place_serialized = JSON.stringify(places[place])
localStorage.setItem('location', place_serialized)


function myMap(): void {
    // Create new map
    const map = new google.maps.Map(
      document.getElementById("googleMap") as HTMLElement, {
        center: new google.maps.LatLng(51.508742, -0.120850),
        zoom: 1,
        disableDefaultUI: true
      }
    )

    // Create street view
    const panorama = new google.maps.StreetViewPanorama(
      document.getElementById("pano") as HTMLElement, {
        // position: new google.maps.LatLng(43.723109, 10.396403),
        position: places[place],
        pov: {
          heading: 34,
          pitch: 10,
        },
        disableDefaultUI: true
      }
    )
    map.setStreetView(panorama)

    // LIstens for click on map
    google.maps.event.addListener(map, "click", (e: { latLng: any; }) => {
        deleteMarkers()
        addMarker(e.latLng, map)
        coords_serialized = JSON.stringify(e.latLng)
        localStorage.setItem('guess', coords_serialized)

        document.getElementById('button')!.removeAttribute('disabled')
    })
}

// Adds a marker to the map.
function addMarker(location: google.maps.LatLngLiteral, map: google.maps.Map) {
    // Add the marker at the clicked location
    const marker = new google.maps.Marker({
      position: location,
      map: map
    })
    markers.push(marker)
}

// Sets the map on all markers in the array.
function setMapOnAll(map: google.maps.Map | null) {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(map)
    }
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers(): void {
    setMapOnAll(null)
    markers = []
}

declare global {
  interface Window {
    myMap: () => void
  }
}
window.myMap = myMap
export {  }