import { Routes, Route } from "react-router-dom"
import { DashboardHome, DashboardHost, DashboardHero, NotFound } from "components"
import "./DashboardPage.css"

export default function DashboardPage({ user, bookings, listings }) {
  return (
    <div className="Dashboard">
      <DashboardHero user={user} />

      <Routes>
        <Route path="/" element={<DashboardHome user={user} bookings={bookings} listings={listings} />} />
        <Route path="/host" element={<DashboardHost user={user} bookings={bookings} listings={listings} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}
