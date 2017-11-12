<template>
	<div class="ratings">
		<div class="ratings-content">
		  <div class="overview">
		    <div class="score">
		      <span class="total-score" v-text="seller.score"></span>
		      <span class="total-desc">综合评分</span>
		      <span class="total-compare" v-text="'高于周边商家'+seller.rankRate+'%'"></span>
		    </div>
		    <div class="star">
		      <div class="server-score">
		        <span class="title">服务态度</span>
		        <div class="star-wrapper">
		          <star :size="36" :score="seller.serviceScore"></star>
		        </div>
		        <span class="text" v-text="seller.serviceScore"></span>
		      </div>
		      <div class="food-score">
		        <span class="title">美食评分</span>
            <div class="star-wrapper">
              <star :size="36" :score="seller.foodScore"></star>
            </div>
            <span class="text" v-text="seller.foodScore"></span>
		      </div>
		      <div class="delivery-time">
		        <span class="title">送达时间</span>
		        <span class="time" v-text="seller.deliveryTime + '分钟'"></span>
		      </div>
		    </div>
		  </div>
		  <div class="rs-wrapper">
        <ratingselect :select-type="selectType" :only-content="onlyContent" :ratings="ratings" v-on:contentSelect="toggleContent" v-on:ratingSelect="ratingSelect"></ratingselect>
		    <div class="rs-discuss">
		      <ul>
		        <li v-for="list in ratings" class="discuss-list" v-show="needShow(list.rateType,list.text) && (ratings && ratings.length)">
		          <div class="avatar">
		            <img :src="list.avatar" alt="" />
		          </div>
		          <div class="content">
		            <p class="user-name"><span class="name" v-text="list.username"></span><span class="update">{{list.rateTime|changeDate}}</span></p>
		            <p class="star-wrapper"><star :size="24" :score="list.score" class="star"></star><span class="delivery-time" v-show="list.deliveryTime" v-text="list.deliveryTime +'分钟送达'"></span></p>
		            <p class="text" v-text="list.text"></p>
		            <div class="rateType">
		              <i :class="{'icon-thumb_down':list.rateType===1,'icon-thumb_up':list.rateType===0}"></i>
		              <div class="recommend-wrapper">
		                <div v-for="rec in list.recommend" class="recommend" v-show="list.recommend" v-text="rec"></div>
		              </div>
		            </div>
		          </div>
		        </li>
		      </ul>
		    </div>
		  </div>
		  
		</div>
	</div>
</template>

<script type="text/ecmascript">
  import star from '../star/star'
  import ratingselect from '../ratingselect/ratingselect'
  
  const ALL = 2
  const ERR_OK = 0
	export default {
	  data () {
	    return {
	      ratings: [],
        selectType: ALL,
        onlyContent: false,
	    }
	  },
	  props: {
	    seller: {
	      type: Object
	    }
	  },
	  created () {
	    this.$http.get('/api/ratings')
	      .then( response => {
	        if (response.data.errno == ERR_OK) {
	          this.ratings = response.data.data
	        }
	      })
	      .catch( error => {
	        console.log(error)
	      })
	  },
	  methods: {
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
	    star,
	    ratingselect
	  }
	}
</script>

<style lang="scss" scoped="" type="text/css">
@import '../../common/scss/index.scss';

.ratings{
  position: absolute;
  left: 0;
  top: 178px;
  bottom: 0;
  width: 100%;
  background-color: #f3f5f7;
  overflow: scroll;
  .overview{
    display: flex;
    padding:18px 0;
    background-color: #fff;
    margin-bottom: 16px;
    border-bottom: solid 1px rgba(7,17,27,.1);
    box-sizing: border-box;
    .score{
      flex:  0 0 137px;
      font-size: 0;
      border-right: solid 1px rgba(7,17,27,.1);
      span{
        display: block;
      }
      .total-score{
        font-size: 24px;
        line-height: 28px;
        color: rgb(255,153,0);
        margin-bottom: 6px;
      }
      .total-desc{
        font-size: 12px;
        line-height: 12px;
        color: rgb(7,17,27);
        margin-bottom: 8px;
      }
      .total-compare{
        font-size: 10px;
        line-height: 10px;
        color: rgb(147,153,159);
        margin-bottom: 6px;
      }
    }
    .star{
      flex: 1;
      padding: 0 0 0 12px;
      font-size: 12px;
      line-height: 18px;
      text-align: left;
      @media only screen and (max-width:320px){
        padding: 0 0 0 6px;
      }
      .server-score,.food-score{
        margin-bottom: 8px;
        .title{
          color: rgb(7,17,27);
        }
        .star-wrapper{
          display: inline-block;
          vertical-align: top;
        }
        .text{
          margin-left: 12px;
          color: rgb(255,153,0);
          @media only screen and (max-width:320px){
            margin-left: 0;
          }
        }
      }
      .delivery-time{
        .title{
          color: rgb(7,17,27);
        }
        .time{
          margin-left: 12px;
          color: rgb(147,153,159);
        }
      }
    }
  }
  .rs-wrapper{
    .rs-discuss{
      background-color: white;
      .discuss-list{
        display: flex;
        padding: 18px;
        @include border-1px(rgba(7, 17, 27, .1)) 
        .avatar{
          flex:0 0 28px;
          margin-right:12px;
          img{
            width: 100%;
            border: none;
            border-radius: 50%;
          }
        }
        .content{
          flex: 1;
          text-align: left;
          .user-name{
            margin-bottom: 4px;
            font-size: 10px;
            line-height: 12px;
            overflow:hidden;
            .name{
              float: left;
              color: rgb(7,17,27);
            }
            .update{
              float: right;
              font-weight: 200;
              color: rgb(147,153,159);
            }
          }
          .star-wrapper{
            margin-bottom: 6px;
            overflow: hidden;
            .star{
              float: left;
              margin-right: 6px;
            }
            .delivery-time{
              float: left;
              font-size: 10px;
              line-height: 12px;
              font-weight: 200;
              color: rgb(147,153,159);
            }
          }
          .text{
            font-size: 12px;
            line-height: 18px;
          }
          .rateType{
            display: flex;
            font-size: 0;
            overflow: hidden;
            .icon-thumb_down,.icon-thumb_up{
              font-size: 12px;
              line-height: 16px;
              margin-top: 8px;
              float: left;
            }
            .icon-thumb_down{
              color: rgb(183,187,191);
            }
            .icon-thumb_up{
              color: rgb(0,160,220);
            }
            .recommend-wrapper{
              float: left;
              display: inline-block;
              .recommend{
                display: inline-block;
                margin: 8px 8px 0 8px;
                padding: 0 6px;
                border: solid 1px rgba(7,17,27,.1);
                border-radius: 2px;
                font-size: 9px;
                color: rgb(147,153,159);
                line-height: 16px;
              }
            }
          }
        }
      }
    }
  }
}
</style>