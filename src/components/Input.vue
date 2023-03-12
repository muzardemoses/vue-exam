<template>
  <input
    class="w360 h-11 border border-solid bg-white border-gray-300 font-normal text-base text-gray-900 rounded-lg px-3.5 py-2.5 shadow-sm focus:border-purple-300 focus:border focus:shadow-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-200 disabled:background-gray-50 disabled:border-gray-300 disabled:text-gray-500 after:bg-white"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    :value="modelValue"
    :required="required"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script>
export default {
  //eslint-disable-next-line vue/multi-word-component-names
  name: "Input",
  props: {
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: String,
      default: "",
    },
  },
};
</script>
