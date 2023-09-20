import React, { Component } from "react";
import { useMap } from "react-leaflet";
import L, { LeafletMouseEvent, Map } from "leaflet";
import { useState } from "react";

const icon = L.icon({ iconUrl: "/images/marker-icon.png", shadowUrl: "/images/marker-shadow.png", iconSize: [25, 41], iconAnchor: [12, 41] });


class Locate extends React.Component {
  locateBtn;

  createButtonControl() {
    const { map, formData, setFormData } = this.props;
    const MapHelp = L.Control.extend({
      onAdd : (map) => {
        const locateBtn = L.DomUtil.create("button", "");
        this.locateBtn = locateBtn;
        locateBtn.innerHTML = this.props.title;

        const marker = L.marker(null, {icon:icon, draggable:true});
        marker.on('dragend', function(event){
          var draggedMarker = event.target;
          var position = draggedMarker.getLatLng();
          console.log(position);
          draggedMarker.setLatLng(new L.LatLng(position.lat, position.lng),{draggable:'true'});
          map.panTo(new L.LatLng(position.lat, position.lng))
          setFormData({ 
            ...formData, 
            latitude: position.lat, 
            longitude: position.lng })
        });

        locateBtn.addEventListener("click", async (event) => {
          event.stopPropagation();
          event.preventDefault();
          
          map.locate().on("locationfound", function (e) 
          {
              map.flyTo(e.latlng, 18);
              marker.setLatLng(e.latlng).addTo(map); 
              setFormData({ 
                ...formData, 
                latitude: e.latlng.lat, 
                longitude: e.latlng.lng })
          })
          .on("locationerror", function (e) {
            setFormData({ 
              ...formData, 
              status: "failed" 
            })
          });
        });
        return locateBtn;
      }
    });
    return new MapHelp({ position: "bottomright" });
  }

  componentDidMount() {
    const { map } = this.props;
    const control = this.createButtonControl();
    control.addTo(map);
  }

  componentWillUnmount() {
    this.locateBtn.remove();
  }

  render() {
    return null;
  }
}

function withMap(Component) {
  return function WrappedComponent(props) {
    const map = useMap();
    return <Component {...props} map={map} />;
  };
}

export default withMap(Locate);
