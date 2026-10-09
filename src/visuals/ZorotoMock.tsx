const MENU = [
  { name: 'Garden salad', price: 180 },
  { name: 'Paneer roll', price: 140 },
  { name: 'Veg noodles', price: 210 },
  { name: 'Chocolate cake', price: 160 },
]
const ORDERS = [
  { id: '#A24', items: 3, status: 'Food processing' },
  { id: '#A23', items: 1, status: 'Out for delivery' },
  { id: '#A22', items: 2, status: 'Delivered' },
]

/** A drawn (not screenshotted) walkthrough of the app's three surfaces. */
export default function ZorotoMock() {
  return (
    <div className="zm" aria-hidden="true">
      <div className="zm__pane">
        <p className="zm__head">
          <b>Zoroto</b> <span>Menu</span>
        </p>
        <div className="zm__chips">
          <span className="is-on">All</span>
          <span>Salad</span>
          <span>Rolls</span>
          <span>Cake</span>
        </div>
        <div className="zm__grid">
          {MENU.map((m, i) => (
            <div key={m.name} className="zm__item">
              <div className={`zm__img zm__img--${i}`} />
              <p>{m.name}</p>
              <p className="zm__row">
                <span>₹{m.price}</span>
                <span className="zm__add">{i === 1 ? '1' : '+'}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="zm__pane">
        <p className="zm__head">
          <b>Cart</b> <span>2 items</span>
        </p>
        {MENU.slice(0, 2).map((m) => (
          <p key={m.name} className="zm__line">
            <span>{m.name}</span>
            <span>₹{m.price}</span>
          </p>
        ))}
        <p className="zm__line zm__line--muted">
          <span>Delivery</span>
          <span>₹40</span>
        </p>
        <p className="zm__line zm__line--total">
          <span>Total</span>
          <span>₹360</span>
        </p>
        <span className="zm__btn">Proceed to checkout</span>
        <p className="zm__note">JWT-protected · POST /api/order/place</p>
      </div>

      <div className="zm__pane zm__pane--admin">
        <p className="zm__head">
          <b>Admin</b> <span>Orders</span>
        </p>
        {ORDERS.map((o) => (
          <div key={o.id} className="zm__order">
            <span>{o.id}</span>
            <span>{o.items} items</span>
            <span className="zm__status">{o.status}</span>
          </div>
        ))}
        <p className="zm__note">POST /api/order/status</p>
      </div>
    </div>
  )
}
