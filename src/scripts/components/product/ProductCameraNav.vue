<template lang="pug">
  header.product-bundle-nav--container
    .product-bundle-nav(v-if="currentVariant")
      .product-bundle-nav__title-container
        img.camera-icon(:src="icon" alt="Privacy Camera")
        h1.product-bundle-nav__title Privacy Camera
          span.product-bundle-nav__title--price(v-if="$mq != 'mobile'") - {{ currentVariant.price | money }}

      ul.product-bundle-nav__link-list(v-if="['desktop', 'hd'].includes($mq)")
        li(v-for="link in links" :class="{ 'active': link.link === activeLink }")
          a.product-bundle-nav__link(
            :href="link.link"
            @click="activeLink = link.link"
          ) {{ link.label }}

      primary-button.product-bundle-nav__atc-btn(
        @click="addToCart"
        :label="ctaText"
        secondary
      )
</template>

<script>
  import ProductBundleNav from 'scripts/components/product/ProductBundleNav.vue'

  export default {
    name: 'ProductCameraNav',
    extends: ProductBundleNav,
    data() {
      return {
        links: [
          { label: "Privacy Camera", link: "#top" },
          { label: "Specs", link: "#specs" },
          { label: "Capabilities", link: "#capabilities" },
          { label: "FAQ", link: "#faq" }
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .camera-icon {
    width: 33px;
  }
</style>