import React from "react"
import useLocation from "../../../lib/useLocation"
import AsyncHandler from "../../../common/AsyncHandler"
import Map from "../../../common/Map"

function LocationInput() {
  let location = useLocation()

  return (
    <AsyncHandler fetcher={location}>
      {({ data: { latitude, longitude } }) => (
        <Map initialLatitude={latitude} initialLongitude={longitude} />
      )}
    </AsyncHandler>
  )
}

export default LocationInput
