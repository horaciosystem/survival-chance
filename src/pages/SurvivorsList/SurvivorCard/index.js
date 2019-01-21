import React from "react"
import { styled, css, Box, Flex, Card, Link } from "reakit"
import { Link as ReactRouterLink } from "react-router-dom"
import { theme, palette, ifProp, ifNotProp } from "styled-tools"

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
const defaultBorderStyle =
  "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)"

const dangerStyle = css`
  box-shadow: ${defaultBorderStyle}, inset 10px 0 0 ${palette("error")};
  padding-left: 0.3rem;
`

const activeStyle = css`
  box-shadow: ${defaultBorderStyle}, 0 10px 6px -6px #777,
    inset 0 0 0 10px rgba(31, 58, 147, 1);
`

const normalStyle = css`
  ${ifProp("active", activeStyle)};
  cursor: pointer;

  :hover {
    box-shadow: ${ifNotProp(
      "active",
      `${defaultBorderStyle}, 0 10px 6px -6px #777`
    )};
    background-color: ${palette("lightGray")};
  }
`

const StyledCard = styled(Card)`
  width: calc(100% - 5px);
  border-radius: 3px;
  box-shadow: ${defaultBorderStyle};
  color: ${palette("text")};
  padding: ${theme("spacing.small")};
  ${ifProp("danger", dangerStyle, normalStyle)};
`

const FieldRow = styled(Flex)`
  margin-bottom: 1rem;
`

function SurvivorCard({
  survivor: { id, name, age, location, gender, ...fields },
  selected,
  toggleInfection
}) {
  let infected = fields["infected?"]
  let onClick = infected ? () => {} : () => toggleInfection({ id, name })

  return (
    <StyledCard danger={infected} active={selected} onClick={onClick}>
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
        <Link
          as={ReactRouterLink}
          to={`/survivors/${id}/edit`}
          onClick={e => e.stopPropagation()}
        >
          Edit
        </Link>
      </Flex>
    </StyledCard>
  )
}

export default SurvivorCard
