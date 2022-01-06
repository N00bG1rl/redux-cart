import { uiActions } from './ui-slice'
import { cartActions } from './cart-slice'

// Firebase database
const url =
  'https://redux-5378a-default-rtdb.europe-west1.firebasedatabase.app/cart.json'

export const fetchCartData = () => {
  return async dispatch => {
    const fetchData = async () => {
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error('Data not found')
      }

      const data = await response.json()
      return data
    }

    try {
      const cartData = await fetchData()
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      )
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error',
          message: 'Failed',
        })
      )
    }
  }
}

export const sendCartData = cart => {
  return async dispatch => {
    dispatch(
      uiActions.showNotification({
        status: 'Pending',
        title: 'Sending',
        message: 'Sending cart data',
      })
    )

    const sendRequest = async () => {
      const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify({
          items: cart.items,
          totalQuantity: cart.totalQuantity,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed')
      }
    }

    try {
      await sendRequest()

      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success',
          message: 'Successfully sent',
        })
      )
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error',
          message: 'Failed',
        })
      )
    }
  }
}
