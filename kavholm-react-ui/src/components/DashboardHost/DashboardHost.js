import { Link } from "react-router-dom"
import { Button, EmptyPrompt, ListingsGrid } from "components"
import "./DashboardHost.css"

const NewListingButton = () => {
  return (
    <Link className="NewListingButton" to="/listings/new">
      <Button buttonType="primary">Create New Listing</Button>
    </Link>
  )
}

export default function DashboardHost({ user, listings }) {
  const userOwnedListings = listings.filter((l) => l.userId === user.id)

  return (
    <div className="DashboardHost">
      <div className="tabs">
        <h4 className="">
          <Link to="/dashboard">Your Trips</Link>
        </h4>
        <h4 className="active">
          <Link to="/dashboard/host">Your Listings</Link>
        </h4>
      </div>

      <div className="trips">
        {userOwnedListings?.length ? (
          <ListingsGrid listings={userOwnedListings}>
            <NewListingButton />
          </ListingsGrid>
        ) : (
          <EmptyPrompt message={"You don't own any listings yet."}>
            <p className="empty">You don't own any listings yet.</p>
            <NewListingButton />
          </EmptyPrompt>
        )}
      </div>
    </div>
  )
}
