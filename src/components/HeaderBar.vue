<template>
  <div class="header">
    <div class="left cursor_pointer" @click="$router.replace('/')">
      <img src="../assets/img/Nabox_logo.svg" alt="">
      <!-- NerveBridge -->
    </div>
    <div class="right" v-if="address">
      <div class="address">
        <span class="network">
<!--           {{ $store.state.network }}-->
          <span class="network_img">
            <img :src="getPicture($store.state.network)" @error="pictureError" alt="">
          </span>
<!--           <i class="el-icon-caret-bottom" style="margin-left: -5px"></i>-->
        </span>
        <span @click="showAccountDialog=true">{{ superLong(address, 5) }}</span>
<!--        <ul class="support-network-list" v-show="showNetworkList">-->
<!--          <li-->
<!--            v-for="item in supportChainList"-->
<!--            :key="item.chainName"-->
<!--            :class="{'active': item.chainName === currentChain}"-->
<!--            @click="switchChain(item)"-->
<!--          >-->
<!--            {{ item.chainName }}-->
<!--          </li>-->
<!--          <div class="pop-arrow"></div>-->
<!--        </ul>-->
      </div>
      <span @click="showMenu=!showMenu" class="iconfont icon-menu"></span>
    </div>
    <transition name="drawer-fade">
      <div class="nav-menu" v-show="showMenu">
        <transition name="model">
          <div class="model" v-show="showMenu" @click="toggleMenu"></div>
        </transition>
        <div class="header_content" :class="showMenu ? 'show' : 'hide'">
          <div class="account">
            <ul class="menu-wrap">
              <li>
                <a href="https://nabox.io" :target="isMobile && '_self' || '_blank'">
                  <i class="iconfont icon-zichanshangjia"></i>
                  <span>{{ $t("header.header1") }}</span>
                </a>
              </li>
              <li>
               <a href="https://swap.nabox.io/" :target="isMobile && '_self' || '_blank'">
                 <i class="iconfont icon-swapbox"></i>
                  <span>{{ $t("header.header2") }}</span>
               </a>
              </li>
            </ul>
          </div>
          <!-- <div class="network">
            <p class="label">{{ $t("header.header5") }}</p>
            <el-radio-group v-model="currentChain" @change="toggleMenu">
              <el-radio-button
                v-for="item in supportChainList"
                :key="item.value"
                :label="item.value"
              >
              {{ item.label }}
              </el-radio-button>
            </el-radio-group>
          </div> -->
<!--          <div class="network-list">-->
<!--            <div class="size-12 text-99">你的网络</div>-->
<!--            <div class="network-cont">-->
<!--              <div class="network-item"-->
<!--                   @click="currentIndex = index"-->
<!--                   :class="{ 'active_item': currentIndex===index }"-->
<!--                   v-for="(item, index) in 5" :key="item">-->
<!--                {{ item }}-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
          <div class="bottom-wrap">
            <div class="community">
              <a href="https://t.me/NerveNetwork" :target="isMobile && '_self' || '_blank'">
                <img src="../assets/img/Telegram.svg" alt="">
              </a>
              <a href="https://discord.gg/PBkHeD7" :target="isMobile && '_self' || '_blank'" style="padding-top: 1px">
                <img src="../assets/img/Discord.svg" alt="">
              </a>
            </div>
            <div class="language clicks" @click="lang=lang==='cn' ? 'en' : 'cn'" style="padding-top: 3px">
              <!-- <span class="iconfont icon-yuyan"> -->
              <img style="margin: 0 5px 0 10px" src="../assets/img/lang.svg" alt="">
              <span>{{ lang === "cn" ? "EN" : "中文" }}</span>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <el-dialog
      :title="$t('tips.tips7')"
      :visible.sync="showAccountDialog"
      :modal-append-to-body="false"
      class="account-dialog"
      width="80%">
      <div class="header_content tc">
        <div class="address">
          {{superLong(address, 6)}}
          <i class="iconfont icon-lianjie" @click="openUrl"></i>
          <i class="iconfont icon-fuzhi1" @click="copy(address)"></i>
        </div>
        <el-button @click="quit">{{ $t("header.header3") }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { superLong, copys, networkOrigin, supportChainList } from '@/api/util'
  import { isBeta } from '@/api/util';
  import { ETHNET } from "@/config"

  export default {
    data() {
      // this.supportChainList = supportChainList;
      return {
        showNetworkList: false,
        showMenu: false,
        currentChain: this.$store.state.network,
        lang: localStorage.getItem("lang") || "cn",
        showAccountDialog: false,
        walletAddress: isBeta ? "http://beta.wallet.nerve.network" : "https://wallet.nerve.network",
        supportChainList: [],
        currentIndex: 0
      };
    },
    props: {
      address: String
    },
    components: {
    },
    computed: {
      isMobile() {
        return /Android|webOS|iPhone|iPad|BlackBerry/i.test(navigator.userAgent);
      }
    },
    watch: {
      '$store.state.network': {
        handler(val) {
          this.currentChain = val
        }
      },
      currentChain(val) {
        this.$store.commit("changeNetwork", val)
      },
      lang(val) {
        if (val) {
          this.$i18n.locale = val;
          localStorage.setItem("lang", val)
          this.toggleMenu();
        }
      }
    },
    created() {
    },
    mounted() {
      window.addEventListener("click", () => {
        if (this.showNetworkList) this.showNetworkList = false;
      }, false)

      // const order = ["Ethereum", "BSC", "Heco", "OKExChain", "NULS", "NERVE"]
      // list = list.sort((a, b) => {
      //   return order.indexOf(a.chain) - order.indexOf(b.chain)
      // })
      const list = [];
      supportChainList.map(v => {
        list.push({
          chainId: v[ETHNET],
          rpcUrls: v.rpcUrl ? [v.rpcUrl[ETHNET]] : [],
          chainName: v.value,
          nativeCurrency: {
            name: v.value,
            symbol: v.symbol,
            decimals: v.decimals,
          },
          blockExplorerUrls: [v.origin]
        })
      })
      this.supportChainList = list;
    },
    methods: {
      superLong(str, len = 8) {
        return superLong(str, len)
      },
      toggleMenu() {
        this.showMenu = !this.showMenu
      },
      getPicture(suffix) {
        let baseUrl = 'https://nuls-cf.oss-us-west-1.aliyuncs.com/icon/';
        return `${baseUrl}${suffix}.png`
      },
      pictureError(e) {
        e.target.src = 'https://nuls-cf.oss-us-west-1.aliyuncs.com/icon/NULL.png';
      },

      /**
       * 连接跳转
       * @param name
       */
      toUrl(name) {
        this.$router.push({
          name,
          query: { address: this.address }
        })
      },
      openUrl() {
        const baseUrl = networkOrigin[this.currentChain];
        let url;
        if (this.currentChain !== "NERVE" && this.currentChain !== "NULS") {
          url = baseUrl + "/address/" + this.address;
        } else {
          url = baseUrl + "/address/info?address=" + this.address
        }
        window.open(url)
        this.showAccountDialog = false
      },
      copy(str) {
        copys(str)
        this.$message({message: this.$t('tips.tips8'), type: 'success', duration: 1000});
        this.showAccountDialog = false
      },
      quit() {
        this.$emit("quit")
        this.showAccountDialog = false;
      },
      openLink(url) {
        window.open(url)
      },
      async switchChain(item) {
        if (this.currentChain === item.chainName) return;
        if (item.chainName === "NULS" || item.chainName === "NERVE") {
          this.currentChain = item.chainName;
          return;
        }
        try {
          const providerType = sessionStorage.getItem("walletType");
          const provider = window[providerType];
          if (item.chainName !== "Ethereum") {
            await provider.request({
              method: "wallet_addEthereumChain",
              params: [item]
            });
          } else {
            await provider.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: item.chainId }]
            });
          }
          this.currentChain = item.chainName;
        } catch (e) {
          //
          console.log(e, 89898)
        }
      }
    },
  }
</script>

<style lang="less" scoped>
  @import "./../assets/css/style";
  .header {
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px;
    border-bottom: 1px solid #EBF0F3;
    background-color: #fff;
    .left img {
      width: 96px;
      margin-left: 5px;
      @media screen and (max-width: 400px){
        width: 75px;
        margin-left: 0;
      }
    }
    // img {
    //   width: 34px;
    //   height: 34px;
    //   margin-right: 5px;
    // }
    .left, .right {
      display: flex;
      align-items: center;
    }

    .right {
      .address {
        // width: 170px;
        // width: 150px;
        display: flex;
        align-items: center;
        height: 32px;
        line-height: 32px;
        padding: 0 10px;
        background-color: #EBEEF8;
        color: #6eb6a9;
        font-weight: bold;
        font-size: 14px;
        border-radius: 18px;
        text-align: center;
        margin-right: 16px;
        cursor: pointer;
        position: relative;
        @media screen and (max-width: 400px){
          margin-right: 0;
          padding: 0 8px;
        }
        .network {
          font-size: 15px;
          color: #99A3C4;
          display: flex;
          align-items: center;
          padding: 0 5px 0 0;
        }
        .support-network-list {
          position: absolute;
          left: 20px;
          z-index: 99999;
          width: 150px;
          padding: 6px 0;
          margin-top: 8px;
          border: 1px solid #e4e7ed;
          border-radius: 4px;
          background-color: #fff;
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
          li {
            padding: 0 20px;
            text-align: left;
            &:hover {
              background-color: #f5f7fa;
            }
            &.active {
              color: #409eff;
              font-weight: 700;
            }
          }
          .pop-arrow, .pop-arrow:after {
            position: absolute;
            display: block;
            width: 0;
            height: 0;
            border-width: 6px;
            border-top-width: 0;
            border-color: transparent;
            border-style: solid;
          }
          .pop-arrow {
            top: -6px;
            left: 30px;
            border-bottom-color: #EBEEF5;
            &:after {
              content: " ";
              top: 1px;
              margin-left: -6px;
              border-bottom-color: #FFF;
            }
          }
        }
      }
      .icon-menu {
        cursor: pointer;
        font-size: 24px;
        color: #515B7D;
      }
    } 
    .nav-menu {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 64px;
      overflow: hidden;
      z-index: 9;
      .model {
        width: 100%;
        height: calc(100% - 64px);
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        opacity: 0.46;
        background-color: rgb(33, 33, 33);
      }
      .header_content {
        &.show {
          animation: rtl-drawer-in .3s;
        }
        animation: rtl-drawer-out .3s;
        background-color: #fff;
        position: absolute;
        width: 210px;
        height: calc(100% - 64px);
        right: 0;
        top: 0;
        padding-top: 15px;
        // padding: 30px 20px 20px;
        .menu-wrap {
          li {
            padding: 15px 20px;
            cursor: pointer;
            line-height: 1;
            display: flex;
            a {
              display: flex;
            }
            .iconfont {
              margin-right: 10px;
              font-size: 18px;
            }
            &:hover {
              background-color: rgb(239, 244, 245);
            }
          }
        }
      }
      .network {
        padding: 10px 20px 0;
        .label {
          color: #99A3C4;
          font-size: 12px;
          margin-bottom: 5px;
        }
        .el-radio-group {
          .el-radio-button {
            margin: 0 10px 15px 0;
            &.is-active .el-radio-button__inner {
              box-shadow: none;
              // border-color: #409EFF;
              background-color: #5BCAF9;
              color: #fff;
            }
            &:nth-of-type(2n) {
              margin-right: 0;
            }
          }
          .el-radio-button__inner {
            // border: 1px solid #DCDFE6;
            border-radius: 10px;
            font-size: 12px;
            width: 80px;
            height: 35px;
            line-height: 35px;
            padding: 0;
            color: #515E7B;
            background-color: #EBEEF8;
            border: none;
            &:hover {
              color: #5BCAF9;
            }
          }
        }
      }
      .bottom-wrap {
        display: flex;
        position: absolute;
        bottom: 70px;
        align-items: center;
        margin-top: 40px;
        padding: 0 20px;
        .community, .language {
          display: flex;
          align-items: center;
        }
        img {
          width: 22px;
          height: 22px;
          margin-right: 20px;
          cursor: pointer;
          vertical-align: middle;
          &:hover {
            opacity: 0.65;
          }
        }
        .language {
          cursor: pointer;
          display: flex;
          align-items: center;
          &:hover {
            opacity: 0.65;
          }
        }
        .icon-yuyan {
          font-size: 22px;
          margin-right: 5px;
          margin-left: 10px;
        }
      }
    }
    /* .account-dialog {
      position: absolute;
    }
    .v-modal {
      position: absolute;
    } */
    .account-dialog {

      .address {
        color: #6eb6a9;
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
        .iconfont {
          margin-left: 25px;
          font-size: 20px;
          color: #515B7D;
          cursor: pointer;
        }
      }
      .el-button {
        // width: 80px;
        // height: 34px;
        padding: 12px 30px;
        border-color: #6eb6a9;
        color: #6eb6a9;
        border-radius: 10px;
      }
    }
  }
  .drawer-fade-enter-active,.drawer-fade-leave-active {
    transition: opacity 0.3s
  }

  .drawer-fade-enter, .drawer-fade-leave-to {
    opacity: 0;
  }

  .model-enter-active,.model-leave-active {
    transition: opacity 0.2s
  }

  .model-enter, .model-leave-to {
    opacity: 0;
  }

  @keyframes rtl-drawer-in {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(0%);
    }
  }
  @keyframes rtl-drawer-out {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  .cursor_pointer {
    cursor: pointer;
  }

  .network-list {
    padding-left: 20px;
    .network-cont {
      display: flex;
      flex-wrap: wrap;
      margin-top: 15px;
      .network-item {
        cursor: pointer;
        margin-right: 10px;
        width: 80px;
        height: 35px;
        font-size: 15px;
        line-height: 35px;
        text-align: center;
        background-color: #EBEEF8;
        border-radius: 10px;
        color: #515E7B;
        margin-bottom: 15px;
        &.active_item {
          background-color: #5BCAF9;
          color: #FFFFFF;
        }
      }
    }
  }
  .network_img {
    height: 24px;
    width: 24px;
    img {
      height: 100%;
      width: 100%;
    }
  }

  .link-icon {
    height: 18px;
    width: 18px;
    margin-right: 12px;
    img {
      height: 100%;
      width: 100%;
    }
  }

  //@media screen and (min-width: 1200px) {
  //  .account {
  //    height: calc(780px - 94px);
  //  }
  //}
  //.account {
  //  height: calc(100vh - 94px);
  //}

</style>
