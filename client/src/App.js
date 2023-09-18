import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "./components/header/Header";
import SmartBasket from "./components/smartBasket/SmartBasket";
import AddProduct from "./components/addProduct/AddProduct";
import useGlobalContext from "./hooks/useGlobalContext";

function App() {
  const { allProducts, results, isAdmin } = useGlobalContext();

  return (
    <div className="App">
      <Header />
      <SmartBasket heading="My Smart Basket" products={allProducts} />
      <SmartBasket heading="Search Results" products={results} />

      {isAdmin ? <AddProduct /> : null}
    </div>
  );
}

export default App;
