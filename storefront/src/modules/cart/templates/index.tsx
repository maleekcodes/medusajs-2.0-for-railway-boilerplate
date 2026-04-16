import ItemsTemplate from "./items"
import Summary from "./summary"
import EmptyCartMessage from "../components/empty-cart-message"
import SignInPrompt from "../components/sign-in-prompt"
import { Container } from "@modules/common/components/xyz/Container"
import { HttpTypes } from "@medusajs/types"

const CartTemplate = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  const count = cart?.items?.length ?? 0

  return (
    <div className="pt-28 pb-24 bg-white text-deepBlack min-h-screen">
      <Container data-testid="cart-container">
        {count > 0 ? (
          <>
            <div className="mb-10 md:mb-12">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
                CART
              </h1>
              <span className="text-neutral-500 font-mono text-sm">
                {count} {count === 1 ? "item" : "items"}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
              <div className="flex flex-col gap-10 lg:col-span-2">
                {!customer ? <SignInPrompt /> : null}
                <ItemsTemplate items={cart?.items} />
              </div>
              <div className="lg:col-span-1">
                {cart && cart.region ? (
                  <Summary cart={cart as HttpTypes.StoreCart & { promotions?: HttpTypes.StorePromotion[] }} />
                ) : null}
              </div>
            </div>
          </>
        ) : (
          <EmptyCartMessage />
        )}
      </Container>
    </div>
  )
}

export default CartTemplate
