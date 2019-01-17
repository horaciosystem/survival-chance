import React from "react"
import useLocation from "lib/useLocation"
import AsyncHandler from "common/AsyncHandler"
import Map from "common/Map"

function LocationInput({ onChange }) {
  let location = useLocation()

  function handleMarkPosition({ lat, long }) {
    onChange(`Point(${long} ${lat})`)
  }

  return (
    <AsyncHandler fetcher={location}>
      {({ data: { lat, long } }) => (
        <Map
          initialLatitude={lat}
          initialLongitude={long}
          handleMarkPosition={handleMarkPosition}
        />
      )}
    </AsyncHandler>
  )
}

export default LocationInput
