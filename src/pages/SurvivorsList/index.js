import React, { useState, useContext, useMemo } from "react"
import { Box, Flex, Heading } from "reakit"
import VirtualList from "react-tiny-virtual-list"
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

const filterByIdOrName = (term, data) => {
  if (!term) return data

  return (
    data &&
    data.filter(it => {
      let id = extractId(it.location)
      return term === id || it.name.toLowerCase().includes(term.toLowerCase())
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
            <SearchInput
              onSearchChange={term => setSearchTerm(term)}
              placeholder="Search by name or ID"
            />
          </Box>
        </Flex>
        <Toolbar />
        <Box
          marginBottom={appTheme.spacing.normal}
          color={appTheme.palette.textColor50}
        >
          *Select two survivors [reporter and infected] to report an infection.
        </Box>
        <ListContent survivors={survivors} searchTerm={searchTerm} />
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

  let results = useMemo(() => filterByIdOrName(searchTerm, data), [
    searchTerm,
    data
  ])

  return (
    <VirtualList
      width="100%"
      height={800}
      itemCount={results.length}
      itemSize={180}
      renderItem={({ index, style }) => {
        let survivor = results[index]
        let id = extractId(survivor.location)
        let selected = infectionContext.items.some(it => it.id === id)

        return (
          <div key={id} style={style}>
            <SurvivorCard
              survivor={{ ...survivor, id }}
              selected={selected}
              toggleInfection={infectionContext.toggleItem}
            />
          </div>
        )
      }}
    />
  )
}

export default SurvivorsList
