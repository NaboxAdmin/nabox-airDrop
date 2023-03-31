<template>
  <div>
    <!-- :style="{'background-color': headerColor}"-->
    <div class="header-cont">
      <div @click="$route.path !== '/index' && $router.push('/')" class="logo-cont cursor-pointer">
        <img src="@/assets/image/ParaBox.svg" alt="">
      </div>
      <div class="address-cont d-flex align-items-center">
        <div class="address-detail" v-if="!showConnect && !showSign && address">
          <div class="d-flex align-items-center cursor-pointer" @click.stop="showDropClick">
            <span class="chain-icon mr-2">
              <img :src="getPicture(this.fromNetwork)" @error="pictureError" alt="">
            </span>
          </div>
<!--          <div class="space-cont"/>-->
          <div class="d-flex address-container" @click="showAccount=true">
            <span class="size-24 cursor-pointer">{{ superLong(!isLiquidity && address || nerveAddress) }}</span>
          </div>
          <div class="network-list size-28 d-flex direction-column" v-if="false">
            <span class="mt-2 cursor-pointer d-flex align-items-center"
                  v-for="(item, index) in l1ChainList"
                  @click="chainClick(item)"
                  :class="{'active_chain': item.chainName === currentChain}"
                  :key="index">
              <span class="chain-icon mr-2">
                <img :src="getPicture(item.chainName)" @error="pictureError" alt="">
              </span>
              {{ item.chainName }}
            </span>
          </div>
        </div>
        <template>
          <div class="header-icon_position" v-if="!address"/>
          <div class="header-icon cursor-pointer" v-else @click="showClick">
            <svg t="1626839125971" class="icon" viewBox="0 0 1170 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1764" width="16" height="16"><path d="M1097.142857 146.285714H73.142857a73.142857 73.142857 0 0 1 0-146.285714h1024a73.142857 73.142857 0 0 1 0 146.285714zM1097.142857 585.142857H73.142857a73.142857 73.142857 0 0 1 0-146.285714h1024a73.142857 73.142857 0 0 1 0 146.285714zM1097.142857 1024H73.142857a73.142857 73.142857 0 0 1 0-146.285714h1024a73.142857 73.142857 0 0 1 0 146.285714z" fill="#333333" p-id="1765"></path></svg>
          </div>
        </template>
      </div>
    </div>
    <div class="position-cont" />
    <div class="main-cont" :class="{'p-3': isSwap}">
      <slot/>
      <Pop :show="showPop"/>
      <pop-up :prevent-boo="false" @maskClick="showAccount=false" :show="showAccount">
        <div @click.stop class="address-detail_pop">
          <div class="customer-p">
            <div class="icon-cont d-flex justify-content-end">
            <span class="cursor-pointer" @click="showAccount=false">
              <svg t="1626838971768" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1604" width="14" height="14"><path d="M602.476163 514.068707l403.54275-403.54275A64.199983 64.199983 0 0 0 913.937795 19.178553l-403.54275 403.54275L110.154008 19.178553A64.199983 64.199983 0 0 0 18.806604 110.525957l403.54275 403.54275-403.54275 403.54275A64.199983 64.199983 0 0 0 110.154008 1004.923434l403.54275-403.54275 403.54275 403.54275a64.199983 64.199983 0 0 0 90.61369-90.613691z" fill="#333333" p-id="1605"></path></svg>
            </span>
            </div>
            <div class="account-cont mt-4">
              <div class="account-info_pop">
                <span class="size-32 flex-1">{{ superLong(address) }}</span>
                <div>
                  <span class="icon_pop ml-4 cursor-pointer" @click.stop="toBrowser(fromNetwork, address)">
                  <svg t="1626845948779" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2998" width="16" height="16"><path d="M971.034483 576.264828a52.965517 52.965517 0 0 0-52.965517 52.965517v271.183448a17.655172 17.655172 0 0 1-17.655173 17.655173h-776.827586a17.655172 17.655172 0 0 1-17.655173-17.655173v-776.827586a17.655172 17.655172 0 0 1 17.655173-17.655173h270.830345a52.965517 52.965517 0 0 0 0-105.931034H123.586207A123.586207 123.586207 0 0 0 0 123.586207v776.827586A123.586207 123.586207 0 0 0 123.586207 1024h776.827586a123.586207 123.586207 0 0 0 123.586207-123.586207v-271.183448a52.965517 52.965517 0 0 0-52.965517-52.965517z" fill="#656A7D" p-id="2999"></path><path d="M953.37931 0h-233.754482a52.965517 52.965517 0 0 0 0 105.931034h123.586206L462.212414 486.929655a52.965517 52.965517 0 0 0 37.428965 90.394483 53.318621 53.318621 0 0 0 37.428966-15.536552L918.068966 180.788966v123.586206a52.965517 52.965517 0 0 0 105.931034 0V70.62069a70.62069 70.62069 0 0 0-70.62069-70.62069z" fill="#656A7D" p-id="3000"></path></svg>
                </span>
                  <span class="icon_pop ml-4 cursor-pointer" @click.stop="copy(address)">
                  <svg t="1626840038256" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2793" width="16" height="16"><path d="M637.631045 268.991045h-519.641791A117.683582 117.683582 0 0 0 0 386.368955v519.641791a117.989254 117.989254 0 0 0 117.683582 117.989254h519.641791a117.683582 117.683582 0 0 0 117.377911-117.683582v-519.641791a117.37791 117.37791 0 0 0-117.072239-117.683582z m25.676418 637.325373a25.98209 25.98209 0 0 1-25.676418 25.982089h-519.641791a25.98209 25.98209 0 0 1-26.287761-25.982089v-519.641791a25.98209 25.98209 0 0 1 25.982089-25.676418h519.641791a25.98209 25.98209 0 0 1 25.676418 25.676418z" fill="#656A7D" p-id="2794"></path><path d="M906.316418 0H404.403582a117.989254 117.989254 0 0 0-117.683582 117.683582v28.733134h91.701493v-28.733134a25.98209 25.98209 0 0 1 25.982089-25.982089h501.912836a25.98209 25.98209 0 0 1 25.982089 25.982089v501.912836a25.98209 25.98209 0 0 1-25.982089 25.982089h-28.733134v91.701493h28.733134a117.989254 117.989254 0 0 0 117.683582-117.683582V117.683582A117.989254 117.989254 0 0 0 906.316418 0z" fill="#656A7D" p-id="2795"></path></svg>
                </span>
                  <span class="icon_pop ml-4 cursor-pointer"  @click.stop="disConnect">
                  <svg t="1626845988453" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3167" width="16" height="16"><path d="M821.32629 141.016949a46.489104 46.489104 0 1 0-58.886199 72.523003 402.905569 402.905569 0 1 1-503.012107 0A46.489104 46.489104 0 0 0 201.471568 141.016949a495.883777 495.883777 0 1 0 619.854722 0z" fill="#EC7E62" p-id="3168"></path><path d="M511.398929 381.520581a46.489104 46.489104 0 0 0 46.489104-46.489104V46.489104a46.489104 46.489104 0 0 0-92.978208 0v288.542373a46.489104 46.489104 0 0 0 46.489104 46.489104z" fill="#EC7E62" p-id="3169"></path></svg>
                </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </pop-up>
    </div>
  </div>
</template>

<script>
import Pop from "../Pop/Pop";
import PopUp from "../PopUp/PopUp";
import {copys, supportChainList} from "../../api/util";

const lang = localStorage.getItem("locale") || 'cn';

export default {
  name: "HeaderBar",
  props: {
    address: String,
    headerColor: {
      type: String,
      default: "#ffffff"
    }
  },
  components: { Pop, PopUp },
  data() {
    return {
      showPop: false,
      showAccount: false,
      supportChainList: supportChainList,
      currentChain: this.$store.state.network, // 当前所选择的链
      showDropList: false, // 下拉菜单
      orderList: [], // 订单列表
      orderType: 3, // 当前选择的订单类型
      // fromAddress: '',
      currentChainAsset: null, // 当前选择的链上的主资产信息
      nerveChainAsset: null, // nerve链上的主资产信息/L2
      orderLoading: false,
      lang: '',
      showLoading: false,
      statusTimer: null,
      isSwap: false,
      isLiquidity: false
    }
  },
  watch: {
    '$store.state.network': {
      handler(val) {
        this.currentChain = val
      }
    },
    "$store.state.lang": {
      handler(val) {
        this.lang = val
      },
      immediate: true,
      deep: true
    },
    "$route.fullPath": {
      handler(val) {
        this.isSwap = window.location.hash.indexOf('swap') > -1;
        this.isLiquidity = window.location.hash.indexOf('liquidity') > -1;
        this.$store.commit('changeSwap', this.isSwap);
      },
      immediate: true,
      deep: true
    },
    currentChain(val) {
      if (val) {
        this.$store.commit("changeNetwork", val);
      }
    },
    orderType(val) {
      this.orderList = [];
    },
    currentChainAsset: {
      immediate: true,
      deep: true,
      handler(val) {
        this.currentChainAsset = val;
      }
    },
  },
  computed: {
    isMobile() {
      return /Android|webOS|iPhone|iPad|BlackBerry/i.test(navigator.userAgent);
    },
    addressNetworkOrigin() {
      const addressNetworkOrigin = {};
      const tempSupportChainList = supportChainList.length === 0 && sessionStorage.getItem('supportChainList') && JSON.parse(sessionStorage.getItem('supportChainList')) || supportChainList;
      tempSupportChainList.forEach(chain => {
        addressNetworkOrigin[chain.chain] = chain.addressLink;
      });
      return addressNetworkOrigin;
    },
  },
  methods: {
    toBrowser(network, address) {
      this.isMobile ? window.location.href = this.addressNetworkOrigin[network || this.fromNetwork] + address || this.address : window.open(this.addressNetworkOrigin[network || this.fromNetwork] + address || this.address);
    },
    copy(val) {
      if (!val) return;
      copys(val);
      this.$toast(this.$t("tips.tips8"))
    },
    showDropClick() {
      !this.isLiquidity && (this.showDropList = !this.showDropList);
    },
    // 断开连接
    disConnect() {
      this.showAccount = false;
      this.showPop = false;
      this.$emit('disConnect')
    },
    showClick() {
      this.showPop = !this.showPop;
    }
  },
  beforeDestroy() {
    if (this.statusTimer) {
      clearInterval(this.statusTimer);
      this.statusTimer = null;
    }
  }
}
</script>

<style scoped lang="scss">
@import "HeaderBar.scss";
</style>
