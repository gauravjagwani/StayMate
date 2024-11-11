import { useState, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { delay } from "./lib/utils";

import "./App.css";

const HomePage = lazy(() => import("./pages/HomePage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const CreateListing = lazy(() => import("./pages/CreateListing"));
const ListingDetails = lazy(() => import("./pages/ListingDetails"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const TripList = lazy(() => import("./pages/TripList"));
const WishList = lazy(() => import("./pages/WishList"));
const PropertyList = lazy(() => import("./pages/PropertyList"));
const ReservationList = lazy(() => import("./pages/ReservationList"));
import Loader from "./components/Loader";

import { useSelector } from "react-redux";
import PageNotFound from "./pages/PageNotFound";

function App() {
  const [count, setCount] = useState(0);
  const user = useSelector((state) => state?.user.user);

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/"
            element={user ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/listings/:listingId" element={<ListingDetails />} />
          <Route path="/listings/search/:search" element={<SearchPage />} />
          <Route path="/:userId/trips" element={<TripList />} />
          <Route path="/:userId/wishList" element={<WishList />} />
          <Route path="/:userId/properties" element={<PropertyList />} />
          <Route path="/:userId/reservations" element={<ReservationList />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
