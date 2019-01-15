import React from "react"
import { Link as ReactRouterLink } from "react-router-dom"
import { Flex, List, Box, Link } from "reakit"
import useFetch from "../../lib/useFetch"
import AsyncHandler from "../../common/AsyncHandler"

function SurvivorsList() {
  const movies = useFetch(
    "http://zssn-backend-example.herokuapp.com/api/people.json"
  )

  return (
    <AsyncHandler fetcher={movies}>
      {({ data }) => (
        <List>
          {data.map(it => {
            let id = extractId(it.location)

            return (
              <Box key={id} as="li">
                <Flex justifyContent="space-between">
                  {it.name}
                  <ReactRouterLink to={`/survivor/${id}/details`}>
                    Edit
                  </ReactRouterLink>
                </Flex>
              </Box>
            )
          })}
        </List>
      )}
    </AsyncHandler>
  )
}

function extractId(url) {
  let array = url.split("/")
  return array.pop()
}

export default SurvivorsList
