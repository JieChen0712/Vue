<template>
	<div class="goods">
		<div class="menu-wrapper">
		  <ul class="menu-list">
		  	<li v-for="(items,index) in goods" v-show="goods.length>0" class="menu-item" @click="scroll_to(index)" :data-id="index">
  		  	  <span class="menu-text border-1px">
  		  	    <span v-show="items.type>0" class="icon" :class="supportsMap[items.type]"></span>
  		  	    <span v-text="items.name"></span>
  		  	  </span>
		  	</li>
		  </ul>
		</div>
		<div class="foods-wrapper" @scroll="menu_AddActive">
		  <ul>
		  	<li v-for="items in goods" v-show="goods.length>0" class="foods-list">
		  	  <h1 class="item-title">{{items.name}}</h1>
		  	  <ul>
		  	  	<li v-for="foods in items.foods" class="foods-item border-1px" @click="selectedFood(foods)">
		  	  	  <div class="icon">
		  	  	    <img width="57" height="57" :src="foods.icon" alt="" />
		  	  	  </div>
		  	  	  <div class="foods-content">
		  	  	    <h2 class="foods-name">{{foods.name}}</h2>
		  	  	    <p class="foods-description">{{foods.description}}</p>
		  	  	    <div class="foods-extra">
		  	  	      <span class="">月售{{foods.sellCount}}份</span>
		  	  	      <span class="">好评率{{foods.rating}}%</span>
		  	  	    </div>
		  	  	    <div class="foods-price">
		  	  	      <p class="now-price"><span class="price-doller">￥</span>{{foods.price}}</p>
		  	  	      <del class="old-price" v-show="foods.oldPrice"><span class="price-doller">￥</span>{{foods.oldPrice}}</del>
		  	  	    </div>
		  	  	    <div class="control-wrapper">
		  	  	      <cartcontrol :food="foods" v-on:cart-add="add"></cartcontrol>
		  	  	    </div>
		  	  	  </div>
		  	  	</li>
		  	  </ul>
		  	</li>
		  </ul>
		</div>
    <shopcart ref="shopcart" :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
	  <food :food="selectFood" ref="food" v-on:cart-add="add"></food>
	</div>
</template>

<script type="text/ecmascript">
  import shopcart from '../shopcart/shopcart'
  import cartcontrol from '../cartcontrol/cartcontrol'
  import food from '../food/food'
  
  const ERR_OK = 0
  
	export default {
	  props: {
      seller: {
        type: Object
      }
    },
	  data () {
	    return {
	      goods: {
	        type: Array
	      },
	      supportsMap: [],
	      selectFood: {},
	      is_scroll:false
	    }
	  },
	  created () {
	    this.supportsMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
	    this.$http.get('/api/goods')
  	    .then( response => {
  	      if(response.data.errno == ERR_OK){
	          this.goods = response.data.data
  	      }
  	    })
  	    .catch( error => {
  	      console.log(error)
  	    })
	  },
	  methods: {
	    scroll_to (num) {
	      if(this.is_scroll){
	        return
	      }
	      this.is_scroll = !this.is_scroll
	      let menu_item = document.getElementsByClassName('menu-item')
	      let food_list = document.getElementsByClassName('foods-list')
	      let food_wrapper = document.getElementsByClassName('foods-wrapper')
        let scrollHeight = 0
        let count = 0;
        for(let i = 0; i < num; i++) {
          scrollHeight += food_list[i].offsetHeight
        }
        let timer = setInterval(() => {
          let speed = Math.round((Math.abs((Math.abs(food_wrapper[0].scrollTop) - Math.abs(scrollHeight)) * 1) / 5.00))
          if(food_wrapper[0].scrollTop > scrollHeight) {
            food_wrapper[0].scrollTop = food_wrapper[0].scrollTop - speed
          } else {
            food_wrapper[0].scrollTop = food_wrapper[0].scrollTop + speed
          }
          if(speed == 0) {
            clearInterval(timer)
            this.is_scroll = !this.is_scroll
          }
        }, 50);//	      food_wrapper[0].scrollTop = scrollHeight
	      menu_item[num].classList.add('active')
	    },
	    menu_AddActive () {
	      let food_wrapper = document.getElementsByClassName('foods-wrapper')[0]
	      let food_list = document.getElementsByClassName('foods-list')
	      let menu_item = document.getElementsByClassName('menu-item')
	      let temp = []
	      for(let i = 0;i < food_list.length;i++ ){
	        var num = 0;
	        for(let j =0;j < i;j++ ){
	          num+=food_list[j].offsetHeight
	        }
	        temp.push(num);
	      }
	      let top = Math.floor(food_wrapper.scrollTop)
	      for(let i = 0;i<temp.length;i++){
	        if(top > (temp[i] - 50) && top < (temp[i] + 50)){
	          for(let j = 0;j<temp.length;j++){
	             menu_item[j].classList.remove('active');
	          }
	          menu_item[i].classList.add('active'); 
	        }
	      }
	    },
	    add (el) {
	      this.$nextTick(() => {
	        this.$refs['shopcart'].jump(el)
	      })
	    },
	    selectedFood (foods) {
	      console.log('click')
	      this.selectFood = foods
        this.$refs.food.show()
	    }
	  },
	  mounted () {
      document.querySelector('.menu-item').classList.add('active')
    },
    computed: {
      selectFoods () {
        let foods = []
        for(let i = 0;i < this.goods.length;i++){
          let good = this.goods[i]
          for(let j = 0;j < good.foods.length;j++){
            let food = good.foods[j]
            if(food.count){
              foods.push(food)
            }
          }
        }
        return foods
      }
    },
	  components: {
	    shopcart,
	    cartcontrol,
	    food
	  }
	};
</script>

<style lang="scss" scoped="" type="text/css">
@import '../../common/scss/index.scss';

.goods{
  display: flex;
  position: absolute;
  width: 100%;
  top: 178px;
  bottom: 46px;
  overflow: hidden;
  .menu-wrapper{
    flex: 0 0 80px;
    width: 80px;
    background-color: #f3f5f7;
    overflow:auto;
    .menu-list{
      .menu-item{
        display: table;
        height: 54px;
        width: 100%;
        padding: 0 12px;
        line-height: 14px;
        transition:all .2s ease;
        background-color: #f3f5f7;
        &.active{
          border: none;
          color: black;
          transition:all .2s ease;
          background-color: white;
          span{
            font-weight: 700;
          }
        }
        .menu-text{
          display:table-cell;
          font-size: 12px;
          font-weight: 200;
          vertical-align:middle;
          @include border-1px(rgba(7,17,27,.1))
          .icon{
            display: inline-block;
            width: 12px;
            height: 12px;
            margin: 0 4px 2px 0;
            vertical-align: middle;
            background-size: 12px 12px;
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
  .foods-wrapper{
    flex: 1;
    overflow:auto;
    .foods-list{
      .item-title{
        padding-left: 14px;
        height: 28px;
        line-height: 26px;
        border-left: #d9dde1 solid 2px;
        text-align: left;
        font-size: 12px;
        color:rgb(147,153,159);
        background-color: #f3f5f7;
      }
      .foods-item{
        display: flex;
        margin: 18px 18px 0;
        padding-bottom: 18px;
        text-align: left;
        @include border-1px(rgba(7,17,27,.1))
        &:last-child{
          @include border-none()
        }
        .icon{
          flex: 0 0 57px;
         margin-right: 10px;
        }
        .foods-content{
          flex: 1;
          .foods-name{
            font-size: 14px;
            color: rgb(7,17,27);
            line-height: 14px;
            margin-top: 2px;
          }
          .foods-description,.foods-extra{
            font-size: 10px;
            color: rgb(147,153,159);
            line-height: 10px;
          }
          .foods-description{
            /*max-width: 200px;*/
            margin: 8px 0;
            /*white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;*/
          }
          .foods-extra{
            margin-bottom: 8px;
          }
          .foods-price{
            font-size: 0;
            .now-price{
              display: inline-block;
              margin-right: 8px;
              font-size: 14px;
              line-height: 24px;
              font-weight: 700;
              color: orangered;
              .price-doller{
                font-size: 10px;
                font-weight: normal;
                vertical-align: bottom;
              }
            }
            .old-price{
              font-size: 10px;
              line-height: 24px;
              font-weight: 700;
              color: rgb(147,153,159);
              font-weight: 700;
              line-height: 48px;
              .price-doller{
                font-weight: normal;
              }
            }
          }
          .control-wrapper{
            position: absolute;
            right: 0;
            bottom: 12px;
          }
        }
      }
    }
  }
}
</style>