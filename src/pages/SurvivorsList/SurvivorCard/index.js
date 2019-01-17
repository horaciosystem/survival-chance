import React from "react"
import { styled, Box, Heading, Flex, Card } from "reakit"
import { Link as ReactRouterLink } from "react-router-dom"
import { palette } from "styled-tools"

const CardLabel = styled(Box)`
  color: ${palette("text75")};
  margin-right: 8px;
`

const StyledCard = styled(Card)`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  border-radius: 3px;
  padding: 8px;
`

function SurvivorCard({ survivor: { name, age, location, gender } }) {
  let id = extractId(location)

  return (
    <StyledCard>
      <Heading fontSize={24}>{name}</Heading>
      <Flex justifyContent="space-between">
        <Flex marginRight="16px">
          <CardLabel fontWeight={600}>age</CardLabel>
          <Box fontWeight={700}>{age}</Box>
        </Flex>
        <Flex>
          <CardLabel fontWeight={600}>gender</CardLabel>
          <Box fontWeight={700}>{gender}</Box>
        </Flex>
      </Flex>
      <ReactRouterLink to={`/survivors/${id}/edit`}>Edit</ReactRouterLink>
    </StyledCard>
  )
}

function extractId(url) {
  let array = url.split("/")
  return array.pop()
}

export default SurvivorCard
