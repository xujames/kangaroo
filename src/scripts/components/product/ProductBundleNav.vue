<template lang="pug">
header.product-bundle-nav--container
  .product-bundle-nav(v-if="currentVariant")
    .product-bundle-nav__title-container
      img(:src="icon" alt="kangaroo shield icon")
      h1.product-bundle-nav__title {{ currentVariant.title }}
        span.product-bundle-nav__title--price(v-if="$mq != 'mobile'") - {{ currentVariant.price | money }}

    ul.product-bundle-nav__link-list(v-if="['desktop', 'hd'].includes($mq)")
      li(v-for="link in links" :class="{ 'active': link.link === activeLink }")
        a.product-bundle-nav__link(
          :href="link.link"
          @click="activeLink = link.link"
        ) {{ link.label }}

    primary-button.product-bundle-nav__atc-btn(
      @click.prevent="addToCart"
      :label="ctaText"
      secondary
    )
</template>

<script>
import { mapState } from 'vuex'

import PrimaryButton from 'scripts/components/buttons/PrimaryButton.vue'

export default {
  name: "ProductBundleNav",
  components: { PrimaryButton },
  props: {
    icon: String
  },
  data () {
    return {
      activeLink: "#top",
      links: [
        { label: "Security Kit", link: "#top" },
        { label: "What's Included", link: "#included-products" },
        { label: "How It Works", link: "#how-it-works" },
        { label: "App Features", link: "#app-features" }
      ]
    }
  },
  computed: {
    ...mapState({
      currentVariant: state => state.pdp.currentVariant
    }),
    ctaText () {
      let money = this.$options.filters.money
      return this.$mq === 'mobile' ? `Buy Now - ${money(this.currentVariant.price)}` : 'Add to Cart'
    }
  },
  methods: {
    addToCart () {
      let addProduct = {
        id: this.currentVariant.id,
        quantity: 1
      }

      this.$store.dispatch('cart/addItem', addProduct)
        .then(() => this.$store.dispatch('cart/openSidecart'))
        .catch(error => this.$store.dispatch('toast/send', { text: error, type: 'error' }))
    }
  }
}
</script>

<style lang="scss" scoped>
.product-bundle-nav {
  position: fixed;
  top: 55px;
  left: 0;
  width: 100%;
  background-color: $bg--secondary-nav;
  height: 72px;
  z-index: 50;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 $grid-gutter;

  @include tablet-up {
    top: 67px;
    padding: 0 30px;
  }

  @include desktop-up {
    padding: 0 50px;
  }

  &--container {
    height: 72px;
  }

  &__title-container {
    display: flex;
    align-items: center;
  }

  &__title {
    font-size: 16px;
    line-height: 24px;
    font-weight: bold;
    margin: 0;
    margin-left: 9px;

    &--price {
      color: $text--mid;
      margin-left: 5px;
    }
  }

  &__link-list {
    display: flex;
    min-width: 500px;
    justify-content: space-between;

    li {
      list-style: none;
      &.active {
        border-bottom: 2px solid $color-black;
      }
    }
  }

  &__link {
    font-size: 16px;
    line-height: 26px;
    text-decoration: none;
    text-align: center;

    .active > & {
      font-weight: 600;
    }
  }

  &__atc-btn {
    height: 34px;
    padding: 0 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;

    span {
      position: relative;
      top: 1px;
    }
  }
}
</style>