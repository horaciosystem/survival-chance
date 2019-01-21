import React, { useState } from "react"
import { styled, Box, Flex, Button, css, Heading } from "reakit"
import { ifProp, palette, theme } from "styled-tools"
import { success } from "lib/notifications"
import appTheme from "theme"

const Wrapper = styled(Flex)`
  flex-direction: column;
  height: 40vh;
  width: 50vw;
  color: ${palette("text")};
`

const activeStyle = css`
  box-shadow: inset 10px 0 0 ${palette("error")};
  border: 1px solid ${palette("error")};
`

const Item = styled(Box)`
  ${ifProp("active", activeStyle)}
  padding: ${theme("spacing.normal")};
  border-radius: 3px;
  cursor: pointer;
  font-weight: ${theme("fontWeight.semibold")};

  :hover {
    background-color: ${palette("lightGray")};
  }
`

function ModalContent({ survivorsInfected, closeModal, clear }) {
  let [infected, setInfected] = useState(null)
  let [error, setError] = useState(null)
  let [submitting, setSubmitting] = useState(false)

  function onSubmit() {
    setError(null)
    setSubmitting(true)

    let reporter = survivorsInfected.find(it => it.id !== infected)

    let body = new FormData()
    body.append("infected", infected)

    return fetch(
      `//zssn-backend-example.herokuapp.com/api/people/${
        reporter.id
      }/report_infection.json`,
      {
        method: "POST",
        body
      }
    )
      .then(() => {
        clear()
        setSubmitting(false)
        success("Infection reported.")
        closeModal()
      })
      .catch(error => {
        setSubmitting(false)
        setError(error)
      })
  }

  return (
    <Wrapper>
      <Heading as="h3">Report Infection</Heading>
      <Box marginBottom={appTheme.spacing.normal}>
        Select the infected survivor
      </Box>
      <Box flexGrow={1}>
        {survivorsInfected.map(({ id, name }) => (
          <Item
            key={id}
            active={id === infected}
            onClick={() => setInfected(id)}
          >
            {name}
          </Item>
        ))}
      </Box>
      <Flex justifyContent="flex-end" flexGrow={0}>
        {error && <span>Report failed!</span>}
        <Button
          type="button"
          opaque={false}
          marginRight={appTheme.spacing.normal}
          onClick={closeModal}
          disabled={submitting}
        >
          Cancel
        </Button>
        <Button
          type="button"
          disabled={!infected || submitting || error}
          onClick={onSubmit}
        >
          {submitting ? "Reporting..." : "Report"}
        </Button>
      </Flex>
    </Wrapper>
  )
}

export default ModalContent
