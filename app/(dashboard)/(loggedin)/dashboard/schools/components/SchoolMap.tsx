'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import schoolsData from './schools.json'

// Fix for Leaflet default marker icons - use bundled assets from node_modules
const markerIcon = L.icon({
   iconUrl: '/leaflet/marker-icon.png',
   iconRetinaUrl: '/leaflet/marker-icon-2x.png',
   shadowUrl: '/leaflet/marker-shadow.png',
   iconSize: [25, 41],
   iconAnchor: [12, 41],
   popupAnchor: [1, -34],
   shadowSize: [41, 41]
})

// Oslo ungdomsskoler (secondary schools) data
interface School {
   name: string
   address: string
   district: string
   students?: string
   lat: number
   lng: number
}

const osloSchools: School[] = schoolsData as School[]
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
            {osloSchools.map((school) => (
               <Marker key={school.name} position={[school.lat, school.lng]} icon={markerIcon}>
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
