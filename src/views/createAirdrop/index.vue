<template>
  <div class="airdrop-cont">
    <Input v-model="airdropName"
           :placeholder="currentIndex === 0 ? $t('airdrop.airdrop40') : currentIndex === 1 ? $t('airdrop.airdrop70') : $t('airdrop.airdrop64')"
           class="mt-3 mb-3"/>
    <el-select
        ref="selectRef"
        @hook:mounted="removeReadOnly"
        @visible-change="removeReadOnly"
        v-model="selectAsset"
        @change="changeAsset"
        filterable
        :placeholder="currentIndex === 0 ? $t('airdrop.airdrop25') : currentIndex === 1 ? $t('airdrop.airdrop65') : $t('airdrop.airdrop59')"
        :popper-append-to-body="false">
      <el-option
          v-for="(item, index) in assetList"
          :key="index"
          :label="`${item.symbol}(${superLong(item.contractAddress) || item.nerveChainId + '-' + item.nerveAssetId})`"
          :value="item.assetKey">
      </el-option>
    </el-select>
    <el-input
        v-model="airdropAmount"
        :value="airdropAmount"
        :placeholder="currentIndex === 0 ? $t('airdrop.airdrop26') : currentIndex === 1 ? $t('airdrop.airdrop66') : $t('airdrop.airdrop60')"
        class="mt-3 mb-3 h-40"/>
    <el-date-picker
        v-model="endTime"
        type="datetime"
        :editable="false"
        popper-class="date-cont"
        :picker-options="pickerOptions"
        value-format="yyyy-MM-dd HH:mm:ss"
        placement="bottom-start"
        :append-to-body="false"
        :time-arrow-control="true"
        :placeholder="currentIndex === 0 ? $t('airdrop.airdrop27') : currentIndex === 1 ? $t('airdrop.airdrop67') : $t('airdrop.airdrop61')">
    </el-date-picker>
    <div class="radio-cont">
      <div class="d-flex align-items-center mr-3 mt-3 mb-3 cursor-pointer size-28" v-for="(item, index) in typeList" :key="index" @click="currentIndex = index; airdropAddress=''; airdropAddressCount=''; errMsg=''">
        <div class="radio-item" :class="{active: index===currentIndex}">
          <span class="dot-item"></span>
        </div>
        <span class="ml-1">{{ item }}</span>
      </div>
    </div>
    <template v-if="currentIndex===0">
      <el-input
          @input="addressInput"
          type="textarea"
          :placeholder="$t('airdrop.airdrop29')"
          v-model="airdropAddress"
          rows="6"/>
      <div v-if="errMsg" class="text-red size-26 mt-1">{{ errMsg }}</div>
    </template>
    <div v-else class="mb-3">
      <el-input
          @input="addressCountInput"
          v-model="airdropAddressCount"
          :placeholder="currentIndex === 0 ? $t('airdrop.airdrop28') : currentIndex === 1 ? $t('airdrop.airdrop68') : $t('airdrop.airdrop62')"/>
      <div v-if="countErrMsg" class="text-red size-26 mt-1">{{ countErrMsg }}</div>
    </div>
    <div class="d-flex align-items-center space-between mt-3">
      <span class="text-8d size-26">{{ $t('airdrop.airdrop17') }}</span>
      <span>{{ allAirdropAmount || '--' }}</span>
    </div>
    <div class="d-flex align-items-center mb-3 mt-100">
      <el-checkbox v-model="understand" style="margin-right:10px;zoom:130%" />
      <span class="size-28 text-3a">{{ $t('airdrop.airdrop31') }}</span>
    </div>
    <Button v-if="!needAuth" :disabled="isDisabled" @click="createAirDrop">{{ $t('airdrop.airdrop23') }}</Button>
    <Button v-else @click="approveERC20">{{ $t('tips.tips24') }}</Button>
    <pop-up :show.sync="showLoading" v-loading="showLoading" :opacity="true">
      <Spin :isFullLoading="true"/>
    </pop-up>
  </div>
</template>

<script>
import Input from "@/components/Input";
import Button from "../../components/Button";
import Nerve from "./Nerve";
import {ethers} from "ethers";
import {divisionDecimals, getCurrentAccount, Minus, Plus, Times, timesDecimals} from "../../api/util";
import {getContractCallData} from "../../api/nulsContractValidate";
import { NULS_INFO, MAIN_INFO, EVM_PREFIX } from "../../config";
import {ETransfer, NTransfer} from "../../api/api";

export default {
  name: "CreateAirdrop",
  data() {
    this.getAllowanceTimer = null;
    return {
      pickerOptions: {
        disabledDate(v) {
          return v.getTime() < new Date().getTime();
        }
      },
      endTime: "",
      typeList: [this.$t('airdrop.airdrop11'), this.$t('airdrop.airdrop12'), this.$t('airdrop.airdrop13')],
      currentIndex: 0,
      airdropAddress: '',
      understand: false,
      assetList: [],
      selectAsset: '',
      airdropAmount: '',
      airdropAddressCount: '',
      airdropName: '',
      showLoading: false,
      NULSContractGas: {},
      NULSContractTxData: {},
      needAuth: false,
      errMsg: '',
      countErrMsg: '',
      assetAvailable: 0
    }
  },
  components: {Button, Input },
  computed: {
    allAirdropAmount() {
      if (this.currentIndex === 0) {
        if (!this.airdropAmount || !this.airdropAddress) return 0;
        const addressList = this.airdropAddress.split('\n').filter(item => item);
        const addressCount = addressList.length;
        return Times(addressCount, this.airdropAmount).toString();
      } else {
        if (!this.airdropAmount || !this.airdropAddressCount) return 0;
        return Times(this.airdropAmount, this.airdropAddressCount).toString();
      }
    },
    isDisabled() {
      if (this.currentIndex === 0) {
        return !this.airdropName || !this.understand || !this.airdropAddress || !this.selectAsset || !this.airdropAmount || !this.endTime || !!this.errMsg || !!this.countErrMsg;
      } else {
        return !this.airdropName || !this.understand || !this.airdropAddressCount || !this.selectAsset || !this.airdropAmount || !this.endTime || !!this.errMsg ||  !!this.countErrMsg;
      }
    }
  },
  created() {
    this.getAirdropAssetList();
  },
  mounted() {
    this.removeReadOnly();
    let keyNode = document.querySelector(".el-date-editor");
    let iNode = document.createElement("i");
    iNode.setAttribute("class", "el-icon-arrow-down"); // el-icon-bottom
    keyNode.appendChild(iNode);
    iNode.style.position = "absolute";
    iNode.style.top = "30%";
    iNode.style.right = "0.283333rem";
  },
  watch: {
    airdropAmount: {
      handler(newVal, oldVal) {
        if (newVal) {
          console.log(newVal, this.selectAsset, '123')
          if (!this.selectAsset) {
            this.airdropAmount = '';
            return;
          }
          const decimals = this.currentAsset.decimals || 6;
          const patrn = new RegExp('^([1-9][\\d]{0,20}|0)(\\.[\\d]{0,' + decimals + '})?$');
          if (patrn.exec(newVal) || newVal === '') {
            this.airdropAmount = newVal;
          } else {
            this.airdropAmount = oldVal;
          }
        }
      },
      deep: true
    },
    airdropAddressCount: {
      handler(newVal, oldVal) {
        if (newVal) {
          const decimals = 0;
          const patrn = new RegExp('^([1-9][\\d]{0,20}|0)(\\.[\\d]{0,' + decimals + '})?$');
          if (patrn.exec(newVal) || newVal === '') {
            this.airdropAddressCount = newVal;
          } else {
            this.airdropAddressCount = oldVal;
          }
        }
      },
      deep: true
    },
  },
  methods: {
    removeReadOnly() {
      if (this.$refs.selectRef && this.$refs.selectRef.$el) {
        const input = this.$refs.selectRef.$el.querySelector('.el-input__inner');
        if (input) {
          setTimeout(() => {
            input.removeAttribute('readonly')
          }, 700);
        }
      }
    },
    addressInput() {
      const addressList = this.airdropAddress.split('\n').filter(item => item);
      const prefix = MAIN_INFO.prefix;
      const nulsPrefix = NULS_INFO.prefix;
      if (addressList.find(item => (item.indexOf(prefix) === -1 && item.indexOf(nulsPrefix) === -1 && item.indexOf(EVM_PREFIX) === -1) || item.length < 20)) {
        this.errMsg = this.$t('tips.tips30');
      } else if (Minus(addressList.length, 500) > 0) {
        this.errMsg = this.$t('airdrop.airdrop72');
      } else {
        this.errMsg = '';
      }
    },
    addressCountInput() {
      if (Minus(this.airdropAddressCount, 500) > 0) {
        this.countErrMsg = this.$t('airdrop.airdrop72');
      } else {
        this.countErrMsg = '';
      }
    },
    async changeAsset(assetKey) {
      this.currentAsset = this.assetList.find(item => item.assetKey === assetKey);
      await this.checkCrossInAuthStatus();
      if (this.fromNetwork === 'NERVE') {
        this.assetAvailable = await this.getNerveAssetBalance(this.currentAsset);
      } else if (this.fromNetwork === 'NULS') {
        this.assetAvailable = await this.getNulsAssetBalance(this.currentAsset);
      } else {
        this.assetAvailable = await this.getHeterogeneousAssetBalance(this.currentAsset);
      }
      console.log(this.currentAsset, this.assetAvailable, 'this.currentAsset')
    },
    async checkCrossInAuthStatus() {
      const config = JSON.parse(sessionStorage.getItem('config'));
      const authContractAddress = config[this.fromNetwork]['config']['crossAddress'];
      const contractAddress = this.currentAsset.contractAddress;
      if (config[this.fromNetwork].chainType === 2 && this.currentAsset.contractAddress) {
        const transfer = new ETransfer();
        this.needAuth = await transfer.getERC20Allowance(
            contractAddress,
            authContractAddress,
            this.fromAddress
        );
      } else {
        this.needAuth = false;
      }
      if (!this.needAuth && this.getAllowanceTimer) {
        this.showApproveLoading = false;
        this.clearGetAllowanceTimer();
      }
    },
    async approveERC20() {
      if (this.showApproveLoading) return false;
      this.showLoading = true;
      try {
        const config = JSON.parse(sessionStorage.getItem('config'));
        const multySignAddress = config[this.fromNetwork]['config']['crossAddress'];
        const contractAddress = this.currentAsset.contractAddress;
        const transfer = new ETransfer();
        const res = await transfer.approveERC20(
            contractAddress,
            multySignAddress,
            this.fromAddress
        );
        if (res.hash) {
          this.$message({
            message: this.$t('tips.tips25'),
            type: 'success',
            duration: 2000,
            offset: 30
          });
          this.showApproveLoading = true;
          this.setGetAllowanceTimer();
        } else {
          this.$message({
            message: res.msg,
            type: 'warning',
            duration: 2000,
            offset: 30
          });
        }
        this.showLoading = false;
      } catch (e) {
        console.log(e);
        this.$message.warning({ message: e.message || e, offset: 30 });
        this.showLoading = false;
      }
    },
    setGetAllowanceTimer() {
      this.getAllowanceTimer = setInterval(() => {
        this.checkCrossInAuthStatus();
      }, 3000);
    },
    clearGetAllowanceTimer() {
      if (!this.getAllowanceTimer) return;
      clearInterval(this.getAllowanceTimer);
      this.getAllowanceTimer = null;
    },
    async getAirdropAssetList() {
      try {
        const params = {
          fromChain: this.fromNetwork,
          toChain: 'NERVE',
        };
        const res = await this.$request({
          url: '/bridge/cross/asset',
          data: params
        });
        if (res.code === 1000) {
          this.assetList = res.data.map(item => ({
            chain: item.chain,
            symbol: item.symbol,
            chainId: item.chainId,
            assetId: item.assetId,
            contractAddress: item.contractAddress,
            nerveChainId: item.nerveChainId,
            nerveAssetId: item.nerveAssetId,
            decimals: item.decimals,
            assetKey: `${item.nerveChainId}-${item.nerveAssetId}`
          }));
        }
      } catch (e) {
        console.error(e, 'error');
      }
    },
    async createAirDrop() {
      try {
        this.showLoading = true;
        if (Minus(this.allAirdropAmount, this.assetAvailable) > 0) {
          throw this.$t('tips.tips28');
        }
        const addressList = this.airdropAddress.split('\n').filter(item => item);
        const addressCount = addressList.length;
        const currentAsset = this.assetList.find(item => item.assetKey === this.selectAsset);
        const currentAccount = getCurrentAccount(this.fromAddress);
        const { chain, chainId, assetId, contractAddress, decimals, symbol } = currentAsset;
        const data = {
          name: this.airdropName,
          type: this.currentIndex + 1,
          pubKey: currentAccount.pub,
          chain,
          chainId,
          assetId,
          contractAddress,
          endTime: this.endTime,
          amount: this.allAirdropAmount,
          txHash: '',
          addressCount: addressCount || this.airdropAddressCount,
          addressList,
          codeFlag: this.currentIndex === 2
        };
        console.log(data, '==data==');
        const airDropRes = await this.$request({
          url: '/air/drop/add',
          data
        });
        console.log(airDropRes, '==airDropRes==');
        if (airDropRes.code !== 1000) {
          throw airDropRes.msg;
        }
        const configRes = await this.$request({
          method: 'get',
          url: '/api/common/config'
        });
        let airDropNerveAddress;
        if (configRes.code === 1000) {
          airDropNerveAddress = configRes.data.airDropNerveAddress;
          localStorage.setItem('airDropNerveAddress', airDropNerveAddress);
        } else {
          airDropNerveAddress = localStorage.getItem('airDropNerveAddress');
        }
        const config = JSON.parse(sessionStorage.getItem('config'));
        const multySignAddress = config[this.fromNetwork]['config']['crossAddress'] || '';
        const mainAssetInfo = config[this.fromNetwork];
        let txRes;
        if (this.fromNetwork === 'NULS' || this.fromNetwork === 'NERVE') {
          const transferInfo = {
            fromChain: this.fromNetwork,
            toChain: 'NERVE',
            fromAddress: currentAccount.address[this.fromNetwork],
            toAddress: airDropNerveAddress,
            chainId,
            assetId,
            contractAddress,
            amount: this.allAirdropAmount,
            symbol,
            pub: currentAccount.pub,
            signAddress: currentAccount.address['pluginAddress'],
            isTransferMainAsset: mainAssetInfo.symbol === symbol,
            currentAsset
          };
          const baseCrossFee = timesDecimals(0.01, 8);
          const amount = timesDecimals(this.allAirdropAmount, currentAsset.decimals);
          const crossInfo = {
            from: transferInfo.fromAddress,
            to: transferInfo.toAddress,
            assetsChainId: chainId,
            assetsId: assetId,
            amount,
            fee: baseCrossFee
          };
          let tempTransferInfo, type, txData, txHex;
          if (this.fromNetwork === 'NULS') {
            if (currentAsset.contractAddress) {
              await this.getContractCallData(currentAsset, airDropNerveAddress);
              type = 16;
              // nuls合约资产跨链
              const price = 25;
              tempTransferInfo = {
                from: transferInfo.fromAddress,
                assetsChainId: NULS_INFO.chainId,
                assetsId: NULS_INFO.assetId,
                amount: Plus(20000000, Times(this.NULSContractGas, price)).toFixed(),
                toContractValue: 10000000,
                to: currentAsset.contractAddress,
                txData: this.NULSContractTxData,
                fee: timesDecimals(0.01, MAIN_INFO.decimal)
              };
              txData = this.NULSContractTxData;
            } else {
              type = 10;
              crossInfo.to = airDropNerveAddress;
              tempTransferInfo = crossInfo;
            }
            const { pub, signAddress } = transferInfo;
            console.log(transferInfo, 'transferInfo')
            const transfer = new NTransfer({ chain, type });
            console.log(tempTransferInfo, 'tempTransferInfo')
            const inputOutput = await transfer.inputsOrOutputs(tempTransferInfo);
            // return false;
            const data = {
              inputs: inputOutput.inputs,
              outputs: inputOutput.outputs,
              txData: txData || {},
              pub,
              signAddress
            };
            txHex = await transfer.getTxHex(data);
            console.log(txHex, 'txHex')
          } else if (this.fromNetwork === 'NERVE') {
            const transfer = new NTransfer({
              chain: "NERVE",
              type: 2
            });
            const transferInfo = {
              from: this.nerveAddress || currentAccount && currentAccount.address['NERVE'] || '',
              to: airDropNerveAddress,
              amount: timesDecimals(this.allAirdropAmount, currentAsset.decimals),
              fee: 0,
              assetsChainId: chainId,
              assetsId: assetId
            };
            const { inputs, outputs } = await transfer.transferTransaction(transferInfo);
            txHex = await transfer.getTxHex({
              inputs,
              outputs,
              txData: {},
              pub: currentAccount.pub,
              signAddress: currentAccount.address.pluginAddress,
            });
          }
          txRes = await this.broadcastHex(txHex);
        } else {
          const params = {
            fromAddress: currentAccount['address'][this.fromNetwork] || currentAccount['address']['pluginAddress'],
            decimals,
            contractAddress,
            numbers: this.allAirdropAmount,
            multySignAddress,
            nerveAddress: airDropNerveAddress,
            fromNetwork: this.fromNetwork
          };
          const nerve = new Nerve();
          txRes = await nerve.sendNerveBridgeTransaction(params);
        }
        if (txRes && txRes.hash) {
          const res = await this.$request({
            url: '/air/drop/update/hash',
            data: {
              id: airDropRes.data.id,
              txHash: txRes && txRes.hash,
            }
          });
          if (res.code === 1000) {
            this.$message.success(this.$t('tips.tips16'));
            this.resetData();
          } else {
            throw res.msg;
          }
        }
        this.showLoading = false;
      } catch (e) {
        console.error(e, 'error');
        console.log(e.message);
        this.$message.warning(this.errorHandling(e.message || e))
        this.showLoading = false;
      }
    },
    async broadcastHex(txHex) {
      try {
        const config = JSON.parse(sessionStorage.getItem('config'));
        const res = await this.$post(config[this.fromNetwork].apiUrl, 'broadcastTx', [config[this.fromNetwork].chainId, txHex]);
        if (res.result && res.result.hash) {
          return res.result;
        } else {
          this.showLoading = false;
          // this.$message({ message: this.$t("tips.tips4"), type: "warning", duration: 2000 });
          this.$message({ message: `${res.error.code}:${res.error.data}` || res.error.data, type: "warning", duration: 2000 });
          return {
            hash: null
          };
        }
      } catch (e) {
        console.log(e, 'e')
        this.showLoading = false;
        this.$message({ message: this.errorHandling(e.message || e), type: "warning", duration: 2000 });
      }
    },
    // nuls合约资产跨链 计算手续费&其他信息
    async getContractCallData(currentAsset, nerveAddress) {
      const currentAccount = getCurrentAccount(this.fromAddress);
      const price = 25;
      const res = await getContractCallData(
          currentAccount['address'][this.fromNetwork],
          nerveAddress,
          price,
          currentAsset.contractAddress,
          'transferCrossChain',
          this.allAirdropAmount,
          currentAsset.decimals
      );
      if (res.success) {
        const { gasLimit, price } = res.data.contractCallData;
        this.NULSContractGas = gasLimit;
        this.NULSContractTxData = res.data.contractCallData;
        return divisionDecimals(Plus(10100000, Times(gasLimit, price)), 8);
      } else {
        this.$message({
          message: res.msg,
          type: 'warning',
          duration: 2000,
          offset: 30
        });
        return null;
      }
    },
    resetData() {
      this.airdropName = '';
      this.selectAsset = '';
      this.airdropAmount = '';
      this.endTime = '';
      this.airdropAddressCount = '';
      this.airdropAddress = '';
      this.understand = false;
    }
  }
}
</script>

<style scoped lang="scss">
.airdrop-cont {
  margin: 18px;
}
.el-select {
  width: 100%;
  /deep/ .el-input__inner {
    height: 1.09rem !important;
    border: 1px solid #D0D5DD;
    font-size: 0.373333rem;
    &:focus {
      border-color: #D0D5DD;
    }
  }
}

.el-select-dropdown__item.selected {
  color: #21C980;
}

/deep/ .el-date-table__row .el-date-table td.today span {
  color: red !important;
}

/deep/ .el-textarea__inner {
  &:focus {
    border-color: #D0D5DD
  }
}

/deep/ .el-input__inner {
  &:focus {
    border-color: #D0D5DD
  }
}

:deep(.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner) {
  background-color: #21C980;
  border-color: #21C980;
}
:deep(.el-checkbox .el-checkbox__inner) {
  &:hover {
    border-color: #21C980;
  }
}

:deep(.el-input) {
  .el-input__inner {
    border: 1px solid #DCDFE6;
    padding: 0 20px;
  }
}

/deep/ .el-date-editor {
  width: 100%;
  position: relative;
  &:focus-within{
    .el-icon-arrow-down{
      //width: 40px;
      color: #C0C4CC;
      transform: rotateZ(-180deg);
      transform-origin: center;
      vertical-align: baseline;
    }
  }
  .el-input__inner{
    padding-left: 25px;
    height: 1.09rem !important;
    border: 1px solid #D0D5DD;
    font-size: 0.373333rem;
  }
  .el-input__prefix {
    display: none;
  }
  .el-input__icon{
    display: none;
  }
  .el-icon-arrow-down{
    //width: 40px;
    width: 25px;
    vertical-align: baseline;
    color: #C0C4CC;
    line-height: 34px;
    transform: rotateZ(0deg);
    transform-origin: center;
    transition: transform .3s;
  }
  .el-input__suffix-inner{
    display: none;
  }
}

.radio-cont {
  display: flex;
  align-items: center;
  .radio-item {
    height: 36px;
    width: 36px;
    border-radius: 50%;
    border: 1px solid #D0D5DD;
    display: flex;
    align-items: center;
    justify-content: center;
    &.active {
      border: 1px solid #49C7B5;
      .dot-item {
        height: 15px;
        width: 15px;
        background-color: #49C7B5;
        border-radius: 50%;
      }
    }
  }
}
.mt-100 {
  margin-top: 100px;
}
/deep/ .el-input {
  input {
    font-size: 28px;
    height: 1.09rem;
  }
}
/deep/ .el-textarea {
  .el-textarea__inner {
    font-size: 28px;
  }
}
/deep/ .el-select-dropdown {
  height: 410px;
}
/deep/ .el-scrollbar {
    height: 410px;
  }
.el-loading-parent--relative {
  position: unset !important;
}
</style>
