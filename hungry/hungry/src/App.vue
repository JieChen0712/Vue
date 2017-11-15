<template>
	<div id="app">
		<v-header :seller="seller"></v-header>
		<div class="tabs">
			<div class="tab-items">
				<router-link  @click.native="getGoods()" to="/goods">商品</router-link>
			</div>
			<div class="tab-items">
				<router-link  @click.native="getRatings()" to="/ratings">评价</router-link>
			</div>
			<div class="tab-items">
				<router-link @click.native="getSeller()" to="/seller">商家</router-link>
			</div>
		</div>
		<keep-alive><router-view :seller="seller"></router-view></keep-alive>
	</div>
</template>

<script type="text/ecmascript">
import header from './components/header/header'

const ERR_OK = 0

export default {
  name: 'App',
  data () {
    return {
      seller: {},
      goods: {},
      ratings: {}
    }
  },
  components: {
    'v-header': header
  },
  mounted () {
      this.$http.get('/api/seller')
        .then( response => {
          if(response.data.errno == ERR_OK){
            this.seller = response.data.data
          }
        }).catch(function (error) {
          console.log(error)
        })
  },
  methods: {
    getSeller () {
      this.$http.get('/api/seller')
        .then( response => {
          if (response.data.errno === ERR_OK) {
            return response.data
          }
        }).catch( error => {
          console.log(error)
        })
    },
    getGoods () {
      this.$http.get('/api/goods')
        .then( response => {
          if (response.data.errno === ERR_OK) {  // 判断返回的错误码是否正确
            console.log(response.data)  // 正确就输出数据
//          this.goods = response.data.data
          }
        }).catch( error => {  // 请求失败就返回状态信息
          console.log(error)
        })
    },
    getRatings () {
      this.$http.get('/api/ratings')
        .then( response => {
          if (response.data.errno === ERR_OK) {
            console.log(response.data)
          }
        }).catch( error => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="scss" scoped="" type="text/css">

	@import './common/scss/index.scss';
	
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		.tabs {
			display: flex;
			height: 40px;
			line-height: 40px;
			background-color:#fff;
			@include border-1px(rgba(7,17,27,.1))
			.tab-items {
				flex: 1;
				text-align: center;
				a{
					display: block;
					font-size: 14px;
					color: rgb(77,85,93);
				}
				&>.active{
					color: rgb(240,20,20);
				}
			}
		}
	}
</style>