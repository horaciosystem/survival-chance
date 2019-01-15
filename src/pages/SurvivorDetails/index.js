import React from "react"
import { Heading } from "reakit"
import useFetch from "../../lib/useFetch"
import AsyncHandler from "../../common/AsyncHandler"

function SurvivorDetails({ match: { params } }) {
  const survivor = useFetch(
    `http://zssn-backend-example.herokuapp.com/api/people/${params.id}.json`
  )

  return (
    <>
      <Heading>Details</Heading>
      <AsyncHandler fetcher={survivor}>
        {({ data }) => (
          <>
            <Heading as="h3">{data.name}</Heading>
            <Heading as="h3">{data.age}</Heading>
            <Heading as="h3">{data.gender}</Heading>
          </>
        )}
      </AsyncHandler>
    </>
  )
}

export default SurvivorDetails
