import { BrowserRouter as Router, Routes, Route } from "react-router";
import CheckoutPage from "@/react-app/pages/Checkout";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CheckoutPage />} />
      </Routes>
    </Router>
  );
}
