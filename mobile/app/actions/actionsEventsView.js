export const selectEventsViewInput = (eventId, inputType) => {
  return {
    type: 'SELECT_EVENTS_VIEW_INPUT',
    payload: { eventId, inputType }
  }
}
export const resetEventsViewInput = () => ({ type: 'RESET_EVENTS_VIEW_INPUT' })
