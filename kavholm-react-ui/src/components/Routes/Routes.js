import { BrowserRouter, Routes, Route } from "react-router-dom"
import {
  DashboardPage,
  Home,
  NotFound,
  ListingsPage,
  Login,
  ProfilePage,
  ProtectedRoute,
  Register,
  Navbar,
} from "components"

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard/*" element={<ProtectedRoute element={<DashboardPage />} />} />
          {/* <Route path="/listings/*" element={<ProtectedRoute element={<ListingsPage />} />} /> */}
          <Route path="/listings/*" element={<ListingsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/*" element={<ProfilePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
