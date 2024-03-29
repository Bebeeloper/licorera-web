import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../../../store/modules/cart/cart.slice";
import { selectAllCart, selectCartProducts } from "../../../../store/modules/cart/selectors/cart.selector";
import { Product } from "../../../exchangeProducts/types";


const useCartHook = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCartProducts);

  const getCart = () => {
    return cart;
  };

  const addToCart = (product: Product) => {
    const oldCart = cart.filter(item => item.id === product.id);
    if(oldCart.length > 0){
      return
    }
    const newCart = [...cart, product];
    dispatch(cartActions.setCartProducts(newCart))
  };

  const updateCartItem = (updatedProduct: Product) => {
    const updatedCart = cart.map(item => {
      if (item.id === updatedProduct.id) {
        return { ...item, quantity: updatedProduct.quantity };
      }
      return item;
    });
    dispatch(cartActions.setCartProducts(updatedCart));
  };

  const removeCartItem = (productId: number) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    dispatch(cartActions.setCartProducts(updatedCart))
  };

  return {
    getCart,
    addToCart,
    updateCartItem,
    removeCartItem
  };
};

export default useCartHook;

