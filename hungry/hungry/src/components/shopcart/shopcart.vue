<template>
  <div class="shopcart">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'heightlight':totalCount>0}">
            <i class="icon-shopping_cart"></i>
          </div>
          <transition name="fade">
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </transition>
        </div>
        <div class="price" :class="{'heightlight':totalCount>=0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right" :class="{'heightlight':totalPrice>=minPrice}" @click.stop="pay">
        <span class="total">{{payDesc}}</span>
      </div>
    </div>
    <div class="ball-wrapper">
      <transition v-for="(ball, index) in balls" tag="div" :key="ball.id" name="jump" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
        <div v-show="ball.show" class="ball">
          <div class="inner inner-hook"></div>
        </div>
      </transition>
    </div>
    <transition name="fold">
      <div class="food-detail" v-show="goodsList">
        <div class="cart-title">
          <h1 class="title">购物车</h1>
          <span class="clear" @click="empty">清空</span>
        </div>
        <div class="food-wrapper">
          <ul class="food-list">
            <li v-for="food in selectFoods" class="list-item">
              <div class="content-left">
                <img :src="food.icon" class="food-img" />
                <span class="food-name">{{food.name}}</span>
              </div>
              <div class="content-right">
                <div class="control-wrapper">
                  <cartcontrol :food="food" v-on:cart-add="jump"></cartcontrol>
                </div>
                <span class="food-price">￥<span>{{food.price*food.count}}</span></span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="shopcart-mask" v-show="goodsList" @click="toggleList"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import cartcontrol from '../cartcontrol/cartcontrol'
  
  export default {
    props: {
      selectFoods: {
        type: Array,
        default () {
          return [
            {
              price: 19,
              count: 1
            }
          ]
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        balls: [{
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }],
        jumpballs: [],
        fold: true
      }
    },
    mounted () {},
    computed: {
      totalPrice () {
        let total = 0
        for (let i = 0; i < this.selectFoods.length; i++) {
          total += this.selectFoods[i].price * this.selectFoods[i].count
        }
        return total
      },
      totalCount () {
        let count = 0
        for (let i = 0; i < this.selectFoods.length; i++) {
          count += this.selectFoods[i].count
        }
        return count
      },
      payDesc () {
        if (this.totalPrice === 0) {
          return '￥' + this.minPrice + '元起送'
        } else if (this.totalPrice >= this.minPrice) {
          return '去结算'
        } else {
          return '还差￥' + (this.minPrice - this.totalPrice) + '元起送'
        }
      },
      goodsList () {
        if (!this.totalCount > 0) {
          this.fold = true
          return false
        }
        let show = !this.fold
        return show
      }
    },
    methods: {
      jump (el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            ball.show = true
            ball.el = el
            this.jumpballs.push(ball)
            return
          }
        }
      },
      beforeEnter (el) {
        let count = this.balls.length
        while (count--) {
          let ball = this.balls[count]
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect()
            let x = rect.left - 32
            let y = -(window.innerHeight - rect.top - 22)
            el.style.display = ''
            el.style.webkitTransform = 'translate3d(0,' + y + 'px,0)'
            el.style.transform = 'translate3d(0,' + y + 'px,0)'
            let inner = el.getElementsByClassName('inner-hook')[0]
            inner.style.webkitTransform = 'translate3d(' + x + 'px,0,0)'
            inner.style.transform = 'translate3d(' + x + 'px,0,0)'
            let num = document.getElementsByClassName('num')[0]
            num.style.webkitTransform = 'scale(1.2)'
            num.style.transform = 'scale(1.2)'
          }
        }
      },
      enter (el) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)'
          el.style.transform = 'translate3d(0,0,0)'
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = 'translate3d(0,0,0)'
          inner.style.transform = 'translate3d(0,0,0)'
          let num = document.getElementsByClassName('num')[0]
          num.style.webkitTransform = 'scale(1.2)'
          num.style.transform = 'scale(1.2)'
        })
      },
      afterEnter (el) {
        let ball = this.jumpballs.shift()
        if (ball.show) {
          ball.show = false
          el.style.display = 'none'
          let num = document.getElementsByClassName('num')[0]
          num.style.webkitTransform = 'scale(1)'
          num.style.transform = 'scale(1)'
        }
      },
      toggleList () {
        if (!this.totalCount) {
          return
        }
        this.fold = !this.fold
      },
      empty () {
        this.selectFoods.forEach((food) => {
          food.count = 0
        })
      },
      pay () {
        if (this.totalPrice < this.minPrice) {
          return
        }
        alert('共支付:￥' + this.totalPrice + '元')
      }
    },
    components: {
      cartcontrol
    }
  }
</script>

<style lang="scss" scoped="" type="text/css">
@import '../../common/scss/index.scss';

.shopcart{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 48px;
  z-index: 50;
  .content{
    display: flex;
    font-size: 0;
    background-color: #141d27;
    .content-left{
      flex: 1;
      text-align:left;
      .logo-wrapper{
        display: inline-block;
        position: relative;
        top: -10px;
        margin: 0 12px;
        padding: 6px;
        width: 56px;
        height: 56px;
        box-sizing: border-box;
        border:none;
        border-radius: 50%;
        vertical-align: top;
        background-color: #141d27;
        .logo{
          width: 100%;
          height: 100%;
          border-radius:50%;
          text-align: center;
          background-color: #2b343c;
          transition: all .5s linear;
          &.heightlight{
            background-color: rgb(0,160,220);
            i{
              color: #fff;
            }
          }
          i{
            font-size: 24px;
            line-height: 44px;
            color: #80858a;
          }
        }
        .num{
          position: absolute;
          top: 0;
          right: 0;
          width: 24px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          border-radius: 16px;
          font-size: 9px;
          font-weight: 700;
          color: #fff;
          box-sizing: border-box;
          background-color: rgb(240,20,20);
          box-shadow: 0 4px 8px 0 rgba(0,0,0,.4);
          transition: all .2s linear;
          &.fade-transition{
            opacity: 1;
          }
          &.fade-enter-active,&.fade-leave-active{
            opacity: 0;
          }
        }
      }
      .price{
        display: inline-block;
        font-size: 16px;
        vertical-align: top;
        font-weight: 700;
        line-height: 24px;
        margin-top: 12px;
        padding-right: 12px;
        border-right: solid 1px rgba(255,255,255,.1);
        color: rgba(255,255,255,.4);
        box-sizing: border-box;
        transition: all .5s linear;
        &.heightlight{
          color: #fff;
        }
      }
      .desc{
        display: inline-block;
        margin: 12px 0 0 12px;
        vertical-align: top;
        line-height: 24px;
        font-size: 10px;
        color:rgba(255,255,255,.4)
      }
    }
    .content-right{
      flex: 0 0 105px;
      width: 105px;
      padding: 0 8px;
      box-sizing: border-box;
      background-color: #2b333b;
      transition: all .5s linear;
      &.heightlight{
        background-color: #00b43c;
        .total{
          color: #fff;
        }
      }
      .total{
        display: inline-block;
        text-align: center;
        width: 100%;
        height: 100%;
        font-size: 12px;
        line-height: 48px;
        font-weight: 700;
        color:rgba(255,255,255,.4);
      }
    }
  }
  .ball-wrapper{
    .ball{
      position: fixed;
      left: 32px;
      bottom: 22px;
      z-index: 100;
      transition: all .5s cubic-bezier(.49,-0.29,.75,.41);
      .inner{
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background-color: rgb(0,160,220);
        transition: all .5s linear;
      }
    }
  }
  .food-detail{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    padding-bottom: 56px;
    background-color: white;
    transform: translate3d(0,0,0);
    transition: all .3s ease-out;
    z-index: -1;
    &.fold-transition{
      transition: all .3s ease-out;
      transform: translate3d(0,0,0);
    }
    &.fold-enter-active,&.fold-leave-active{
      transform: translate3d(0,100%,0);
    }
    .cart-title{
      width: 100%;
      height: 40px;
      background-color: #f4f5f7;
      font-size: 0;
      padding: 0 18px;
      @include border-1px(rgba(7,17,27,.1))
      .title{
        display: inline-block;
        float: left;
        font-size: 14px;
        font-weight: 200;
        line-height: 40px;
        color: rgb(7,17,27);
      }
      .clear{
        float: right;
        font-size: 12px;
        line-height: 40px;
        color: rgb(0,160,220);
      }
    }
    .food-wrapper{
      max-height: 217px;
      overflow: scroll;
      .food-list{
        list-style: none;
        background-color: white;
        /*overflow: scroll;*/
        .list-item{
          display: flex;
          margin: 0 18px;
          height: 48px;
          box-sizing: border-box;
          @include border-1px(rgba(7,17,27,.1))
          .content-left{
            flex: 1;
            .food-img{
              float: left;
              height: 30px;
              width: 30px;
              margin-top: 9px;
              margin-right: 10px;
              font-size: 0;
              border: none;
              border-radius: 50%;
            }
            .food-name{
              display: inline-block;
              float: left;
              width: 75%;
              text-align: left;
              font-size: 14px;
              line-height: 48px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              color: rgb(7,17,27);
            }
          }
          .content-right{
            flex: 1;
            .food-price{
              float: right;
              margin-left: 18px;
              font-size: 10px;
              font-weight: normal;
              line-height: 48px;
              color: rgb(240,20,20);
              span{
                font-size: 14px;
                font-weight: 700;
              }
            }
            .control-wrapper{
              float: right;
              height: 48px;
              padding: 6px 0;
            }
          }
        }
      }
    }
  }
  .shopcart-mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(7, 17, 27, .6);
    filter: blur(10px);
    z-index: -2;
    transition: all .2s linear;
    &.fade-transition {
      opacity: 1;
    }
    &.fade-enter-active,&.fade-leave-active {
      opacity: 0;
    }
  }
}
</style>