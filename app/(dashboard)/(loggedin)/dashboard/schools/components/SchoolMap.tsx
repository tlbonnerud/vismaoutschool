'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for Leaflet default marker icons
const DefaultIcon = L.icon({
   iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
   iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
   shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
   iconSize: [25, 41],
   iconAnchor: [12, 41],
   popupAnchor: [1, -34],
   shadowSize: [41, 41]
})

L.Marker.prototype.options.icon = DefaultIcon

// Oslo ungdomsskoler (secondary schools) data
interface School {
   name: string
   address: string
   district: string
   students?: string
   lat: number
   lng: number
}

const osloSchools: School[] = [
   {
      name: "Ris ungdomsskole",
      address: "Morgedalsvegen 15, 0378 Oslo",
      district: "Vestre Aker",
      students: "~450",
      lat: 59.9443,
      lng: 10.7061
   },
   {
      name: "Vinderen skole",
      address: "Slemdalsveien 66, 0373 Oslo",
      district: "Vestre Aker",
      students: "~350",
      lat: 59.9498,
      lng: 10.7097
   },
   {
      name: "Majorstuen skole",
      address: "Schwensens gate 8, 0370 Oslo",
      district: "Frogner",
      students: "~600",
      lat: 59.9303,
      lng: 10.7148
   },
   {
      name: "Uranienborg skole",
      address: "Briskebyveien 7, 0259 Oslo",
      district: "Frogner",
      students: "~500",
      lat: 59.9228,
      lng: 10.7174
   },
   {
      name: "Løren skole",
      address: "Lørenveien 54, 0585 Oslo",
      district: "Grünerløkka",
      students: "~400",
      lat: 59.9309,
      lng: 10.7894
   },
   {
      name: "Sinsen skole",
      address: "Torshovgata 54, 0476 Oslo",
      district: "Sagene",
      students: "~380",
      lat: 59.9353,
      lng: 10.7773
   },
   {
      name: "Bjølsen skole",
      address: "Moldegata 21, 0445 Oslo",
      district: "Sagene",
      students: "~320",
      lat: 59.9317,
      lng: 10.7533
   },
   {
      name: "Jordal skole",
      address: "Jordal idrettsplass, 0657 Oslo",
      district: "Gamle Oslo",
      students: "~550",
      lat: 59.9098,
      lng: 10.7793
   },
   {
      name: "Vålerenga skole",
      address: "Strømsveien 78, 0663 Oslo",
      district: "Gamle Oslo",
      students: "~420",
      lat: 59.9092,
      lng: 10.7930
   },
   {
      name: "Nydalen skole",
      address: "Gullhaug Torg 5, 0484 Oslo",
      district: "Nordre Aker",
      students: "~300",
      lat: 59.9500,
      lng: 10.7642
   },
   {
      name: "Grefsen skole",
      address: "Kapellveien 62, 0487 Oslo",
      district: "Nordre Aker",
      students: "~380",
      lat: 59.9533,
      lng: 10.7812
   },
   {
      name: "Ila skole",
      address: "Fredensborg vei 31, 0177 Oslo",
      district: "St. Hanshaugen",
      students: "~290",
      lat: 59.9267,
      lng: 10.7317
   },
   {
      name: "Bolteløkka skole",
      address: "Sandakerveien 9, 0477 Oslo",
      district: "St. Hanshaugen",
      students: "~310",
      lat: 59.9332,
      lng: 10.7492
   },
   {
      name: "Ruseløkka skole",
      address: "Ruseløkkveien 40, 0251 Oslo",
      district: "Frogner",
      students: "~470",
      lat: 59.9173,
      lng: 10.7256
   },
   {
      name: "Marienlyst skole",
      address: "Marienlystveien 13, 0167 Oslo",
      district: "St. Hanshaugen",
      students: "~350",
      lat: 59.9291,
      lng: 10.7253
   },
   {
      name: "Lambertseter skole",
      address: "Lambertseterveien 24, 1154 Oslo",
      district: "Nordstrand",
      students: "~420",
      lat: 59.8681,
      lng: 10.8110
   },
   {
      name: "Nordstrand skole",
      address: "Oberst Rodes vei 84, 1165 Oslo",
      district: "Nordstrand",
      students: "~480",
      lat: 59.8653,
      lng: 10.7923
   },
   {
      name: "Skullerud skole",
      address: "Skullerudveien 45, 1188 Oslo",
      district: "Søndre Nordstrand",
      students: "~390",
      lat: 59.8601,
      lng: 10.8350
   },
   {
      name: "Mortensrud skole",
      address: "Helga Vaneks vei 2, 1281 Oslo",
      district: "Søndre Nordstrand",
      students: "~450",
      lat: 59.8453,
      lng: 10.8217
   },
   {
      name: "Holmlia skole",
      address: "Holmliasenteret 11, 1255 Oslo",
      district: "Søndre Nordstrand",
      students: "~520",
      lat: 59.8348,
      lng: 10.8043
   }
]

// Oslo center coordinates
const osloCenter: [number, number] = [59.9139, 10.7522]

export default function SchoolMap() {
   return (
      <div className="w-full h-[600px] rounded-lg overflow-hidden shadow-lg">
         <MapContainer
            center={osloCenter}
            zoom={12}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={true}
         >
            <TileLayer
               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {osloSchools.map((school, index) => (
               <Marker key={index} position={[school.lat, school.lng]}>
                  <Popup>
                     <div className="p-2 min-w-[200px]">
                        <h3 className="font-bold text-lg text-gray-900 mb-2">{school.name}</h3>
                        <div className="space-y-1 text-sm text-gray-700">
                           <p><strong>Adresse:</strong> {school.address}</p>
                           <p><strong>Bydel:</strong> {school.district}</p>
                           {school.students && <p><strong>Elever:</strong> {school.students}</p>}
                        </div>
                     </div>
                  </Popup>
               </Marker>
            ))}
         </MapContainer>
      </div>
   )
}
