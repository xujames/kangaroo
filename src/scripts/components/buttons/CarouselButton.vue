
<template lang="pug">
  .pagination-button-wrapper
    button.pagination-button(
      :class="classObject",
      type="button",
      @click="onBackButtonClick")
      span.u-sr-only Previous
      icon(name="chevron-left" size="15px")

    button.pagination-button(
      :class="classObject",
      type="button",
      @click="onNextButtonClick")
      span.u-sr-only Next
      icon(name="chevron-right" size="15px")

</template>

<script>
  import Icon from 'scripts/components/basic/Icon.vue'

  /**
   * Events
   */
  const Emits = {
    BackClick:'backClick',
    NextClick:'nextClick'
  }

  export default {
    components: { Icon },
    name: 'CarouselButton',
    computed:{
      classObject(){
        let cssClass ='';
        if(this.color){
          switch (this.color) {
            case 'blue':
              cssClass = 'pagination-button-blue';
              break;
            default:
              cssClass = 'pagination-button-white';
              break;
          }
        }else{
          // Set to white if no color selected
          cssClass = 'pagination-button-white';
        }
        return cssClass;
      }
    },
    props: {
      color: String
    },
    methods: {
      onBackButtonClick(){
        this.$emit(Emits.BackClick);
      },
      onNextButtonClick(){
        this.$emit(Emits.NextClick);
      }
    }
  }
</script>

<style scoped lang="scss">
  .pagination-button{
    box-shadow: 0 2px 4px 0 rgba(34,31,32,0.05);
    height: 30px;
    width: 30px;
    border-radius: 50%;
    background: transparent;
    transition: opacity 0.3s ease-in-out;
    background-color: $color-white;
    &:hover{
      cursor: pointer;
      opacity: .7;
    }
    .icon{
      padding-top:5px;
    }
    &-white{
      .icon{
        fill:#fff
      }
    }
    &-blue {
      .icon{
        fill: $color-blue;
        stroke: $color-blue;
      }
    }
  }
  .pagination-button:nth-of-type(2n) {
    margin-left: 8px;
  }
</style>