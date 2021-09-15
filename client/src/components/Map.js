import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import { features } from '../data/state-outlines.json';

export default function Map() {
    return(
        <div>
            <div id="mapid"></div>
            <MapContainer center={[38.2749, -98.35]} zoom={5.0} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {features && (
            <GeoJSON data={features}
            />)}
            </MapContainer>   
        </div>
    )
}