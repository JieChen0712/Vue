<template>
  <div class="ratingselect">
    <div class="rating-type">
      <span class="span-bg blue" @click="select(2,$event)" :class="{active:selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span class="span-bg lblue" @click="select(0,$event)" :class="{active:selectType===0}">{{desc.position}}<span class="count">{{positives.length}}</span></span>
      <span class="span-bg grey" @click="select(1,$event)" :class="{active:selectType===1}">{{desc.negative}}<span class="count"></span>{{negatives.length}}</span>
    </div>
    <div class="switch">
      <p><i class="icon-check_circle" @click="toggleContent" :class="{active:onlyContent}"></i>只看有内容的评价</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const POSITION = 0
  const NEGATIVE = 1
  const ALL = 2

  export default {
    props: {
      ratings: {
        type: Array,
        default () {
          return []
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default () {
          return {
            all: '全部',
            position: '满意',
            negative: '不满意'
          }
        }
      }
    },
    methods: {
      toggleContent (event) {
        let onlyContent = !this.onlyContent
        this.$emit('contentSelect', onlyContent)
      },
      select (type, event) {
        this.$emit('ratingSelect', type)
      }
    },
    computed: {
      positives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITION
        })
      },
      negatives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE
        })
      }
    }
  }
</script>

<style lang="scss" scoped="" type="text/css">
  @import '../../common/scss/index.scss';
  .ratingselect{
    font-size: 0;
    text-align:left;
    background-color: #fff;
    @include border-1px(rgba(7,17,27,.1));
    .rating-type{
      padding: 18px 0;
      margin: 0 18px;
      @include border-1px(rgba(7,17,27,.1));
      .span-bg{
        display: inline-block;
        font-size: 12px;
        line-height: 16px;
        padding: 8px 12px;
        margin-right: 8px;
        border-radius: 2px;
        border: none;
        color: rgb(77,85,93);
        .count{
          font-size: 8px;
          margin-left:5px;
        }
        &.active{
          color: #fff;
        }
        &.blue{
          background-color: rgba(0,160,220,.4);
          &.active{
            background-color: rgb(0,160,220);
          }
        }
        &.lblue{
          background-color: rgba(0,160,220,.2);
          &.active{
            background-color: rgb(0,160,220);
          }
        }
        &.grey{
          background-color: rgba(77,85,93,.2);
          &.active{
            background-color: rgb(77,85,93);
          }
        }
      }
    } 
    .switch{
      p{
        padding: 12px 18px;
        font-size: 12px;
        line-height: 24px;
        color: rgb(147,153,159);
        .icon-check_circle{
          display: inline-block;
          font-size: 24px;
          line-height: 24px;
          margin-right: 4px;
          vertical-align: top;
          color: rgb(147,153,159);
          &.active{
            color: #00c850;
          }
        }
      }
    }
  }
</style>