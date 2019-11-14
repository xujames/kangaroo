
<template lang="pug">
  .product-display--wrapper(v-if="product")
    .product-display
      .hero__background
      .container
        .row
          .small-12.large-7.column
            product-carousel(:images="product.images")
          .small-12.large-5.column(v-if="$mq !== 'mobile'")
            .product-info
              slot(name="content")
            product-form-gift-card(v-if="product.type === 'Gift Card'" :product="product")
            product-form(v-else :product="product")
            slot(name="icons")
    .container(v-if="$mq === 'mobile'")
      .row
        .column.small-12
          .product-info
            slot(name="content")
          product-form-gift-card(v-if="product.type === 'Gift Card'" :product="product")
          product-form(v-else :product="product")
          slot(name="icons")
</template>

<script>
  import storeProduct from 'scripts/mixins/storeProduct.js'

  import ProductForm from 'scripts/components/product/ProductForm.vue'
  import ProductFormGiftCard from 'scripts/components/product/ProductFormGiftCard.vue'
  import ProductCarousel from 'scripts/components/product/ProductCarousel.vue'

  export default {
    name: 'ProductDisplay',
    mixins: [ storeProduct ],
    components: { ProductForm, ProductFormGiftCard, ProductCarousel },
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
.yotpo__reviews-section__header {
  text-align: center;
  margin: 40px 0 20px 0;
  padding: 0 $grid-gutter;
  font-weight: bold;
  font-size: rem(24);
  line-height: 32px;

  @include tablet-up {
    font-size: rem(32);
    line-height: 40px;
    margin: 80px 0;
  }
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
        margin-top: 72px;
      }
    }
  }
</style>
