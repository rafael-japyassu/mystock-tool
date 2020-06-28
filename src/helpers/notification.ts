import React from 'react'
import { store } from 'react-notifications-component'

export const notification = (title: string, message: string, type: 'success' | 'danger' | 'info' | 'default' | 'warning', timeDimiss = 3000) => {
  store.addNotification({
    title: title,
    message: message,
    type: type,
    insert: 'top',
    container: 'top-right',
    animationIn: ['animated', 'fadeIn'],
    animationOut: ['animated', 'fadeOut'],
    dismiss: {
      duration: timeDimiss
    }
  })
}
