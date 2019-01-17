import { useEffect, useState } from "react"

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
}

function useLocation() {
  let [data, setLocation] = useState({})
  let [error, setError] = useState(null)
  let [loading, setLoading] = useState(true)

  useEffect(() => {
    setError(null)

    // TODO The geolocation API is not working in Google Chrome latest versions.
    navigator.geolocation.getCurrentPosition(
      position => {
        var latitude = position.coords.latitude
        var longitude = position.coords.longitude
        setLocation({ latitude, longitude })
        setLoading(false)
      },
      error => {
        setError("Unable to retrieve your location")
        setLoading(false)
        console.error(error)
      },
      options
    )
  }, [])

  if (!navigator.geolocation) {
    setError("Geolocation is not supported by your browser")
  }

  return { data, error, loading }
}

export default useLocation
