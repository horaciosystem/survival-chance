import React from "react"
import { styled, css, Box, Flex, Card, Link } from "reakit"
import { Link as ReactRouterLink } from "react-router-dom"
import { theme, palette, ifProp } from "styled-tools"
import { extractId } from "utils/normalizer"

const CardLabel = styled(Box)`
  color: ${palette("text75")};
  margin-right: 1rem;
  font-weight: ${theme("fontWeight.semibold")};
`

const CardText = styled(Box)`
  font-weight: ${theme("fontWeight.bold")};
`

const Name = styled(Box)`
  font-size: 24px;
  font-weight: ${theme("fontWeight.bold")};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`
const cardBorderStyle =
  "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)"

const dangerStyle = css`
  box-shadow: ${cardBorderStyle}, inset 10px 0 0 ${palette("error")};
`

const StyledCard = styled(Card)`
  box-shadow: ${cardBorderStyle};
  border-radius: 3px;
  padding: 8px;
  color: ${palette("text")};
  ${ifProp("danger", dangerStyle)};
`

const FieldRow = styled(Flex)`
  margin-bottom: 1rem;
`

function SurvivorCard({
  survivor: { name, age, location, gender, ...fields }
}) {
  let id = extractId(location)
  let infected = fields["infected?"]

  return (
    <StyledCard danger={infected}>
      <Flex flexDirection="column">
        <FieldRow>
          <Name>{name}</Name>
        </FieldRow>
        <FieldRow>
          <CardLabel>Age</CardLabel>
          <CardText>{age}</CardText>
        </FieldRow>
        <FieldRow>
          <CardLabel>Gender</CardLabel>
          <CardText>{gender}</CardText>
        </FieldRow>
        <FieldRow>
          <CardLabel>Status</CardLabel>
          <CardText>{infected ? "Infected" : "Not infected"}</CardText>
        </FieldRow>
        <Link as={ReactRouterLink} to={`/survivors/${id}/edit`}>
          Edit
        </Link>
      </Flex>
    </StyledCard>
  )
}

export default SurvivorCard
