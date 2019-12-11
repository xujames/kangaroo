
<template lang="pug">
  .tab(v-show="active")
    slot
</template>

<script>
  export default {
    name: 'Tab',
    props: {
      heading: {
        type: String,
        required: true
      },
      selected: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        active: false
      };
    },
    mounted () {
      this.active = this.selected
      this.$parent.addTab(this)
    },
    beforeDestroy () {
      this.active = false
      this.$parent.removeTab(this)
    }
  }
</script>

<style scoped lang="scss">
  .tab-wrapper {
    @include mobile-only {
      border-top: 1px solid $border--main;
  
      &:last-child {
        border-bottom: 1px solid $border--main;
      }
    }
  }

  .tab__content {
    padding-bottom: $content-gutter * 2;
  }

  .tab--accordion {
    &__header {
      border: none;
      padding: 25px 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: $font-header--main;
      font-size: rem(18);
      letter-spacing: 2px;
      text-transform: uppercase;
      font-weight: bold;
      line-height: rem(22);
      width: 100%;
      background-color: transparent;

      &__icon {
        fill: $color--primary;
      }
    }

    .tab__content {
      padding: 0;
    }
  }

  .tab,
  pre {
    font-family: $font-body--main;
    font-size: 14px;
    line-height: 20px;
  }
</style>
