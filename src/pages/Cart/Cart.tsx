import { Container } from "react-bootstrap";
import { useAppSelector , useAppDispatch} from "../../store/hooks";
import styles from "./styles.module.css";
import CartItem from "../../components/ecommerce/Cart/CartItem";
import CartSubtotal from "../../components/ecommerce/Cart/CartSubTotal";
import { ActGetCart } from "../../store/cart/CartSlice";
import { useCallback, useEffect } from "react";
import Loading from "../../components/message/Loading/Loading";
import { Link } from "react-router-dom";
import { rmCartItem , changeCartItemQuantity } from "../../store/cart/CartSlice";


const {
  page,
  header,
  title,
  subtitle,
  empty
} = styles;

const CartPage = () => {

  const dispatch = useAppDispatch()

  const {items,productsFullData,loading,error}= useAppSelector((state) => state.cart); 
  
  const totalPrice = productsFullData&&productsFullData.length > 0 ? productsFullData.reduce((total, product) => {
  const quantity = items[product.id] ?? 0;

  return total + product.price * quantity;
  }, 0):0;




  const rmItemFromCart = useCallback((id:number)=>{
       dispatch(rmCartItem({id:id}))
   } ,[dispatch])

   const changeQuantity = useCallback((id: number, type: "inc" | "dec") => {
    dispatch(changeCartItemQuantity({ id, type }));
   },[dispatch])

  useEffect(()=>{
    dispatch(ActGetCart())

  },[dispatch])


  
    console.log('rendering',"from homepage cart ########################################")


  return (
    <Container className={page}>
      <Loading error={error} status={loading}>

      <div className={header}>
        <h1 className={title}>Shopping Cart</h1>
        <p className={subtitle}>
          Review your items before checkout
        </p>
      </div>

      {productsFullData && productsFullData.length > 0 ? productsFullData.map((product) => (
        <CartItem
        key={product.id}
        product={product}
        quantityValue={items[product.id]}
        rmCartItem={rmItemFromCart}
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

      <CartSubtotal totalPrice={totalPrice}/>
      </Loading>

    </Container>
  );
};

export default CartPage;