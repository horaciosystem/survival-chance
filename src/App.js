import React, { Component } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { Provider as ThemeProvider } from "reakit"
import theme from "reakit-theme-default"
import SurvivorsList from "./pages/SurvivorsList"

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <>
            <Route path="/survivals" exact component={SurvivorsList} />
          </>
        </Router>
      </ThemeProvider>
    )
  }
}

export default App
