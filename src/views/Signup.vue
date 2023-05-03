<template>
  <div>
    <form
      @submit.prevent="handleSubmit"
      class="pt-52 h-screen flex flex-col items-center w-full"
    >
      <img
        src="@/assets/logo.png"
        alt="logo"
        height="40"
        width="40"
        class="rounded-lg"
      />
      <h3 class="font-semibold text-3xl text-gray-900 mt-1 mb-3 sm:font-medium sm:text-2xl">
        Create an account
      </h3>
      <p class="text-base font-normal text-gray-600">
        Welcome! Please enter your details.
      </p>
      <div class="flex flex-col gap-5 mt-8">
        <label for="email" class="flex flex-col gap-1.5">
          <p class="text-sm font-medium text-gray-700">Email</p>
          <input
            class="w360 h-11 border border-solid bg-white border-gray-300 font-normal text-base text-gray-900 rounded-lg px-3.5 py-2.5 shadow-sm focus:border-purple-300 focus:border focus:shadow-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-200 disabled:background-gray-50 disabled:border-gray-300 disabled:text-gray-500 after:bg-white"
            type="email"
            id="email"
            v-model="email"
            placeholder="Enter your email"
            required
            :class="{ 'ring ring-red-200 border-red-300': emailError }"
          />
          <p v-if="emailError" class="text-red-500 text-sm font-medium">
            {{ emailError }}
          </p>
        </label>

        <label for="password" class="flex flex-col gap-1.5">
          <p class="text-sm font-medium text-gray-700">Password*</p>
          <input
            class="w360 h-11 border border-solid bg-white border-gray-300 font-normal text-base text-gray-900 rounded-lg px-3.5 py-2.5 shadow-sm focus:border-purple-300 focus:border focus:shadow-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-200 disabled:background-gray-50 disabled:border-gray-300 disabled:text-gray-500 after:bg-white"
            :class="{
              'border-red-300 ring ring-red-200 ': !isPasswordValid,
            }"
            type="password"
            id="password"
            v-model="password"
            placeholder="Enter your password"
          />
          <p
            class="text-sm text-red-500 mt-1"
            v-if="password && password.length < 6"
          >
            Password must be at least 6 characters.
          </p>
          <p
            class="text-sm text-red-500 w360"
            v-if="password && !isPasswordValid"
          >
            Password must contain at least one uppercase letter, one symbol, and
            one lowercase letter.
          </p>
        </label>

        <label for="confirmPassword" class="flex flex-col gap-1.5">
          <p class="text-sm font-medium text-gray-700">Confirm Password*</p>
          <input
            class="w360 h-11 border border-solid bg-white border-gray-300 font-normal text-base text-gray-900 rounded-lg px-3.5 py-2.5 shadow-sm focus:border-purple-300 focus:border focus:shadow-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-200 disabled:background-gray-50 disabled:border-gray-300 disabled:text-gray-500 after:bg-white"
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            placeholder="Confirm your password"
            :class="{
              'border-red-300 ring ring-red-200 ': confirmPassword && confirmPassword !== password,
            }"
          />
          <p
            class="text-sm text-red-500 w360"
            v-if="confirmPassword && confirmPassword !== password"
          >
            Passwords do not match.
          </p>
        </label>
        <div class="flex items-center justify-between mt-1">
          <label for="remember" class="block text-sm text-gray-900 font-medium">
            <input
              id="remember"
              name="remember"
              type="checkbox"
              class="mr-2 bg-purple-600 border-transparent rounded h-4 w-4"
            />
            Remember for 30 days
          </label>
          <p class="text-sm font-normal text-gray-600">
            <RouterLink
              to="/"
              class="text-purple-700 font-semibold"
              >Forgot password</RouterLink
            >
          </p>
        </div>
      </div>
      <div class="flex flex-col gap-4 mt-6">
        <PurpleButtonVue
          class="h-11 w360"
          type="submit"
          :disabled="
            !isPasswordValid || confirmPassword !== password 
          "
        >
          Sign in
        </PurpleButtonVue>
      </div>
      <div>
        <p class="text-sm font-normal text-gray-600 mt-8">
          Already have an account?
          <RouterLink to="/login" class="text-purple-700 font-semibold"
            >Log in</RouterLink
          >
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import PurpleButtonVue from "@/components/PurpleButtonVue.vue";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Signup",
  components: {
    PurpleButtonVue,
  },
  data() {
    return {
      email: "example@gmail.com",
      password: "Example123!",
      confirmPassword: "Example123!",
    };
  },
  methods: {
    handleSubmit() {
      // Call Vuex store action to sign up the user
      this.$store
        .dispatch("signup", {
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword,
        })
        .then(() => {
          // Redirect user to products page after successful signup
          this.$router.push("/products");
          this.$toast.success("You have successfully signed up!");
        })
        .catch((error) => {
          console.log("Error:", error);
          // Handle error, e.g. display error message to user
            this.$toast.error("Error signing up. Please try again.");
        });
    },
  },
  computed: {
    isPasswordValid() {
      const lowercase = /[a-z]/g.test(this.password);
      const uppercase = /[A-Z]/g.test(this.password);
      const symbol = /[!@#$%^&*]/g.test(this.password);
      const length = this.password.length >= 6;
      return lowercase && uppercase && symbol && length;
    },
    emailError() {
      if (
        this.email.length > 0 &&
        !this.email.includes("@") &&
        !this.email.includes(".")
      ) {
        return "Please enter a valid email address.";
      }
      return "";
    },
  },
};
</script>

<style scoped>
.w360 {
  width: 360px;
}

@media (max-width: 468px) {
  .w360 {
    width: 340px;
  }
}
</style>
