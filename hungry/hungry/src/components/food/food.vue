<template>
  <transition name="move">
    <div class="food" v-show="foodflag">
      <div class="food-content">
        <div class="wrapper-top">
          <div class="img-wrapper">
            <img class="food-photo" :src='food.image' alt="" />
            <i class="back icon-arrow_lift" @click.stop="show"></i>
          </div>
          <div class="food-detail">
            <h1 class="title">{{food.name}}</h1>
            <p class="desc"><span class="sale-count">月售{{food.sellCount}}份</span><span class="sale-rating">好评率{{food.rating}}</span></p>
            <div class="price-wrapper">
              <p class="now-price"><span class="price-doller">￥</span>{{food.price}}</p>
              <del class="old-price" v-show="food.oldPrice"><span class="price-doller">￥</span>{{food.oldPrice}}</del>
            </div>
            <!--<transition name="fade" mode="out-in">-->
              <div class="control-wrapper" v-show="food.count || !food.count === 0">
                <cartcontrol :food="food" class="control" v-on:cart-add="add"></cartcontrol>
              </div>
            <!--</transition>-->
            <!--<transition name="fade" mode="out-in">-->
              <div class="buy" v-show="!food.count || food.count === 0" @click="addOne">加入购物车</div>
            <!--</transition>-->
          </div>
        </div>
        <div class="wrapper-middle">
          <h1 class="title">商品介绍</h1>
          <p class="food-introduce">{{food.info}}</p>
        </div>
        <div class="wrapper-bottom">
          <dl class="food-ratings">
          	<dt class="ratings-header">
          	  <h1>商品评价</h1>
          	  <ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings" v-on:contentSelect="toggleContent" v-on:ratingSelect="ratingSelect"></ratingselect>
          	</dt>
          	<dd class="ratings-items" v-show="needShow(item.rateType,item.text) && (food.ratings && food.ratings.length)" v-for="item in food.ratings">
          	  <div class="ratings-info">
          	    <time>{{item.rateTime|changeDate}}</time>
          	    <img class="avatar" :src='item.avatar'/>
          	    <span class="user-id">{{item.username}}</span>
          	  </div>
          	  <p class="ratings-text"><span :class="{'icon-thumb_down':item.rateType===1,'icon-thumb_up':item.rateType===0}"></span>{{item.text}}</p>
          	</dd>
          	<div class="no-data" v-show="!food.ratings || !food.ratings.length">暂无评价！</div>
          </dl>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import cartcontrol from '../cartcontrol/cartcontrol'
  import ratingselect from '../ratingselect/ratingselect'
  import Vue from 'vue'
  
//  const POSITION = 0
//  const NEGATIVE = 1
  const ALL = 2

  export default {
    data () {
      return {
        foodflag: false,
        selectType: ALL,
        onlyContent: false,
        desc: {
          all: '全部',
          position: '推荐',
          negative: '吐槽'
        }
      }
    },
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      show () {
        this.selectType = ALL
        this.onlyContent = false
        this.foodflag = !this.foodflag
      },
      addOne () {
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
        } else {
          return
        }
      },
      add (el) {
        this.$emit('cart-add', event.target)
      },
      toggleContent (data) {
        this.onlyContent = data
      },
      ratingSelect (data) {
        this.selectType = data
      },
      needShow (type, text) {
//      console.log(type + ':' + this.onlyContent + ':' + !text)
        if (this.onlyContent && !text) {
          return false
        }
        if (this.selectType === ALL) {
          return true
        } else {
          return type === this.selectType
        }
      }
    },
    components: {
      cartcontrol,
      ratingselect
    }
  }
</script>
<style lang="scss" scoped="" type="text/css">

@import '../../common/scss/index.scss';

.food{
  position: fixed;
  left: 0;
  top: 0;
  bottom: 48px;
  width: 100%;
  text-align: left;
  overflow: scroll;
  z-index: 40;
  background-color: #f3f5f7;
  transition: all .3s linear;
  &.move-transition{
    transform: translate3d(0,0,0);
  }
  &.move-enter-active,&.move-leave-active{
    transform: translate3d(100%,0,0);
  }
 .food-content{
   .wrapper-top,.wrapper-middle{
     margin-bottom: 16px;
     background-color: white;
   }
   .wrapper-top{
     .img-wrapper{
       position: relative;
       left: 0;
       top: 0;
       width: 100%;
       height: 0;
       padding-top: 100%;
       .food-photo{
         position: absolute;
         top: 0;
         left: 0;
         width: 100%;
         height: 100%;
       }
       .back{
         display: block;
         position: absolute;
         left: 0;
         top: 10px;
         margin-left: 10px;
         padding: 5px;
         border:none;
         font-size: 20px;
         border-radius: 50%;
         background-color: rgba(7,17,27,.5);
         color: white;
       }
     }
     .food-detail {
       padding: 18px;
       overflow: hidden;
       @include border-1px(rgba(7, 17, 27, .1)) 
       .title {
         font-size: 14px;
         font-weight: 700;
         line-height: 14px;
         color: rgb(7, 17, 27);
       }
       .desc {
         margin-top: 8px;
         margin-bottom: 18px;
         font-size: 0;
         .sale-count,
         .sale-rating {
           font-size: 10px;
           line-height: 10px;
           color: rgb(147, 153, 159);
         }
         .sale-rating {
           margin-left: 12px;
         }
       }
       .price-wrapper {
         font-size: 0;
         float: left;
         .now-price {
           display: inline-block;
           margin-right: 8px;
           font-size: 14px;
           line-height: 24px;
           font-weight: 700;
           color: orangered;
           .price-doller {
             font-size: 10px;
             font-weight: normal;
             vertical-align: baseline;
           }
         }
         .old-price {
           font-size: 10px;
           line-height: 24px;
           font-weight: 700;
           color: rgb(147, 153, 159);
           font-weight: 700;
           line-height: 24px;
           vertical-align: super;
           .price-doller {
             font-weight: normal;
           }
         }
       }
       .control-wrapper{
         float: right;
         height: 25px;
         overflow: hidden;
         &.fade-transition{
           opacity: 1;
           transition: all .3s linear;
         }
         &.fade-enter-active,&.fade-leave-active{
           opacity: 0;
           transition: all .3s linear;
         }
         .control{
           margin-top: -6px;
         }
       }
       .buy{
         float: right;
         padding: 6px 12px;
         font-size: 10px;
         line-height: 12px;
         border:none;
         border-radius: 12px;
         background-color: rgb(0,160,220);
         color: white;
         &.fade-transition{
           opacity: 1;
           transition: all .3s linear;
         }
         &.fade-enter-active,&.fade-leave-active{
           opacity: 0;
           transition: all .3s linear;
         }
       }
     }
   }
   .wrapper-middle {
     padding: 18px;
     border-top: solid 1px rgba(7,17,27,.1);
     @include border-1px(rgba(7,17,27,.1));
     .title {
       font-size: 14px;
       color: rgb(7,17,27);
       line-height: 14px;
       font-weight: 500;
       margin-bottom: 6px;
     }
     .food-introduce {
       padding: 0 8px;
       font-size: 12px;
       line-height: 24px;
       font-weight: 200;
       color: rgb(77,85,93);
     }
   }
   .wrapper-bottom {
     background-color: #fff;
     .food-ratings {
       .ratings-header {
         padding: 18px 0 0 0;
         h1{
           font-size: 14px;
           color: rgb(7,17,27);
           line-height: 14px;
           font-weight: 500;
           padding: 0 18px;
         }
       }
       .ratings-items {
         padding: 18px;
           .ratings-info {
             overflow: hidden;
             time{
               float: left;
               font-size: 10px;
               line-height: 12px;
               color: rgb(147,153,159);
               margin-bottom: 6px;
             }
             .avatar{
               float: right;
               width: 12px;
               height: 12px;
               font-size: 0;
               margin-left: 6px;
               border:none;
               border-radius: 50%;
             }
             .user-id {
               float: right;
               font-size: 10px;
               line-height: 12px;
               color: rgb(147,153,159);
             }
         }
         .ratings-text {
           font-size: 12px;
           line-height: 16px;
           color: rgb(7,17,27);
           .icon-thumb_down{
             font-size: 12px;
             line-height: 24px;
             margin-right: 4px;
             color: rgb(147,153,159);
           }
           .icon-thumb_up{
             font-size: 12px;
             line-height: 24px;
             margin-right: 4px;
             color: rgb(0,160,220);
           }
         }
       }
       .no-data{
         padding: 16px 0;
         font-size: 12px;
         color: #787878;
         text-align: center;
       }
     }
   }
 }
}
</style>