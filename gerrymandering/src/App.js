import './App.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export default function App() {

  return <div className="App">
  <div id="mapid"></div>
   <MapContainer center={[38.2749, -98.35]} zoom={4.5} scrollWheelZoom={false}>
     <TileLayer
       attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
     />
     <Marker position={[37.7749, -98.35]}>
       <Popup>
         A pretty CSS3 popup. <br /> Easily customizable.
       </Popup>
     </Marker>
   </MapContainer>     
 </div>;
}