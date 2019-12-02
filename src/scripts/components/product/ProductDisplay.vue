
<template lang="pug">
  .product-display--wrapper(v-if="product")
    .product-display
      .hero__background
      .container
        .row
          .small-12.large-7.column
            product-carousel(:images="product.images")
          .product-display__form.small-12.large-5.column(v-if="$mq !== 'mobile'")
            .product-info
              slot(name="content-header")
            product-form-gift-card(v-if="product.type === 'Gift Card'" :product="product")
            product-form-kit(v-if="product.type === 'Kit'" :product="product")
            product-form(v-else :product="product")
            slot(name="content")
    .container(v-if="$mq === 'mobile'")
      .row
        .column.small-12
          .product-info
            slot(name="content-header")
          product-form-gift-card(v-if="product.type === 'Gift Card'" :product="product")
          product-form-kit(v-if="product.type === 'Kit'" :product="product")
          product-form(v-else :product="product")
          slot(name="content")
</template>

<script>
  import storeProduct from 'scripts/mixins/storeProduct.js'

  import ProductForm from 'scripts/components/product/ProductForm.vue'
  import ProductFormKit from 'scripts/components/product/ProductFormKit.vue'
  import ProductFormGiftCard from 'scripts/components/product/ProductFormGiftCard.vue'
  import ProductCarousel from 'scripts/components/product/ProductCarousel.vue'

  export default {
    name: 'ProductDisplay',
    mixins: [ storeProduct ],
    components: { ProductForm, ProductFormGiftCard, ProductFormKit, ProductCarousel },
    mounted () {
      // wait for the display to render, then initialize yotpo
      let interval = setInterval(() => {
        if (window.yotpo.initialized && this.$refs.productDisplay) {
          let api = new Yotpo.API(window.yotpo)
          api.refreshWidgets()
          clearInterval(interval)
        }
      }, 1000)
    }
  }
</script>

<style lang="scss">
.product-info__membership-tooltip p {
  margin: 0;
}
</style>

<style scoped lang="scss">
  .product-display {
    position: relative;
    overflow: hidden;

    .hero__background {
      bottom: 120px;

      @include mobile-only {
        display: none;
      }
    }

    & > .container {
      padding: 10px 10px 0 10px;
      
      @include tablet-up {
        z-index: 1;
        position: relative;
        margin-top: 32px;
      }
    }

    &__form {
      max-width: 450px;
    }
  }

  .product-info {
    &__promo-line {
      display: none;
      color: $text--subtitle;
      font-size: 16px;
      line-height: 24px;
      margin-bottom: 4px;

      @include tablet-up {
        display: block;
      }
    }

    &__title {
      font-size: 32px;
      line-height: 40px;
      font-weight: bold;
      margin: 0;
      margin-top: 17px;

      @include tablet-up {
        margin-top: 0;
        font-size: 36px;
        line-height: 48px;
      }
    }

    .yotpo.bottomLine {
      margin: 8px 0;
    }

    &__membership-line {
      font-size: 18px;
      line-height: 40px;
      font-weight: 500 !important;
      color: $color--primary--light;
      margin: 6px 0 0 0;

      @include tablet-up {
        font-size: 20px;
        line-height: 32px;
      }

      .icon--help {
        margin-left: 5px;
        margin-bottom: 4px;
        cursor: pointer;
      }
    }

    &__kits-tagline {
      font-size: 12px;
      line-height: 20px;
      margin-bottom: 16px;

      @include tablet-up {
        display: none;
      }
    }

    &__accordians {
      margin: 30px 0 20px 0;

      @include tablet-up {
        display: none;
      }

      &::v-deep .accordion__content,
      &::v-deep .accordion__content pre {
        font-family: $font-body--main;
        font-size: 12px;
        line-height: 20px;
      }
    }

    &__tabs {
      display: none;
      margin-top: 40px;

      @include tablet-up {
        display: block;
      }

      &::v-deep .tab,
      &::v-deep .tab pre {
        font-family: $font-body--main;
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
</style>
