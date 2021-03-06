
<template lang="pug">
  form.product-form(@submit.prevent="addToCart", novalidate)
    .product-form__options
      option-select-buttons.product-form__options__option1(
        v-if="hasVariants",
        label="Version",
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
      quantity-input.product-form__quantity(
        label="Quantity", 
        v-model="quantity",
        :min="1", 
        :max="remainingQuantity"
      )
      submit-button(
        :label="buttonLabel", 
        :inline="true",
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
        let price = this.$options.filters.money(this.totalPrice)
        return this.currentVariantIsAvailable ? `Add to Cart - ${price}` : 'Sold Out'
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
      },
      totalPrice () {
        return this.currentPrice * this.quantity
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
          .then(() => this.$store.dispatch('cart/openSidecart'))
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
  .product-form {
    margin-top: 0;
    padding-right: 0;

    @include tablet-up {
      padding-right: 36px;
      margin-top: 24px;
    }

    &__price {
      font-size: rem(16);
      margin-bottom: 15px;
      line-height: 20px;
    }
    
    &__atc {
      display: flex;
    }

    &__quantity {
      margin-right: 14px;

      > label {
        margin-right: 5px;
      }
    }

    &__options {
      &__option1,
      &__option2,
      &__option3 {
        margin-bottom: $content-gutter;
      }
    }

    &__frequency {
      &__single,
      &__recurring {
        margin-bottom: 15px;
      }

      &__recurring {
        display: flex;
      }

      &__duration {
        display: inline-block;
        border: none;
        background-color: transparent;
        color: $color--primary;
        font-weight: bold;
        padding-right: 20px;
        padding-left: 4px;
        line-height: 20px;
        -webkit-appearance: none;

        &::-ms-expand {
          display: none;
        }
      }

      &__duration-wrapper {
        position: relative;
        display: inline-block;
      }

      .icon {
        position: absolute;
        pointer-events: none;
        top: 50%;
        right: 6px;
        transform: translateY(-50%);
        fill: $color--primary;
      }
    }

    &__variant-select-wrapper {
      display: flex;
      margin-bottom: 16px;
    }

    &__savings {
      font-size: rem(12);
      line-height: 1.4;
      margin-top: 10px;
      margin-bottom: 10px;

      @include mobile-only {
        text-align: center;
      }
    }
  }
</style>