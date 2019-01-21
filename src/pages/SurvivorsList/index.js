import React, { useState } from "react"
import { Box, Flex, Grid, Heading, Link } from "reakit"
import { Link as ReactRouterLink } from "react-router-dom"
import MainColumn from "common/MainColumn"
import SearchInput from "common/SearchInput"
import useFetch from "lib/useFetch"
import { extractId } from "utils/normalizer"
import SurvivorCard from "./SurvivorCard"
import appTheme from "theme"

const STORE_KEY = "SURVIVORS"
const URL = "//zssn-backend-example.herokuapp.com/api/people.json"

const stateUpdater = data => prevState => {
  return { ...prevState, [STORE_KEY]: data }
}

const filterById = (term, data) => {
  if (!term) return data

  return (
    data &&
    data.filter(it => {
      let id = extractId(it.location)
      return term === id
    })
  )
}

function SurvivorsList() {
  let [searchTerm, setSearchTerm] = useState("")

  const survivors = useFetch({ url: URL, key: STORE_KEY, stateUpdater })

  return (
    <MainColumn>
      <Flex
        height="60px"
        padding="16px 0"
        marginBottom="24px"
        justifyContent="space-between"
      >
        <Box>
          <Heading fontSize={36} margin={0}>
            Survivors
          </Heading>
        </Box>
        <Flex alignItems="center">
          <Box marginRight={appTheme.spacing.normal}>
            <SearchInput onSearchChange={term => setSearchTerm(term)} />
          </Box>
          <Link as={ReactRouterLink} to="/survivors/new">
            New
          </Link>
        </Flex>
      </Flex>
      <Grid
        columns="repeat( auto-fit, minmax(300px, 1fr) )"
        autoRows="auto"
        gap="10px"
      >
        {renderItems({ survivors, searchTerm })}
      </Grid>
    </MainColumn>
  )
}

function renderItems({ survivors: { error, loading, data }, searchTerm }) {
  if (error) {
    return <div>Error: {error}</div>
  }

  if (!data && loading) {
    return <div>Loading...</div>
  }

  if (!data) {
    return null
  }

  let results = filterById(searchTerm, data)
  return results.length ? (
    results.map(survivor => {
      return <SurvivorCard key={survivor.location} survivor={survivor} />
    })
  ) : (
    <span>No results found.</span>
  )
}

export default SurvivorsList
