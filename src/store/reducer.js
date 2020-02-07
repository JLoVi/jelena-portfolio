import { createStore } from "redux"
import * as ActionTypes from "./actions"
const initalState = {
  pages: [],
  sidebar_links: [],
  header_links: [],
  show_modal: false,
  isLoaded: false,
}

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case ActionTypes.SET_PAGES:
      return Object.assign({}, state, {
        page: action.pages,
      })
    case ActionTypes.SET_SIDEBAR_LINKS:
      return Object.assign({}, state, {
        sidebar_links: action.sidebar_links,
      })
    case ActionTypes.SET_HEADER_LINKS:
      return Object.assign({}, state, {
        header_links: action.header_links,
      })
    case ActionTypes.SHOW_MODAL:
      return Object.assign({}, state, {
        show_modal: true,
      })
    case ActionTypes.HIDE_MODAL:
      return Object.assign({}, state, {
        show_modal: false,
      })
  }
}

export const store = () =>
  createStore(
    reducer,
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
