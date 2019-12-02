
<template lang="pug">
  .tabs
    .tabs__nav
      button.tabs__nav__button(
        type="button", 
        v-for="tab in tabs", 
        :class="{ 'active': tab.active }", 
        @click="activate(tab)"
      ) {{ tab.heading }}
    .tabs__content
      slot
</template>

<script>
  export default {
    name: 'Tabs',
    data() {
      return {
        tabs: []
      }
    },
    methods: {
      addTab(newTab) {
        this.tabs.push(newTab)
      },
      removeTab(tab) {
        let index = this.tabs.findIndex(t => t.heading === tab.heading)
        this.tabs.splice(index, 1)
      },
      activate({ heading }) {
        this.tabs.forEach(function (tab) {
          tab.active = Boolean(heading === tab.heading)
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  .tabs {
    &__nav {
      margin-bottom: $content-gutter;
      border-bottom: 2px solid $color-lead;

      &__button {
        cursor: pointer;
        position: relative;
        bottom: -2px;
        background-color: transparent;
        position: relative;
        margin: 5px 0 0 0;
        padding: 0 12px 5px 12px;
        border-width: 0 0 2px 0;
        border-style: solid;
        border-color: $color-lead;
        font-weight: bold;
        font-size: 14px;
        line-height: 22px;
        color: $color-lead;
        transition: 0.3s ease all;
        text-transform: uppercase;

        &:first-child {
          padding-left: 0;
        }

        &:hover {
          color: $text--main;
          border-color: $text--main;
        }

        &.active {
          color: $text--main;
          border-color: $text--main;
        }
      }
    }
  }
</style>
