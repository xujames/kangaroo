<template lang="pug">
  .accordion(:class="accordionClass")
    a.accordion__header(href="#", :class="headerClass", @click.prevent="activate") 
      span {{ heading }}
      icon(:name="currentIcon", size="13px")
    transition(:name="transition")
      li.accordion__content(v-if="active", ref="content", :style="contentStyle")
        slot
</template>

<script>
  import Icon from 'scripts/components/basic/Icon.vue'
  export default {
    name: 'Accordion',
    components: { Icon },
    props: {
      heading: {
        type: String,
        required: true
      },
      selected: {
        type: Boolean,
        default: false
      },
      activeIcon: {
        type: String,
        default: 'minus'
      },
      inactiveIcon: {
        type: String,
        default: 'plus'
      },
      theme: {
        type: String,
        default: 'default',
        validator (value) {
          return [
            'default',
            'footer'
          ].includes(value)
        }
      }
    },
    data () {
      return {
        active: true,
        contentStyle: {},
        scrollHeight: 0,
        transition: 'none'
      }
    },
    computed: {
      accordionClass () {
        let classes = []
        if (this.theme !== 'default') {
          classes.push(`accordion--${this.theme}`)
        }
        return classes
      },
      headerClass () {
        return {
          'is-open': this.active
        }
      },
      currentIcon () {
        return (this.active) ? this.activeIcon : this.inactiveIcon
      }
    },
    mounted () {
      let height = this.$refs.content.scrollHeight
      
      this.contentStyle = {
        'max-height': `${height}px`
      }
      // NOTE: this has to be set to false after mount or scrollHeight will be 0
      this.active = this.selected
      this.transition = 'slide-vertical'
      
      if (this.$parent.addAccordion) {
        this.$parent.addAccordion(this)
      }
    },
    beforeDestroy () {
      this.active = false
      if (this.$parent.removeAccordion) {
        this.$parent.removeAccordion(this)
      }
    },
    methods: {
      activate () {
        if (this.$parent.activate && !this.active) {
          this.$parent.activate(this)
        } else {
          this.active = !this.active
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .accordion {
    line-height: rem(17);
    padding-top: 20px;
    padding-bottom: 20px;
    border-top: 1px solid $border--light;

    &:last-child {
      border-bottom: 1px solid $border--light;
    }

    &--footer {

      .icon {
        fill: $color-white;
      }

      .accordion__header {
        color: $color-white;
      }
    }

    &__header {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: $font-header--main;
      color: $color-black;
      text-transform: uppercase;
      font-size: 14px;
      font-weight: 600;
      line-height: 22px;
      text-decoration: none;

      span {
        position: relative;
        top: 3px;
      }
    }

    &__content {
      overflow: hidden;
      list-style: none;
      margin: 0;
      padding: 16px 0 0 0;
      display: flex;
      flex-direction: column;
      height: 100%;
      
      &--wrapper {
        overflow: hidden;
      }
    }
  }
</style>