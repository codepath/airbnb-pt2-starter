import { Link } from "react-router-dom"
import { EmptyPrompt, ListingsGrid } from "components"
import "./DashboardHome.css"

export default function DashboardHome({ bookings, listings }) {
  const userBookedListingIds = bookings.filter((b) => Boolean(b)).map((b) => b.listingId)
  const userBookedListings = listings.filter((l) => userBookedListingIds.includes(l.id))

  return (
    <div className="DashboardHome">
      <div className="tabs">
        <h4 className="active">
          <Link to="/dashboard">Your Trips</Link>
        </h4>
        <h4>
          <Link to="/dashboard/host">Your Listings</Link>
        </h4>
      </div>
      <div className="trips">
        {userBookedListings?.length ? (
          <ListingsGrid listings={userBookedListings} />
        ) : (
          <EmptyPrompt>
            <p className="empty">You haven't booked any trips yet.</p>
          </EmptyPrompt>
        )}
      </div>
    </div>
  )
}
