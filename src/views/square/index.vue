<template>
  <div ref="scrollContainer" @scroll="squareScroll" class="square-cont" :class="{'mobile_class': !isMobile}">
    <template v-if="showSquareLoading && redBagList.length === 0">
      <Loading/>
    </template>
    <template v-else-if="redBagList.length !== 0">
      <div v-for="item in redBagList" :key="item.id" class="square-item">
        <div class="square-header">
          <div class="d-flex align-items-center">
            <div class="header-logo mr-1">
              <img :src="item.icon" alt="">
            </div>
            <div class="header-name flex-1 size-30 text-truncate">{{ item.name }}</div>
<!--            <div class="header-time d-flex direction-column">-->
<!--              <div class="size-32 text-3a text-truncate w-240">-->
<!--                {{ item.name }}-->
<!--              </div>-->
<!--            </div>-->
          </div>
        </div>
        <div class="square-info size-26">
          <div class="d-flex align-items-center space-between mt-3">
            <span class="size-26 text-8d">{{ $t('airdrop.airdrop18') }}/{{ $t('airdrop.airdrop17') }}</span>
            <span class="text-3a">{{ item.remainAsset | numFormatFixSix }}/{{ item.amount | numFormatFixSix }}{{ item.symbol }}</span>
          </div>
          <div class="d-flex align-items-center space-between mt-3">
            <span class="size-26 text-8d">{{ $t('airdrop.airdrop47') }}</span>
            <span class="text-3a">{{ item.perAmount | numFormatFixSix }}{{ item.symbol }}</span>
          </div>
          <div class="d-flex align-items-center space-between mt-3">
            <span class="size-26 text-8d">{{ $t('airdrop.airdrop16') }}</span>
            <span class="text-3a">{{ item.endTime }}(UTC+8)</span>
          </div>
<!--          <div class="d-flex align-items-center space-between mt-3">-->
<!--            <span class="size-26 text-8d">{{ $t('airdrop.airdrop48') }}</span>-->
<!--            <span class="text-3a">{{ 'Nerve' }}</span>-->
<!--          </div>-->
<!--          <div class="d-flex align-items-center space-between mt-3">-->
<!--            <span class="size-26 text-8d">{{ $t('airdrop.airdrop19') }}</span>-->
<!--            <span class="text-green">DID用户(等级1)</span>-->
<!--          </div>-->
        </div>
        <Button class="mt-4" :disabled="item.receiveStatus !== 0" @click="receiveAirdrop(item)">
          {{ item.receiveStatus === 0 ? $t('airdrop.airdrop2') : item.receiveStatus === 1 ? $t('airdrop.airdrop45') : item.receiveStatus === 2 ? $t('airdrop.airdrop7') : $t('airdrop.airdrop51') }}
        </Button>
        <div @click="toBrowser(item.sendTxHash)" v-if="item.receiveStatus === 2 && item.sendTxHash" class="mt-3 text-21 size-28 cursor-pointer text-center">{{ $t('airdrop.airdrop49') }}</div>
      </div>
    </template>
    <div class="d-flex align-items-center direction-column justify-content-center" v-else-if="redBagList.length === 0">
      <span class="empty-img">
        <img src="@/assets/image/empoty_airdrop.svg" alt="">
      </span>
      <span class="text-center pt-4 mt-2 size-28">{{ $t("tips.tips26") }}</span>
    </div>
    <NoData :noMore="true" v-if="redBagList.length !== 0 && redBagList.length === totalCount"/>
    <pop-up :show.sync="showLoading" v-loading="showLoading" :opacity="true">
      <Spin :isFullLoading="true"/>
    </pop-up>
  </div>
</template>

<script>
import Button from '@/components/Button';
import {NTransfer} from "../../api/api";
import {Division, getCurrentAccount, hashLinkList, Minus, Times} from "../../api/util";
import {MAIN_INFO} from "@/config";

export default {
  name: "Square",
  components: { Button },
  data() {
    return {
      redBagList: [],
      showSquareLoading: true,
      totalCount: -1,
      pageNumber: 1,
      showLoading: false
    };
  },
  created() {
    setTimeout(() => {
      this.getSquareRedBagList();
    }, 500);
  },
  mounted() {
    window.addEventListener('scroll', this.squareHandleScroll);
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.squareHandleScroll);
  },
  methods: {
    toBrowser(hash) {
      this.isMobile ? window.location.href = hashLinkList['NERVE'] + hash : window.open(hashLinkList['NERVE'] + hash);
    },
    squareScroll() {
      if (this.$refs.scrollContainer.scrollTop + this.$refs.scrollContainer.clientHeight >= this.$refs.scrollContainer.scrollHeight && this.redBagList.length < this.totalCount) {
        this.pageNumber = this.pageNumber + 1;
        this.getSquareRedBagList();
      }
    },
    squareHandleScroll()  {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      let clientHeight = document.documentElement.clientHeight;
      let scrollHeight = document.documentElement.scrollHeight;
      if (scrollTop + clientHeight >= scrollHeight && this.redBagList.length < this.totalCount) { // 滚动到底部，逻辑代码
        this.pageNumber = this.pageNumber + 1;
        this.getSquareRedBagList();
      }
    },
    async getSquareRedBagList() {
      try {
        this.showSquareLoading = true;
        const currentAccount = getCurrentAccount(this.fromAddress);
        const res = await this.$request({
          url: '/air/drop/red/list',
          data: {
            page: this.pageNumber,
            address: currentAccount && currentAccount['address']['NERVE']
          }
        });
        if (res.code === 1000 && res.data) {
          this.totalCount = res.data.totalCount;
          // this.redBagList = tempList.filter(item => item.status === 1 || item.status === 2)
          this.redBagList = this.redBagList.concat(res.data.list).map(item => ({
            ...item,
            remainAsset: Times(Division(item.amount || 0, item.addressCount || 0), Minus(item.addressCount || 0, item.receiveCount || 0)).toString(),
            perAmount: Division(item.amount || 0, item.addressCount || 0).toString(),
            endTime: this.formatTime(item.endTime)
          }));
        } else {
          this.redBagList = this.redBagList.concat([]);
        }
        this.showSquareLoading = false;
      } catch (e) {
        console.error(e, 'error');
        this.showSquareLoading = true;
      }
    },
    // 发送交易
    async sendTransaction(isPass=false) {
      try {
        this.showLoading = true;
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
        this.showLoading = false;
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
          this.showLoading = false;
          this.$message({ message: this.$t("tips.tips4"), type: "warning", duration: 2000 })
        }
      } catch (e) {
        console.error(e, 'e')
        this.showLoading = false;
        this.$message({ message: 'Network Error', type: "warning", duration: 2000 });
      }
    },
    // 发送hash到后台
    async broadcastHash(hash) {
      const currentAccount = getCurrentAccount(this.fromAddress);
      const data = {
        txHash: hash,
        code: '',
        airDropId: this.currentAirdrop.airDropId,
        address: currentAccount && currentAccount['address'] && currentAccount['address']['NERVE'] || this.currentAccount && this.currentAccount['address'] && this.currentAccount['address']['NERVE'] || ''
      }
      const res = await this.$request({
        url: '/air/drop/receive',
        data
      });
      if (res.code === 1000) {
        this.redBagList = this.redBagList.map(item => {
          if (item.airDropId === this.currentAirdrop.airDropId) {
            return {
              ...item,
              receiveStatus: 1
            }
          }
          return item;
        });
        this.$message({ message: this.$t("tips.tips5"), type: "success", duration: 2000 })
      } else {
        this.$message({ message: this.$t(res.data), type: "warning", duration: 2000 })
      }
      this.showLoading = false;
      this.showSuccess = true;
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
      this.currentAirdrop = airdrop;
      console.log(airdrop.id, 'airdrop')
      await this.sendTransaction();
    },
  }
}
</script>

<style lang="scss" scoped>
.square-cont {
  margin: 28px 28px 0 28px;
  padding-bottom: 20px;
  .square-item {
    padding: 28px;
    border-radius: 16px;
    border: 1px solid #E6E8F1;
    margin-bottom: 25px;
    .square-header {
      padding-bottom: 28px;
      border-bottom: 1px solid #E6E8F1;
      .header-logo {
        height: 68px;
        width: 68px;
        border-radius: 50%;
        overflow: hidden;
        img {
          height: 100%;
          width: 100%;
        }
      }
    }
  }
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
@media screen and (min-width: 1000px) {
  .mobile_class {
    height: 1305px;
    overflow-y: auto;
  }
  &::-webkit-scrollbar {
    width: 0 !important;
    height: 0 !important;
  }
}
.w-240 {
  text-align: right;
  width: 350px;
}
.el-loading-parent--relative {
  position: unset !important;
}
</style>
