import React, { useState, useContext } from "react"
import { Box, Flex, Grid, Heading } from "reakit"
import MainColumn from "common/MainColumn"
import SearchInput from "common/SearchInput"
import SurvivorsSelectContext, {
  SurvivorsSelectProvider
} from "common/SurvivorsSelectProvider"
import useFetch from "lib/useFetch"
import { extractId } from "utils/normalizer"
import appTheme from "theme"
import Toolbar from "./Toolbar"
import SurvivorCard from "./SurvivorCard"

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
    <SurvivorsSelectProvider>
      <MainColumn>
        <Flex
          height="60px"
          padding="16px 0"
          marginBottom={appTheme.spacing.normal}
          justifyContent="space-between"
        >
          <Heading fontSize={36} margin={0}>
            Survivors
          </Heading>
          <Box marginRight={appTheme.spacing.normal}>
            <SearchInput onSearchChange={term => setSearchTerm(term)} />
          </Box>
        </Flex>
        <Toolbar />
        <Box marginBottom={appTheme.spacing.normal}>
          *Select two survivors: [reporter and infected] to report an infection.
        </Box>
        <Grid
          columns="repeat( auto-fit, minmax(300px, 1fr) )"
          autoRows="auto"
          gap="10px"
        >
          <ListContent survivors={survivors} searchTerm={searchTerm} />
        </Grid>
      </MainColumn>
    </SurvivorsSelectProvider>
  )
}

function ListContent({ survivors: { error, loading, data }, searchTerm }) {
  let infectionContext = useContext(SurvivorsSelectContext)

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
      let id = extractId(survivor.location)
      let selected = infectionContext.items.some(it => it.id === id)

      return (
        <SurvivorCard
          key={id}
          survivor={{ ...survivor, id }}
          selected={selected}
          toggleInfection={infectionContext.toggleItem}
        />
      )
    })
  ) : (
    <span>No results found.</span>
  )
}

export default SurvivorsList
