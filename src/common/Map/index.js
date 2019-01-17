import React, { createRef, useEffect, useState } from "react"
import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet"

export default function Map({
  initialLatitude,
  initialLongitude,
  handleMarkPosition
}) {
  let markerRef = createRef()

  let [mapCenter] = useState({
    lat: initialLatitude,
    lng: initialLongitude
  })

  let [markerPosition, setMarkPosition] = useState({
    lat: initialLatitude,
    lng: initialLongitude
  })

  let [state, setState] = useState({
    zoom: 13,
    draggable: true
  })

  useEffect(() => {
    handleMarkPosition({ lat: initialLatitude, long: initialLongitude })
  }, [])

  function toggleDraggable() {
    setState({ draggable: !state.draggable })
  }

  function updatePosition() {
    const marker = markerRef.current
    if (marker != null) {
      let markerPosition = marker.leafletElement.getLatLng()
      setMarkPosition(markerPosition)

      handleMarkPosition({
        lat: markerPosition.lat,
        long: markerPosition.lng
      })
    }
  }

  const position = [mapCenter.lat, mapCenter.lng]
  const marker = [markerPosition.lat, markerPosition.lng]

  return (
    <LeafletMap center={position} zoom={state.zoom} style={{ height: "400px" }}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        draggable={state.draggable}
        onDragend={updatePosition}
        position={marker}
        ref={markerRef}
      >
        <Popup minWidth={90}>
          <span onClick={toggleDraggable}>
            {state.draggable ? "DRAG MARKER" : "MARKER FIXED"}
          </span>
        </Popup>
      </Marker>
    </LeafletMap>
  )
}
