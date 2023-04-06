<template>
  <div class="gift-cont" ref="scrollContainer" @scroll="giftScroll" :class="{'mobile_class': !isMobile}">
    <Input v-model.trim="giftCode" :placeholder="$t('airdrop.airdrop21')"/>
    <Button @click="queryCode" :disabled="!giftCode" :loading="showQueryLoading" class="mt-3">{{ $t('airdrop.airdrop22') }}</Button>
    <div v-if="giftItem.id" class="gift-item">
      <div class="gift-header">
        <div class="coin-logo">
          <img :src="giftItem.icon" alt="">
        </div>
        <span class="flex-1 text-3a size-30 text-truncate_one text-truncate">{{ giftItem.name }}</span>
      </div>
      <div class="coin-count mt-3">
        <span class="text-8d size-26">{{ $t('airdrop.airdrop71') }}</span>
        <span class="text-3a size-26">{{ giftItem.perAmount | numFormatFixSix }} {{ giftItem.symbol }}</span>
      </div>
      <div class="coin-count mt-3">
        <span class="size-26 text-8d">{{ $t('airdrop.airdrop16') }}</span>
        <span class="text-3a size-26">{{ giftItem.endTime | timeFormat }}</span>
      </div>
      <Button class="mt-4" :disabled="giftItem.receiveStatus !== 0" @click="receiveAirdrop(giftItem)">{{ giftItem.receiveStatus === 0 ? $t('airdrop.airdrop2') : giftItem.receiveStatus === 1 ? $t('airdrop.airdrop45') : giftItem.receiveStatus === 2 ? $t('airdrop.airdrop7') : $t('tips.tips22') }}</Button>
      <div @click="toBrowser(giftItem.sendTxHash)" v-if="giftItem.receiveStatus === 2 && giftItem.sendTxHash" class="mt-3 mb-3 text-21 size-28 cursor-pointer text-center">{{ $t('airdrop.airdrop49') }}</div>
    </div>
    <div class="gift-record pb-2">
      <div class="text-3a size-28">{{ $t('airdrop.airdrop53') }}</div>
      <div v-if="showSquareLoading && recordList.length === 0" class="mt-4 d-flex align-items-center direction-column justify-content-center">
        <Spin/>
        <span class="mt-2 size-24 text-21">{{ $t('airdrop.airdrop57') }}</span>
      </div>
      <template v-else-if="recordList.length !== 0">
        <div v-for="(item, index) in recordList" :key="`${item.id}-${index}`" class="gift-item">
          <div class="gift-header">
            <div class="coin-logo">
              <img :src="item.icon" alt="">
            </div>
            <span class="flex-1 text-3a size-30 text-truncate_one text-truncate">{{ item.name }}</span>
          </div>
          <div class="coin-count mt-3">
            <span class="text-8d size-26">{{ $t('airdrop.airdrop71') }}</span>
            <span class="text-3a size-26">{{ item.perAmount | numFormatFixSix }} {{ item.symbol }}</span>
          </div>
          <div class="coin-count mt-3">
            <span class="size-26 text-8d">{{ $t('airdrop.airdrop16') }}</span>
            <span class="text-3a size-26">{{ item.endTime | timeFormat }}</span>
          </div>
          <Button class="mt-4" :disabled="item.receiveStatus !== 0" @click="receiveAirdrop(item)">{{ item.receiveStatus === 0 ? $t('airdrop.airdrop2') : item.receiveStatus === 1 ? $t('airdrop.airdrop45') : item.receiveStatus === 2 ? $t('airdrop.airdrop7') : $t('tips.tips22') }}</Button>
          <div @click="toBrowser(item.sendTxHash)" v-if="item.receiveStatus === 2 && item.sendTxHash" class="mt-3 text-21 size-28 cursor-pointer text-center">{{ $t('airdrop.airdrop49') }}</div>
        </div>
      </template>
      <NoData v-else-if="recordList.length === 0"/>
      <NoData :noMore="true" v-if="recordList.length !== 0 && recordList.length === totalCount"></NoData>
    </div>
    <pop-up :show.sync="showLoading" v-loading="showLoading" :opacity="true">
      <Spin :isFullLoading="true"/>
    </pop-up>
  </div>
</template>

<script>
import Input from '@/components/Input';
import Button from '@/components/Button';
import {NTransfer} from "../../api/api";
import {Division, getCurrentAccount, hashLinkList, Minus, Times} from "../../api/util";
import {MAIN_INFO} from "@/config";

export default {
  name: "GiftCard",
  data() {
    return {
      giftCode: '',
      giftItem: {},
      showQueryLoading: false,
      showLoading: false,
      pageNumber: 1,
      totalCount: 0,
      recordList: [],
      showSquareLoading: true
    };
  },
  components: { Input, Button },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  created() {
    setTimeout(() => {
      this.getGiftRecordList();
    }, 500);
  },
  methods: {
    giftScroll() {
      if (this.$refs.scrollContainer.scrollTop + this.$refs.scrollContainer.clientHeight >= this.$refs.scrollContainer.scrollHeight && this.recordList.length < this.totalCount) {
        this.pageNumber = this.pageNumber + 1;
        this.getGiftRecordList();
      }
    },
    handleScroll()  {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      let clientHeight = document.documentElement.clientHeight;
      let scrollHeight = document.documentElement.scrollHeight;
      if (scrollTop + clientHeight >= scrollHeight && this.recordList.length < this.totalCount) { // 滚动到底部，逻辑代码
        this.pageNumber = this.pageNumber + 1;
        this.getGiftRecordList();
      }
    },
    toBrowser(hash) {
      this.isMobile ? window.location.href = hashLinkList['NERVE'] + hash : window.open(hashLinkList['NERVE'] + hash);
    },
    async getGiftRecordList() {
      try {
        this.showSquareLoading = true;
        const currentAccount = getCurrentAccount(this.fromAddress);
        const res = await this.$request({
          url: '/air/drop/gift/list',
          data: {
            page: this.pageNumber,
            address: currentAccount && currentAccount['address']['NERVE']
          }
        });
        if (res.code === 1000 && res.data) {
          this.totalCount = res.data.totalCount;
          const tempList = this.recordList.concat(res.data.list).map(item => ({
            ...item,
            remainAsset: Times(Division(item.amount || 0, item.addressCount || 0), Minus(item.addressCount || 0, item.receiveCount || 0)).toString(),
            perAmount: Division(item.amount || 0, item.addressCount || 0).toString()
          }));
          this.recordList = tempList;
        } else {
          this.recordList = this.recordList.concat([]);
        }
        this.showSquareLoading = false;
      } catch (e) {
        console.error(e, 'error');
        this.showSquareLoading = true;
      }
    },
    async queryCode() {
      try {
        this.giftItem = {};
        this.showQueryLoading = true;
        const res = await this.$request({
          url: '/air/drop/gift',
          data: { code: this.giftCode }
        });
        if (res.code === 1000) {
          this.giftItem = {
            ...res.data,
            perAmount: Division(res.data.amount || 0, res.data.addressCount || 0).toString() || 0
          };
        } else {
          throw res.data;
        }
        this.showQueryLoading = false;
      } catch (e) {
        this.showQueryLoading = false;
        this.$message.warning(e.message || e);
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
        this.showLoading = false;
      } catch (e) {
        console.error(e);
        this.$message.warning(e.message || e);
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
        console.log(e, 'e')
        this.showLoading = false;
        this.$message({ message: 'Network Error', type: "warning", duration: 2000 });
      }
    },
    // 发送hash到后台
    async broadcastHash(hash) {
      const currentAccount = getCurrentAccount(this.fromAddress);
      const data = {
        txHash: hash,
        code: this.giftCode || '',
        id: this.currentAirdrop.id,
        airDropId: this.currentAirdrop.airDropId,
        address: currentAccount && currentAccount['address'] && currentAccount['address']['NERVE'] || this.currentAccount && this.currentAccount['address'] && this.currentAccount['address']['NERVE'] || ''
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
      this.showLoading = false;
      this.reset();
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
      await this.sendTransaction();
    },
    reset() {
      this.giftCode = '';
      this.giftItem = {};
    }
  }
}
</script>

<style scoped lang="scss">
.gift-cont {
  margin: 28px;
}
.gift-item {
  margin-top: 56px;
  padding: 28px;
  border: 1px solid #E6E8F1;
  border-radius: 16px;
  .gift-header {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 28px;
    border-bottom: 1px solid #E6E8F1;
    .coin-logo {
      height: 68px;
      width: 68px;
      margin-right: 12px;
      border-radius: 50%;
      overflow: hidden;
      img {
        height: 100%;
        width: 100%;
      }
    }
  }
  .coin-count {
    //padding: 40px 0 44px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
.el-loading-parent--relative {
  position: unset !important;
}
.record-header, .record-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #8D94AB;
  font-size: 26px;
  margin-top: 24px;
  span:nth-child(1) {
    flex: 1;
  }
  span:nth-child(2) {
    flex: 1;
  }
  span:nth-child(3) {
    flex: 1;
  }
  span:nth-child(4) {
    flex: 2;
  }
}
.record-header {
  padding: 10px 0;
}
.record-item {
  color: #3A3C44;
  span:nth-child(4) {
    color: #21C980;
    cursor: pointer;
  }
}
.w-160 {
  width: 160px;
}
.gift-scroll {
  height: 400px;
  overflow-y: auto;
  padding-right: 6px;
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
.gift-record {
  margin-top: 50px;
}
</style>
