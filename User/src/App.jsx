import { Routes, Route } from "react-router-dom";
import Home from "./Page/Home/Home";
import Flash from "./Page/Flash/Flash";
import Auth from "./Page/Auth/Auth";
import Item from "./Page/Item/Item";
import Group from "./Page/Group/Group";
import Cart from "./Page/Cart/Cart";
import Like from "./Page/Like/Like";
import Buynow from "./Page/BuyNow/Buynow";
import AddressForm from "./Component/AddressForm/AddressForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={< Flash/>} />
      <Route path="/home" element={< Home/>} />
      <Route path="/auth" element={< Auth/>} />
      <Route path="home/:product" element={< Item/>} />
      <Route path="home/category/:item" element={< Group/>} />
      <Route path="/cart" element={< Cart/>} />
      <Route path="/like" element={< Like/>} />
      <Route path="/buynow/:id" element={< Buynow/>} />
      <Route path="buynow/address" element={< AddressForm/>} />
    </Routes>
  );
}

export default App;
