import { styled, Box } from "reakit"
import { theme, palette } from "styled-tools"

export default styled(Box)`
  font-weight: ${theme("fontWeight.semibold")};
  font-size: 1.4rem;
  color: ${palette("error")};
`
