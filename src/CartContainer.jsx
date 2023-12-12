import CartItem from './CartItem';
import {useGlobalContext} from "./context.jsx";

const CartContainer = () => {
    const {state, clear,totalAmount} = useGlobalContext();
    const cartArray = [...state.cart];
    if (cartArray.length === 0) {
        return (
            <section className='cart'>
                {/* cart header */}
                <header>
                    <h2>your bag</h2>
                    <h4 className='empty-cart'>is currently empty</h4>
                </header>
            </section>
        );
    }
    return (
        <section className='cart'>
            {/* cart header */}
            <header>
                <h2>your bag</h2>
            </header>
            {/* cart items */}
            <div>
                {cartArray.map(([id, cartItem]) => {
                    return <CartItem key={id} {...cartItem} />;
                })}
            </div>
            {/* cart footer */}
            <footer>
                <hr/>
                <div>
                    <h5 className='cart-total'>
                        total <span>${totalAmount}</span>
                    </h5>
                </div>
                <button
                    className='btn btn-hipster'
                    onClick={clear}
                >
                    clear cart
                </button>
            </footer>
        </section>
    );
};

export default CartContainer;
