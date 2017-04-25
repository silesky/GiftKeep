/*
  selectedEventsViewInput: {eventId: null, inputType: 'eventName, eventDate'}
  */
const initialState = {
  selectedIdFromEventsView: null,
  selectedEventsViewInput: null,
}

export const eventsView = (state = initialState, action) => {
  switch (action.type) {
    case 'RESET_EVENTS_VIEW_INPUT': {
      return initialState
    }
    case 'SELECT_EVENTS_VIEW_INPUT': {
      return {
        ...state,
        selectedEventsViewInput: {
          eventId: action.payload.eventId,
          inputType: action.payload.inputType,
        },
      }
    }
    default: {
      return state
    }
  }
}
