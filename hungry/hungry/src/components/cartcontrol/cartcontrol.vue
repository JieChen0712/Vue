<template>
  <div class="cartcontrol" ref='cartcontrol'>
    <transition name="move">
      <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click.stop="decrease"></div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop="add"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  
  export default {
    props: {
      food: {
        type: Object
      }
    },
    data () {
      return {}
    },
    created () {
    },
    methods: {
      add () {
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
        this.$emit('cart-add', event.target)
      },
      decrease () {
        this.food.count--
      }
    }
  }
</script>

<style lang="scss" scoped="" type="text/css">

@import '../../common/scss/index.scss';

  .cartcontrol{
    font-size: 0;
    .cart-decrease,.cart-add{
      display: inline-block;
      padding: 6px;
      transition:all .4s linear;
      font-size: 24px;
      line-height: 24px;
      color: rgb(0,160,220);
      &.move-transition{
        opacity: 1;
        transform: translate3D(0,0,0) rotateZ(0);
      }
      &.move-enter-active,&.move-leave-active{
        opacity: 0;
        transform: translate3D(24px,0,0) rotateZ(360deg);
      }
    }
    .cart-count{
      display: inline-block;
      padding: 6px;
      text-align: center;
      font-size: 10px;
      line-height: 24px;
      color: rgb(147,153,159);
      vertical-align: top;
    }
    .cart-add{}
  }
</style>