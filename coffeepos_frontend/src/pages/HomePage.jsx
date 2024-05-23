import { useContext, useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import chocolate_cake from "../assets/chocolate_cake.jpg";
import cappuccino from "../assets/cappuccino.jpg";
import { Context } from "../context/Context";
import Cart from "../components/Cart";

function HomePage() {

  const [products, setProducts] = useState([]);

  const [idEmployee, setIdEmployee] = useState();

  const { data } = useContext(Context);
  const {user, setUser} = useContext(Context);
  const { setItem } = useContext(Context);

  let email = localStorage.getItem('userEmail');

  useEffect(() => {

    const fetchData = async () => {
      try {
        const resp =
          await fetch(`http://localhost:8080/login/product`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });

        const json = await resp.json();
        setProducts(json);

        console.log(json)

      } catch (error) {
        console.log('There was an error!');
      }

    }
    fetchData();
  }, []);
  
  useEffect(() => {

    const fetchData = async () => {
      try {
        const resp =
          await fetch(`http://localhost:8080/login/userinfo/${email}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });

        const json = await resp.json();
        setIdEmployee(json.idEmployee);
        setUser(json)

      } catch (error) {
        console.log('There was an error!');
      }

    }
    fetchData();
  }, [email]);


  return (
    <div className="flex h-dvh w-dvw p-1 overflow-hidden
    bg-gradient-to-r from-cyan-500 to-blue-500">

      <div className="h-full w-full overflow-auto mr-1
      shadow-2xl rounded-lg bg-white">

        <SearchBar />

        <div className=" flex flex-wrap justify-around">
          {!data ?
            products.map((product) => (

              <li className="list-none"
                key={product.idProduct}>
                <img src={product.idProduct <= 5 ? chocolate_cake : null}
                  className="rounded-lg w-72"
                />
                <img src={product.idProduct > 5 ? cappuccino : null}
                  className="rounded-lg w-72"
                />

                <p className="font-mono text-center">
                  {product.productName}</p>
                <p className="font-mono text-start">Price:
                  {product.productPrice}</p>
                <p className="font-mono text-start">Size:
                  {product.productSize}</p>

                <button
                  onClick={() => setItem(product)}
                  className="font-semibold rounded-lg 
                  shadow-lg shadow-blue-500/50 	
                  text-white py-2 my-4 w-full
                  transition ease-in-out delay-150 
                  bg-blue-500 hover:-translate-y-1 
                  hover:scale-110 hover:bg-indigo-500 
                  duration-300">Add Cart
                </button>
              </li>

            )) :
            products.filter((item) =>
              item.productName.toLowerCase().includes(data.trim().toLowerCase()))
              .map((filteredProduct) => (
                <li className="list-none" key={filteredProduct.idProduct}>
                  <img
                    src={filteredProduct.idProduct <= 5 ? chocolate_cake : null}
                    className="rounded-lg w-72"
                  />
                  <img
                    src={filteredProduct.idProduct > 5 ? cappuccino : null}
                    className="rounded-lg w-72"
                  />
                  <p className="font-mono text-center"> {filteredProduct.productName}</p>
                  <p className="font-mono text-start">Price: {filteredProduct.productPrice}</p>
                  <p className="font-mono text-start">Size: {filteredProduct.productSize}</p>

                  <button
                    onClick={() => setItem(filteredProduct)}
                    className="font-semibold rounded-lg 
                        shadow-lg shadow-blue-500/50 text-white py-2 my-4 w-full 
                        transition ease-in-out delay-150 bg-blue-500 
                        hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
                  >
                    Add Cart
                  </button>
                </li>
              ))
          }
        </div>
      </div>

      <div className=" w-1/4 shrink-0">
        <Cart idEmployee={idEmployee}/>
      </div>

    </div>
  )
}

export default HomePage;