import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { Button, BookingModal, NotFound } from "components"
import apiClient from "services/apiClient"
import { formatPrice } from "utils/format"
import { getListingPrice, getMarketplaceFees } from "utils/calculations"
import person from "assets/person.svg"
import share from "assets/share.svg"
import stars from "assets/stars.svg"
import save from "assets/save.svg"
import "./ListingsDetail.css"

export default function ListingsDetail({ user, isAuthenticated, setBookings }) {
  const { listingId } = useParams()
  const [hasFetched, setHasFetched] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState(null)
  const [listing, setListing] = useState({})
  const [isBooking, setIsBooking] = useState(false)

  useEffect(() => {
    const fetchListing = async () => {
      setIsFetching(true)
      setHasFetched(false)

      const { data, error } = await apiClient.fetchListingById(listingId)
      if (error) setError(error)
      if (data?.listing) {
        setListing(data.listing)
      }

      setIsFetching(false)
      setHasFetched(true)
    }

    if (isAuthenticated) {
      fetchListing()
    }
  }, [listingId, isAuthenticated])

  const handleBookingStartClick = () => {
    setIsBooking(true)
  }

  if (isFetching) return null

  if (hasFetched && !listing?.price) {
    return <NotFound message={"No listing found."} />
  }

  return (
    <div className="ListingsDetail">
      <BookingModal
        user={user}
        isOpen={isBooking}
        toggleModal={() => setIsBooking(false)}
        listing={listing}
        setBookings={setBookings}
      />

      <div className="content">
        <p className={`error ${error && "show"}`}>{error && `Error: ${error}`}</p>

        <div className="row">
          <div className="media">
            <img src={listing.imageUrl} className="image-main" alt="listing" />

            <div className="row">
              <div className="">
                {listing.imageUrl2 ? <img src={listing.imageUrl2} className="image-small" alt="listing-small" /> : null}
              </div>
              <div className="">
                {listing.imageUrl3 ? <img src={listing.imageUrl3} className="image-small" alt="listing-small" /> : null}
              </div>
            </div>

            <div className="image-footer">
              <div className="widgets">
                <div>
                  <img src={share} alt="share" /> Share
                </div>
                <div>
                  <img src={save} alt="save" /> Save
                </div>
              </div>
            </div>
          </div>

          <div className="info">
            <div className="booking-info">
              <h1>{listing.title}</h1>

              <div className="priceInfo">
                <img className="stars" src={stars} alt="stars" />
              </div>
              <div className="priceInfo">
                <span className="price">{`USD ${formatPrice(listing.totalAmount * 0.01)}`}</span>
              </div>

              <p className="supporting-text">{listing?.description}</p>

              <hr />
              <ul className="lineItems">
                <li>
                  Listing Price
                  <span className="lineItemPrice">{`USD ${formatPrice(getListingPrice(listing))}`}</span>
                </li>
                <li>
                  Marketplace Fees
                  <span className="lineItemPrice">{`USD ${formatPrice(getMarketplaceFees(listing))}`}</span>
                </li>
              </ul>
              <hr />
              <ul className="lineItems lineItemsTotal">
                <li>
                  Total <span className="lineItemPrice">{`USD ${formatPrice(listing.totalAmount * 0.01)}`}</span>
                </li>
              </ul>
            </div>
            {isAuthenticated && (
              <Button
                className="btn btn-primary btn-book"
                onClick={handleBookingStartClick}
                isDisabled={!isAuthenticated}
              >
                Book now
              </Button>
            )}

            {!isAuthenticated && (
              <Link to="/login">
                <button className="btn btn-primary btn-book">Sign in to book</button>
              </Link>
            )}

            {listing?.username && (
              <div className="host">
                <img src={listing.hostAvatar || person} width="36" className="mr-3" alt={"author-avatar"} />
                <div className="media-body">
                  <p>Listed by {listing.username}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
