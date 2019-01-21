import React, { Component } from "react"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import { Provider as ThemeProvider } from "reakit"
import { ToastContainer } from "react-toastify"
import { StoreProvider } from "common/StoreContext"
import SurvivorsList from "pages/SurvivorsList"
import SurvivorEdit from "pages/SurvivorEdit"
import SurvivorNew from "pages/SurvivorNew"
import theme from "theme"
import "react-toastify/dist/ReactToastify.css"
import "theme/global"

class App extends Component {
  render() {
    return (
      <StoreProvider>
        <ThemeProvider theme={theme}>
          <>
            <Router>
              <>
                <Route
                  exact
                  path="/"
                  render={() => <Redirect to="/survivors" />}
                />
                <Route path="/survivors" exact component={SurvivorsList} />
                <Route path="/survivors/new" component={SurvivorNew} />
                <Route path="/survivors/:id/edit" component={SurvivorEdit} />
              </>
            </Router>
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={true}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnVisibilityChange
              draggable
              pauseOnHover
            />
          </>
        </ThemeProvider>
      </StoreProvider>
    )
  }
}

export default App
