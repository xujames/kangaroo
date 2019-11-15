<template lang="pug">
section.product-benefits
  .product-benefits__benefit(v-for="(benefit, idx) in benefits" :key="idx")
    img.product-benefits__icon(:src="benefit.icon.src" :alt="benefit.icon.alt")
    .product-benefts__info
      h2.product-benefits__title {{ benefit.title }}
      p.product-benefits__desc {{ benefit.desc }}
</template>

<script>
export default {
  props: {
    benefits: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
.product-benefits {
  background-color: $color--primary;
  padding: 32px $grid-gutter;
  margin: 40px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: $color-white;

  @include desktop-up {
    flex-direction: row;
    padding: 60px $grid-gutter;
  }

  &__benefit {
    margin-bottom: 24px;
    text-align: center;
    max-width: 290px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @include desktop-up {
      margin-bottom: 0;
      margin: 0 20px;
      max-width: 370px;
      text-align: left;
      flex-direction: row;
    }
  }

  &__icon {
    height: 40px;
    margin-bottom: 16px;

    @include desktop-up {
      margin-bottom: 0;
      margin-right: 20px;
    }
  }

  &__title {
    margin: 0;
    font-size: 18px;
    line-height: 18px;
    font-weight: bold;
    margin-bottom: 15px;

    @include desktop-up {
      margin-bottom: 17px;
    }
  }

  &__desc {
    margin: 0;
    font-size: 12px;
    line-height: 20px;

    @include desktop-up {
      line-height: 16px;
    }
  }
}
</style>