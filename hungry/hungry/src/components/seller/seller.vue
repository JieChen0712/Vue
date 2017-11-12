<template>
	<div class="seller">
		<div class="seller-wrapper">
		  <div class="seller-inf">
		    <h1 class="title">{{seller.name}}</h1>
		    <div class="desc">
		      <div class="star-wrapper">
		        <star :size="36" :score="seller.score"></star>
		      </div>
		      <span class="count">({{seller.ratingCount}})</span>
		      <span class="count">月售{{seller.sellCount}}单</span>
		    </div>
		    <ul class="remark">
		      <li>
		        <p>起送价</p>
		        <p><span>{{seller.minPrice}}<small>元</small></span></p>
		      </li>
		      <li>
		        <p>商家配送</p>
            <p><span>{{seller.deliveryPrice}}<small>元</small></span></p>
		      </li>
		      <li>
		        <p>平均配送时间</p>
            <p><span>{{seller.deliveryTime}}<small>分钟</small></span></p>
		      </li>
		    </ul>
		    <div class="favorite" @click="favoriteChange">
          <span class="icon-favorite" :class="{'pink':favorite,'grey':!favorite}"></span>
          <span class="text" v-text="favoriteText"></span>
        </div>
		  </div>
		  <div class="seller-notic">
		    <h1 class="title">公告与活动</h1>
		    <p class="text">{{seller.bulletin}}</p>
		    <ul>
		    	<li v-for="list in seller.supports">
		    	  <p><i class="icon" :class="iconMap[list.type]"></i>{{list.description}}</p>
		    	</li>
		    </ul>
		  </div>
		  <div class="seller-img">
		    <h1 class="title">商家实景</h1>
		    <ul>
		      <li v-for="img in seller.pics"><img :src="img" alt="展示图片" /></li>
		    </ul>
		    
		  </div>
		  <div class="seller-detail">
		    <h1 class="title">商家信息</h1>
		    <p v-for="detail in seller.infos">{{detail}}</p>
		  </div>
		</div>
	</div>
</template>

<script type="text/ecmascript">
  import star from '../star/star'
  import {saveToLoacl,loadFromLocal} from '../../common/js/store'
  
	export default {
	  data () {
	    return {
	      iconMap: ['decrease','discount','special','invoice','guarantee'],
	      favorite: (() => {
	        return loadFromLocal(this.seller.id,'favorite',false)
	      })()
	    }
	  },
	  computed: {
	    favoriteText() {
	      return this.favorite?'已收藏':'收藏'
	    }
	  },
	  methods: {
	    favoriteChange () {
	      this.favorite = !this.favorite
	      console.log(this.seller)
	      saveToLoacl(this.seller.id, 'favorite', this.favorite)
	    }
	  },
	  props: {
	    seller: {
	      type:Object,
	      id:'123'
	    }
	  },
	  components: {
	    star
	  }
	};
</script>

<style lang="scss" scoped="" type="text/css">
@import '../../common/scss/index.scss';

.seller{
  position:absolute;
  top:178px;
  left:0;
  bottom:0;
  width:100%;
  background-color:#f3f5f7;
  overflow: scroll;
  .seller-wrapper{
    .title{
      text-align: left;
      font-size: 14px;
      line-height: 14px;
      margin-bottom: 8px;
      color: rgb(7,17,27);
    }
    .seller-inf{
      padding: 18px;
      background-color: white;
      @include border-1px(rgba(7,17,27,.1))
      .desc{
        overflow: hidden;
        padding-bottom: 18px;
        @include border-1px(rgba(7,17,27,.1))
        .star-wrapper{
          float: left;
          margin-right: 8px;
        }
        .count{
          float: left;
          font-size: 10px;
          line-height: 18px;
          color: rgb(77,85,93);
          margin-right: 12px;
        }
      }
      .remark{
        display: flex;
        padding: 18px 0 0;
        font-size: 0;
        li{
          flex: 1;
          border-right: solid 1px rgba(7,17,27,.1);
          &:last-child{
            border: none;
          }
          p{
            font-size:10px;
            line-height: 10px;
            color: rgb(147,153,159);
            span,small{
              font-weight: 200;
              line-height: 24px;
              color: rgb(7,17,27);
            }
            span{
              display: block;
              margin-top: 4px;
              font-size: 24px;
              small{
                font-size: 10px;
              }
            }
          }
        }
      }
    }
    .seller-notic{
      padding: 18px 18px 0;
      margin: 18px 0;
      background-color: white;
      border-top: solid 1px rgba(7,17,27,.1);
      @include border-1px(rgba(7,17,27,.1))
      .text{
        margin: 0 6px 16px;
        text-align: left;
        font-size: 12px;
        font-weight: 200;
        line-height: 24px;
        color: rgb(240,20,20);
      }
      ul{
        li{
          padding: 18px 0;
          text-align: left;
          border-top: solid 1px rgba(7,17,27,.1);
          p{
            font-size: 12px;
            font-weight: 200;
            line-height: 16px;
            color: rgb(7,17,27);
            .icon{
              display: inline-block;
              width: 16px;
              height: 16px;
              margin: 0 6px 0 12px;
              vertical-align: middle;
              background-size: 16px 16px;
              background-repeat: no-repeat;
              &.decrease {
                @include bg-image('decrease_3');
              }
              &.discount {
                @include bg-image('discount_3');
              }
              &.guarantee {
                @include bg-image('guarantee_3');
              }
              &.invoice {
                @include bg-image('invoice_3');
              }
              &.special {
                @include bg-image('special_3');
              }
            }
          }
        }
      }
    }
    .seller-img{
      padding: 18px 18px;
      background-color: white;
      border-top: solid 1px rgba(7,17,27,.1);
      margin-bottom: 18px;
      @include border-1px(rgba(7,17,27,.1))
      ul{
        display:flex;
        width: 100%;
        overflow-y: hidden;
        overflow-x: scroll;
        li{
          flex: 0 0 120px;
          height: 90px;
          margin-right: 6px;
          img{
            width: 100%;
            height: 90px;
          }
        }
      }
    }
    .seller-detail{
      padding: 18px 18px;
      background-color: white;
      border-top: solid 1px rgba(7,17,27,.1);
      @include border-1px(rgba(7,17,27,.1))
      p{
        text-align: left;
        font-size: 12px;
        font-weight: 200;
        line-height: 18px;
        border-top: solid 1px rgba(7,17,27,.1);
        padding: 16px 12px;
        color: rgb(7,17,27);
      }
    }
    .favorite{
      position: absolute;
      width: 30px;
      top: 18px;
      right: 18px;
      float: right;
      color: rgb(77,85,93);
      .icon-favorite{
        display: block;
        font-size: 24px;
        line-height: 24px;
      }
      .grey{
        color: rgb(147,153,159);
      }
      .pink{
        color: rgb(240,20,20);
      }
      .text{
        line-height: 10px;
        font-size: 10px;
      }
    }
  }
}
</style>