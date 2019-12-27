<template lang="pug">
header.product-bundle-nav--container
  .product-bundle-nav
    .product-bundle-nav__title-container
      img.bundle-icon(:src="icon" alt="kangaroo shield icon")
      h1.product-bundle-nav__title {{ title }}

    ul.product-bundle-nav__link-list(v-if="['desktop', 'hd'].includes($mq)")
      li(v-for="link in links" :class="{ 'active': link.link === activeLink }")
        a.product-bundle-nav__link(
          :href="link.link"
          @click="handleLinkSelect(link.link, $event)"
        ) {{ link.label }}
    .product-bundle-nav__atc-container
      primary-button.product-bundle-nav__atc-btn(
        v-if="showAtc && atcVisible"
        :label="ctaText"
        secondary
      )
      a(
        v-if="!showAtc && atcVisible"
        :href="$mq === 'mobile' ? '#purchase-form' : '#top'"
      )
        primary-button.product-bundle-nav__atc-btn(
          :label="ctaText"
          secondary
        )
</template>

<script>
import { mapState } from 'vuex'
import storeProduct from 'scripts/mixins/storeProduct.js'

import PrimaryButton from 'scripts/components/buttons/PrimaryButton.vue'

export default {
  name: "ProductBundleNav",
  mixins: [ storeProduct ],
  components: { PrimaryButton },
  props: {
    icon: String,
    title: String,
    atc: String
  },
  data () {
    return {
      activeLink: "#top",
      links: [
        { label: "Security Kit", link: "#top" },
        { label: "What's Included", link: "#included-products" },
        { label: "How It Works", link: "#how-it-works" },
        { label: "App Features", link: "#app-features" }
      ],
      atcVisible: true
    }
  },
  computed: {
    ...mapState({
      currentVariant: state => state.pdp.currentVariant
    }),
    ctaText () {
      let money = this.$options.filters.money
      return this.$mq === 'mobile' ? `Buy Now - ${money(this.currentVariant.price)}` : 'Buy Now'
    },
    showAtc () {
      return this.atc === "true";
    }
  },
  watch: {
    product() {
      if (this.product) this.$store.dispatch('pdp/update', this.product.variants[0])
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
        .then(() => this.updateSidecart())
    },
    elementInViewport(el) {
      var top = el.offsetTop;
      var height = el.offsetHeight;
      while(el.offsetParent) {
        el = el.offsetParent;
        top += el.offsetTop;
      }

      return (
        top >= window.pageYOffset &&
        (top + height) <= (window.pageYOffset + window.innerHeight)
      );
    },
    handleScroll() {
      var that = this;
      this.links.forEach(link => {
        const el = document.getElementById(link.link.replace('#', ''));
        if(that.elementInViewport(el)) {
          that.activeLink = link.link;
          return false;
        }
      });

      this.atcVisible = !this.elementInViewport(document.getElementsByClassName("ProductForm__AddToCart")[0])
    },
    handleClick(e) {
      let currentlySelectedVariant
      let { dataset, classList } = e.target

      if (!classList.contains('Popover__Value') || !classList.contains('is-selected')) return

      if (this.product.variants.length >= 1) {
        currentlySelectedVariant = this.product.variants.find(variant => 
          variant.title === dataset.value)
      }

      if (currentlySelectedVariant) {
        this.$store.dispatch('pdp/update', currentlySelectedVariant)
      } else {
        this.$store.dispatch('pdp/update', this.product.variants[0])
      }
    },
    handleLinkSelect(link, e) {
      e.preventDefault();
      const el = document.getElementById(link.replace('#', ''))
      this.activeLink = link

      // TODO: replace with vanillajs at some point
      $('html, body').animate({
        scrollTop: $(link).offset().top - 150
      })
    },

    // This is a hack for updating the existing sidecart
    async updateSidecart () {
      let resp = await fetch(`/cart?view=drawer&timestamp=${Date.now()}`, {
        credentials: "same-origin",
        method: "GET"
      })
      let sidecartString = await resp.text()
      let domEl = document.createElement('div')
      let sidecart = document.querySelector('#sidebar-cart')
      domEl.innerHTML = await sidecartString
      let newSidecart = domEl.querySelector('#sidebar-cart')

      sidecart.setAttribute("data-section-settings", newSidecart.getAttribute("data-section-settings"))
      sidecart.querySelector(".Cart").replaceWith(newSidecart.querySelector(".Cart"))
      sidecart.querySelector(".Drawer__Header").replaceWith(newSidecart.querySelector(".Drawer__Header"))
      document.querySelector(".Header__CartCount").innerHTML = this.itemCount
      document.querySelector(".Header__CartCount").parentElement.click()
    }
  },
  created() {
    this.atcVisible = !this.elementInViewport(document.getElementsByClassName("ProductForm__AddToCart")[0])
    document.addEventListener('scroll', this.handleScroll);
    document.addEventListener('click', this.handleClick)
  },
  destroyed() {
    document.removeEventListener('scroll', this.handleScroll);
    document.removeEventListener('click', this.handleClick)
  }
}
</script>

<style lang="scss">
.product-bundle-nav {
  position: fixed;
  top: 55px;
  left: 0;
  width: 100%;
  background-color: $bg--secondary-nav;
  height: 72px;
  z-index: 3;
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
    height: 48px;

    @include tablet-up {
      height: 72px;
    }
  }

  &__atc-container {
    min-width: 120px;
  }

  &__title-container {
    display: flex;
    align-items: center;

    .bundle-icon {
      width: 21px;
    }
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
      transition: all .15s ease-in-out;
      transition-delay: .2s;
      border-bottom: 2px solid transparent;
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

    &:hover,
    &:focus {
      text-decoration: none;
    }

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