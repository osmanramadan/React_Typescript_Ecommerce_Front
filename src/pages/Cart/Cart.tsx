import { Container } from "react-bootstrap";
import { useAppSelector , useAppDispatch} from "../../store/hooks";
import styles from "./styles.module.css";
import CartSubtotal from "../../components/ecommerce/Cart/CartSubTotal";
import { ActGetCart } from "../../store/cart/CartSlice";
import { useCallback, useEffect } from "react";
import Loading from "../../components/message/Loading/Loading";
import { rmCartItem , changeCartItemQuantity } from "../../store/cart/CartSlice";
import CartItemList from "../../components/ecommerce/Cart/CartItemList";


const {
  page,
  header,
  title,
  subtitle
} = styles;

const CartPage = () => {

  const dispatch = useAppDispatch()

  const {items,productsFullData,loading,error}= useAppSelector((state) => state.cart); 
  
  const totalPrice = productsFullData && productsFullData.length > 0 ? productsFullData.reduce((total, product) => {
  const quantity = items[product.id] ?? 0;

  return total + product.price * quantity;
  }, 0):0;

  const products = productsFullData.length > 0 ? productsFullData.map((product)=>({
      ...product,
      quantity:items[product.id]
  })):[]




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

      <CartItemList products={products} rmCartItem={rmItemFromCart} changeQuantity={changeQuantity}/>

      <CartSubtotal totalPrice={totalPrice}/>
      </Loading>

    </Container>
  );
};

export default CartPage;