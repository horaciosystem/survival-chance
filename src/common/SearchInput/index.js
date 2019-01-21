import React from "react"
import { styled, Flex, Input, Button } from "reakit"
import { theme, palette } from "styled-tools"

const StyledInput = styled(Input)`
  width: 100%;
  font-size: 1.8rem;
  border: 1px solid ${palette("text50")};
  color: ${palette("text")};
  font-weight: ${theme("fontWeight.regular")};
`

function SearchInput({ defaultValue = "", onSearchChange }) {
  let onSubmit = event => {
    event.preventDefault()
    onSearchChange(event.target.search.value)
  }

  return (
    <form onSubmit={onSubmit}>
      <Flex relative minWidth="320px">
        <StyledInput
          type="search"
          name="search"
          defaultValue={defaultValue}
          placeholder="Search by id"
        />
        <Button absolute right={0} fontSize={18} type="submit">
          Search
        </Button>
      </Flex>
    </form>
  )
}

export default SearchInput
