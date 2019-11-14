
<template lang="pug">
  .search-results.collection-grid
    .row.small-up-1.medium-up-4
      .column(v-for="item in searchResults")
        product-tile(
          :title="item.title"
          :tagline="item.tagline"
          :url="item.url"
          :image="item.image"
          :hover-image="item.hoverImage"
          :image-alt="item.imageAlt"
          :price="item.price"
          :remaining-quantity="item.remainingQuantity"
        )
</template>

<script>
  import ProductTile from 'scripts/components/product/ProductTile.vue'

  export default {
    name: 'SearchResults',
    components: { ProductTile },
    props: {
      searchResults: Array
    }
  }
</script>

<style scoped lang="scss">
  .search-results {
    &.collection-grid {
      margin-bottom: 0;
    }

    &__header {
      font-size: rem(24);
      font-weight: bold;
      margin-bottom: 1em;
      text-align: center;
      color: $text--main;

      @include tablet-up {
        font-size: rem(36);
        text-align: left;
      }
    }

    &__none {
      font-size: rem(18);
      text-align: center;
      margin-bottom: 36px;

      @include tablet-up {
        text-align: left;
      }
    }

    &__container {
      margin-bottom: 50px;

      @include tablet-up {
        margin-bottom: 150px;
      }
    }

    &__input {
      max-width: 500px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin-left: auto;
      margin-right: auto;

      input {
        flex-basis: 100%;
      }

      button {
        margin-top: 10px;
      }

      @include tablet-up {
        flex-wrap: nowrap;
        margin-left: unset;
        margin-right: unset;

        input {
          flex-basis: auto;
        }

        button {
          margin-top: 0;
          margin-left: 16px;
        }
      }
    }
  }
</style>
