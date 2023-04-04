<template>
  <div class="gift-cont">
    <Input v-model="giftCode" :placeholder="$t('airdrop.airdrop21')"/>
    <Button @click="queryCode" :disabled="!giftCode" :loading="showQueryLoading" class="mt-3">{{ $t('airdrop.airdrop22') }}</Button>
    <div v-if="giftItem.id" class="gift-item">
      <div class="gift-header">
        <div class="coin-logo">
          <img :src="giftItem.icon" alt="">
        </div>
        <span class="flex-1 text-3a size-30 text-truncate_one text-truncate">{{ giftItem.name }}</span>
        <div class="d-flex align-items-center">
          <div class="text-right size-24 d-flex mr-1 align-items-center justify-content-end">
            <img src="@/assets/image/deadline.svg" class="mr-1" alt="">
            <span class="text-e7">{{ $t('airdrop.airdrop16') }}</span>
          </div>
          <span class="text-8d size-28">{{ giftItem.endTime | timeFormat }}</span>
        </div>
      </div>
      <div class="coin-count">
        <span class="text-3a size-32">{{ giftItem.perAmount | numFormatFixSix }}</span>
        <span class="text-8d size-26">{{ giftItem.symbol }}</span>
      </div>
      <Button :disabled="giftItem.receiveStatus !== 0" type="ghost" @click="receiveAirdrop(giftItem)">{{ giftItem.receiveStatus === 0 ? $t('airdrop.airdrop2') : giftItem.receiveStatus === 1 ? $t('airdrop.airdrop45') : giftItem.receiveStatus === 2 ? $t('airdrop.airdrop7') : $t('tips.tips22') }}</Button>
      <div @click="toBrowser(giftItem.sendTxHash)" v-if="giftItem.receiveStatus === 2 && giftItem.sendTxHash" class="mt-1 mb-3 text-21 size-28 cursor-pointer text-center">{{ $t('airdrop.airdrop49') }}</div>
    </div>
    <div class="gift-record mt-3">
      <div class="text-3a size-28">{{ $t('airdrop.airdrop53') }}</div>
      <div class="record-header size-26">
        <span>{{ $t('airdrop.airdrop14') }}</span>
        <span>{{ $t('airdrop.airdrop54') }}</span>
        <span>{{ $t('airdrop.airdrop55') }}</span>
        <span>{{ $t('airdrop.airdrop56') }}</span>
      </div>
      <template>
        <div v-if="showSquareLoading" class="mt-4 d-flex align-items-center direction-column justify-content-center">
          <Spin/>
          <span class="mt-2 size-24 text-21">{{ $t('airdrop.airdrop57') }}</span>
        </div>
        <div v-else-if="recordList.length !== 0" class="record-item text-3a" v-for="(item, index) in recordList" :key="`${item.id}-${index}`">
          <span class="w-160 text-truncate">{{ item.symbol }}</span>
          <span class="w-160 text-truncate">{{ item.perAmount | numFormatFixSix }}</span>
          <span>{{ item.createTime }}</span>
          <span @click="toBrowser(item.sendTxHash)">{{ $t('airdrop.airdrop38') }}</span>
        </div>
        <NoData v-else></NoData>
      </template>
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
      redBagList: [],
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
  created() {
    setTimeout(() => {
      this.getGiftRecordList();
    }, 500);
  },
  methods: {
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
          this.recordList = tempList.filter(item => item.status === 1 || item.status === 2)
        } else {
          this.recordList = this.redBagList.concat([]);
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
  padding: 28px 28px 0 28px;
  border: 1px solid #E6E8F1;
  border-radius: 16px;
  .gift-header {
    display: flex;
    align-items: center;
    justify-content: center;
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
    padding: 40px 0 44px 0;
    border-bottom: 1px solid #E6E8F1;
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
    flex: 2;
  }
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
</style>
