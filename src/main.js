import Vue from 'vue';
import VueI18n from 'vue-i18n';
import App from './App.vue';
import router from './router';
import store from './store';
import {post, request} from './api/https'
// import 'lib-flexible/flexible.js';
import './api/rem';
import 'normalize.css'; // 初始化css
import messages from './locales';
import {hashLinkList, isBeta, setChainConfig} from "./api/util";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import globalMixin from './mixin';
import './plugins/vant';
import { Loading } from 'vant';
import { localChainConfig } from '@/config';
import elLocale from 'element-ui/lib/locale'
import './assets/scss/element-variables.scss';
const development = process.env.NODE_ENV === "development"
Vue.config.devtools = development;
if (!development) {
    console.log = () => {};
}

Vue.prototype.$request = request; // 网络请求
Vue.prototype.$post = post;
Vue.config.productionTip = false; // 开发环境提示
Vue.mixin(globalMixin);
Vue.use(VueI18n);
Vue.use(ElementUI);
Vue.use(Loading);

let tempData, locale;
if (typeof window._naboxAccount === 'string') {
    tempData = window._naboxAccount && JSON.parse(window._naboxAccount);
} else {
    tempData = window._naboxAccount;
}
if (tempData && tempData.language) {
    locale = tempData.language === 'CHS' ? 'cn' : 'en';
} else {
    locale = localStorage.getItem('locale') ? localStorage.getItem('locale') : store.state.lang;
}
// 国际化
// const locale = localStorage.getItem('locale') ? localStorage.getItem('locale') : store.state.lang;
store.commit('changeLang', locale);
console.log(locale, 'locale')
localStorage.setItem("locale", locale);
const i18n = new VueI18n({
    locale,
    fallbackLocale: 'en',
    silentTranslationWarn: true,
    messages
});
elLocale.i18n((key, value) => i18n.t(key, value))
const network = isBeta ? "beta" : "main";

async function getConfig(network, refresh) {
    try {
        let chainConfig;
        if (network === 'beta') {
            const tempLocalData = localStorage.getItem('localBetaChainConfig') && JSON.parse(localStorage.getItem('localBetaChainConfig')) || localChainConfig;
            chainConfig = tempLocalData.sort((a, b) => a.sort - b.sort);
        } else {
            const tempLocalData = localStorage.getItem('localChainConfig') && JSON.parse(localStorage.getItem('localChainConfig')) || localChainConfig;
            chainConfig = tempLocalData.sort((a, b) => a.sort - b.sort);
        }
        const tempSwapChainConfig = chainConfig.filter(item => item.swap == 1 && (item.chainType === 1 || item.chainType === 2));
        setChainConfig(tempSwapChainConfig);
        !refresh && new Vue({
            i18n,
            router,
            store,
            render: h => h(App)
        }).$mount('#app');
        // /api/chain/config
        const res = await request({ url: '/chain/configs', method: 'get' });
        if (res.code === 1000 && res.data) {
            const tempData = res.data.filter(item => item.swap == 1 && (item.chainType === 1 || item.chainType === 2));
            setChainConfig(tempData);
            network === 'beta' ? localStorage.setItem('localBetaChainConfig', JSON.stringify(tempData)) : localStorage.setItem('localChainConfig', JSON.stringify(tempData));
        } else {
            setTimeout(() => {
                getConfig(network, true);
            }, 10000);
        }
    } catch (e) {
        console.error(e, 'error');
    }
}
getConfig(network);
