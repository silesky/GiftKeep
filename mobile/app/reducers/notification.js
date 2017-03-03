  export const notification = (
    state = {
      notificationText: 'New Friend Created.',
      bottomNotificationVisibility: false
    }, action) => {
    switch (action.type) {
      case 'SET_NOTIFICATION_TEXT': {
        return { ...state, notificationText: action.payload.notificationText }
      }
      case 'BOTTOM_NOTIFICATION_VISIBILITY_TRUE': {
        return { ...state, bottomNotificationVisibility: true }
      }
      case 'BOTTOM_NOTIFICATION_VISIBILITY_FALSE': {
        return { ...state, bottomNotificationVisibility: false }
      }
      default:
        return state
    }
  }
