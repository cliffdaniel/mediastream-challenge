import React, { useState } from 'react'
import './assets/styles.css'

export default function Exercise01 () {
  const movies = [
    {
      id: 1,
      name: 'Star Wars',
      price: 20
    },
    {
      id: 2,
      name: 'Minions',
      price: 25
    },
    {
      id: 3,
      name: 'Fast and Furious',
      price: 10
    },
    {
      id: 4,
      name: 'The Lord of the Rings',
      price: 5
    }
  ]

  const discountRules = [
    {
      m: [3, 2],
      discount: 0.25
    },
    {
      m: [2, 4, 1],
      discount: 0.5
    },
    {
      m: [4, 2],
      discount: 0.1
    }
  ]

  const [cart, setCart] = useState([
    {
      id: 1,
      name: 'Star Wars',
      price: 20,
      quantity: 2
    }
  ])

  const addToCart = (movie) => {
    const existingItem = cart.find((item) => item.id === movie.id)

    if (existingItem) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === movie.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      )
    } else {
      setCart((prevCart) => [...prevCart, { ...movie, quantity: 1 }])
    }
  }

  const updateQuantity = (movieId, newQuantity) => {
    if (newQuantity <= 0) {
      setCart((prevCart) => prevCart.filter((item) => item.id !== movieId))
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === movieId ? { ...item, quantity: newQuantity } : item
        )
      )
    }
  }

  const getTotal = () => {
    const movieIdSet = new Set(cart.map(item => item.id))
    let total = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )

    discountRules.forEach((rule) => {
      if (rule.m.every((movieId) => movieIdSet.has(movieId))) {
        total -= total * rule.discount
      }
    })

    return total
  }

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map((o) => (
            <li className="movies__list-card" key={o.name}>
              <ul>
                <li>ID: {o.id}</li>
                <li>Name: {o.name}</li>
                <li>Price: ${o.price}</li>
              </ul>
              <button onClick={() => addToCart(o)}>Add to cart</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cart.map((x) => (
            <li className="movies__cart-card" key={x.name}>
              <ul>
                <li>ID: {x.id}</li>
                <li>Name: {x.name}</li>
                <li>Price: ${x.price}</li>
              </ul>
              <div className="movies__cart-card-quantity">
                <button onClick={() => updateQuantity(x.id, x.quantity - 1)}>
                  -
                </button>
                <span>{x.quantity}</span>
                <button onClick={() => updateQuantity(x.id, x.quantity + 1)}>
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="movies__cart-total">
          <p>Total: ${getTotal()}</p>
        </div>
      </div>
    </section>
  )
}
