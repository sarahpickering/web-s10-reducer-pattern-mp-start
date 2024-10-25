import React, { useState, useReducer } from 'react' // 👈 you'll need the reducer hook
import Quotes from './Quotes'
import QuoteForm from './QuoteForm'

// 👇 these are the types of actions that can change state
const CREATE_QUOTE = 'CREATE_QUOTE'
const DELETE_QUOTE = 'DELETE_QUOTE'
const EDIT_QUOTE_AUTHENTICITY = 'EDIT_QUOTE_AUTHENTICITY' // 👈 toggles the apocryphal property of a single quote
const SET_HIGHLIGHTED_QUOTE = 'SET_HIGHLIGHTED_QUOTE'     // 👈 highlights a quote (or un-highlights it)
const TOGGLE_VISIBILITY = 'TOGGLE_VISIBILITY'             // 👈 toggles whether to show all or only non-apocryphal

let id = 1
const getNextId = () => id++

const initialState = {
  displayAllQuotes: true,
  highlightedQuote: null,
  quotes: [
    {
      id: getNextId(),
      quoteText: "Don't cry because it's over, smile because it happened.",
      authorName: "Dr. Seuss",
      apocryphal: false,
    },
    {
      id: getNextId(),
      quoteText: "So many books, so little time.",
      authorName: "Frank Zappa",
      apocryphal: false,
    },
    {
      id: getNextId(),
      quoteText: "Be yourself; everyone else is already taken.",
      authorName: "Oscar Wilde",
      apocryphal: false,
    },
  ],
};


const reducer = (state, action) => {
  switch (action.type) {
    case CREATE_QUOTE:
      return { ...state,
        quotes: [ ...state.quotes, action.payload ]
       };
    case DELETE_QUOTE:
      return { 
        ...state, 
      quotes: state.quotes.filter(qt => qt.id !== action.payload) 
    };
    case EDIT_QUOTE_AUTHENTICITY:
      return { ...state,
        quotes: state.quotes.map(qt => {
          if (qt.id != action.payload) return qt
          return { ...qt, apocryphal: !qt.apocryphal}
        })
       };
    case SET_HIGHLIGHTED_QUOTE:
      return { ...state,
        highlightedQuote: state.highlightedQuote === action.payload
        ? null : action.payload
       };
    case TOGGLE_VISIBILITY:
      return { ...state, displayAllQuotes: !state.displayAllQuotes };
    default:
      return state
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const createQuote = ({ authorName, quoteText }) => {
    const newQuote = { id: getNextId(), authorName, quoteText, aporyphal: false }
    dispatch({ type: CREATE_QUOTE, payload: newQuote })
  }
  const deleteQuote = id => {
    dispatch({ type: DELETE_QUOTE, payload: id })
  }
  const editQuoteAuthenticity = id => {
    dispatch({ type: EDIT_QUOTE_AUTHENTICITY, payload })
  }
  const setHighlightedQuote = id => {
    dispatch({ type: SET_HIGHLIGHTED_QUOTE, payload: id })
  }
  const toggleVisibility = () => {
    dispatch({ type: TOGGLE_VISIBILITY })
  }

  return (
    <div id="mp">
      <h2>Module Project</h2>
      <Quotes
        quotes={state.quotes}
        highlightedQuote={state.highlightedQuote}
        displayAllQuotes={state.displayAllQuotes}
        editQuoteAuthenticity={editQuoteAuthenticity}
        setHighlightedQuote={setHighlightedQuote}
        toggleVisibility={toggleVisibility}
        deleteQuote={deleteQuote}


      />
      <QuoteForm
        createQuote={createQuote}
      />
    </div>
  )
}
