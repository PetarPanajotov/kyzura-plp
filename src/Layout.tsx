import { Outlet } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { CartProvider } from "./contexts/CartContext";

export default function Layout() {
  return (
    <>
      <CartProvider>
        <Header />

        <main className="container">
          <Outlet />
        </main>

        <Footer />
      </CartProvider>
    </>
  );
}