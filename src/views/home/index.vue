<template>
  <div class="home" v-loading="isPass && transferLoading">
    <HeaderBar :address="fromAddress" @quit="quit" />
    <div class="home-content" :class="{'p-15': supportListShow || showSign}" v-loading="loading">
      <div class="support-list" v-if="supportListShow">
        <span class="title">
          Connect wallet
        </span>
        <div class="providers-wrap">
          <p v-for="item in providerList" :key="item.name" @click="connectProvider(item.provider)">
            <img :src="item.src" alt="">
            {{item.name}}
          </p>
        </div>
      </div>
      <div class="show-sign-button" v-else-if="showSign">
        <el-button type="primary" @click="derivedAddress">{{
            $t('airdrop.airdrop6')
        }}</el-button>
      </div>
      <div v-else>
<!--        <div class="banner-cont"></div>-->
        <div class="airdrop-cont">
          <template v-if="airdropList.length > 0">
            <div class="airdrop-list" v-for="item in airdropList" :key="item.dropId">
              <div class="airdrop-item d-flex align-items-center">
                <div class="airdrop-icon">
                  <img :src="getPicture(item.symbol)" @error="pictureError" alt="">
                </div>
                <span class="font-bold size-16 text-51 ml-5">{{ item.symbol }}</span>
                <span class="size-13 text-99 ml-5">{{ item.contractAddress && `(${superLong(item.contractAddress)})` || '' }}</span>
              </div>
              <div class="airdrop-info d-flex">
                <div>
                  <div class="text-51 size-12">{{ $t("airdrop.airdrop1") }}</div>
                  <div>
                    <span class="size-15 font-500">{{ item.receiveAmount }}</span>
                    <span class="size-12 text-99">≈${{ item.usdPrice }}</span>
                  </div>
                </div>
                <div class="receive_btn size-13 cursor-pointer" @click="receiveAirdrop(item)">{{ $t("airdrop.airdrop2") }}</div>
              </div>
            </div>
          </template>
          <div class="text-center pt-4 size-12" v-else>No data</div>
        </div>
      </div>
      <pop-up :show.sync="showPop" :loading="transferLoading">
        <div class="pop-cont">
          <div class="text-51 font-bold size-16">{{ $t("airdrop.airdrop3") }}</div>
          <div class="input-cont">
            <input type="text" @input="codeInput" v-model="verificationCode" :placeholder="$t('airdrop.airdrop3')">
            <span class="text-red size-12" v-if="errMsg">{{ errMsg }}</span>
          </div>
          <div class="btn_cont">
            <div class="btn_item cursor-pointer" @click="showPop=false; errMsg=''; verificationCode=''">{{ $t('airdrop.airdrop4') }}</div>
            <div class="btn_item active_btn cursor-pointer" @click="confirmReceive">{{ $t('airdrop.airdrop5') }}</div>
          </div>
        </div>
      </pop-up>
    </div>
  </div>
</template>

<script>
import HeaderBar from "@/components/HeaderBar";
import { MAIN_INFO, ETHNET, NULS_INFO} from "@/config";
import nerve from "nerve-sdk-js";
import { supportChainList, getCurrentAccount, superLong } from "../../api/util";
import { NTransfer } from "../../api/api";
import PopUp from "../../components/PopUp";
import MetaMask from "../../assets/img/metamask.svg";
import Nabox from "../../assets/img/nabox.svg";
import TrustWallet from "../../assets/img/trustwallet.svg"
import Tokenpocket from "../../assets/img/Tokenpocket.svg"
import Mathwallet from "../../assets/img/mathwallet.svg"
import binancechain from "../../assets/img/binancechain.svg"
import OKEx from "../../assets/img/okexchain.png";
import safepal from "../../assets/img/safepal.svg";
import coin98 from "../../assets/img/coin98.svg";

const ethers = require("ethers");
const isMobile = /Android|webOS|iPhone|iPad|BlackBerry/i.test(navigator.userAgent);
const MetaMaskProvider = "ethereum"
const NaboxProvider = "NaboxWallet"
const OKExProvider = "okexchain"
const BSCProvider = "BinanceChain";

export default {
  data() {
    this.providerList = [
      { name: "MetaMask", src: MetaMask, provider: MetaMaskProvider },
      { name: "Nabox", src: Nabox, provider: NaboxProvider },
      { name: "Trust Wallet", src: TrustWallet, provider: MetaMaskProvider },
      { name: "TokenPocket", src: Tokenpocket, provider: MetaMaskProvider },
      { name: "MathWallet", src: Mathwallet, provider: MetaMaskProvider },
      { name: "Binance Chain", src: binancechain, provider: BSCProvider },
      { name: "OKEx Wallet", src: OKEx, provider: OKExProvider },
      { name: "SafePal", src: safepal, provider: MetaMaskProvider },
      { name: "Coin98", src: coin98, provider: MetaMaskProvider },
    ]
    return {
      loading: true,
      supportListShow: true, //显示可连接钱包列表
      showSign: true, //显示派生地址
      address: "", //metamask当前选中地址
      swapType: "nerve",
      provider: null,
      fromChainId: "",
      walletType: isMobile ? MetaMaskProvider : localStorage.getItem("walletType"), // 连接钱包类型 metamask walletConnect
      showPop: false,
      nerveAddress: '',
      errMsg: '',
      airdropList: [], // 当前可领取空投List
      currentAirdrop: null, // 当前选择领取的空投
      verificationCode: '', // 202024
      transferLoading: false,
      isPass: false
    };
  },

  components: {
    HeaderBar,
    PopUp
  },

  watch: {
    address: {
      immediate: true,
      handler(val) {
        console.log(val, 'val address');
        if (!val) return;
        const currentAccount = getCurrentAccount(val);
        this.showSign = !currentAccount
      },
    },
    fromChainId: {
      immediate: true,
      handler(val) {
        if (!val) return;
        const chain = supportChainList.find(v => v[ETHNET] === val);
        if (chain) {
          this.$store.commit("changeNetwork", 'NERVE');
        } else {
          this.$store.commit("changeNetwork", 'NERVE');
          // const tempAddress = this.address.toUpperCase();
          // if (tempAddress.startsWith('TNULS') || tempAddress.startsWith('NULS')) {
          //   this.$store.commit("changeNetwork", 'NULS');
          // } else {
          //   this.$store.commit("changeNetwork", 'NERVE');
          // }
        }
      }
    },
    fromAddress: {
      immediate: true,
      deep: true,
      handler(val) {
        if (val) {
          this.getAirDropList(val);
          this.fromAddress = val;
        }
      }
    }
  },

  computed: {
    fromNetwork() {
      return this.$store.state.network;
    },
    fromAddress() {
      const currentAccount = getCurrentAccount(this.address);
      return currentAccount && !this.showSign ? currentAccount.address['NERVE'] : "";
    },
    isMobile() {
      return /Android|webOS|iPhone|iPad|BlackBerry/i.test(navigator.userAgent);
    }
  },

  created() {
    if (typeof this.$route.query.loginOut === 'boolean' && this.$route.query.loginOut === true) {
      this.setConfig(null);
    }
    console.log(this.isMobile, 'isMobile')
    if (this.isMobile) {
      localStorage.setItem("walletType", this.walletType);
    }
    setTimeout(() => {
      this.initConnect();
    }, 0);
    // setTimeout(() => {
    //   this.fromAddress && this.getAirDropList();
    // }, 0);
  },
  methods: {
    async getAirDropList(address, reload=false) {
      try {
        const tempList = JSON.parse(localStorage.getItem('airdropList'));
        const currentAccount = getCurrentAccount(address || this.address);
        const data = {
          pubKey: currentAccount && currentAccount.pub || ""
        };
        const res = await this.$request({
          url: '/air/drop/list',
          data
        });
        if (res.code === 1000 && res.data) {
          if (tempList && tempList.length > 0 && !reload) {
            const tempDropList = this.formatData(res.data);
            this.airdropList = tempDropList.map((item, index) => {
              if (tempList[index] && tempList[index].isPass && tempList[index].code) {
                return tempList[index];
              } else {
                return item;
              }
            });
          } else {
            this.airdropList = this.formatData(res.data);
            localStorage.setItem('airdropList', JSON.stringify(this.airdropList));
          }
        } else {
          localStorage.setItem('airdropList', JSON.stringify([]));
          this.$message.warning(res.msg);
        }
      } catch (e) {
        localStorage.setItem('airdropList', JSON.stringify([]));
      }
    },
    formatData(data) {
      if (!data || !data.constructor === Array) return [];
      return data.filter(item => item.status == 0).map(item => ({
        ...item,
        isPass: false
      }))
    },
    // 确认领取
    async confirmReceive() {
      try {
        if (!this.verificationCode) {
         this.errMsg = this.$t("tips.tips1");
         return false;
        }
        this.transferLoading = true;
        const data = {
          // address: this.fromAddress,
          id: this.currentAirdrop.id,
          code: this.verificationCode
        };
        const res = await this.$request({
          url: '/air/drop/validate/code',
          data
        });
        if (res.code === 1000 && res.data.success) {
          this.errMsg = '';
          const tempList = this.airdropList.map(item => {
            if (item.id === this.currentAirdrop.id) {
              return {
                ...item,
                isPass: true,
                code: this.verificationCode
              }
            }
            return { ...item };
          });
          this.airdropList = tempList;
          localStorage.setItem('airdropList', JSON.stringify(tempList));
          await this.sendTransaction();
        } else {
          this.errMsg = this.$t("tips.tips2");
          throw res.msg
        }
      } catch (e) {
        console.log('error:' + e);
        this.transferLoading = false;
        // this.verificationCode = '';
        // this.$message.warning(e);
      }
    },
    // 发送交易
    async sendTransaction(isPass=false) {
      try {
        const transfer = new NTransfer({
          chain: "NERVE",
          type: 2
        });
        const currentAccount = getCurrentAccount(this.address);
        const crossAddress = await this.getCrossAddress();
        if (!crossAddress) {
          throw 'crossAddress error'
        }
        const { chainId, assetId } = MAIN_INFO;
        const transferInfo = {
          from: this.fromAddress,
          to: crossAddress,
          amount: 0,
          fee: 0,
          assetsChainId: chainId,
          assetsId: assetId
        };
        const { inputs, outputs } = await transfer.transferTransaction(transferInfo);
        console.log(inputs, outputs, 'inputs, outputs')
        const txHex = await transfer.getTxHex({
          inputs,
          outputs,
          txData: {},
          pub: currentAccount.pub,
          signAddress: currentAccount.address.pluginAddress,
        });
        if (txHex) {
          await this.broadcastHex(txHex);
        } else {
          throw this.$t("tips.tips3");
        }
      } catch (e) {
        console.error(e);
        this.$message.warning(e);
        this.transferLoading = false;
      }
    },
    // 广播nerve链上交易
    async broadcastHex(txHex) {
      const url = MAIN_INFO.rpc;
      const chainId = MAIN_INFO.chainId;
      const res = await this.$post(url, 'broadcastTx', [chainId, txHex]);
      if (res.result && res.result.hash) {
        await this.broadcastHash(res.result.hash)
      } else {
        this.transferLoading = false;
        this.$message({ message: this.$t("tips.tips4"), type: "warning", duration: 2000 })
      }
    },
    // 发送hash到后台
    async broadcastHash(hash) {
      const data = {
        txHash: hash,
        code: this.verificationCode || this.currentAirdrop.code,
        id: this.currentAirdrop.id
      }
      const res = await this.$request({
        url: '/air/drop/receive',
        data
      });
      if (res.code === 1000) {
        this.$message({ message: this.$t("tips.tips5"), type: "success", duration: 2000 })
      } else {
        this.$message({ message: this.$t(res.msg), type: "warning", duration: 2000 })
      }
      this.transferLoading = false;
      this.reset();
      await this.getAirDropList('', true);
    },
    codeInput() {
      if (this.errMsg) this.errMsg = '';
    },
    // 获取转账地址
    async getCrossAddress() {
      const res = await this.$request({
        url: '/api/common/config',
        method: 'get'
      });
      let crossAddress = '';
      if (res.code === 1000 && res.data) {
        crossAddress = res.data.crossNerveAddress
      }
      return crossAddress
    },
    async receiveAirdrop(airdrop) {
      this.currentAirdrop = airdrop;
      if (airdrop.isPass && airdrop.code) {
        this.isPass = true;
        this.transferLoading = true;
        await this.sendTransaction(true);
      } else {
        this.showPop = true;
        this.isPass = false;
      }
    },
    reset() {
      this.verificationCode = '';
      this.showPop = false;
      this.errMsg = "";
    },
    getPicture(suffix) {
      let baseUrl = 'https://nuls-cf.oss-us-west-1.aliyuncs.com/icon/';
      return `${baseUrl}${suffix}.png`
    },
    pictureError(e) {
      e.target.src = 'https://nuls-cf.oss-us-west-1.aliyuncs.com/icon/NULL.png';
    },
    superLong(str, len = 5) {
      return superLong(str, len)
    },

    async initConnect() {
      console.log(this.walletType, 123, window[this.walletType])
      if (!this.walletType || !window[this.walletType]) {
        localStorage.removeItem("walletType")
        this.loading = false;
        return;
      }
      this.wallet = window[this.walletType];
      this.address = this.wallet.selectedAddress;
      console.log(this.wallet.selectedAddress, 'this.wallet.selectedAddress')
      if (!this.address) {
        await this.requestAccounts();
      }
      this.fromChainId = this.parseChainId(this.wallet.chainId);
      this.provider = new ethers.providers.Web3Provider(this.wallet);
      this.supportListShow = false;
      this.listenAccountChange();
      this.listenNetworkChange();
      this.loading = false;
    },
    parseChainId(chainId) {
      chainId = chainId + ""
      // 兼容Binggo
      return chainId.startsWith("0x") ? chainId : "0x" + Number(chainId).toString(16);
    },
    async requestAccounts() {
      const res = await this.wallet.request({ method: "eth_requestAccounts" });
      if (res.length) {
        this.address = res[0];
        this.$store.commit("changeSelectAddress", this.address);
      }
    },
    // 连接provider
    async connectProvider(provider) {
      if (!window[provider]) {
        this.$message({ message: "No provider was found", type: "warning"});
        return
      }
      if (isMobile) {
        provider = MetaMaskProvider
      }
      try {
        this.setConfig(provider)
        await this.initConnect();
      } catch (e) {
        // console.log(e, 222)
        this.setConfig(null)
        this.$message({ message: e.message, type: "warning"});
      }
    },
    setConfig(provider) {
      if (provider) {
        this.walletType = provider;
        localStorage.setItem("walletType", provider);
      } else {
        this.walletType = "";
        localStorage.setItem("walletType", "");
        this.address = "";
        this.supportListShow = true
      }
    },
    //监听账户改变
    listenAccountChange() {
      this.wallet.on("accountsChanged", (accounts) => {
        console.log(accounts, "===accounts-changed===")
        localStorage.removeItem('airdropList');
        if (accounts.length && this.walletType) {
          this.address = accounts[0];
          if (this.address && !this.address.startsWith("0x")) {
            this.switchNetwork(this.address)
          }
          // this.getBalance();
        } else {
          this.setConfig(null)
        }
      });
    },

    //监听网络改变
    listenNetworkChange() {
      this.wallet.on("chainChanged", (chainId) => {
        console.log(chainId, "===chainId-changed===")
        if (chainId && this.walletType) {
          this.fromChainId = this.parseChainId(chainId);
        }
      });
    },
    //通过调用metamask签名，派生多链地址
    async derivedAddress() {
      this.loading = true;
      try {
        if (!this.address) {
          await this.requestAccounts();
        }
        let account, pub;
        if (!this.address.startsWith("0x")) {
          if (!window.nabox) {
            throw "Nabox not found"
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
        console.log(account, 'account');
        const accountList = JSON.parse(localStorage.getItem("accountList")) || [];
        const existIndex = accountList.findIndex(v => v.pub === account.pub);
        // 原来存在就替换，找不到就push
        if (existIndex > -1) {
          accountList[existIndex] = account
        } else {
          accountList.push(account);
        }
        localStorage.setItem("accountList", JSON.stringify(accountList));
        // 重新计算fromAddress
        const address = this.address;
        // this.switchNetwork(address);
        this.address = "";
        setTimeout(()=> {
          this.address = address;
        }, 16);
        // const syncRes = await this.syncAccount(pub, account.address);
        // if (syncRes) {
        //
        // } else {
        //   this.$message({
        //     type: "warning",
        //     message: this.$t("tips.tips4"),
        //   });
        // }
      } catch (e) {
        console.log(e, 556)
        this.setConfig(null)
        this.address = "";
        this.$message({ message: this.$t("tips.tips5"), type: "warning" });
      }
      this.loading = false;
      // this.showSign = false;
    },
    async syncAccount(pub, accounts) {
      const addressList = [];
      Object.keys(accounts).map((v) => {
        addressList.push({
          chain: v,
          address: accounts[v],
        });
      });
      const res = await this.$request({
        url: "/wallet/sync",
        data: { pubKey: pub, addressList },
      });
      return res.code === 1000;
    },

    quit() {
      this.setConfig(null);
    },
    switchNetwork(address) {
      // 连接插件时如果是nuls、nerve设置network为nuls/nerve
      if (!address.startsWith("0x")) {
        let network
        if (address.startsWith("tNULS") || address.startsWith("NULS")) {
          network = "NULS"
        } else {
          network = "NERVE"
        }
        this.$store.commit("changeNetwork", network)
      }
    }
  },
};
</script>
<style lang="less">
@BColor: #ebeef8;
@labelColor: #99a3c4;
.home {
  background-color: #f0f2f7;
  height: 100%;
  position: relative;
  .home-content {
    background-color: #fff;
    margin: 15px;
    //padding: 15px;
    min-height: calc(100vh - 94px);
    border-radius: 10px;
  }
  .support-list {
    //width: 96%;
    margin: 0 auto;
    .title {
      font-size: 20px;
      font-weight: 600;
      line-height: 2;
      margin-bottom: 5px;
      display: inline-block;
      margin-top: -10px;
    }
    .providers-wrap {
      display: flex;
      flex-wrap: wrap;
    }
    p {
      width: 50%;
      display: flex;
      align-items: center;
      //justify-content: space-between;
      height: 40px;
      // line-height: 50px;
      padding: 0 15px;
      margin-bottom: 15px;
      border-radius: 16px;
      //background-color: rgb(239, 244, 245);
      transition: background-color 0.2s ease 0s;
      cursor: pointer;
      color: #a1a4b1;
      font-size: 14px;
      font-weight: 600;
      border: 1px solid transparent;
      &:hover {
        //opacity: 0.65;
        border-color: #5bcaf9;
        color: #333;
      }
      img {
        // margin-top: 7px;
        width: 28px;
        height: 28px;
        margin-right: 10px;
      }
      @media screen and (max-width: 400px){
        font-size: 12px;
        padding: 0 8px;
        img {
          width: 22px;
          height: 22px;
        }
      }
    }
  }
  .show-sign-button {
    text-align: center;
    padding-top: 50px;
    .el-button {
      // padding: 12px 50px;
      border-radius: 10px;
      padding: 16px 50px;
    }
  }
  .swap-type {
    margin-bottom: 15px;
    display: flex;
    justify-content: center;
    .el-radio-group {
      border-radius: 20px;
      background: #EBEEF8;
      .el-radio-button {
        .el-radio-button__inner {
          border: none;
          box-shadow: none;
          background-color: #EBEEF8;
          color: #99A3C4;
          border-radius: 20px;
          padding: 13px 20px;
          font-size: 15px;
        }
        &.is-active {
          .el-radio-button__inner {
            background-color: #5BCAF9;
            color: #fff;
            border-radius: 20px;
          }
        }
      }
      .el-radio-button__inner {
        width: 130px;
      }
    }
    
  }
  .account-select {
    .from,
    .to {
      width: 100%;
      height: 54px;
      font-size: 14px;
      border-radius: 10px;
      background-color: @BColor;
      padding: 15px;
      display: flex;
      align-items: center;
      color: @labelColor;
    }

    .network {
      // color: #515e7b;
      margin: 0 15px 0 10px;
      width: 66px;
    }
    .to {
      margin-bottom: 30px;
      .address {
        position: absolute;
        font-size: 14px;
        left: 147px;
        color: #515B7D;
      }
    }
    .el-select {
      width: 100%;
      left: 10px;
      z-index: 2;
      .el-input__inner {
        background: transparent;
        border: none;
        height: auto;
        line-height: initial;
        padding: 0;
        color: #515B7D;
        // font-size: 14px;
      }
      .el-input__suffix {
        .el-input__icon {
          line-height: initial;
          font-size: 16px;
          font-weight: 600;
        }
      }
    }
  }
  .amount,
  .fee {
    .label {
      font-size: 12px;
      color: @labelColor;
      margin-right: 5px;
      margin-bottom: 6px;
      line-height: 1;
    }
  }
  .amount {
    .label-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        color: @labelColor;
        font-size: 12px;
      }
    }
    .amount-inner {
      height: 74px;
      background-color: @BColor;
      border-radius: 10px;
      display: flex;
      align-items: center;
    }
    .select-asset-btn {
      cursor: pointer;
      color: #99a3c4;
      padding: 5px 10px;
      border-radius: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      // min-width: 130px;
      &:hover {
        background-color: rgb(224, 217, 235);
      }
      /* img {
        width: 30px;
        height: 30px;
        margin-right: 5px;
      }
      
      .origin-chain {
        display: inline-block;
        border: 1px solid #5BCAF9;
        border-radius: 2px;
        padding: 1px 5px;
        font-size: 12px;
        font-weight: normal;
        margin-left: -6px;
        color: #5BCAF9;
        transform: scale(0.8);
        min-width: 50px;
        text-align: center;
      } */
    }
    .el-input-group__prepend {
      .el-select .el-input {
        width: auto;
        min-width: 150px;
      }
    }
    .el-input-group__prepend,
    .el-input-group__append {
      background-color: @BColor;
      padding: 0 10px;
      border: none;
      width: auto;
      .el-button {
        //color: @labelColor;
        //font-weight: bold;
        font-size: 12px;
        font-weight: normal;
        color: #515B7D;
      }
    }
    .el-select .el-select__caret {
      font-weight: bold;
      color: #99a3c4;
    }
    .el-input__inner {
      background-color: @BColor !important;
      border: none !important;
      /* font-weight: bold;
      color: #99a3c4 !important; */
      font-size: 16px;
      font-weight: normal !important;
      color: #515B7D !important;
      &::-webkit-input-placeholder {
        font-weight: normal;
        color: #515B7D !important;
      }
     /*  &::-webkit-input-placeholder {
        font-weight: bold;
        color: #99a3c4;
      } */
    }
  }
  .fee {
    margin-bottom: 30px;
    .fee-inner {
      font-size: 15px;
    }
  }
  .msg-wrap {
    margin-bottom: 30px;
    position: relative;
    .from-validate-msg,
    .amount-validate-msg {
      position: absolute;
      color: #f56c6c;
      font-size: 12px;
      line-height: 1;
      padding: 4px 0 0 5px;
    }
  }

  .btn-wrap {
    width: 100%;
    margin: 20px auto 0;
    .el-button {
      width: 100%;
      border-radius: 10px;
      padding: 16px 20px;
    }
  }
  .asset-info-wrap {
    display: flex;
    flex-direction: column;
  }
  .logo-img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 5px;
  }
  .origin-chain {
    display: inline-block;
    border: 1px solid #5BCAF9;
    border-radius: 2px;
    padding: 1px 5px;
    font-size: 12px;
    font-weight: normal;
    // margin-left: -6px;
    color: #5BCAF9;
    transform: translateX(-10%) scale(0.8);
    min-width: 50px;
    text-align: center;
  }
}
@media screen and (min-width: 1200px) {
  .home {
    .home-content {
      min-height: calc(780px - 94px);
    }
  }
  .airdrop-cont {
    min-height: calc(780px - 100px) !important;
    max-height: calc(780px - 100px) !important;
  }
}
.banner-cont {
  height: 130px;
  background-color: purple;
  border-radius: 10px;
  margin-bottom: 15px;
}
.airdrop-cont {
  background-color: #fff;
  border-radius: 10px;
  min-height: calc(100vh - 100px);
  max-height:  calc(100vh - 100px);
  overflow: auto;
  .airdrop-list {
    padding: 15px;
    border-bottom: 1px solid #E9EBF3;
    //&:last-child {
    //  border: none;
    //}
    .airdrop-item {
      .airdrop-icon {
        height: 30px;
        width: 30px;
        border-radius: 50%;
        overflow: hidden;
        img {
          height: 100%;
          width: 100%;
        }
      }
    }
    .airdrop-info {
      margin-top: 6px;
      align-items: center;
      justify-content: space-between;
      .receive_btn {
        height: 34px;
        width: 60px;
        line-height: 34px;
        text-align: center;
        color: #fff;
        background-color: #5BCAF9;
        border-radius: 10px;
      }
    }
  }
}
.pop-cont {
  width: 340px;
  padding: 15px;
  background-color: #FFFFFF;
  border-radius: 10px;
  .input-cont {
    margin: 20px auto;
    width: 100%;
    input {
      width: 100%;
      height: 40px;
      border: 1px solid #5BCAF9;
      outline: none;
      text-align: center;
      border-radius: 5px;
      font-size: 16px;
      &::placeholder {
        color: #ABB1BA;
        font-size: 15px;
      }
    }
  }
  .btn_cont {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .btn_item {
      font-size: 13px;
      height: 40px;
      width: 140px;
      line-height: 40px;
      text-align: center;
      color: #5BCAF9;
      border-radius: 10px;
      border: 1px solid #EBEEF8;
      &.active_btn {
        background-color: #5BCAF9;
        color: #FFFFFF;
      }
    }
  }
}
</style>
