import { useState, useEffect } from "react"
import { Routes as AppRoutes } from "components"
// import { AuthContextProvider, useAuthContext } from "contexts/auth"
// import { ListingsContextProvider, useListingsContext } from "contexts/listings"
// import { BookingsContextProvider, useBookingsContext } from "contexts/bookings"
import apiClient from "services/apiClient"

import "./App.css"

const App = () => {
  const [user, setUser] = useState({})
  const [initialized, setInitialized] = useState(false)
  const [listings, setListings] = useState([])
  const [bookings, setBookings] = useState([])
  const [bookingsForUserOwnedListings, setBookingsForUserOwnedListings] = useState([])
  const [error, setError] = useState(null)

  const isAuthenticated = Boolean(initialized && user?.username)

  useEffect(() => {
    const initApp = async () => {
      const { data } = await apiClient.fetchUserFromToken()
      if (data) setUser(data.user)

      const userBookingsRes = await apiClient.fetchBookingsForUser()
      if (userBookingsRes?.error) setError(userBookingsRes.error)
      if (userBookingsRes?.data?.bookings) {
        setBookings(userBookingsRes.data.bookings)
      }

      const bookingsForUserListingsRes = await apiClient.fetchAllBookingsForUserOwnedListings()
      if (bookingsForUserListingsRes?.error) setError(bookingsForUserListingsRes.error)
      if (bookingsForUserListingsRes?.data?.bookings) {
        setBookingsForUserOwnedListings(bookingsForUserListingsRes.data.bookings)
      }

      setInitialized(true)
    }

    const token = localStorage.getItem("kavholm_token")
    if (token) {
      apiClient.setToken(token)
      initApp()
    } else {
      setInitialized(true)
    }
  }, [isAuthenticated])

  useEffect(() => {
    const fetchListings = async () => {
      const { data, error } = await apiClient.fetchListings()
      if (error) setError(error)
      if (data?.listings) {
        setListings(data.listings)
      }
    }

    fetchListings()
  }, [])

  const addListing = (newListing) => {
    setListings((oldListings) => [newListing, ...oldListings])
  }

  const clearAppState = () => {
    setUser({})
    setBookings([])
    setBookingsForUserOwnedListings([])
    setError(null)
  }

  const logoutUser = async () => {
    await apiClient.logoutUser()
    clearAppState()
  }

  return (
    <div className="App">
      <AppRoutes
        user={user}
        setUser={setUser}
        error={error}
        listings={listings}
        bookings={bookings}
        setBookings={setBookings}
        logoutUser={logoutUser}
        addListing={addListing}
        isAuthenticated={isAuthenticated}
        bookingsForUserOwnedListings={bookingsForUserOwnedListings}
      />
    </div>
  )
}

export default App

// const AppContainer = () => {
//   return (
//     <AuthContextProvider>
//       <ListingsContextProvider>
//         <BookingsContextProvider>
//           <App />
//         </BookingsContextProvider>
//       </ListingsContextProvider>
//     </AuthContextProvider>
//   )
// }

// const App = () => {
//   const { handlers: authHandlers, setInitialized, isAuthenticated } = useAuthContext()
//   const { handlers: listingsHandlers } = useListingsContext()
//   const { handlers: bookingsHandlers } = useBookingsContext()

//   useEffect(() => {
//     const initApp = async () => {
//       console.log("Initializing app")
//       const token = localStorage.getItem("kavholm_token")
//       if (token) {
//         apiClient.setToken(token)
//         await authHandlers.fetchUserFromToken()
//         await bookingsHandlers.fetchBookingsForUser()
//         await bookingsHandlers.fetchAllBookingsForUserOwnedListings()
//       }

//       await listingsHandlers.fetchListings()

//       setInitialized(true)
//     }

//     initApp()
//   }, [authHandlers, listingsHandlers, bookingsHandlers, setInitialized, isAuthenticated])

//   return (
//     <div className="App">
//       <AppRoutes />
//     </div>
//   )
// }

// export default AppContainer
