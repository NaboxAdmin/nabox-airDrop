<template>
  <div :class="{'mobile_class': !isMobile}" class="historys">
    <template v-if="recordLoading">
      <Loading/>
    </template>
    <template v-else-if="recordList.length !== 0">
      <div class="history" v-for="item in recordList" :key="item.id">
        <div class="history_item">
          <div class="item-name">
            <img :src="item.icon" alt="">
            <span class="size-30 text-3a text-truncate">{{ item.name }}</span>
          </div>
          <template>
            <div v-if="item.status===2 && item.sendBackStatus !== 2">
              <div class="size-26 d-flex align-items-center">{{ $t('airdrop.airdrop51') }} | <span class="ml-1 text-21 cursor-pointer d-flex align-items-center" @click="withdrawClick(item)">{{ item.sendBackStatus === 1 ? $t('airdrop.airdrop74') : $t('airdrop.airdrop73') }} <Spin v-if="loading && item.id===currentId" class="ml-1"/></span></div>
            </div>
            <div v-else class="d-flex direction-column">
            <span :style="{color: item.status === 0 ? '#EC7E62' : item.status === 1 ? '#21C980' : item.status === 2 ? 'red' : 'red'}" class="text-right size-26 line-36">
              {{ item.status === 0 ? $t('airdrop.airdrop52') : item.status === 1 ? $t('airdrop.airdrop50') : item.status === 2 ? $t('airdrop.airdrop51') : $t('tips.tips21') }}
            </span>
              <div class="line-36">
                <span class="text-8d size-26">{{ $t('airdrop.airdrop16') }}<span class="text-8d">{{ item.endTime }}</span></span>
              </div>
            </div>
          </template>
        </div>
        <div class="history_item">
          <span class="text-8d size-26">{{ $t('airdrop.airdrop17') }} <span>{{ item.amount | numFormatFixSix }} {{ item.symbol }}</span></span>
          <span class="size-26 text-8d " v-if="item.type === 1">{{ $t('airdrop.airdrop36') }} <span>{{ $t('airdrop.airdrop11') }}</span></span>
          <span class="size-26 text-8d " v-if="item.type === 2">{{ $t('airdrop.airdrop36') }} <span>{{ $t('airdrop.airdrop12') }}</span></span>
          <span v-if="item.type === 3" class="text-8d size-26">{{ $t('airdrop.airdrop36') }} <span>{{ $t('airdrop.airdrop13') }} | </span><span style="color:#21c980" class="cursor-pointer" @click="onLook(item)">{{ $t('airdrop.airdrop38') }}</span></span>
        </div>
        <div class="history_item">
          <span class="text-8d size-26">{{ $t('airdrop.airdrop35') }} <span>{{ item.addressCount }}</span></span>
          <span class="text-8d size-26">{{ $t('airdrop.airdrop37') }} <span>{{ item.receiveCount }}</span></span>
        </div>
      </div>
    </template>
    <NoData v-else/>
    <PopUp :show.sync="showCode" :prevent-boo="false" @maskClick="showCode=false">
      <div @click.stop class="pop-cont">
        <div class="text-51 font-bold size-32">{{ $t("airdrop.airdrop41") }}</div>
        <div class="text-8d size-28 mt-2">{{ $t('airdrop.airdrop32') }}</div>
        <div class="text-8d size-28 mt-1">{{ $t('airdrop.airdrop43') }}<span class="text-21 cursor-pointer">https://parabox.nabox.io</span>{{ $t('airdrop.airdrop44') }}</div>
        <div class="code-cont" :class="(showQueryLoading || tips) && 'justify-content-center' || 'space-between'">
          <div v-if="tips" class="text-center text-21">{{ tips }}</div>
          <template v-else>
            <template v-if="showQueryLoading">
              <div class="d-flex align-items-center justify-content-center">
                <Spin/>
              </div>
            </template>
            <template v-else>
              <span class="code-item" v-for="item in codeList" :key="item.id">
                {{ item.code }}
              </span>
              <i/><i/><i/>
            </template>
          </template>
        </div>
        <Button :disabled="!!tips" class="mt-4" @click="copyText">{{ $t('airdrop.airdrop33') }}</Button>
      </div>
    </PopUp>
  </div>
</template>

<script>
import PopUp from "@/components/PopUp/PopUp";
import Button from "@/components/Button";
import {copys, Times} from "../../api/util";
export default {
  props: {
    // 需要渲染的数据
    history: {
      type: Object,
      default: () => ({}),
    }
  },
  components: { PopUp, Button },
  data() {
    return {
      showCode: false,
      recordList: [],
      codeList: [],
      recordLoading: true,
      tips: '',
      showQueryLoading: false,
      loading: false,
      currentId: ''
    }
  },
  created() {
    setTimeout(() => {
      this.getAirdropRecord();
    }, 500);
  },
  methods: {
    copyText() {
      const codeText = this.codeList.map(item => item.code).join('\n');
      const text = `${this.$t('airdrop.airdrop32')}\n${this.$t('airdrop.airdrop43')}https://parabox.nabox.io${this.$t('airdrop.airdrop44')}\n${codeText}`
      copys(text);
      this.$toast(this.$t("tips.tips8"));
    },
    async withdrawClick(recordItem) {
      try {
        this.currentId = recordItem.id;
        if (this.loading) return;
        this.loading = true;
        const res = await this.$request({
          url: '/air/drop/send/back',
          data: { id: recordItem.id }
        });
        if (res.code === 1000) {
          this.$message.success(this.$t('tips.tips16'));
          this.recordList = this.recordList.map(item => {
            if (item.id === this.currentId) {
              return {
                ...item,
                sendBackStatus: 1
              }
            }
            return item;
          })
        } else {
          this.$message.warning(res.data);
        }
        this.loading = false;
      } catch (e) {
        console.error(e, 'error');
        this.loading = false
      }
    },
    // 查看按钮事件
    async onLook(item){
      try {
        this.showCode = true;
        if (item.status === 0) {
          this.tips = this.$t('tips.tips19');
          return;
        } else if (item.status === 2) {
          this.tips = this.$t('tips.tips20');
          return;
        } else if (item.status === 3) {
          this.tips = this.$t('tips.tips21');
          return;
        }
        this.tips = '';
        this.showQueryLoading = true;
        const res = await this.$request({
          url: '/air/drop/code',
          data: { id: item.id }
        });
        if (res.code === 1000) {
          this.codeList = res.data;
        }
        this.showQueryLoading = false;
      } catch (e) {
        console.error(e, 'error');
        this.showQueryLoading = false;
      }
    },
    async getAirdropRecord() {
      try {
        const data = {
          pubKey: this.currentAccount && this.currentAccount.pub || ""
        };
        const res = await this.$request({
          url: '/air/drop/wallet/list',
          data
        });
        if (res.code === 1000) {
          this.recordList = res.data.map(item => ({
            ...item,
            totalCount: `${Times(item.amount, item.addressCount).toString()}`, // ${item.symbol}
            endTime: this.formatTime(item.endTime, true, true)
          }));
        } else {
          this.recordList = [];
        }
        this.recordLoading = false;
      } catch (e) {
        this.recordLoading = false;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$grayColor: #b5b9c8;
.historys{
  margin-top: 20px;
  padding: 28px;
  .history{
    font-size: 14px;
    color: $grayColor;
    border-bottom: 1px solid #ebebeb;
    margin-bottom: 20px;
    &:last-child {
      border-bottom: none !important;
    }
    .history_item{
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      .item-name{
        display: flex;
        justify-content: center;
        align-items: center;
        img{
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-right: 10px;
        }
        span{
          color: #3A3C44;
          font-weight: 700;
          flex: 1;
          width: 300px;
        }
      }
      span>span{
        color: #3A3C44;
        margin-left: 5px;
        display: inline-block;
      }
    }
  }
}
.pop-cont {
  width: 620px;
  padding: 40px 32px;
  background-color: #FFFFFF;
  border-radius: 20px;
}
.code-cont {
  padding: 24px 20px;
  background-color: #F3F5FB;
  border-radius: 16px;
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-height: 200px;
  overflow-y: scroll;
  overflow-x: hidden;
  .code-item {
    color: #3A3C44;
    font-size: 26px;
    width: 200px;
    height: 40px;
    margin-right: -30px;
    margin-bottom: 10px;
  }
  i {
    width: 120px;
    margin-right: 40px;
  }
}
.text-21 {
  color: #21C980;
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
.line-36 {
  line-height: 36px;
}
</style>
