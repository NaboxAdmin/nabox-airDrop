import { superLong, divisionDecimals, timesDecimals, tofix } from "@/api/util";
import moment from "moment";
import {Division, Minus, numberFormat} from "../api/util";
import Loading from '@/components/Loading/Loading';
import PopUp from '@/components/PopUp/PopUp';
import Spin from '@/components/Loading/Spin';
import NoData from '@/components/NoData/NoData';
import { MAIN_INFO, NULS_INFO } from '@/config';
import {ETransfer} from "../api/api";

export default {
    data() {
        return {}
    },
    components: { Loading, NoData, PopUp, Spin },
    computed: {
        currentAccount() {
            return this.$store.getters.currentAccount;
        },
        nerveAddress() {
            return this.currentAccount && this.currentAccount.address['NERVE'];
        },
        fromAddress() {
            return this.$store.state.fromAddress;
        },
        fromNetwork() {
            return this.$store.state.network;
        },
        isDapp() {
            return this.$store.state.isDapp;
        },
        showConnect() {
            return this.$store.state.showConnect;
        },
        showSign() {
            return this.$store.state.showSign;
        },
        isMobile() {
            return /Android|webOS|iPhone|iPad|BlackBerry/i.test(navigator.userAgent);
        },
    },
    filters: {
      numFormat(val) {
          if (!val) return 0;
          const tempNum = val.toString();
          const int = tempNum.split('.')[0];
          const float = tempNum.split('.')[1] || '';
          let intPart = Number(int).toFixed(0); // 获取整数部分
          return intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + (float ? '.' + float : '')
      },
        numFormatFix(val) {
            if (!val) return 0;
            const tempNum = tofix(val.toString(), 2);
            const int = tempNum.split('.')[0];
            const float = tempNum.split('.')[1] || '';
            let intPart = Number(int).toFixed(0); // 获取整数部分
            return intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + (float ? '.' + float : '')
        },
        timeFormat(val) {
            if (!val) return '';
            const times = +new Date(val);
            return moment(times).format('yyyy-MM-DD HH:mm');
        },
        timeFormatMM(val) {
            if (!val) return '';
            const times = +new Date(val);
            return moment(times).format('yyyy-MM-DD');
        },
        numberFormat(val) {
            if (!Number(val)) return 0;
            let numberVal = Number(val);
            const n = 6;
            if (n <= 0) return Math.round(numberVal);
            return  Math.round(numberVal * Math.pow(10, n)) / Math.pow(10, n);
        },
        numFormatFixSix(val) {
            if (!val) return 0;
            const tempNum = numberFormat(tofix(val.toString(), 6, -1), 6);
            const int = tempNum.split('.')[0];
            const float = tempNum.split('.')[1] || '';
            const intPart = Number(int).toFixed(0); // 获取整数部分
            return intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + (float ? '.' + float : '');
        },
        numberFormatLetter(val) {
          const k = Math.pow(10, 3);
          const m = Math.pow(10, 6);
            if (Minus(val, k) < 0) {
              return tofix(val, 2, -1);
          } else if (Minus(val, k) >= 0 && Minus(val, m) < 0) {
              return `${tofix(Division(val, k), 2, -1)}K`;
          } else if ( Minus(val, m) > 0) {
              return `${tofix(Division(val, m), 2, -1)}M`;
          } else {
              return '0.00'
          }
        }
    },
    methods: {
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
        formatTime(time, isTime = true, formatMM) {
            const date = new Date(isTime ? time.replace(/-/g, '/') : time); // 兼容iOS
            const years = date.getFullYear();
            const months = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
            const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
            const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
            const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
            if (formatMM) {
                return `${years}-${months}-${day}`;
            }
            return `${years}-${months}-${day} ${hours}:${minutes}`;
        },
        async getNerveAssetBalance(assetInfo) {
            if (!this.currentAccount) return 0;
            const { chainId, assetId, contractAddress, decimals } = assetInfo;
            const tempParams = [{
                chainId,
                assetId,
                contractAddress
            }];
            const params = [MAIN_INFO.chainId, this.currentAccount['address']['NERVE'], tempParams];
            const url = MAIN_INFO.batchRPC;
            const res = await this.$post(url, 'getBalanceList', params);
            if (res.result && res.result.length !== 0) {
                const tempAsset = res.result[0];
                return divisionDecimals(tempAsset.balance, decimals);
            } else {
                return 0;
            }
        },
        async getHeterogeneousAssetBalance(assetInfo) {
            const transfer = new ETransfer();
            const { contractAddress, decimals } = assetInfo;
            if (assetInfo.contractAddress) {
                return await transfer.getERC20Balance(contractAddress, decimals, this.fromAddress);
            } else {
                return await transfer.getEthBalance(this.fromAddress);
            }
        },
        async getNulsAssetBalance(assetInfo) {
            const { chainId, assetId, contractAddress, decimals } = assetInfo;
            const tempParams = [{
                chainId,
                assetId,
                contractAddress
            }];
            const params = [NULS_INFO.chainId, this.currentAccount['address']['NULS'], tempParams];
            const url = NULS_INFO.batchRPC;
            const res = await this.$post(url, 'getBalanceList', params);
            if (res.result && res.result.length !== 0) {
                const tempAsset = res.result[0];
                return divisionDecimals(tempAsset.balance, decimals);
            } else {
                return 0;
            }
        },
        numberFormat(val, float, returnBoo=false) {
            if (!Number(val)) {
                if (returnBoo) {
                    return ''
                }
                return '0'
            }
            let numberVal = Number(val);
            const n = float || 6;
            if (n <= 0) return Math.round(numberVal);
            return (Math.round(numberVal * Math.pow(10, n)) / Math.pow(10, n)).toString();
        },
        errorHandling(msg) {
            const JSONMsg = JSON.stringify(msg);
            console.log(JSONMsg, 'JSONMsg')
            const errorMsg = ['insufficient funds', 'No enough', 'gas required exceeds', 'does not exist', 'Network Error', 'Network error', 'timeout of', 'fail code', '50'];
            const errorMap = {
                'Network Error': this.$t('tips.tips27'),
                'Network error': this.$t('tips.tips27'),
                'timeout of': this.$t('tips.tips27'),
                '50': this.$t('tips.tips27'),
                'fail code': this.$t('tips.tips27'),
                'insufficient funds': this.$t('tips.tips28'),
                'No enough': this.$t('tips.tips28'),
                'gas required exceeds': this.$t('tips.tips29'),
                'does not exist': this.$t('tips.tips29'),
            };
            const errorIndex = errorMsg.findIndex(item => JSONMsg.indexOf(item) !== -1);
            if (errorIndex === -1) {
                return JSONMsg.replace(/\"/g, '');
            }
            return errorMap[errorMsg[errorIndex]].toString().replace(/\"/g, '');
        }
    }
}
