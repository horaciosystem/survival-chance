import React from "react"
import { Block, Button, Backdrop, Portal, Overlay } from "reakit"

function ReportInfectionModal({ children, disabled }) {
  return (
    <Overlay.Container>
      {overlay => (
        <Block>
          <Button as={Overlay.Show} {...overlay} disabled={disabled}>
            Report an infection
          </Button>
          <Backdrop as={[Portal, Overlay.Hide]} {...overlay} />
          <Overlay as={Portal} {...overlay}>
            {children(overlay.hide)}
          </Overlay>
        </Block>
      )}
    </Overlay.Container>
  )
}

export default ReportInfectionModal
