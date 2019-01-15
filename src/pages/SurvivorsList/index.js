import React from "react"
import { Grid, Toolbar, Link, Heading } from "reakit"
import useFetch from "../../lib/useFetch"
import AsyncHandler from "../../common/AsyncHandler"
import MainColumn from "../../common/MainColumn"
import SurvivorCard from "./SurvivorCard"

function SurvivorsList() {
  const movies = useFetch(
    "http://zssn-backend-example.herokuapp.com/api/people.json"
  )

  return (
    <MainColumn>
      <Toolbar height="60px" padding="16px 0" marginBottom="24px">
        <Toolbar.Content align="start">
          <Heading fontSize={36} margin={0}>
            Survivors
          </Heading>
        </Toolbar.Content>
        <Toolbar.Content align="end">
          <Toolbar.Focusable fontSize={20} as={Link}>
            Add
          </Toolbar.Focusable>
        </Toolbar.Content>
      </Toolbar>
      <AsyncHandler fetcher={movies}>
        {({ data }) => (
          <Grid
            columns="repeat( auto-fit, minmax(400px, 1fr) )"
            autoRows="auto"
            gap="10px"
          >
            {data.map(survivor => {
              return (
                <SurvivorCard key={survivor.location} survivor={survivor} />
              )
            })}
          </Grid>
        )}
      </AsyncHandler>
    </MainColumn>
  )
}

export default SurvivorsList
