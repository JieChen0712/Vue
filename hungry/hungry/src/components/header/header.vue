<template>
  <div class="header">
    <div class="top-wrapper">
      <div class="left-content">
        <img :src="seller.avatar" width="64" height="64">
      </div>
      <div class="middle-content">
        <p class="band"><span class="icon-band"></span>{{seller.name}}</p>
        <p class="express">{{seller.description}}/{{seller.deliveryTime}}分钟到达</p>
        <p class="discount" v-if="seller.supports"><span class="icon" :class="supportsMap[seller.supports[0].type]"></span>{{seller.supports[0].type}}{{seller.supports[0].description}}</p>
      </div>
      <div class="right-content" v-if="seller.supports"><span class="count" @click="showDetail">{{seller.supports.length}}个<i>></i></span></div>
    </div>
    <div class="bottom-wrapper" @click="showDetail">
      <span class="bulletin-icon"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i>></i>
    </div>
    <div class="bg">
      <img :src="seller.avatar" alt="" width="100%" height="100%" />
    </div>
    <transition name="fade">
    <div v-show="detailShow" class="detail-mask">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <div class="seller-title">
            <p>{{seller.name}}</p>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
          </div>
          <div class="seller-main">
            <div class="seller-inf">
              <div class="line"></div>
              <div class="inf-title">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="supports-item" v-for="(types,index) in seller.supports">
            	  <p class="description"><span class="icon" :class="supportsMap[seller.supports[index].type]"></span>{{seller.supports[index].description}}</p>
            	</li>
            </ul>
          </div>
          <div class="seller-notic">
            <div class="notic-title">
              <div class="line"></div>
              <div class="inf-title">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="notic-detail">
              <p>{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="hideDetail">
        <i class="icon-close"></i>
      </div>
    </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from '../star/star'

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        detailShow: false
      }
    },
    methods: {
      showDetail () {
        this.detailShow = true
      },
      hideDetail () {
        this.detailShow = false
      }
    },
    mounted () {
      this.supportsMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
    },
    components: {
      star
    }
  }
</script>

<style lang="scss" scoped="" type="text/css">
  @import '../../common/scss/index.scss';
  .header {
    position: relative;
    color: white;
    background-color: rgba(7, 17, 27, .5);
    .top-wrapper {
      display: flex;
      padding: 24px 12px 18px;
      .left-content {
        flex: 1;
        margin-right: 16px;
        img {
          min-width: 64px;
          min-height: 64px;
          border-radius: 4px;
        }
      }
      .middle-content {
        flex: 3;
        p {
          width: 100%;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          text-align: left;
          color: white;
        }
        .band {
          font-size: 16px;
          line-height: 16px;
          margin-top: 2px;
          margin-bottom: 8px;
          font-weight: bold;
          .icon-band {
            display: inline-block;
            width: 30px;
            height: 18px;
            margin-right: 6px;
            @include bg-image('brand');
            background-size: 30px 18px;
            background-repeat: no-repeat;
            vertical-align: bottom;
          }
        }
        .express {
          margin-bottom: 10px;
          font-size: 12px;
          font-weight: 200;
          line-height: 12px;
        }
        .discount {
          font-size: 12px;
          line-height: 12px;
          .icon {
            display: inline-block;
            width: 12px;
            height: 12px;
            margin: 0 4px 2px 0;
            vertical-align: middle;
            background-size: 12px 12px;
            background-repeat: no-repeat;
            &.decrease {
              @include bg-image('decrease_1');
            }
            &.discount {
              @include bg-image('discount_1');
            }
            &.guarantee {
              @include bg-image('guarantee_1');
            }
            &.invoice {
              @include bg-image('invoice_1');
            }
            &.special {
              @include bg-image('special_1');
            }
          }
        }
      }
      .right-content {
        flex: .8;
        position: relative;
        font-size: 10px;
        font-weight: 200;
        line-height: 10px;
        .count {
          position: absolute;
          bottom: 0;
          padding: 7px 8px;
          left: 0;
          height: 24px;
          font-size: 10px;
          color: white;
          line-height: 12px;
          background-color: rgba(0, 0, 0, .2);
          border-radius: 12px;
          i {
            margin-left: 2px;
          }
        }
      }
    }
    .bottom-wrapper {
      display: flex;
      height: 28px;
      padding: 0 12px;
      background-color: rgba(7, 17, 27, .2);
      font-size: 0;
      .bulletin-icon {
        flex: 8;
        margin-top: 8px;
        vertical-align: top;
        min-width: 22px;
        width: 8%;
        height: 12px;
        background-size: 22px 12px;
        background-repeat: no-repeat;
        @include bg-image('bulletin');
        line-height: 28px;
      }
      .bulletin-text {
        flex: 88;
        font-size: 10px;
        line-height: 28px;
        margin: 0 4px;
        text-align: left;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      i {
        flex: 4;
        width: 2%;
        font-size: 10px;
        line-height: 28px;
        vertical-align: top;
      }
    }
    .bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      z-index: -1;
      filter: blur(10px);
    }
    .detail-mask {
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 100;
      background-color: rgba(7, 17, 27, .8);
      overflow: auto;
      transition: .5s all ease;
      backdrop-filter: blur(10px);
      &.fade-transition{
        opacity: 1;
        background-color: rgba(7,17,27,.8);
      }
      /* 可以设置不同的进入和离开动画 */
      /* 设置持续时间和动画函数 */
      &.fade-enter-active,&.fade-leave-active {
        opacity: 0;
        background-color: rgba(7,17,27,0);
      }
      .detail-wrapper {
        min-height: 100%;
        width: 100%;
        .detail-main {
          margin-top: 64px;
          padding: 0 36px 64px;
          .seller-title {
            font-size: 0;
            color: white;
            p {
              font-size: 16px;
              font-weight: 700;
              line-height: 32px;
              text-align: center;
            }
            .star-wrapper {
              margin-top: 16px;
              padding: 2px 0;
              margin-bottom: 28px;
              text-align: center;
            }
          }
          .seller-main {
            .seller-inf {
              display: flex;
              font-size: 0;
              margin-bottom: 24px;
              .line {
                flex: 1;
                position: relative;
                top: -6px;
                border-bottom: solid 1px rgba(255, 255, 255, .2);
              }
              .inf-title {
                padding: 0 12px;
                font-size: 14px;
                font-weight: 700;
              }
            }
            .supports {
              width: 100%;
              margin-bottom: 28px;
              .supports-item {
                &:last-child{
                  margin-bottom: 0;
                }
                .description {
                  text-align: left;
                  font-size: 12px;
                  font-weight: 200;
                  line-height: 12px;
                  margin-bottom: 12px;
                  .icon {
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    margin: 0 6px 0 12px;
                    vertical-align: bottom;
                    background-size: 16px 16px;
                    background-repeat: no-repeat;
                    &.decrease {
                      @include bg-image('decrease_2');
                    }
                    &.discount {
                      @include bg-image('discount_2');
                    }
                    &.guarantee {
                      @include bg-image('guarantee_2');
                    }
                    &.invoice {
                      @include bg-image('invoice_2');
                    }
                    &.special {
                      @include bg-image('special_2');
                    }
                  }
                }
              }
            }
          }
          .seller-notic{
            .notic-title{
              display: flex;
              font-size: 0;
              margin-bottom: 24px;
              .line {
                flex: 1;
                position: relative;
                top: -6px;
                border-bottom: solid 1px rgba(255, 255, 255, .2);
              }
              .inf-title {
                padding: 0 12px;
                font-size: 14px;
                font-weight: 700;
              }
            }
            .notic-detail{
              margin: 0 12px;
              p{
                font-size: 12px;
                font-weight: 200;
                line-height: 24px;
                text-align: left;
              }
            }
          }
        }
      }
      .detail-close {
        position: relative;
        width: 32px;
        height: 32px;
        font-size: 32px;
        line-height: 32px;
        color: rgba(255, 255, 255, .5);
        margin: -64px auto 0 auto;
        clear: both;
      }
    }
  }
</style>