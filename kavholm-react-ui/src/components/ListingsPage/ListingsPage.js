import { Routes, Route } from "react-router-dom"
import { ListingsDetail, ListingsHome, ListingsNew, NotFound } from "components"
import "./ListingsPage.css"

export default function ListingsPage({ listings, user, isAuthenticated, setBookings, addListing }) {
  return (
    <Routes>
      <Route path="/" element={<ListingsHome listings={listings} />} />
      <Route path="/new" element={<ListingsNew listings={listings} addListing={addListing} />} />
      <Route
        path="/:listingId"
        element={<ListingsDetail user={user} isAuthenticated={isAuthenticated} setBookings={setBookings} />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
