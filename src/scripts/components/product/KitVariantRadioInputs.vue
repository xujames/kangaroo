<template lang="pug">
  option-select-buttons.product-form__options__option1(
    v-if="product"
    :product="product",
    option="option1",
    v-model="selected",
  )
</template>

<script>
import storeProduct from 'scripts/mixins/storeProduct.js'
import OptionSelectButtons from 'scripts/components/forms/OptionSelectButtons.vue'

export default {
  name: "KitVariantRadioInputs",
  mixins: [ storeProduct ],
  components: { OptionSelectButtons },
  props: {
    productHandle: String,
    popoverId: String
  },
  data () {
    return {
      selected: ''
    }
  },
  watch: {
    selected () {
      // HACK: only doing this to keep legacy code in sync
      $(`#${this.popoverId}`).find(`[data-value='${this.selected}']`).click();
    }
  }
}
</script>

<style lang="scss">
.ProductForm__Variants .ProductForm__Option {
  display: none;
}
</style>