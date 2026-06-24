import { memo } from "react";
import type { IProduct } from "../../../types/product";
import styles from "./styles.module.css";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";




const {
  empty
} = styles;

interface CartItemListProps {
  products: IProduct[];
  rmCartItem:(num:number)=>void
  changeQuantity: (id: number, type: "inc" | "dec") => void;

}



const CartItemList = memo(({ products,rmCartItem,changeQuantity}: CartItemListProps) => {

    
   console.log("from cart item List_",'**************')

    return (
      <div>
        {products&& products.length > 0 ? products.map((product) => (
        <CartItem
        key={product.id}
        product={product}
        quantityValue={product.quantity!}
        rmCartItem={rmCartItem}
        changeQuantity={changeQuantity}

        />
      )):(
        <div className={empty}>
          <p>Your cart is empty.</p>
          <Link to="/products">
            Continue Shopping
          </Link>
        </div>
      )}
          
      </div>
    );
  })

export default CartItemList;