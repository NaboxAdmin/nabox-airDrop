<template>
  <div class="home" :class="{'mobile_class': !isMobile}" v-loading="isPass && transferLoading">
    <div>
      <!--@click="toUrl" -->
      <div class="banner-cont m-15">
        <img v-if="lang==='cn'" src="../../assets/image/air_banner.jpg" alt="">
        <img v-if="lang==='en'" src="../../assets/image/air_banner.jpg" alt="">
      </div>
      <div class="airdrop-cont">
        <div class="airdrop-cont-header">
          <div class="airdrop-cont-header_item">{{ $t('airdrop.airdrop14') }}</div>
          <div class="airdrop-cont-header_item">{{ $t('airdrop.airdrop15') }}</div>
        </div>
        <template v-if="airdropListLoading && airdropList.length === 0">
          <Loading />
        </template>
        <template v-else-if="airdropList.length > 0">
          <div class="airdrop-list">
            <div v-for="item in airdropList" class="airdrop-item">
              <div class="item-info">
                <div class="item-logo">
                  <img :src="item.icon" alt="">
                </div>
                <div class="item-coin-info">
                  <span class="text-3a">{{ item.symbol }}({{ item.chain }})</span>
                  <span class="text-8d">{{ superLong(item.contractAddress) }}</span>
                </div>
              </div>
              <div class="item-option">
                <div class="item-coin-cont">
                  <span class="text-3a">{{ item.receiveAmount | numFormatFixSix }}</span>
                  <span class="text-8d">${{ item.usdPrice | numFormatFixSix }}</span>
                </div>
                <div class="receive_btn cursor-pointer" :class="item.status !== 0 && 'disabled_btn'" @click="receiveAirdrop(item)">
                  {{ item.status === 0 ? $t('airdrop.airdrop2') : item.status === 1 ? $t('airdrop.airdrop45') : $t('airdrop.airdrop7') }}
                </div>
              </div>
            </div>
          </div>
        </template>
        <div class="d-flex align-items-center direction-column justify-content-center" v-else-if="airdropList.length === 0">
          <span class="empty-img">
            <img src="@/assets/image/empoty_airdrop.svg" alt="">
          </span>
          <span class="text-center pt-4 mt-2 size-28">{{ $t("tips.tips6") }}</span>
        </div>
        <NoData :noMore="true" v-if="airdropList.length !== 0 && airdropList.length === totalCount"/>
      </div>
    </div>
    <pop-up :show.sync="showPop" :loading="transferLoading">
      <div class="pop-cont">
        <div class="text-51 font-bold size-32">{{ $t("airdrop.airdrop3") }}</div>
        <div class="input-cont">
          <input type="text" @input="codeInput" v-model="verificationCode">
          <span class="text-red size-12" v-if="errMsg">{{ errMsg }}</span>
        </div>
        <div class="btn_cont">
          <div class="btn_item cursor-pointer" @click="showPop=false; errMsg=''; verificationCode=''">{{ $t('airdrop.airdrop4') }}</div>
          <div class="btn_item active_btn cursor-pointer" @click="confirmReceive">{{ $t('airdrop.airdrop5') }}</div>
        </div>
      </div>
    </pop-up>
    <pop-up :show.sync="showSuccess" :loading="transferLoading">
      <div class="pop-cont">
        <div class="text-51 font-bold size-32 text-center">{{ $t("airdrop.airdrop8") }}</div>
        <div class="tips-cont size-28">{{ $t('airdrop.airdrop10') }}</div>
        <div class="tip-btn_cont">
          <div class="btn_item active_btn cursor-pointer" @click="showSuccess=false">{{ $t('airdrop.airdrop9') }}</div>
        </div>
      </div>
    </pop-up>
  </div>
</template>

<script>
import { MAIN_INFO } from "@/config";
import nerve from "nerve-sdk-js";
import { getCurrentAccount, superLong } from "../../api/util";
import { NTransfer } from "../../api/api";
import PopUp from "../../components/PopUp/PopUp";
import Loading from "../../components/Loading/Loading";

export default {
  data() {
    return {
      loading: true,
      supportListShow: true, //显示可连接钱包列表
      address: "", //metamask当前选中地址
      swapType: "nerve",
      provider: null,
      fromChainId: "",
      showPop: false,
      errMsg: '',
      airdropList: [], // 当前可领取空投List
      currentAirdrop: null, // 当前选择领取的空投
      verificationCode: '', // 202024
      transferLoading: false,
      isPass: false,
      lang: '',
      airdropListLoading: false,
      showSuccess: false,
      pageNumber: 1,
      totalCount: -1
    };
  },

  components: {
    PopUp,
    Loading
  },

  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },

  watch: {
    "$store.state.fromAddress": {
      immediate: true,
      deep: true,
      handler(val) {
        if (val) {
          this.getAirDropList(val);
        }
      }
    },
    "$store.state.lang": {
      immediate: true,
      deep: true,
      handler(val) {
        if (val) {
          this.lang = val;
        }
      }
    }
  },

  computed: {
    fromNetwork() {
      return this.$store.state.network;
    },
    // fromAddress() {
    //   const currentAccount = getCurrentAccount(this.address);
    //   return currentAccount && !this.showSign ? currentAccount.address['NERVE'] : "";
    // },
    isMobile() {
      return /Android|webOS|iPhone|iPad|BlackBerry/i.test(navigator.userAgent);
    }
  },

  methods: {
    handleScroll()  {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      let clientHeight = document.documentElement.clientHeight;
      let scrollHeight = document.documentElement.scrollHeight;
      if (scrollTop + clientHeight >= scrollHeight && this.airdropList.length < this.totalCount) { // 滚动到底部，逻辑代码
        this.pageNumber = this.pageNumber + 1;
        this.getAirDropList();
      }
    },
    async getAirDropList(address, reload=false) {
      try {
        this.airdropListLoading = true;
        const tempList = JSON.parse(localStorage.getItem('airdropList'));
        const currentAccount = getCurrentAccount(address || this.fromAddress);
        const data = {
          pubKey: currentAccount && currentAccount.pub || "",
          page: this.pageNumber
        };
        const res = await this.$request({
          url: '/air/drop/list',
          data
        });
        if (res.code === 1000 && res.data) {
          this.totalCount = res.data.totalCount;
          if (tempList && tempList.length > 0 && !reload) {
            const tempDropList = this.formatData(this.airdropList.concat(res.data.list));
            this.airdropList = tempDropList.map((item, index) => {
              if (tempList[index] && tempList[index].isPass && tempList[index].code) {
                return tempList[index];
              } else {
                return item;
              }
            });
          } else {
            this.airdropList = this.formatData(this.airdropList.concat(res.data.list));
            localStorage.setItem('airdropList', JSON.stringify(this.airdropList));
          }
        } else {
          localStorage.setItem('airdropList', JSON.stringify([]));
          this.$message.warning(res.msg);
        }
        this.airdropListLoading = false;
      } catch (e) {
        console.log(e)
        this.airdropListLoading = false;
        localStorage.setItem('airdropList', JSON.stringify([]));
      }
    },
    formatData(data) {
      if (!data || !Array.isArray(data)) return [];
      return data.sort((a, b) => a.status - b.status).map(item => ({
        ...item,
        usdPrice: this.numberFormat(item.usdPrice || 0, 8),
        isPass: false
      }));
    },
    // 确认领取
    async confirmReceive() {
      try {
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
          throw res.data;
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
        const currentAccount = getCurrentAccount(this.fromAddress);
        const crossAddress = await this.getCrossAddress();
        if (!crossAddress) {
          throw 'crossAddress error'
        }
        const { chainId, assetId } = MAIN_INFO;
        const transferInfo = {
          from: this.nerveAddress || currentAccount && currentAccount.address['NERVE'] || '',
          to: crossAddress,
          amount: 0,
          fee: 0,
          assetsChainId: chainId,
          assetsId: assetId
        };
        const { inputs, outputs } = await transfer.transferTransaction(transferInfo);
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
      try {
        const url = MAIN_INFO.rpc;
        const chainId = MAIN_INFO.chainId;
        const res = await this.$post(url, 'broadcastTx', [chainId, txHex]);
        if (res.result && res.result.hash) {
          await this.broadcastHash(res.result.hash)
        } else {
          this.transferLoading = false;
          this.$message({ message: this.$t("tips.tips4"), type: "warning", duration: 2000 })
        }
      } catch (e) {
        this.transferLoading = false;
        this.$message({ message: 'Network Error', type: "warning", duration: 2000 });
      }
    },
    // 发送hash到后台
    async broadcastHash(hash) {
      const data = {
        txHash: hash,
        code: this.verificationCode || this.currentAirdrop.code || '',
        id: this.currentAirdrop.id,
        airDropId: this.currentAirdrop.dropId,
        address: this.currentAccount && this.currentAccount['address']['NERVE'] || ''
      }
      const res = await this.$request({
        url: '/air/drop/receive',
        data
      });
      if (res.code === 1000) {
        this.$message({ message: this.$t("tips.tips5"), type: "success", duration: 2000 })
        this.showSuccess = true;
      } else {
        this.$message({ message: this.$t(res.msg), type: "warning", duration: 2000 })
      }
      this.transferLoading = false;
      this.reset();
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
        crossAddress = res.data.airDropNerveAddress
      }
      return crossAddress
    },
    async receiveAirdrop(airdrop) {
      if (airdrop.status !== 0) return false;
      this.currentAirdrop = airdrop;
      if (!airdrop.codeFlag) {
        this.isPass = true;
        this.transferLoading = true;
        await this.sendTransaction(true);
      } else {
        if (airdrop.isPass && airdrop.code) {
          this.isPass = true;
          this.transferLoading = true;
          await this.sendTransaction(true);
        } else {
          this.showPop = true;
          this.isPass = false;
        }
      }
    },
    reset() {
      this.verificationCode = '';
      this.showPop = false;
      this.errMsg = "";
    },
    toUrl() {
      this.isMobile ? window.location.href = 'https://nabox.io/' : window.open('https://nabox.io/');
    },
    toTelegram() {
      this.isMobile ? window.location.href = 'https://t.me/naboxcommunity' : window.open('https://t.me/naboxcommunity');
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
    parseChainId(chainId) {
      chainId = chainId + ""
      // 兼容Binggo
      return chainId.startsWith("0x") ? chainId : "0x" + Number(chainId).toString(16);
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
    async syncAccount(pub) {
      const res = await this.$request({
        url: "/wallet/sync",
        data: { pubKey: pub },
      });
      return res.code === 1000;
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
    },
    numberFormat(val, float, returnBoo = false) {
      if (!Number(val)) {
        if (returnBoo) {
          return '';
        }
        return '0';
      }
      const numberVal = val.toString();
      const n = float || 6;
      if (n <= 0) return numberVal;
      return numberVal.replace(/(\.\d+?)0*$/, '$1');
    }
  },
};
</script>
<style lang="scss" scoped>
$BColor: #ebeef8;
$labelColor: #99a3c4;
.home {
  background-color: #fff;
  //position: relative;
  .home-content {
    background-color: #fff;
    margin: 15px;
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
        border-color: #6eb6a9;
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
      background-color: $BColor;
      padding: 15px;
      display: flex;
      align-items: center;
      color: $labelColor;
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
      color: $labelColor;
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
        color: $labelColor;
        font-size: 12px;
      }
    }
    .amount-inner {
      height: 74px;
      background-color: $BColor;
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
      &:hover {
        background-color: rgb(224, 217, 235);
      }
    }
    .el-input-group__prepend {
      .el-select .el-input {
        width: auto;
        min-width: 150px;
      }
    }
    .el-input-group__prepend,
    .el-input-group__append {
      background-color: $BColor;
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
      background-color: $BColor !important;
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
.banner-cont {
  height: 320px;
  //background-color: purple;
  border-radius: 10px;
  margin-bottom: 30px;
  overflow: hidden;
  img {
    height: 100%;
    width: 100%;
  }
}
.direction-column {
  flex-direction: column;
}
.airdrop-cont {
  position: relative;
  background-color: #FFFFFF;
  border-radius: 10px;
  //padding-bottom: 100px;
  min-height: calc(100vh - 600px);
  overflow: auto;
  margin: 28px;
  @media screen and (min-width: 1000px){
    min-height: calc(1560px - 600px);
    overflow: auto;
  }
  .airdrop-cont-header {
    color: #8D94AB;
    display: flex;
    .airdrop-cont-header_item {
      width: 50%;
      line-height: 36px;
      font-size: 26px;
    }
  }
  .airdrop-list {
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 0px !important;
      height: 0px !important;
    }
    .airdrop-item {
      display: flex;
      padding: 30px 0;
      .item-info {
        display: flex;
        width: 50%;
        .item-logo {
          height: 68px;
          width: 68px;
          border-radius: 50%;
          margin-right: 12px;
          overflow: hidden;
          img {
            height: 100%;
            width: 100%;
          }
        }
        .item-coin-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          //line-height: 36px;
        }
      }
      .item-option {
        display: flex;
        width: 50%;
        justify-content: space-between;
        .item-coin-cont {
          display: flex;
          justify-content: center;
          flex-direction: column;
        }
        .receive_btn {
          height: 68px;
          width: 120px;
          line-height: 68px;
          text-align: center;
          color: #fff;
          background-color: #21C980;
          border-radius: 10px;
        }
      }
    }
  }
}
.pop-cont {
  width: 620px;
  padding: 30px;
  background-color: #FFFFFF;
  border-radius: 20px;
  .input-cont {
    margin: 40px auto;
    display: flex;
    //width: 100%;
    input {
      flex: 1;
      height: 70px;
      padding-left: 20px;
      border: 1px solid #6eb6a9;
      outline: none;
      border-radius: 10px;
      font-size: 32px;
      &::placeholder {
        color: #ABB1BA;
        font-size: 30px;
      }
    }
  }
  .btn_cont {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .btn_item {
      font-size: 26px;
      height: 80px;
      width: 280px;
      line-height: 80px;
      text-align: center;
      color: #6eb6a9;
      border-radius: 10px;
      border: 1px solid #EBEEF8;
      &.active_btn {
        background-color: #6eb6a9;
        color: #FFFFFF;
      }
    }
  }
  .tip-btn_cont {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .btn_item {
      font-size: 26px;
      height: 90px;
      width: 100%;
      line-height: 90px;
      text-align: center;
      color: #6eb6a9;
      border-radius: 20px;
      border: 1px solid #EBEEF8;
      &.active_btn {
        background-color: #6eb6a9;
        color: #FFFFFF;
      }
    }
  }
}
.m-15 {
  margin: 20px;
}
.empty-img {
  margin-top: 200px;
  height: 200px;
  width: 200px;
  img {
    height: 100%;
    width: 100%;
  }
}
.disabled_btn {
  background-color: #ABB1BA !important;
  cursor: not-allowed;
}
.tips-cont {
  padding: 20px 0;
}
.w-200 {
  width: 450px;
}
@media screen and (min-width: 1000px) {
  .mobile_class {
    height: 1380px;
    overflow-y: auto;
  }
  &::-webkit-scrollbar {
    width: 0 !important;
    height: 0 !important;
  }
}
</style>
