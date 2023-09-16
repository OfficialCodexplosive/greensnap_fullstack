import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useState } from 'react';
import Locate from './Locate';

import L from 'leaflet';

const icon = L.icon({ iconUrl: "/images/marker-icon.png", shadowUrl: "/images/marker-shadow.png", iconSize: [25, 41], iconAnchor: [12, 41] });

const defPos = [50.7753, 6.0839];

export default function Map({ formData, setFormData, defaultPosition=defPos }){
    return (
        <MapContainer center={defaultPosition} zoom={13} zoomControl={false} scrollWheelZoom={true} style={{height: 400, width: "100%"}}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://tile.openstreetmap.de/{z}/{x}/{y}.png"
            />
            {/* 
            <Marker position={[51.505, -0.09]} icon={icon}>
                <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
            */}
            <Locate title={"Locate"} formData={formData} setFormData={setFormData}/>

        </MapContainer>
    )
}