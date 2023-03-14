<template>
  <div class="flex gap-4 items-center pt-10 xl:flex-col xl:pr-6">
    <button
      class="bg-yellow-400 text-white py-2 px-4 w-60 rounded-lg font-medium hover:bg-yellow-500 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-md flex items-center gap-2 justify-center xl:w-full"
      @click="addToCart"
    >
      <img
        src="@/assets/cart.png"
        alt="cart"
        class="h-7 w-7 transition duration-500 ease-in-out"
      />
      Add to Cart
    </button>
    <div class="quantity-container">
      <button class="quantity-button py-2 px-4" @click="decrementQuantity">
        -
      </button>
      <span class="quantity">{{ quantity }}</span>
      <button class="quantity-button py-2 px-4" @click="incrementQuantity">
        +
      </button>
    </div>
    <button
      class="bg-yellow-600 text-white py-2 px-4 w-60 rounded-lg font-medium  hover:bg-yellow-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-600 shadow-md xl:w-full"
      @click="buyProduct"
    >
      Buy
    </button>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      quantity: 1,
    };
  },
  methods: {
    buyProduct() {
      const cartItem = {
        id: this.product.id,
        name: this.product.title,
        price: this.product.price,
        quantity: this.quantity,
        stock: this.product.stock,
        image: this.product.thumbnail,
        discountPercentage: this.product.discountPercentage,
        amountSaved: this.amountSaved,
        originalPrice: this.originalPrice,
      };
      this.$store.dispatch("addToCart", cartItem);
      this.$toast.info(`Proceed to checkout to buy ${this.product.title} `);
      this.$router.push("/cart");
      // Perform some action to buy the product
      console.log(`Buying ${this.quantity} of product ${this.product.id}`);
    },

    addToCart() {
      const cartItem = {
        id: this.product.id,
        name: this.product.title,
        price: this.product.price,
        quantity: this.quantity,
        stock: this.product.stock,
        image: this.product.thumbnail,
        discountPercentage: this.product.discountPercentage,
        amountSaved: this.amountSaved,
        originalPrice: this.originalPrice,
      };
      this.$store.dispatch("addToCart", cartItem);
      this.$toast.success(
        `${this.quantity} ${this.product.title} added to cart`
      );
    },
    incrementQuantity() {
      if (this.quantity < this.product.stock) this.quantity++;
    },
    decrementQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
  },
  computed: {
    originalPrice() {
      return (
        this.product.price /
        (1 - this.product.discountPercentage / 100).toFixed(2).substring(0, 4)
      ).toFixed(2);
    },
    amountSaved() {
      const discountedPrice =
        this.product.price * (1 - this.product.discountPercentage / 100);
      return (this.product.price - discountedPrice).toFixed(2);
    },
  },
};
</script>

<style>
.cart-and-buy-button {
  display: flex;
  align-items: center;
}

.quantity-container {
  display: flex;
  align-items: center;
  margin-right: 16px;
}

.quantity-button {
  background-color: lightgray;
  color: black;
  font-weight: bold;
  padding: 4px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  padding: 0 8px;
}

.quantity {
  margin: 0 8px;
}
</style>
