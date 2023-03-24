<template>
    <div class="main-cont" :class="isDapp && 'cont_shadow'">
      <HeaderBar :address="fromAddress"
                 :current-account="currentAccount"
                 :show-connect="showConnect"
                 @disConnect="disConnect"
                 @derivedAddress="derivedAddress"
                 @connectMetamask="connectMetamask">
        <div class="nav-bar" v-if="$route.path !== '/createAirdrop' && $route.path !== '/airdropHistory' && fromAddress">
          <div class="nav-bar-list">
            <div class="nav-bar-item"
                 :class="[$route.path == '/index' && 'active-bar']"
                 @click="navBarClick(1, '/index')"
            >
              {{ $t('airdrop.airdrop11') }}
            </div>
            <div class="nav-bar-item"
                 :class="[$route.path == '/square' && 'active-bar']"
                 @click="navBarClick(2, '/square')"
            >
              {{ $t('airdrop.airdrop12') }}
            </div>
            <div class="nav-bar-item"
                 :class="[$route.path == '/gift' && 'active-bar']"
                 @click="navBarClick(3, '/gift')"
            >
              {{ $t('airdrop.airdrop13') }}
            </div>
          </div>
          <div class="cursor-pointer size-28 d-flex" @click="navBarClick(1, '/createAirdrop')">
            <img src="@/assets/image/create.svg" class="mr-1" alt="">
            <span class="text-21">{{ $t('airdrop.airdrop42') }}</span>
          </div>
        </div>
        <div class="nav-bar" v-else-if="fromAddress && ($route.path === '/createAirdrop' || $route.path === '/airdropHistory')">
          <div class="nav-bar-list">
            <div class="nav-bar-item"
                 :class="[$route.path == '/createAirdrop' && 'active-bar']"
                 @click="navBarClick(1, '/createAirdrop')"
            >
              {{ $t('airdrop.airdrop23') }}
            </div>
            <div class="nav-bar-item"
                 :class="[$route.path == '/airdropHistory' && 'active-bar']"
                 @click="navBarClick(2, '/airdropHistory')"
            >
              {{ $t('airdrop.airdrop24') }}
            </div>
          </div>
        </div>
        <div class="connect-item" v-loading="loading" v-if="isDapp && (showSign || showConnect || !fromAddress)">
          <div v-if="showConnect">
            <div class="connect-btn" @click="connectMetamask">{{ $t("tips.tips10") }}</div>
            <div v-if="!hashNabox" @click="toUrl" class="text-center text-primary size-32">{{ $t("tips.tips14") }}</div>
          </div>
          <div class="sign-btn" v-else-if="!showConnect && showSign" @click="derivedAddress">{{ $t("tips.tips11") }}</div>
        </div>
        <keep-alive include="swap" v-else>
          <router-view />
        </keep-alive>
      </HeaderBar>
    </div>
</template>

<script>
import {HeaderBar} from "../components";
import {ETHNET, MAIN_INFO, NULS_INFO} from "@/config";
import nerve from "nerve-sdk-js";
import {supportChainList, getCurrentAccount} from "@/api/util";
import {addressNetworkOrigin} from "../api/util";

const ethers = require("ethers");

function getAccountList() {
  return JSON.parse(localStorage.getItem("accountList")) || [];
}

export default {
  name: "BasicLayout",
  components: { HeaderBar },
  data() {
    return {
      tabList: [
        {
          option: "Swap",
          name: 'swap',
          disabled: false
        }, {
          option: "Layer2",
          name: 'transfer',
          disabled: false
        }, {
          option: "Liquidity",
          name: 'liquidity',
          disabled: false
        }, {
          option: "Vaults",
          name: 'vaults',
          disabled: false
        }
      ],
      currentIndex: 1,
      address: '', // 合约地址
      provider: '',
      loading: false, // 加载
      walletType: sessionStorage.getItem("walletType") || "NaboxWallet", // 钱包类型（metamask）
      // isDapp: true,
      fromChainId: '',
      orderList: [], // 订单列表
      flag: false,
      timer: null,
      nerveTo: true,
      showType: "Swap"
    }
  },
  created() {
    this.initConnect();
  },
  computed: {
    fromNetwork() {
      return this.$store.state.network;
    },
    fromAddress() {
      const currentAccount = getCurrentAccount(this.address);
      // this.$store.commit('changeFromAddress', currentAccount && !this.showSign ? currentAccount.address["NERVE"] : "")
      return currentAccount && !this.showSign ? currentAccount.address[this.fromNetwork] || currentAccount.address['pluginAddress'] : "";
    },
    currentAccount() {
      return this.$store.getters.currentAccount
    },
    hashNabox() {
      return window['NaboxWallet'];
    },
    isMobile() {
      return /Android|webOS|iPhone|iPad|BlackBerry/i.test(navigator.userAgent);
    }
  },
  watch: {
    address: {
      immediate: true,
      handler(val) {
        if (!val) return '';
        const currentAccount = getCurrentAccount(val);
        this.$store.commit('changeFromAddress', val);
        this.$store.commit('changeShowConnect', false);
        this.$store.commit('changeShowSign', !currentAccount);
      },
    }
  },
  methods: {
    toUrl() {
      this.isMobile ? window.location.href = "https://nabox.io/" : window.open("https://nabox.io/");
    },
    initConnect() {
      if (!this.walletType) {
        this.loading = false;
        return;
      }
      if (this.walletType === "NaboxWallet" || this.walletType === "metamask") {
        if (window[this.walletType]) {
          this.initWallet();
        }
      }
    },
    // 初始化metamask wallet provider address
    async initWallet() {
      this.wallet = window[this.walletType];
      this.fromChainId = this.wallet.chainId;
      this.address = this.wallet.selectedAddress;
      if (!this.address) {
        await this.requestAccounts();
      }
      this.fromChainId = this.wallet.chainId;
      const tempSupportChainList = supportChainList.length === 0 && sessionStorage.getItem('supportChainList') && JSON.parse(sessionStorage.getItem('supportChainList')) || supportChainList;
      const chain = tempSupportChainList.find(v => v[ETHNET] === this.fromChainId);
      if (!sessionStorage.getItem('network')) {
        this.$store.commit('changeNetwork', chain && chain.value || 'NERVE');
      } else {
        this.$store.commit('changeNetwork', sessionStorage.getItem('network'));
      }
      this.provider = new ethers.providers.Web3Provider(window[this.walletType]);
      this.$store.commit('changeShowConnect', false);
      this.listenAccountChange();
      this.listenNetworkChange();
    },
    // 获取地址信息
    async requestAccounts() {
      const res = await this.wallet.request({ method: "eth_requestAccounts" });
      if (res.length) {
        this.address = res[0]
      }
    },
    //监听账户改变
    listenAccountChange() {
      this.wallet.on("accountsChanged", (accounts) => {
        console.log(accounts, "===accounts-changed===")
        if (accounts.length && this.walletType) {
          this.address = accounts[0];
          if (this.address && !this.address.startsWith("0x")) {
            this.switchNetwork(this.address)
          }
          window.location.reload();
          // this.getBalance();
        } else {
          this.address = "";
          this.$store.commit('changeShowConnect', true);
        }
      });
    },
    disConnect() {
      localStorage.removeItem('accountList');
      localStorage.removeItem('airdropList');
      sessionStorage.removeItem('walletType');
      sessionStorage.removeItem('network');
      this.$store.commit('changeShowSign', true);
      this.$store.commit('changeShowConnect', true);
      this.address = '';
    },
    //监听网络改变
    listenNetworkChange() {
      this.wallet.on("chainChanged", (chainId) => {
        if (chainId && this.walletType) {
          const tempChainId = chainId.toString().startWith('0x') ? chainId : `0x${Number(chainId).toString(16)}`;
          const tempSupportChainList = supportChainList.length === 0 && sessionStorage.getItem('supportChainList') && JSON.parse(sessionStorage.getItem('supportChainList')) || supportChainList;
          const chain = tempSupportChainList.find(v => v[ETHNET] === tempChainId);
          this.$store.commit('changeNetwork', chain && chain.value || 'NERVE');
          window.location.reload();
        }
      });
    },
    // 连接metamask钱包
    async connectMetamask() {
      if (!window['NaboxWallet']) {
        this.$message({message: this.$t("tips.tips15"), type: "warning"});
      } else {
        try {
          this.walletType = "NaboxWallet";
          sessionStorage.setItem("walletType", "NaboxWallet");
          await this.initWallet();
        } catch (e) {
          this.$message({
            message: e.message.message || e.message,
            type: "warning",
            offset: 30,
          });
        }
      }
    },
    async syncAccount(pub) {
      const res = await this.$request({
        url: "/wallet/sync",
        data: { pubKey: pub },
      });
      return res.code === 1000;
    },
    //通过调用metamask签名，派生多链地址
    async derivedAddress() {
      this.loading = true;
      try {
        if (!window[this.walletType]) {
          throw this.$t("tips.tips15");
        }
        if (!this.address) {
          await this.requestAccounts();
        }
        let account, pub;
        if (!this.address.startsWith("0x")) {
          if (!window.nabox) {
            throw this.$t("tips.tips15");
          }
          pub = await window.nabox.getPub({
            address: this.address
          });
          const address = ethers.utils.computeAddress(ethers.utils.hexZeroPad(ethers.utils.hexStripZeros('0x' + pub), 33));
          account = {
            address: {
              pluginAddress: address
            }
          }
        } else {
          const jsonRpcSigner = this.provider.getSigner();
          let message = "Derive Address";
          const signature = await jsonRpcSigner.signMessage(message);
          const msgHash = ethers.utils.hashMessage(message);
          const msgHashBytes = ethers.utils.arrayify(msgHash);
          const recoveredPubKey = ethers.utils.recoverPublicKey(
              msgHashBytes,
              signature
          );
          account = {
            address: {
              pluginAddress: this.address
            }
          }
          if (recoveredPubKey.startsWith("0x04")) {
            const compressPub = ethers.utils.computePublicKey(
                recoveredPubKey,
                true
            );
            pub = compressPub.slice(2);
          } else {
            throw "sign error"
          }
        }
        account.pub = pub;
        const { chainId, assetId, prefix } = MAIN_INFO;
        const {
          chainId: NULSChainId,
          assetId: NULSAssetId,
          prefix: NULSPrefix,
        } = NULS_INFO;
        // console.log(NULSChainId, NULSAssetId, NULSPrefix, 55)
        account.address.NERVE = nerve.getAddressByPub(
            chainId,
            assetId,
            pub,
            prefix
        );
        account.address.NULS = nerve.getAddressByPub(
            NULSChainId,
            NULSAssetId,
            pub,
            NULSPrefix
        );
        const accountList = JSON.parse(localStorage.getItem("accountList")) || [];
        const existIndex = accountList.findIndex(v => v.pub === account.pub);
        // 原来存在就替换，找不到就push
        if (existIndex > -1) {
          accountList[existIndex] = account
        } else {
          accountList.push(account);
        }
        const syncRes = await this.syncAccount(pub, account.address);
        if (syncRes) {
          localStorage.setItem("accountList", JSON.stringify(accountList));
          // 重新计算fromAddress
          const address = this.address;
          // this.switchNetwork(address);
          this.address = "";
          setTimeout(()=> {
            this.address = address;
          }, 16);
        } else {
          throw this.$t("tips.tips13")
        }
      } catch (e) {
        console.log(e, 'e');
        this.address = "";
        this.$message({ message: e.message || e, type: "warning" });
      }
      this.loading = false;
    },
    navBarClick(index, path) {
      console.log(this.$route.path, '123');
      if (path === this.$route.path) return;
      this.currentIndex = index;
      this.$router.push({ path });
    },
    switchNetwork(address) {
      console.log(address, 'address ')
      // 连接插件时如果是nuls、nerve设置network为nuls/nerve
      if (!address.startsWith("0x")) {
        this.$store.commit("changeNetwork", "NERVE")
      }
    }
  },
  mounted() {
      window.scrollTo(0,0);
  },
  beforeDestroy() {
    this.timer && clearInterval(this.timer);
    this.timer = null;
  }
}
</script>

<style scoped lang="scss">
.nav-bar {
  padding: 10px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .nav-bar-list {
    position: relative;
    display: flex;
    color: #8D94AB;
    font-size: 28px;
    line-height: 40px;
    .nav-bar-item {
      cursor: pointer;
      margin-right: 20px;
      &.active-bar {
        position: relative;
        font-size: 30px;
        color: #3A3C44;
        &:after {
          position: absolute;
          content: '';
          height: 4px;
          border-radius: 2px;
          width: 80%;
          background-color: #21C980;
          left: 50%;
          transform: translateX(-50%);
          bottom: -12px;
        }
      }
    }
  }
}
.main-cont {
  //width: 100%;
  background-color: #FFFFFF;
  color: #333333;
  font-weight: 400;
}
@media screen and (min-width: 1000px) {
  .main-cont {
    position: relative;
    max-width: 800px;
    margin: 0 auto;
    overflow-y: auto;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0px !important;
      height: 0px !important;
    }
  }
  .cont_shadow {
    height: 1560px;
    border: 1px solid #ebf0f3;
    box-shadow: 0 3px 29px 0 #f2f3f5;
  }
}
.tab-cont {
  --top: 40px;
  position: fixed;
  //height: 100px;
  left: 0;
  right: 0;
  //top: 0;
  background-color: #FFFFFF;
  padding: 0 69px 23px 69px;
  padding-top: var(--top) !important; /* 兼容非刘海屏 */
  padding-top: calc(constant(safe-area-inset-top) + var(--top)) !important; /* 标准刘海屏 */
  padding-top: calc(env(safe-area-inset-top) + var(--top)) !important; /* 兼容 ios11 */
  border-bottom: 1px solid #A2D1C9;
  .tab-item {
    cursor: pointer;
    position: relative;
  }
}
.vaults-color {
  background-color: #6EB6A9;
  color: #FFFFFF;
  //border-bottom: 2px solid #A2D1C9;
  z-index: 1;
  .active {
    position: relative;
    &:after {
      content: '';
      position: absolute;
      height: 6px;
      width: 86px;
      border-radius: 3px;
      background-color: #FFFFFF;
      left: 50%;
      bottom: -70%;
      transform: translate(-50%, -50%);
    }
  }
}
.active {
  position: relative;
  &:after {
    content: '';
    position: absolute;
    height: 6px;
    width: 102px;
    background-color: #333333;
    left: 50%;
    bottom: -70%;
    transform: translate(-50%, -50%);
  }
}
.position-cont {
  --top: 40px;
  height: 60px;
  //height: calc(env(safe-area-inset-top) / 2 + 108px);
  padding-top: var(--top) !important; /* 兼容非刘海屏 */
  padding-top: calc(constant(safe-area-inset-top + var(--top))) !important; /* 标准留海屏 */
  padding-top: calc(env(safe-area-inset-top) + var(--top)) !important; /* 兼容 ios11 */
}
.connect-item {
  height: 700px;
  display: flex;
  justify-content: center;
  background-color: #FFFFFF;
}
.connect-btn {
  width: 670px;
  height: 100px;
  line-height: 100px;
  font-size: 30px;
  color: #FFFFFF;
  text-align: center;
  background-color: #6EB6A9;
  border-radius: 20px;
  margin: 50px auto;
  margin-top: 100px;
}
.sign-btn {
  cursor: pointer;
  width: 670px;
  height: 100px;
  line-height: 100px;
  font-size: 30px;
  color: #FFFFFF;
  text-align: center;
  background-color: #6EB6A9;
  border-radius: 20px;
  margin-top: 100px;
}
.text-21 {
  color: #21C980;
}
</style>
