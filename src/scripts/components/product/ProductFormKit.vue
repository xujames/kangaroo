
<template lang="pug">
  form.product-form.product-form--kit(@submit.prevent="addToCart", novalidate)
    .product-form__options
      option-select-buttons.product-form__options__option1(
        v-if="hasVariants",
        label="Size",
        :product="product",
        option="option1",
        v-model="selectedOption1",
      )
      option-select-dropdown.product-form__options__option2(
        v-if="hasComplexVariants",
        label="Color",
        :product="product",
        option="option2", 
        v-model="selectedOption2"
      )
    .product-form__frequency(v-if="hasSubscription")
      .product-form__frequency__single
        radio-button(:value="purchaseTypeSingle", v-model="selectedPurchaseType")
          template #[strong {{ currentPrice | money }}] One-time purchase
      .product-form__frequency__recurring
        radio-button(:value="purchaseTypeRecurring", v-model="selectedPurchaseType", @click.native="selectRecurring")
          template 
            strong {{ subscriptionPrice | money }} 
            | Subscribe and deliver every&nbsp;
            .product-form__frequency__duration-wrapper
              select.product-form__frequency__duration(v-model="selectedFrequency", @click.capture)
                option(v-for="frequency in subscriptionFrequencies", :value="frequency", :key="frequency") {{ frequency }} {{ subscriptionUnitType }}
              icon(name="chevron-down", size="9px")
    transition(name="fade")
      p.product-form__savings(v-if="subscriptionSavings > 0 && selectedPurchaseType === purchaseTypeRecurring") You are saving {{ subscriptionSavings | money }} by choosing a subscription.
    .product-form__atc
      submit-button(
        :label="buttonLabel",
        :disabled="isDisabled",
        :loading="adding"
        full
        secondary
      )
</template>

<script>
  import { mapState } from 'vuex'

  import RadioButton from 'scripts/components/forms/RadioInput.vue'
  import QuantityInput from 'scripts/components/forms/QuantityInput.vue'
  import OptionSelectDropdown from 'scripts/components/forms/OptionSelectDropdown.vue'
  import OptionSelectButtons from 'scripts/components/forms/OptionSelectButtons.vue'
  import SubmitButton from 'scripts/components/buttons/SubmitButton.vue'
  import Icon from 'scripts/components/basic/Icon.vue'

  export default {
    name: 'ProductForm',
    components: { RadioButton, QuantityInput, OptionSelectDropdown, OptionSelectButtons, SubmitButton, Icon },
    props: {
      product: Object
    },
    data () {
      const PURCHASE_TYPE_SINGLE = 'single'
      const PURCHASE_TYPE_RECURRING = 'recurring'

      return {
        quantity: 1,
        adding: false,
        selectedPurchaseType: PURCHASE_TYPE_SINGLE,
        purchaseTypeSingle: PURCHASE_TYPE_SINGLE,
        purchaseTypeRecurring: PURCHASE_TYPE_RECURRING,
        selectedFrequency: '',
        selectedOption1: '',
        selectedOption2: ''
      }
    },
    computed: {
      isDisabled () {
        return this.adding || !this.currentVariantIsAvailable
      },
      buttonLabel () {
        let { currentPrice, $options} = this
        return this.currentVariantIsAvailable ? `Add to Cart - ${$options.filters.money(currentPrice)}` : 'Sold Out'
      },
      // subscription data
      hasSubscription () {
        return Boolean(this.product.subscription)
      },
      isSubscriptionSelected () {
        return this.selectedPurchaseType === this.purchaseTypeRecurring
      },
      subscriptionFrequencies () {
        return this.hasSubscription ? this.product.subscription.shipping_interval_frequency.split(',') : []
      },
      subscriptionUnitType () {
        return this.hasSubscription ? this.product.subscription.shipping_interval_unit_type : ''
      },
      subscriptionDiscount () {
        return this.hasSubscription ? parseFloat(this.product.subscription.discount_percentage) / 100 : 0
      },
      subscriptionId () {
        return this.hasSubscription ? this.product.subscription.subscription_id : ''
      },
      subscriptionPrice () {
        return Math.round(this.currentPrice - this.currentPrice * this.subscriptionDiscount)
      },
      subscriptionSavings () {
        return this.currentPrice - this.subscriptionPrice
      },
      // variant data
      hasVariants () {
        return this.product ? this.product.variants.length > 1 : false
      },
      hasComplexVariants () {
        return this.product ? this.product.options.length > 1 : false
      },
      currentVariant () {
        let currentlySelectedVariant

        if (this.hasVariants) {
          currentlySelectedVariant = this.product.variants.find(variant => 
            variant.option1 === this.selectedOption1)
        } else if (this.hasComplexVariants) {
          currentlySelectedVariant = this.product.variants.find(variant => 
            variant.option1 === this.selectedOption1 && variant.option2 === this.selectedOption2)
        }

        if (currentlySelectedVariant) {
          this.$store.dispatch('pdp/update', currentlySelectedVariant)
          return currentlySelectedVariant
        }

        // if we're still here... return the first variant
        this.$store.dispatch('pdp/update', this.product.variants[0])
        return this.product.variants[0]
      },
      currentVariantIsAvailable () {
        if (this.currentVariant.inventory_management === '' || this.currentVariant.inventory_policy === 'continue') {
          return true
        }

        return this.remainingQuantity > 0
      },
      remainingQuantity () {
        return this.currentVariant.remaining_quantity
      },
      currentPrice () {
        return this.currentVariant.price
      }
    },
    mounted () {
      if (this.hasSubscription) {
        this.selectedFrequency = this.subscriptionFrequencies[0]
      }
    },
    methods: {
      addToCart () {
        let addProduct = {
          id: this.currentVariant.id,
          quantity: this.quantity 
        }
        this.adding = true

        if (this.isSubscriptionSelected) {
          addProduct.id = this.currentVariant.subscription_variant_id
          addProduct.properties = {
            shipping_interval_frequency: String(this.selectedFrequency),
            shipping_interval_unit_type: this.subscriptionUnitType,
            subscription_id: this.subscriptionId
          }
        }
        this.$store.dispatch('cart/addItem', addProduct)
          .then(() => window.location.href="/cart")
          .catch(error => this.$store.dispatch('toast/send', { text: error, type: 'error' }))
          .then(() => this.adding = false)
      },
      selectRecurring () {
        this.selectedPurchaseType = this.purchaseTypeRecurring
      }
    }
  }
</script>

<style lang="scss">
.product-form--kit {
  
}
</style>