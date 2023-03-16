<template>
  <div class="gift-cont" v-loading="showLoading">
    <Input v-model="giftCode" :placeholder="$t('airdrop.airdrop21')"/>
    <Button @click="queryCode" :disabled="!giftCode" class="mt-3">{{ $t('airdrop.airdrop22') }}</Button>
    <template v-if="showQueryLoading">
      <Loading/>
    </template>
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
        <span class="text-3a size-32">{{ giftItem.amount }}</span>
        <span class="text-8d size-26">{{ giftItem.symbol }}</span>
      </div>
      <Button type="ghost" @click="receiveAirdrop(giftItem)">{{ $t('airdrop.airdrop2') }}</Button>
    </div>
  </div>
</template>

<script>
import Input from '@/components/Input';
import Button from '@/components/Button';
import {NTransfer} from "../../api/api";
import {getCurrentAccount} from "../../api/util";
import {MAIN_INFO} from "../../../config/beta";

export default {
  name: "GiftCard",
  data() {
    return {
      redBagList: [],
      giftCode: '',
      giftItem: {},
      showQueryLoading: false,
      showLoading: false
    };
  },
  components: { Input, Button },
  created() {

  },
  methods: {
    async queryCode() {
      try {
        this.giftItem = {};
        this.showQueryLoading = true;
        const res = await this.$request({
          url: '/air/drop/gift',
          data: { code: this.giftCode }
        });
        if (res.code === 1000) {
          this.giftItem = res.data;
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
      const data = {
        txHash: hash,
        code: this.giftCode || '',
        id: this.currentAirdrop.id,
        airDropId: this.currentAirdrop.airDropId,
        address: this.currentAccount && this.currentAccount['address']['NERVE'] || ''
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
</style>
