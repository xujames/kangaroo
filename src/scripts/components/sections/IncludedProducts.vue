<template lang="pug">
  .included-products
    .container
      .row
        .column.small-12.large-6.included-products__selected-product__img-container(v-if="$mq != 'mobile'")
          transition(name="fade")
            img(:src="selectedProductImage.src" :alt="selectedProductImage.alt" :key="selectedProductImage.src")

        .column.small-12.large-6.included-products__content-container
          h2.included-products__title {{ title }}
          span.included-products__variant-price(v-if="currentVariant") {{ currentVariant.price | money }}
            span.included-products__variant-price.included-products__variant-price--compare(
              v-if="currentVariant.compare_at_price") {{ currentVariant.compare_at_price | money }}
          .included-products__selections-container
            .included-products__selection(
              v-for="product in includedProducts"
              :key="product.id"
              tabindex="0"
              @focus="selected = product.handle"
              :class="{ 'selected': product.handle === selected }"
            )
              img(:src="product.images[0].src" :alt="product.images[0].alt")
          .included-products__selected-product
            .included-products__selected-product__info
              .included-products__selected-product__title {{ selectedProductQty }} {{ selectedProduct.title }}
              .included-products__selected-product__qty Quantity: {{ selectedProductQty }}
              .included-products__selected-product__img-container(v-if="$mq === 'mobile'")
                transition(name="fade")
                  img(:src="selectedProductImage.src" :alt="selectedProductImage.alt" :key="selectedProductImage.src")
                button.included-products__selected-product__img-container__next(@click="nextProduct") next
              .included-products__selected-product__desc(v-html="selectedProduct.description")
            .included-products__selected-product__features(v-if="selectedProductFeatures")
              h3 Key Features:
              pre {{ selectedProductFeatures }}
</template>

<script>
import { mapState } from 'vuex'

import storeProduct from 'scripts/mixins/storeProduct.js'

export default {
  mixins: [ storeProduct ],
  props: {
    title: {
      type: String,
      default: "What's Included?"
    }
  },
  data () {
    return {
      selected: ''
    }
  },
  computed: {
    ...mapState({
      currentVariant: state => state.pdp.currentVariant
    }),
    productList () {
      return this.currentVariant ? this.currentVariant.custom_fields.included_products.split(',') : []
    },
    quantities () {
      let qtys = {}
      this.productList.forEach(p => {
        let [ handle, qty ] = p.split('|')
        qtys[handle] = qty
      })
      return qtys
    },
    handles () {
      return this.productList.map(p => p.split('|')[0])
    },
    includedProducts () {
      return this.allProducts.filter(p => this.handles.includes(p.handle))
    },
    selectedProduct () {
      let product = this.allProducts.find(p => p.handle === this.selected)
      return product ? product : {}
    },
    selectedProductImage () {
      let { selectedProduct } = this
      return (selectedProduct && selectedProduct.images && selectedProduct.images[0]) ? selectedProduct.images[0] : {}
    },
    selectedProductQty () {
      return this.selectedProduct ? this.quantities[this.selectedProduct.handle] : 0
    },
    selectedProductFeatures () {
      if (this.selectedProduct && this.selectedProduct.custom_fields) {
        return this.selectedProduct.custom_fields.features
      } else {
        return ''
      }
    }
  },
  watch: {
    currentVariant () {
      this.handles.forEach(handle => {
        this.$store.dispatch('products/addProduct', handle)
      })
      this.selected = this.handles[0]
    }
  },
  methods: {
    nextProduct () {
      for (let i = 0; i < this.includedProducts.length; i++) {
        if (this.selected === this.includedProducts[i].handle) {
          this.selected = this.includedProducts[i + 1] ? this.includedProducts[i + 1].handle : this.includedProducts[0].handle
          break;
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.included-products {
  background-color: $bg--light;
  width: 100%;
  padding: 35px 0;
  margin: 40px auto;
  text-align: center;

  @include tablet-up {
    padding: 80px 0;
    margin: 80px auto;
  }

  &__content-container {
    @include tablet-up {
      text-align: left;
      max-width: 691px;
    }
  }

  &__title {
    font-size: 20px;
    line-height: 40px;
    font-weight: bold;
    margin: 0;

    @include tablet-up {
      font-size: 32px;
    }
  }

  &__variant-price {
    font-size: 14px;
    line-height: 20px;
    color: $color--primary--light;

    @include tablet-up {
      display: none;
    }

    &--compare {
      margin-left: 10px;
      color: $text--mid;
      text-decoration: line-through;
    }
  }

  &__selections-container {
    display: flex;
    justify-content: center;
    margin: 16px auto 20px auto;

    @include tablet-up {
      margin: 40px auto 40px 0;
      justify-content: flex-start;
    }
  }

  &__selection {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 2px solid $color-white;
    overflow: hidden;
    box-shadow: 0 2px 8px 0 rgba(34,31,32,0.05);
    margin: 0 7px;
    outline: none;
    cursor: pointer;

    &.selected {
      border-color: $border--input--selected;
    }

    @include tablet-up {
      width: 80px;
      height: 80px;
      margin: 0 12px;

      &:first-child {
        margin-left: 0;
      }
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__selected-product {
    border-bottom: 1px solid $border--light;

    @include tablet-up {
      display: flex;
      padding-bottom: 24px;
    }

    &__info {
      max-width: 378px;

      @include tablet-up {
        margin-right: 50px;
      }
    }

    &__title {
      font-size: 18px;
      font-weight: bold;
      line-height: 22px;
      margin-bottom: 4px;

      @include tablet-up {
        font-size: 20px;
        margin-bottom: 19px;
      }
    }

    &__qty,
    &__desc {
      font-size: 14px;
      line-height: 20px;
    }

    &__qty {
      color: $text--mid;

      @include tablet-up {
        display: none;
      }
    }

    &__desc {
      text-align: left;
    }

    &__img-container {
      width: 100%;
      max-width: 600px;
      padding-bottom: 100%;
      position: relative;
      margin: 8px auto 16px auto;

      @include tablet-up {
        padding-bottom: 45%;
      }

      &__next {
        position: absolute;
        right: 0;
        top: calc(50% - 25px);
        height: 29px;
        width: 29px;
        border-radius: 50%;
        background-color: $color-black;
      }

      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    &__features {
      text-align: left;

      h3 {
        font-size: 16px;
        line-height: 22px;
        margin-bottom: 16px;
      }

      pre {
        font-family: $font-body--main;
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
}
</style>