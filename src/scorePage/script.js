import { app } from "../auth/firebase";
import { collection, getFirestore, addDoc, GeoPoint } from 'firebase/firestore'

// Calculate distance in kilometers between two coordinates
function haversine_distance(mk1, mk2) {
  var R = 6371.0710; // Radius of the Earth in kilometers
  var rlat1 = mk1.position.lat() * (Math.PI/180); // Convert degrees to radians
  var rlat2 = mk2.position.lat() * (Math.PI/180); // Convert degrees to radians
  var difflat = rlat2-rlat1; // Radian difference (latitudes)
  var difflon = (mk2.position.lng()-mk1.position.lng()) * (Math.PI/180); // Radian difference (longitudes)

  var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)))
  return d
}

// Get location and guess coords, and profile picture from local storage
const place = localStorage.getItem('location')
const guess = localStorage.getItem('guess')
const profilePic = localStorage.getItem('profilePic')

//  Convert from string to object
const place_deserialized = JSON.parse(place)
const guess_deserialized = JSON.parse(guess)
const profilePic_deserialized = JSON.parse(profilePic)

// Get location name
const location_name = localStorage.getItem('location_name')

let score

function myMap() {
  // Create map
  const map = new google.maps.Map(
    document.getElementById("googleMap"),
    {
      center: new google.maps.LatLng(20, 0),
      zoom: 2,
      disableDefaultUI: true
    }
    )

  // Adds a line connecting two markers
  const line = new google.maps.Polyline({ path: [place_deserialized, guess_deserialized], map })
    
  // Use users profile pic to indicate their guess
  const image = {
    url: profilePic_deserialized,
    size: new google.maps.Size(20, 20)
  }

  // Add markers to map
  const mrk1 = new google.maps.Marker({ position: place_deserialized, map })
  const mrk2 = new google.maps.Marker({ position: guess_deserialized, map, icon: image })

  // Calculate distance between markers in kilometers and displays it
  const distance = Math.round(haversine_distance(mrk1, mrk2))
  document.getElementById('msg').innerHTML = `The correct location was ${location_name}. Your guress was off by ${distance} kilometers.`

  // Points system
  score = Math.round(Math.pow(Math.E, ((-distance/1000) + Math.log(5))) * 1000)
  document.getElementById('points').innerHTML = score + ' points'
  document.getElementById('scorebar').style.setProperty('--score-percentage', `${( score / 5000 ) * 100}%`)

  addToDatabase()
}

window.myMap = myMap
// set up database
const db = getFirestore(app)
// function that adds a new document to the database using the user's email uid as a unique ID
async function addToDatabase() {
  const docRef = await addDoc(collection(db, "users", localStorage.getItem('uid'), "history"), {
    location_name: location_name,
    location: new GeoPoint(place_deserialized.lat, place_deserialized.lng),
    guess: new GeoPoint(guess_deserialized.lat, guess_deserialized.lng),
    score: score
  })
  console.log(docRef.id)
}
export { addToDatabase }