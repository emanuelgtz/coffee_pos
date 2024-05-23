import { useContext, useEffect, useState } from "react";
import chocolate_cake from "../assets/chocolate_cake.jpg";
import { Context } from "../context/Context";


function Cart({idEmployee}) {

  const date = new Date().toISOString().slice(0, 10);

  const { item } = useContext(Context);

  const [cart, setCart] = useState([]);

  const [orderCompleted, setOrderCompleted] = useState(false);


  useEffect(() => {

    if (item) {
      const existingItem = cart.find(
        (cartItem) => cartItem.product.idProduct === item.idProduct
      );

      if (existingItem) {
        setCart(
          cart.map((cartItem) =>
            cartItem.product.idProduct === item.idProduct
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          )
        );
      } else {
        setCart([...cart, { product: item, quantity: 1 }]);
      }
    }
  }, [item]);

  useEffect(() => {
    if(orderCompleted) {
      const timeOut = setTimeout(() => {
        setOrderCompleted(false);
      }, 2500);

      return () => clearTimeout(timeOut)
    }
  }, [orderCompleted])

  const handleOrder = async (e) => {
    e.preventDefault();

    try {

      const purchaseOrder = {
        purchase_date: date,
        employee_id_fk: { idEmployee },
        quantity: getQuantity(), 
        products: cart.map(item => ({ idProduct: item.product.idProduct }))
      };

      const response = await fetch('http://localhost:8080/login/create-purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }, 
        body: JSON.stringify(purchaseOrder)
      })

      setCart([]);
      setOrderCompleted(true);

      if(!response.ok) {
        throw new Error('Response was not work')
      }

    } catch (error) {
      throw new Error('Error from the catch')
    }
  }


  const updateQuantity = (productId, newQuantity) => {
    setCart(
      cart.map((product) => product.product.idProduct === productId
        ? {
          ...product, quantity: Math.max(0, newQuantity)
        } : product
      )
    )
  }

  const removeProduct = (productId) => {
    setCart(
      cart.filter((item) => item.product.idProduct !== productId)
    );
  };

  const getQuantity = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  return (
    <div className="h-full w-full overflow-auto 
    rounded-lg shadow-2xl bg-white">
      <h1 className="text-center text-lg font-mono p-1">Cart</h1>

      {
        cart.length === 0
          ? (<p className="text-white bg-yellow-500 
          shadow-yellow-400/50 font-medium rounded-lg text-sm px-2 py-1 mx-2 
          text-center mb-3">empty cart</p>)
          : (
            <div className=""> {
              cart.map((item) => {
                const { product, quantity } = item;
                return (
                  <div key={product.idProduct} className="flex flex-col items-center ">
                    <img src={chocolate_cake} className="rounded-lg w-48 h-48" />
                    <p className="font-mono text-center">{product.productName}</p>
                    <p className="font-mono text-start">Price: {product.productPrice}</p>
                    <p className="font-mono text-start">Size: {product.productSize}</p>

                    <div className="flex justify-around">
                      <button
                        type="button"
                        className="text-white bg-blue-500 
                      shadow-blue-400/50 font-medium rounded-lg text-xl px-2 py-1 mx-2 
                      text-center mb-3"
                        onClick={() => updateQuantity(product.idProduct, quantity - 1)}
                      >
                        -
                      </button>

                      <input
                        type="text"
                        className="text-center w-10 h-10 rounded-lg text-lg border 
                      border-gray-300 shadow-sm focus:outline-none focus:ring-2 
                      focus:ring-blue-600 focus:ring-opacity-50"
                        value={quantity}
                        onChange={(event) => updateQuantity(product.idProduct, event.target.value)}
                      />

                      <button
                        type="button"
                        className="text-white bg-blue-500
                      shadow-blue-400/50 font-medium rounded-lg text-xl px-2 py-1 mx-2 
                      text-center mb-3"
                        onClick={() => updateQuantity(product.idProduct, quantity + 1)}
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      className="text-white bg-red-500
                    shadow-red-400/50 font-medium rounded-lg text-sm 
                    px-7 py-1 mx-2 text-center mb-3"
                      onClick={() => removeProduct(product.idProduct)}
                    >
                      Remove
                    </button>
                  </div>)
              })}

              <div className="flex flex-col justify-center items-center">

                <p className="font-mono text-center rounded-lg border-2 border-gray-200 px-2">
                  Items: {getQuantity()}
                </p>

                <button
                  onClick={handleOrder}
                  className="font-semibold rounded-lg 
                  shadow-lg shadow-blue-500/50 text-white py-2 my-2 w-1/2 
                  transition ease-in-out delay-150 
                  bg-blue-500 hover:-translate-y-1 hover:scale-110
                  hover:bg-indigo-500 duration-300 ">
                  Buy order
                </button>

              </div>

            </div>
          
          )
      }
      {
          orderCompleted && <p className="text-white bg-green-500 
          shadow-green-400/50 font-medium rounded-lg text-lg px-2 py-1 mx-2 
          text-center mb-3">order has been sent</p> 
      }
    </div>

  )
}

export default Cart;