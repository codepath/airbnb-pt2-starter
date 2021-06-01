import { BrowserRouter, Routes, Route } from "react-router-dom"
import { DashboardPage, Home, NotFound, ListingsPage, Login, ProfilePage, Register, Navbar } from "components"

export default function AppRoutes({
  user,
  setUser,
  listings,
  error,
  addListing,
  bookings,
  setBookings,
  logoutUser,
  bookingsForUserOwnedListings,
  isAuthenticated,
}) {
  return (
    <BrowserRouter>
      <Navbar user={user} error={error} isAuthenticated={isAuthenticated} logoutUser={logoutUser} />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard/*" element={<DashboardPage user={user} bookings={bookings} listings={listings} />} />
          <Route
            path="/listings/*"
            element={
              <ListingsPage
                setBookings={setBookings}
                listings={listings}
                user={user}
                error={error}
                addListing={addListing}
                isAuthenticated={isAuthenticated}
                bookingsForUserOwnedListings={bookingsForUserOwnedListings}
              />
            }
          />
          <Route path="/login" element={<Login user={user} setUser={setUser} />} />
          <Route path="/register" element={<Register user={user} setUser={setUser} />} />
          <Route path="/profile/*" element={<ProfilePage user={user} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
