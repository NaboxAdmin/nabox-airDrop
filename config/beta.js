// // 开发模式
// export const IS_DEV = process.env.NODE_ENV === 'development';
//
// export const currentNet = 'testnet';
//
// //燃烧地址的公钥
// export const API_BURNING_ADDRESS_PUB = 'TNVTdTSPGwjgRMtHqjmg8yKeMLnpBpVN5ZuuY';
//
// //chainId、assetId、prefix
// export const MAIN_INFO = { chainId: 5, assetId: 1, prefix: 'TNVT',symbol:"NVT", decimal: 8, rpc: "https://beta.api.nerve.network/jsonrpc", batchRPC: 'https://beta.api.nerve.network/jsonrpc' };
// export const NULS_INFO = { chainId: 2, assetId: 1, prefix: 'tNULS',symbol:"NAI", decimal: 4, rpc: "https://beta.api.nuls.io/jsonrpc", batchRPC: 'https://beta.api.nuls.io/jsonrpc' };
// export const EVM_PREFIX = '0x';
//
// //ETH 网络信息 测试网:ropsten, 主网:homestead
// export const ETHNET = 'ropsten';
//
// // export const BRIDGE_API_URL = "/nabox-api";
// export const BRIDGE_API_URL = IS_DEV ? "/api" : "https://dev.web.id.nabox.io/api";
// // export const BRIDGE_API_URL = "http://nabox_api.zhoulijun.top/nabox-api";
//
// export const localChainConfig = [
//     {
//         'id': 24,
//         'chain': 'Ethereum',
//         'chainName': 'Ethereum',
//         'prefix': '0x',
//         'nativeId': 3,
//         'chainId': 101,
//         'chainType': 2,
//         'crossAddress': '0x5e1cba794aD91FCd272fDaF2cd91b6110b601ED2',
//         'intro': null,
//         'icon': 'https://files.nabox.io/icon/Ethereum.png',
//         'apiUrl': 'https://ropsten.infura.io/v3/7e086d9f3bdc48e4996a3997b33b032f',
//         'scanUrl': 'https://ropsten.etherscan.io/',
//         'psUrl': 'https://faucets.chain.link/rinkeby',
//         'tokenUrl': 'https://ropsten.etherscan.io/token/',
//         'txUrl': 'https://ropsten.etherscan.io/tx/',
//         'nft': '',
//         'sort': 1,
//         'status': 1,
//         'bridge': 1,
//         'swap': 1,
//         'configs': {
//             'multiCallAddress': '0xb966f6Df75Ff460887d66DEb0b246886374C2Fa5',
//             'crossAddress': '0x5e1cba794aD91FCd272fDaF2cd91b6110b601ED2'
//         },
//         'mainAsset': {
//             'id': 17673,
//             'chain': 'Ethereum',
//             'registerChain': 'Ethereum',
//             'chainId': 101,
//             'assetId': 1,
//             'contractAddress': '',
//             'decimals': 18,
//             'assetName': 'ETH',
//             'symbol': 'ETH',
//             'symbolBase': 'ETH',
//             'configType': 1,
//             'source': 9,
//             'icon': 'https://files.nabox.io/icon/ETH.png',
//             'nulsCross': true,
//             'heterogeneousList': [
//                 {
//                     'heterogeneousChainId': 101,
//                     'heterogeneousChainMultySignAddress': '0x5e1cba794ad91fcd272fdaf2cd91b6110b601ed2',
//                     'contractAddress': '',
//                     'chainName': 'Ethereum',
//                     'token': false
//                 },
//                 {
//                     'heterogeneousChainId': 102,
//                     'heterogeneousChainMultySignAddress': '0xf85f03c3faac61acf7b187513aef10041029a1b2',
//                     'contractAddress': '0x5673e9dd71072dc975bfb146c40760b0fcbe9039',
//                     'chainName': 'BSC',
//                     'token': true
//                 },
//                 {
//                     'heterogeneousChainId': 103,
//                     'heterogeneousChainMultySignAddress': '0x19d90d3c8eb0c0b3e3093b054031ff1ca81704b8',
//                     'contractAddress': '0x56f175d48211e7d018dda7f0a0b51bcfb405ae69',
//                     'chainName': 'Heco',
//                     'token': true
//                 }
//             ],
//             'nerveChainId': 5,
//             'nerveAssetId': 2,
//             'nerveFlag': false,
//             'usdPrice': 2606.8456,
//             'usdPlatform': 'feixiaohao',
//             'usdUrl': null
//         },
//         'assets': [],
//         'urlList': [
//             {
//                 'id': 9,
//                 'chain': 'Ethereum',
//                 'nativeId': 3,
//                 'name': 'eth-1',
//                 'apiUrl': 'https://ropsten.infura.io/v3/7e086d9f3bdc48e4996a3997b33b032f'
//             }
//         ]
//     },
//     {
//         'id': 25,
//         'chain': 'BSC',
//         'chainName': 'BSC',
//         'prefix': '0x',
//         'nativeId': 97,
//         'chainId': 102,
//         'chainType': 2,
//         'crossAddress': '0xf85f03C3fAAC61ACF7B187513aeF10041029A1b2',
//         'intro': null,
//         'icon': 'https://files.nabox.io/icon/BSC.png',
//         'apiUrl': 'https://data-seed-prebsc-1-s2.binance.org:8545/',
//         'scanUrl': 'https://testnet.bscscan.com/',
//         'psUrl': 'https://testnet.binance.org/faucet-smart',
//         'tokenUrl': 'https://testnet.bscscan.com/token/',
//         'txUrl': 'https://testnet.bscscan.com/tx/',
//         'nft': 'bsc testnet',
//         'sort': 2,
//         'status': 1,
//         'bridge': 1,
//         'swap': 1,
//         'configs': {
//             'multiCallAddress': '0x2e31a3FBE1796c1CeC99BD2F3E87c0f085d2afB1',
//             'crossAddress': '0xf85f03C3fAAC61ACF7B187513aeF10041029A1b2'
//         },
//         'mainAsset': {
//             'id': 17674,
//             'chain': 'BSC',
//             'registerChain': 'BSC',
//             'chainId': 102,
//             'assetId': 1,
//             'contractAddress': '',
//             'decimals': 18,
//             'assetName': 'BNB',
//             'symbol': 'BNB',
//             'symbolBase': 'BNB',
//             'configType': 1,
//             'source': 9,
//             'icon': 'https://files.nabox.io/icon/BNB.png',
//             'nulsCross': true,
//             'heterogeneousList': [
//                 {
//                     'heterogeneousChainId': 101,
//                     'heterogeneousChainMultySignAddress': '0x5e1cba794ad91fcd272fdaf2cd91b6110b601ed2',
//                     'contractAddress': '0x1ecb2473d2d34c4fa081708340bfcd045a697106',
//                     'chainName': 'Ethereum',
//                     'token': true
//                 },
//                 {
//                     'heterogeneousChainId': 102,
//                     'heterogeneousChainMultySignAddress': '0xf85f03c3faac61acf7b187513aef10041029a1b2',
//                     'contractAddress': '',
//                     'chainName': 'BSC',
//                     'token': false
//                 }
//             ],
//             'nerveChainId': 5,
//             'nerveAssetId': 8,
//             'nerveFlag': false,
//             'usdPrice': 372.0511,
//             'usdPlatform': 'feixiaohao',
//             'usdUrl': null
//         },
//         'assets': [],
//         'urlList': [
//             {
//                 'id': 3,
//                 'chain': 'BSC',
//                 'nativeId': 97,
//                 'name': 'bsc-1',
//                 'apiUrl': 'https://data-seed-prebsc-1-s1.binance.org:8545/'
//             },
//             {
//                 'id': 13,
//                 'chain': 'BSC',
//                 'nativeId': 97,
//                 'name': 'bsc-2',
//                 'apiUrl': 'https://data-seed-prebsc-1-s2.binance.org:8545/'
//             }
//         ]
//     },
//     {
//         'id': 29,
//         'chain': 'Polygon',
//         'chainName': 'Polygon',
//         'prefix': '0x',
//         'nativeId': 80001,
//         'chainId': 106,
//         'chainType': 2,
//         'crossAddress': '0xFe05820BaE725fD093E9C1CB6E40AB3BDc40Def2',
//         'intro': null,
//         'icon': 'https://files.nabox.io/icon/Polygon.png',
//         'apiUrl': 'https://matic-mumbai.chainstacklabs.com',
//         'scanUrl': 'https://mumbai.polygonscan.com/',
//         'psUrl': 'https://faucet.polygon.technology/',
//         'tokenUrl': 'https://mumbai.polygonscan.com/token/',
//         'txUrl': 'https://mumbai.polygonscan.com/tx/',
//         'nft': '',
//         'sort': 3,
//         'status': 1,
//         'bridge': 1,
//         'swap': 1,
//         'configs': {
//             'multiCallAddress': '0x4D3B8eFcC04cA63Be112Da5147C80c87aC969F5B',
//             'crossAddress': '0xFe05820BaE725fD093E9C1CB6E40AB3BDc40Def2'
//         },
//         'mainAsset': {
//             'id': 18894,
//             'chain': 'Polygon',
//             'registerChain': 'Polygon',
//             'chainId': 106,
//             'assetId': 1,
//             'contractAddress': '',
//             'decimals': 18,
//             'assetName': 'MATIC',
//             'symbol': 'MATIC',
//             'symbolBase': 'MATIC',
//             'configType': 1,
//             'source': 4,
//             'icon': 'https://nuls-cf.oss-us-west-1.aliyuncs.com/icon/Polygon.png',
//             'nulsCross': false,
//             'heterogeneousList': [
//                 {
//                     'heterogeneousChainId': 106,
//                     'heterogeneousChainMultySignAddress': '0xfe05820bae725fd093e9c1cb6e40ab3bdc40def2',
//                     'contractAddress': '',
//                     'chainName': 'Polygon',
//                     'token': false
//                 }
//             ],
//             'nerveChainId': 5,
//             'nerveAssetId': 34,
//             'nerveFlag': false,
//             'usdPrice': 1.4329,
//             'usdPlatform': 'feixiaohao',
//             'usdUrl': null
//         },
//         'assets': [],
//         'urlList': [
//             {
//                 'id': 7,
//                 'chain': 'Polygon',
//                 'nativeId': 80001,
//                 'name': 'matic-1',
//                 'apiUrl': 'https://matic-mumbai.chainstacklabs.com'
//             }
//         ]
//     },
//     {
//         'id': 26,
//         'chain': 'Heco',
//         'chainName': 'Heco',
//         'prefix': '0x',
//         'nativeId': 256,
//         'chainId': 103,
//         'chainType': 2,
//         'crossAddress': '0x19d90D3C8eb0C0B3E3093B054031fF1cA81704B8',
//         'intro': null,
//         'icon': 'https://files.nabox.io/icon/Heco.png',
//         'apiUrl': 'https://http-testnet.hecochain.com',
//         'scanUrl': 'https://testnet.hecoinfo.com/',
//         'psUrl': 'https://scan-testnet.hecochain.com/faucet',
//         'tokenUrl': 'https://testnet.hecoinfo.com/token/',
//         'txUrl': 'https://testnet.hecoinfo.com/tx/',
//         'nft': '',
//         'sort': 4,
//         'status': 1,
//         'bridge': 1,
//         'swap': 1,
//         'configs': {
//             'multiCallAddress': '0x4564512f7216a617BC8C8B1E0b2893C7CB17927e',
//             'crossAddress': '0x19d90D3C8eb0C0B3E3093B054031fF1cA81704B8'
//         },
//         'mainAsset': {
//             'id': 17675,
//             'chain': 'Heco',
//             'registerChain': 'Heco',
//             'chainId': 103,
//             'assetId': 1,
//             'contractAddress': '',
//             'decimals': 18,
//             'assetName': 'HT',
//             'symbol': 'HT',
//             'symbolBase': 'HT',
//             'configType': 1,
//             'source': 4,
//             'icon': 'https://files.nabox.io/icon/HT.png',
//             'nulsCross': false,
//             'heterogeneousList': [
//                 {
//                     'heterogeneousChainId': 103,
//                     'heterogeneousChainMultySignAddress': '0x19d90d3c8eb0c0b3e3093b054031ff1ca81704b8',
//                     'contractAddress': '',
//                     'chainName': 'Heco',
//                     'token': false
//                 }
//             ],
//             'nerveChainId': 5,
//             'nerveAssetId': 9,
//             'nerveFlag': false,
//             'usdPrice': 8.4333,
//             'usdPlatform': 'feixiaohao',
//             'usdUrl': null
//         },
//         'assets': [],
//         'urlList': [
//             {
//                 'id': 4,
//                 'chain': 'Heco',
//                 'nativeId': 256,
//                 'name': 'heco-1',
//                 'apiUrl': 'https://http-testnet.hecochain.com'
//             }
//         ]
//     },
//     {
//         'id': 27,
//         'chain': 'OKExChain',
//         'chainName': 'OKExChain',
//         'prefix': '0x',
//         'nativeId': 65,
//         'chainId': 104,
//         'chainType': 2,
//         'crossAddress': '0xB490F2a3eC0B90e5faa1636bE046d82AB7cdAC74',
//         'intro': null,
//         'icon': 'https://files.nabox.io/icon/OKExChain.png',
//         'apiUrl': 'https://exchaintestrpc.okex.org',
//         'scanUrl': 'https://www.oklink.com/okexchain-test/',
//         'psUrl': 'https://discord.com/invite/B5nMs6qK5F',
//         'tokenUrl': 'https://www.oklink.com/okexchain-test/tokenAddr/',
//         'txUrl': 'https://www.oklink.com/okexchain-test/tx/',
//         'nft': '',
//         'sort': 5,
//         'status': 1,
//         'bridge': 1,
//         'swap': 1,
//         'configs': {
//             'multiCallAddress': '0x0111E01E78af5608e33569Edd997Fe2f700A0721',
//             'crossAddress': '0xB490F2a3eC0B90e5faa1636bE046d82AB7cdAC74'
//         },
//         'mainAsset': {
//             'id': 17918,
//             'chain': 'OKExChain',
//             'registerChain': 'OKExChain',
//             'chainId': 104,
//             'assetId': 1,
//             'contractAddress': '',
//             'decimals': 18,
//             'assetName': 'OKT',
//             'symbol': 'OKT',
//             'symbolBase': 'OKT',
//             'configType': 1,
//             'source': 4,
//             'icon': 'https://files.nabox.io/icon/OKT.png',
//             'nulsCross': false,
//             'heterogeneousList': [
//                 {
//                     'heterogeneousChainId': 104,
//                     'heterogeneousChainMultySignAddress': '0xb490f2a3ec0b90e5faa1636be046d82ab7cdac74',
//                     'contractAddress': '',
//                     'chainName': 'OKExChain',
//                     'token': false
//                 }
//             ],
//             'nerveChainId': 5,
//             'nerveAssetId': 12,
//             'nerveFlag': false,
//             'usdPrice': 34.4257,
//             'usdPlatform': 'feixiaohao',
//             'usdUrl': null
//         },
//         'assets': [],
//         'urlList': [
//             {
//                 'id': 5,
//                 'chain': 'OKExChain',
//                 'nativeId': 65,
//                 'name': 'oec-1',
//                 'apiUrl': 'https://exchaintestrpc.okex.org'
//             }
//         ]
//     },
//     {
//         'id': 32,
//         'chain': 'Avalanche',
//         'chainName': 'Avalanche',
//         'prefix': '0x',
//         'nativeId': 43113,
//         'chainId': 110,
//         'chainType': 2,
//         'crossAddress': '0x8999d8738CC9B2E1fb1D01E1af732421D53Cb2A9',
//         'intro': null,
//         'icon': 'https://files.nabox.io/icon/AVAX.png',
//         'apiUrl': 'https://api.avax-test.network/ext/bc/C/rpc',
//         'scanUrl': 'https://testnet.snowtrace.io/',
//         'psUrl': 'https://faucet.avax-test.network/',
//         'tokenUrl': 'https://testnet.snowtrace.io/token/',
//         'txUrl': 'https://testnet.snowtrace.io/tx/',
//         'nft': '',
//         'sort': 6,
//         'status': 1,
//         'bridge': 1,
//         'swap': 0,
//         'configs': {
//             'multiCallAddress': '0xC1f4F265EC8A46ad19740E7d3c6960db4c595dE5',
//             'crossAddress': '0x8999d8738CC9B2E1fb1D01E1af732421D53Cb2A9'
//         },
//         'mainAsset': {
//             'id': 19035,
//             'chain': 'Avalanche',
//             'registerChain': 'Avalanche',
//             'chainId': 110,
//             'assetId': 1,
//             'contractAddress': '',
//             'decimals': 18,
//             'assetName': 'AVAX',
//             'symbol': 'AVAX',
//             'symbolBase': 'AVAX',
//             'configType': 1,
//             'source': 4,
//             'icon': 'https://files.nabox.io/icon/AVAX.png',
//             'nulsCross': false,
//             'heterogeneousList': [
//                 {
//                     'heterogeneousChainId': 110,
//                     'heterogeneousChainMultySignAddress': '0x8999d8738cc9b2e1fb1d01e1af732421d53cb2a9',
//                     'contractAddress': '',
//                     'chainName': 'Avalanche',
//                     'token': false
//                 }
//             ],
//             'nerveChainId': 5,
//             'nerveAssetId': 94,
//             'nerveFlag': false,
//             'usdPrice': 74.6461,
//             'usdPlatform': null,
//             'usdUrl': null
//         },
//         'assets': [],
//         'urlList': [
//             {
//                 'id': 15,
//                 'chain': 'Avalanche',
//                 'nativeId': 43113,
//                 'name': 'avalanche-1',
//                 'apiUrl': 'https://api.avax-test.network/ext/bc/C/rpc'
//             }
//         ]
//     },
//     {
//         'id': 28,
//         'chain': 'Harmony',
//         'chainName': 'Harmony',
//         'prefix': '0x',
//         'nativeId': 1666700000,
//         'chainId': 105,
//         'chainType': 2,
//         'crossAddress': '0x0EA7cE4180E8Bc484db4be9b497d9D106a3D7781',
//         'intro': null,
//         'icon': 'https://files.nabox.io/icon/Harmony.png',
//         'apiUrl': 'https://api.s0.pops.one/',
//         'scanUrl': 'https://beta.explorer.harmony.one/',
//         'psUrl': 'https://faucet.pops.one/',
//         'tokenUrl': 'https://beta.explorer.harmony.one/address/',
//         'txUrl': 'https://beta.explorer.harmony.one/tx/',
//         'nft': '',
//         'sort': 7,
//         'status': 1,
//         'bridge': 1,
//         'swap': 1,
//         'configs': {
//             'multiCallAddress': '0x767188de0CE73c8771E72c4caF4a18De2303DF01',
//             'crossAddress': '0x0EA7cE4180E8Bc484db4be9b497d9D106a3D7781'
//         },
//         'mainAsset': {
//             'id': 18893,
//             'chain': 'Harmony',
//             'registerChain': 'Harmony',
//             'chainId': 105,
//             'assetId': 1,
//             'contractAddress': '',
//             'decimals': 18,
//             'assetName': 'ONE',
//             'symbol': 'ONE',
//             'symbolBase': 'ONE',
//             'configType': 1,
//             'source': 4,
//             'icon': 'https://nuls-cf.oss-us-west-1.aliyuncs.com/icon/Harmony.png',
//             'nulsCross': false,
//             'heterogeneousList': [
//                 {
//                     'heterogeneousChainId': 105,
//                     'heterogeneousChainMultySignAddress': '0x0ea7ce4180e8bc484db4be9b497d9d106a3d7781',
//                     'contractAddress': '',
//                     'chainName': 'Harmony',
//                     'token': false
//                 }
//             ],
//             'nerveChainId': 5,
//             'nerveAssetId': 33,
//             'nerveFlag': false,
//             'usdPrice': 0.1258,
//             'usdPlatform': 'feixiaohao',
//             'usdUrl': null
//         },
//         'assets': [],
//         'urlList': [
//             {
//                 'id': 6,
//                 'chain': 'Harmony',
//                 'nativeId': 1666700000,
//                 'name': 'one-1',
//                 'apiUrl': 'https://api.s0.pops.one/'
//             }
//         ]
//     },
//     {
//         'id': 30,
//         'chain': 'KCC',
//         'chainName': 'KCC',
//         'prefix': '0x',
//         'nativeId': 322,
//         'chainId': 107,
//         'chainType': 2,
//         'crossAddress': '0x1329d995EB0c8FD1e20fa1f9ee12e9fE4c67c60a',
//         'intro': null,
//         'icon': 'https://files.nabox.io/icon/KCC.png',
//         'apiUrl': 'https://rpc-testnet.kcc.network',
//         'scanUrl': 'https://scan-testnet.kcc.network/',
//         'psUrl': 'https://faucet-testnet.kcc.network/',
//         'tokenUrl': 'https://scan-testnet.kcc.network/token/',
//         'txUrl': 'https://scan-testnet.kcc.network/tx/',
//         'nft': '',
//         'sort': 8,
//         'status': 1,
//         'bridge': 1,
//         'swap': 0,
//         'configs': {
//             'multiCallAddress': '0x0111E01E78af5608e33569Edd997Fe2f700A0721',
//             'crossAddress': '0x1329d995EB0c8FD1e20fa1f9ee12e9fE4c67c60a'
//         },
//         'mainAsset': {
//             'id': 18895,
//             'chain': 'KCC',
//             'registerChain': 'KCC',
//             'chainId': 107,
//             'assetId': 1,
//             'contractAddress': '',
//             'decimals': 18,
//             'assetName': 'KCS',
//             'symbol': 'KCS',
//             'symbolBase': 'KCS',
//             'configType': 1,
//             'source': 4,
//             'icon': 'https://nuls-cf.oss-us-west-1.aliyuncs.com/icon/KCC.png',
//             'nulsCross': false,
//             'heterogeneousList': [
//                 {
//                     'heterogeneousChainId': 107,
//                     'heterogeneousChainMultySignAddress': '0x1329d995eb0c8fd1e20fa1f9ee12e9fe4c67c60a',
//                     'contractAddress': '',
//                     'chainName': 'KCC',
//                     'token': false
//                 }
//             ],
//             'nerveChainId': 5,
//             'nerveAssetId': 35,
//             'nerveFlag': false,
//             'usdPrice': 18.0974,
//             'usdPlatform': 'feixiaohao',
//             'usdUrl': null
//         },
//         'assets': [],
//         'urlList': [
//             {
//                 'id': 8,
//                 'chain': 'KCC',
//                 'nativeId': 322,
//                 'name': 'kcc-1',
//                 'apiUrl': 'https://rpc-testnet.kcc.network'
//             }
//         ]
//     },
//     {
//         'id': 36,
//         'chain': 'Cronos',
//         'chainName': 'Cronos',
//         'prefix': '0x',
//         'nativeId': 338,
//         'chainId': 109,
//         'chainType': 2,
//         'crossAddress': '0xb339211438Dcbf3D00d7999ad009637472FC72b3',
//         'intro': null,
//         'icon': 'https://files.nabox.io/icon/cronos.png',
//         'apiUrl': 'https://cronos-testnet-3.crypto.org:8545',
//         'scanUrl': 'https://cronos.crypto.org/explorer/testnet3/',
//         'psUrl': 'https://cronos.crypto.org/faucet',
//         'tokenUrl': 'https://cronos.crypto.org/explorer/testnet3/tokens/',
//         'txUrl': 'https://cronos.crypto.org/explorer/testnet3/tx/',
//         'nft': '',
//         'sort': 9,
//         'status': 1,
//         'bridge': 1,
//         'swap': 0,
//         'configs': {
//             'multiCallAddress': '0x452085c1eD74B38169DaEe194312FA8Db4818C19',
//             'crossAddress': '0xb339211438Dcbf3D00d7999ad009637472FC72b3'
//         },
//         'mainAsset': {
//             'id': 19034,
//             'chain': 'Cronos',
//             'registerChain': 'Cronos',
//             'chainId': 109,
//             'assetId': 1,
//             'contractAddress': '',
//             'decimals': 18,
//             'assetName': 'CRO',
//             'symbol': 'CRO',
//             'symbolBase': 'CRO',
//             'configType': 1,
//             'source': 4,
//             'icon': 'https://files.nabox.io/icon/cronos.png',
//             'nulsCross': false,
//             'heterogeneousList': [
//                 {
//                     'heterogeneousChainId': 109,
//                     'heterogeneousChainMultySignAddress': '0xb339211438dcbf3d00d7999ad009637472fc72b3',
//                     'contractAddress': '',
//                     'chainName': 'Cronos',
//                     'token': false
//                 }
//             ],
//             'nerveChainId': 5,
//             'nerveAssetId': 93,
//             'nerveFlag': false,
//             'usdPrice': 0.3889,
//             'usdPlatform': null,
//             'usdUrl': null
//         },
//         'assets': [],
//         'urlList': [
//             {
//                 'id': 14,
//                 'chain': 'Cronos',
//                 'nativeId': 338,
//                 'name': 'cronos-1',
//                 'apiUrl': 'https://cronos-testnet-3.crypto.org:8545'
//             }
//         ]
//     },
//     {
//         'id': 37,
//         'chain': 'Arbitrum',
//         'chainName': 'Arbitrum',
//         'prefix': '0x',
//         'nativeId': 421611,
//         'chainId': 111,
//         'chainType': 2,
//         'crossAddress': '0x830befa62501F1073ebE2A519B882e358f2a0318',
//         'intro': null,
//         'icon': 'https://files.nabox.io/icon/Arbitrum.png',
//         'apiUrl': 'https://rinkeby.arbitrum.io/rpc',
//         'scanUrl': 'https://testnet.arbiscan.io/',
//         'psUrl': 'https://faucets.chain.link/rinkeby',
//         'tokenUrl': 'https://testnet.arbiscan.io/token/',
//         'txUrl': 'https://testnet.arbiscan.io/tx/',
//         'nft': '',
//         'sort': 10,
//         'status': 1,
//         'bridge': 1,
//         'swap': 1,
//         'configs': {
//             'multiCallAddress': '0xC1f4F265EC8A46ad19740E7d3c6960db4c595dE5',
//             'crossAddress': '0x830befa62501F1073ebE2A519B882e358f2a0318'
//         },
//         'mainAsset': {
//             'id': 19036,
//             'chain': 'Arbitrum',
//             'registerChain': 'Arbitrum',
//             'chainId': 111,
//             'assetId': 1,
//             'contractAddress': '',
//             'decimals': 18,
//             'assetName': 'AETH',
//             'symbol': 'AETH',
//             'symbolBase': 'AETH',
//             'configType': 1,
//             'source': 4,
//             'icon': 'https://files.nabox.io/icon/Arbitrum.png',
//             'nulsCross': false,
//             'heterogeneousList': [
//                 {
//                     'heterogeneousChainId': 111,
//                     'heterogeneousChainMultySignAddress': '0x830befa62501f1073ebe2a519b882e358f2a0318',
//                     'contractAddress': '',
//                     'chainName': 'Arbitrum',
//                     'token': false
//                 }
//             ],
//             'nerveChainId': 5,
//             'nerveAssetId': 95,
//             'nerveFlag': false,
//             'usdPrice': 2606.8456,
//             'usdPlatform': null,
//             'usdUrl': null
//         },
//         'assets': [],
//         'urlList': [
//             {
//                 'id': 16,
//                 'chain': 'Arbitrum',
//                 'nativeId': 421611,
//                 'name': 'arbitrum-1',
//                 'apiUrl': 'https://rinkeby.arbitrum.io/rpc'
//             }
//         ]
//     },
//     {
//         'id': 38,
//         'chain': 'Fantom',
//         'chainName': 'Fantom',
//         'prefix': '0x',
//         'nativeId': 4002,
//         'chainId': 112,
//         'chainType': 2,
//         'crossAddress': '0x830befa62501F1073ebE2A519B882e358f2a0318',
//         'intro': null,
//         'icon': 'https://files.nabox.io/icon/Fantom.png',
//         'apiUrl': 'https://rpc.testnet.fantom.network',
//         'scanUrl': 'https://testnet.ftmscan.com/',
//         'psUrl': 'https://faucet.fantom.network/',
//         'tokenUrl': 'https://testnet.ftmscan.com/token/',
//         'txUrl': 'https://testnet.ftmscan.com/tx/',
//         'nft': '',
//         'sort': 11,
//         'status': 1,
//         'bridge': 1,
//         'swap': 1,
//         'configs': {
//             'multiCallAddress': '0xC1f4F265EC8A46ad19740E7d3c6960db4c595dE5',
//             'crossAddress': '0x830befa62501F1073ebE2A519B882e358f2a0318'
//         },
//         'mainAsset': {
//             'id': 19037,
//             'chain': 'Fantom',
//             'registerChain': 'Fantom',
//             'chainId': 112,
//             'assetId': 1,
//             'contractAddress': '',
//             'decimals': 18,
//             'assetName': 'FTM',
//             'symbol': 'FTM',
//             'symbolBase': 'FTM',
//             'configType': 1,
//             'source': 4,
//             'icon': 'https://files.nabox.io/icon/Fantom.png',
//             'nulsCross': false,
//             'heterogeneousList': [
//                 {
//                     'heterogeneousChainId': 112,
//                     'heterogeneousChainMultySignAddress': '0x8999d8738cc9b2e1fb1d01e1af732421d53cb2a9',
//                     'contractAddress': '',
//                     'chainName': 'Fantom',
//                     'token': false
//                 }
//             ],
//             'nerveChainId': 5,
//             'nerveAssetId': 96,
//             'nerveFlag': false,
//             'usdPrice': 1.2334,
//             'usdPlatform': null,
//             'usdUrl': null
//         },
//         'assets': [],
//         'urlList': [
//             {
//                 'id': 17,
//                 'chain': 'Fantom',
//                 'nativeId': 4002,
//                 'name': 'fantom-1',
//                 'apiUrl': 'https://rpc.testnet.fantom.network'
//             }
//         ]
//     },
//     {
//         'id': 22,
//         'chain': 'NULS',
//         'chainName': 'NULS',
//         'prefix': 'tNULS',
//         'nativeId': -1,
//         'chainId': 2,
//         'chainType': 1,
//         'crossAddress': null,
//         'intro': null,
//         'icon': 'https://files.nabox.io/icon/NULS.png',
//         'apiUrl': 'http://149.129.251.238:18004/jsonrpc',
//         'scanUrl': 'http://beta.nulscan.io/',
//         'psUrl': 'http://149.129.251.238:18003',
//         'tokenUrl': 'http://beta.nulscan.io/token/info?contractAddress=',
//         'txUrl': 'http://beta.nulscan.io/transaction/info?hash=',
//         'nft': '',
//         'sort': 98,
//         'status': 1,
//         'bridge': 1,
//         'swap': 1,
//         'configs': {
//             'feeAddress': 'tNULSeBaMomrBpDYJrfm49LcJ2nJKrNT5TEdam',
//             'destroyAddress': 'tNULSeBaMhZnRteniCy3UZqPjTbnWKBPHX1a5d',
//             'nft': ''
//         },
//         'mainAsset': {
//             'id': 17694,
//             'chain': 'NULS',
//             'registerChain': 'NULS',
//             'chainId': 2,
//             'assetId': 1,
//             'contractAddress': '',
//             'decimals': 8,
//             'assetName': 'NULS',
//             'symbol': 'NULS',
//             'symbolBase': 'NULS',
//             'configType': 1,
//             'source': 7,
//             'icon': 'https://files.nabox.io/icon/NULS.png',
//             'nulsCross': true,
//             'heterogeneousList': [
//                 {
//                     'heterogeneousChainId': 102,
//                     'heterogeneousChainMultySignAddress': '0xf85f03c3faac61acf7b187513aef10041029a1b2',
//                     'contractAddress': '0x72755f739b56ef98bda25e2622c63add229dec01',
//                     'chainName': 'BSC',
//                     'token': true
//                 },
//                 {
//                     'heterogeneousChainId': 103,
//                     'heterogeneousChainMultySignAddress': '0x19d90d3c8eb0c0b3e3093b054031ff1ca81704b8',
//                     'contractAddress': '0x74a163fcd791ec7aab2204ffabf1a1dfb8854883',
//                     'chainName': 'Heco',
//                     'token': true
//                 },
//                 {
//                     'heterogeneousChainId': 104,
//                     'heterogeneousChainMultySignAddress': '0xb490f2a3ec0b90e5faa1636be046d82ab7cdac74',
//                     'contractAddress': '0xd8eb69948e214da7fd8da6815c9945f175a4fce7',
//                     'chainName': 'OKExChain',
//                     'token': true
//                 },
//                 {
//                     'heterogeneousChainId': 105,
//                     'heterogeneousChainMultySignAddress': '0x0ea7ce4180e8bc484db4be9b497d9d106a3d7781',
//                     'contractAddress': '0x97893f1d41d151a9eec36d5b5a94cc3514d2c852',
//                     'chainName': 'Harmony',
//                     'token': true
//                 },
//                 {
//                     'heterogeneousChainId': 106,
//                     'heterogeneousChainMultySignAddress': '0xfe05820bae725fd093e9c1cb6e40ab3bdc40def2',
//                     'contractAddress': '0x97893f1d41d151a9eec36d5b5a94cc3514d2c852',
//                     'chainName': 'Polygon',
//                     'token': true
//                 },
//                 {
//                     'heterogeneousChainId': 107,
//                     'heterogeneousChainMultySignAddress': '0x1329d995eb0c8fd1e20fa1f9ee12e9fe4c67c60a',
//                     'contractAddress': '0x97893f1d41d151a9eec36d5b5a94cc3514d2c852',
//                     'chainName': 'KCC',
//                     'token': true
//                 }
//             ],
//             'nerveChainId': 2,
//             'nerveAssetId': 1,
//             'nerveFlag': false,
//             'usdPrice': 0.393,
//             'usdPlatform': 'feixiaohao',
//             'usdUrl': null
//         },
//         'assets': [],
//         'urlList': [
//             {
//                 'id': 2,
//                 'chain': 'NULS',
//                 'nativeId': -1,
//                 'name': 'nuls-1',
//                 'apiUrl': 'http://149.129.251.238:18004/jsonrpc'
//             }
//         ]
//     },
//     {
//         'id': 23,
//         'chain': 'NERVE',
//         'chainName': 'NERVE',
//         'prefix': 'TNVT',
//         'nativeId': -2,
//         'chainId': 5,
//         'chainType': 1,
//         'crossAddress': null,
//         'intro': null,
//         'icon': 'https://files.nabox.io/icon/NERVE.png',
//         'apiUrl': 'http://beta.api.nerve.network/jsonrpc',
//         'scanUrl': 'http://beta.scan.nerve.network/',
//         'psUrl': 'http://beta.public.nerve.network/jsonrpc',
//         'tokenUrl': '',
//         'txUrl': 'http://beta.scan.nerve.network/transaction/info?hash=',
//         'nft': '',
//         'sort': 99,
//         'status': 1,
//         'bridge': 1,
//         'swap': 1,
//         'configs': {
//             'feeAddress': 'TNVTdTSPP9oSLvdtVSVFiUYCvXJdj1ZA1nyQU',
//             'destroyAddress': 'TNVTdTSPGwjgRMtHqjmg8yKeMLnpBpVN5ZuuY',
//             'nft': ''
//         },
//         'mainAsset': {
//             'id': 17218,
//             'chain': 'NERVE',
//             'registerChain': 'NERVE',
//             'chainId': 5,
//             'assetId': 1,
//             'contractAddress': '',
//             'decimals': 8,
//             'assetName': 'NVT',
//             'symbol': 'NVT',
//             'symbolBase': 'NVT',
//             'configType': 1,
//             'source': 7,
//             'icon': 'https://files.nabox.io/icon/NVT.png',
//             'nulsCross': true,
//             'heterogeneousList': [
//                 {
//                     'heterogeneousChainId': 101,
//                     'heterogeneousChainMultySignAddress': '0x5e1cba794ad91fcd272fdaf2cd91b6110b601ed2',
//                     'contractAddress': '0x2cc112629954377620a20ce4fd730df8d977e6fe',
//                     'chainName': 'Ethereum',
//                     'token': true
//                 },
//                 {
//                     'heterogeneousChainId': 112,
//                     'heterogeneousChainMultySignAddress': '0x8999d8738cc9b2e1fb1d01e1af732421d53cb2a9',
//                     'contractAddress': '0xcea7f9f0354da1db6b649f25767412ec78c2fbf8',
//                     'chainName': 'Fantom',
//                     'token': true
//                 },
//                 {
//                     'heterogeneousChainId': 102,
//                     'heterogeneousChainMultySignAddress': '0xf85f03c3faac61acf7b187513aef10041029a1b2',
//                     'contractAddress': '0x477fe38678c166ccf0e2d6cfa755216e2a09118e',
//                     'chainName': 'BSC',
//                     'token': true
//                 },
//                 {
//                     'heterogeneousChainId': 103,
//                     'heterogeneousChainMultySignAddress': '0x19d90d3c8eb0c0b3e3093b054031ff1ca81704b8',
//                     'contractAddress': '0x3139dbe1bf7feb917cf8e978b72b6ead764b0e6c',
//                     'chainName': 'Heco',
//                     'token': true
//                 },
//                 {
//                     'heterogeneousChainId': 104,
//                     'heterogeneousChainMultySignAddress': '0xb490f2a3ec0b90e5faa1636be046d82ab7cdac74',
//                     'contractAddress': '0xf7915d4de86b856f3e51b894134816680bf09eee',
//                     'chainName': 'OKExChain',
//                     'token': true
//                 },
//                 {
//                     'heterogeneousChainId': 105,
//                     'heterogeneousChainMultySignAddress': '0x0ea7ce4180e8bc484db4be9b497d9d106a3d7781',
//                     'contractAddress': '0xcea7f9f0354da1db6b649f25767412ec78c2fbf8',
//                     'chainName': 'Harmony',
//                     'token': true
//                 },
//                 {
//                     'heterogeneousChainId': 106,
//                     'heterogeneousChainMultySignAddress': '0xfe05820bae725fd093e9c1cb6e40ab3bdc40def2',
//                     'contractAddress': '0xcea7f9f0354da1db6b649f25767412ec78c2fbf8',
//                     'chainName': 'Polygon',
//                     'token': true
//                 },
//                 {
//                     'heterogeneousChainId': 107,
//                     'heterogeneousChainMultySignAddress': '0x1329d995eb0c8fd1e20fa1f9ee12e9fe4c67c60a',
//                     'contractAddress': '0xcea7f9f0354da1db6b649f25767412ec78c2fbf8',
//                     'chainName': 'KCC',
//                     'token': true
//                 },
//                 {
//                     'heterogeneousChainId': 108,
//                     'heterogeneousChainMultySignAddress': 'TYVxuksybZdbyQwoR25V2YUgXYAHikcLro',
//                     'contractAddress': 'TYMQT8152SicTSDuNEob6t6QRLfet1xrMn',
//                     'chainName': 'TRX',
//                     'token': true
//                 },
//                 {
//                     'heterogeneousChainId': 109,
//                     'heterogeneousChainMultySignAddress': '0xb339211438dcbf3d00d7999ad009637472fc72b3',
//                     'contractAddress': '0xcea7f9f0354da1db6b649f25767412ec78c2fbf8',
//                     'chainName': 'Cronos',
//                     'token': true
//                 },
//                 {
//                     'heterogeneousChainId': 110,
//                     'heterogeneousChainMultySignAddress': '0x8999d8738cc9b2e1fb1d01e1af732421d53cb2a9',
//                     'contractAddress': '0xcea7f9f0354da1db6b649f25767412ec78c2fbf8',
//                     'chainName': 'Avalanche',
//                     'token': true
//                 },
//                 {
//                     'heterogeneousChainId': 111,
//                     'heterogeneousChainMultySignAddress': '0x830befa62501f1073ebe2a519b882e358f2a0318',
//                     'contractAddress': '0xcea7f9f0354da1db6b649f25767412ec78c2fbf8',
//                     'chainName': 'Arbitrum',
//                     'token': true
//                 }
//             ],
//             'nerveChainId': 5,
//             'nerveAssetId': 1,
//             'nerveFlag': false,
//             'usdPrice': 0.0213,
//             'usdPlatform': 'feixiaohao',
//             'usdUrl': null
//         },
//         'assets': [],
//         'urlList': [
//             {
//                 'id': 1,
//                 'chain': 'NERVE',
//                 'nativeId': -2,
//                 'name': 'nvt-1',
//                 'apiUrl': 'http://beta.api.nerve.network/jsonrpc'
//             }
//         ]
//     },
//     { 'id': 43, 'chain': 'TRON', 'chainName': 'TRON', 'prefix': '0x', 'nativeId': 100000001, 'chainId': 108, 'chainType': 3, 'intro': null, 'icon': 'https://files.nabox.io/icon/tron.png', 'apiUrl': '', 'scanUrl': 'https://shasta.tronscan.org/', 'psUrl': '', 'sort': 9, 'status': 1, 'bridge': 1, 'swap': 0, 'configs': { 'multiCallAddress': 'TJfF8mmmy3Br1VvBygq16TSnnsiNL6LEBD', 'crossAddress': 'TYVxuksybZdbyQwoR25V2YUgXYAHikcLro', 'nft': '' }, 'mainAsset': { 'id': 19144, 'chain': 'TRON', 'registerChain': '', 'chainId': 108, 'assetId': 1, 'contractAddress': '', 'decimals': 6, 'assetName': 'TRX', 'symbol': 'TRX', 'symbolBase': 'TRX', 'configType': 1, 'source': 9, 'icon': 'https://files.nabox.io/icon/tron.png', 'nulsCross': true, 'heterogeneousList': [{ 'heterogeneousChainId': 104, 'heterogeneousChainMultySignAddress': '0xb490f2a3ec0b90e5faa1636be046d82ab7cdac74', 'contractAddress': '0x2785f6458c3bab956ccb1542f602c69d1188b28f', 'chainName': 'OKX', 'token': true }, { 'heterogeneousChainId': 108, 'heterogeneousChainMultySignAddress': 'TYVxuksybZdbyQwoR25V2YUgXYAHikcLro', 'contractAddress': '', 'chainName': 'TRX', 'token': false }], 'nerveChainId': 5, 'nerveAssetId': 55, 'nerveFlag': false, 'usdPrice': 0.0708, 'usdPlatform': null, 'usdUrl': null }, 'assets': [{ 'id': 19144, 'chain': 'TRON', 'registerChain': '', 'chainId': 108, 'assetId': 1, 'contractAddress': '', 'decimals': 6, 'assetName': 'TRX', 'symbol': 'TRX', 'symbolBase': 'TRX', 'configType': 1, 'source': 9, 'icon': 'https://files.nabox.io/icon/tron.png', 'nulsCross': true, 'heterogeneousList': [{ 'heterogeneousChainId': 104, 'heterogeneousChainMultySignAddress': '0xb490f2a3ec0b90e5faa1636be046d82ab7cdac74', 'contractAddress': '0x2785f6458c3bab956ccb1542f602c69d1188b28f', 'chainName': 'OKX', 'token': true }, { 'heterogeneousChainId': 108, 'heterogeneousChainMultySignAddress': 'TYVxuksybZdbyQwoR25V2YUgXYAHikcLro', 'contractAddress': '', 'chainName': 'TRX', 'token': false }], 'nerveChainId': 5, 'nerveAssetId': 55, 'nerveFlag': false, 'usdPrice': 0.0708, 'usdPlatform': null, 'usdUrl': null }], 'urlList': [{ 'id': 23, 'chain': 'TRON', 'nativeId': 100000001, 'name': 'tron-1', 'apiUrl': '' }] }
// ];



//开发模式
export const IS_DEV = process.env.NODE_ENV === 'development';

// 当前网络
export const currentNet = 'mainnet';

//燃烧地址的公钥
export const API_BURNING_ADDRESS_PUB = 'NERVEepb63T1M8JgQ26jwZpZXYL8ZMLdUAK31L';

//ChainId和资产ID
export const MAIN_INFO = { chainId: 9, assetId: 1, prefix: 'NERVE', symbol: 'NVT', decimal: 8, rpc: 'https://public.nerve.network', batchRPC: 'https://api.nerve.network/jsonrpc' };
export const NULS_INFO = { chainId: 1, assetId: 1, prefix: 'NULS', symbol: 'NAI', decimal: 4, rpc: 'https://public1.nuls.io', batchRPC: 'https://api.nuls.io/jsonrpc' };
export const EVM_PREFIX = '0x';

//ETH 网络信息 测试网:ropsten, 主网:homestead
export const ETHNET = 'homestead';

export const BRIDGE_API_URL = IS_DEV ? "https://dev.web.id.nabox.io/api" : "https://dev.web.id.nabox.io/api"; // Prod
// export const BRIDGE_API_URL = "/nabox-api";

export const localChainConfig = [
    {
        'id': 3,
        'chain': 'Ethereum',
        'chainName': 'Ethereum',
        'prefix': '0x',
        'nativeId': 1,
        'chainId': 101,
        'chainType': 2,
        'crossAddress': '0xc707e0854da2d72c90a7453f8dc224dd937d7e82',
        'intro': null,
        'icon': 'https://files.nabox.io/icon/Ethereum.png',
        'apiUrl': 'https://geth.nerve.network/',
        'scanUrl': 'https://etherscan.io/',
        'psUrl': null,
        'tokenUrl': 'https://etherscan.io/token/',
        'txUrl': 'https://etherscan.io/tx/',
        'nft': 'eth',
        'sort': 1,
        'status': 1,
        'bridge': 1,
        'swap': 1,
        'configs': {
            'multiCallAddress': '0x6899aa135037a4c8a3cab11622d35cea4cd63747',
            'crossAddress': '0xc707e0854da2d72c90a7453f8dc224dd937d7e82'
        },
        'mainAsset': {
            'id': 18684,
            'chain': 'Ethereum',
            'registerChain': 'Ethereum',
            'chainId': 101,
            'assetId': 1,
            'contractAddress': '',
            'decimals': 18,
            'assetName': 'ETH',
            'symbol': 'ETH',
            'symbolBase': 'ETH',
            'configType': 1,
            'source': 9,
            'icon': 'https://files.nabox.io/icon/ETH.png',
            'nulsCross': true,
            'heterogeneousList': [
                {
                    'heterogeneousChainId': 101,
                    'heterogeneousChainMultySignAddress': '0xc707e0854da2d72c90a7453f8dc224dd937d7e82',
                    'contractAddress': '',
                    'chainName': 'Ethereum',
                    'token': false
                },
                {
                    'heterogeneousChainId': 102,
                    'heterogeneousChainMultySignAddress': '0x75ab1d50bedbd32b6113941fcf5359787a4bbef4',
                    'contractAddress': '0x3095666bb0393f7ea894050129cf2741c83547ca',
                    'chainName': 'BSC',
                    'token': true
                },
                {
                    'heterogeneousChainId': 103,
                    'heterogeneousChainMultySignAddress': '0x2ead2e7a3bd88c6a90b3d464bc6938ba56f1407f',
                    'contractAddress': '0x8cd6e29d3686d24d3c2018cee54621ea0f89313b',
                    'chainName': 'Heco',
                    'token': true
                }
            ],
            'nerveChainId': 9,
            'nerveAssetId': 2,
            'nerveFlag': false,
            'usdPrice': 2604.9417,
            'usdPlatform': 'cmc',
            'usdUrl': null
        },
        'assets': [],
        'urlList': [
            {
                'id': 27,
                'chain': 'Ethereum',
                'nativeId': 1,
                'name': 'ETH-1',
                'apiUrl': 'https://geth.nerve.network'
            },
            {
                'id': 28,
                'chain': 'Ethereum',
                'nativeId': 1,
                'name': 'ETH-2',
                'apiUrl': 'https://web3.mytokenpocket.vip'
            },
            {
                'id': 29,
                'chain': 'Ethereum',
                'nativeId': 1,
                'name': 'ETH-3',
                'apiUrl': 'https://geth.mytokenpocket.vip'
            },
            {
                'id': 30,
                'chain': 'Ethereum',
                'nativeId': 1,
                'name': 'ETH-4',
                'apiUrl': 'https://eth626892d.jccdex.cn'
            }
        ]
    },
    {
        'id': 4,
        'chain': 'BSC',
        'chainName': 'BSC',
        'prefix': '0x',
        'nativeId': 56,
        'chainId': 102,
        'chainType': 2,
        'crossAddress': '0x75ab1d50bedbd32b6113941fcf5359787a4bbef4',
        'intro': null,
        'icon': 'https://files.nabox.io/icon/BSC.png',
        'apiUrl': 'https://bsc-dataseed.binance.org',
        'scanUrl': 'https://bscscan.com/',
        'psUrl': null,
        'tokenUrl': 'https://bscscan.com/token/',
        'txUrl': 'https://bscscan.com/tx/',
        'nft': 'bsc',
        'sort': 2,
        'status': 1,
        'bridge': 1,
        'swap': 1,
        'configs': {
            'multiCallAddress': '0x07616A4fb60F854054137A7b9b5C3f8c8dd2dc01',
            'crossAddress': '0x75ab1d50bedbd32b6113941fcf5359787a4bbef4'
        },
        'mainAsset': {
            'id': 18989,
            'chain': 'BSC',
            'registerChain': 'BSC',
            'chainId': 102,
            'assetId': 1,
            'contractAddress': '',
            'decimals': 18,
            'assetName': 'BNB',
            'symbol': 'BNB',
            'symbolBase': 'BNB',
            'configType': 1,
            'source': 9,
            'icon': 'https://files.nabox.io/icon/BNB.png',
            'nulsCross': true,
            'heterogeneousList': [
                {
                    'heterogeneousChainId': 102,
                    'heterogeneousChainMultySignAddress': '0x75ab1d50bedbd32b6113941fcf5359787a4bbef4',
                    'contractAddress': '',
                    'chainName': 'BSC',
                    'token': false
                },
                {
                    'heterogeneousChainId': 104,
                    'heterogeneousChainMultySignAddress': '0xe096d12d6cb61e11bce3755f938b9259b386523a',
                    'contractAddress': '0x7ed729f4d6838bb775601886823476f0dd64c3ae',
                    'chainName': 'OKExChain',
                    'token': true
                }
            ],
            'nerveChainId': 9,
            'nerveAssetId': 25,
            'nerveFlag': false,
            'usdPrice': 372.1665,
            'usdPlatform': 'cmc',
            'usdUrl': null
        },
        'assets': [],
        'urlList': [
            {
                'id': 31,
                'chain': 'BSC',
                'nativeId': 56,
                'name': 'BSC-1',
                'apiUrl': 'https://bsc-dataseed4.ninicoin.io'
            },
            {
                'id': 32,
                'chain': 'BSC',
                'nativeId': 56,
                'name': 'BSC-2',
                'apiUrl': 'https://bsc-dataseed1.binance.org'
            },
            {
                'id': 33,
                'chain': 'BSC',
                'nativeId': 56,
                'name': 'BSC-3',
                'apiUrl': 'https://bsc-dataseed2.binance.org'
            },
            {
                'id': 34,
                'chain': 'BSC',
                'nativeId': 56,
                'name': 'BSC-4',
                'apiUrl': 'https://bsc-dataseed3.binance.org'
            },
            {
                'id': 35,
                'chain': 'BSC',
                'nativeId': 56,
                'name': 'BSC-5',
                'apiUrl': 'https://bsc-dataseed.binance.org'
            },
            {
                'id': 51,
                'chain': 'BSC',
                'nativeId': 56,
                'name': 'bsc-6',
                'apiUrl': 'https://bsc-dataseed3.defibit.io'
            },
            {
                'id': 52,
                'chain': 'BSC',
                'nativeId': 56,
                'name': 'bsc-7',
                'apiUrl': 'https://bsc-dataseed4.defibit.io'
            },
            {
                'id': 53,
                'chain': 'BSC',
                'nativeId': 56,
                'name': 'bsc-8',
                'apiUrl': 'https://bsc-dataseed2.ninicoin.io'
            },
            {
                'id': 54,
                'chain': 'BSC',
                'nativeId': 56,
                'name': 'bsc-9',
                'apiUrl': 'https://bsc-dataseed3.ninicoin.io'
            }
        ]
    },
    {
        'id': 8,
        'chain': 'Polygon',
        'chainName': 'Polygon',
        'prefix': '0x',
        'nativeId': 137,
        'chainId': 106,
        'chainType': 2,
        'crossAddress': '0x9ddc2fb726cf243305349587ae2a33dd7c91460e',
        'intro': null,
        'icon': 'https://files.nabox.io/icon/Polygon.png',
        'apiUrl': 'https://matic-mainnet.chainstacklabs.com',
        'scanUrl': 'https://polygonscan.com/',
        'psUrl': null,
        'tokenUrl': 'https://polygonscan.com/token/',
        'txUrl': 'https://polygonscan.com/tx/',
        'nft': 'matic',
        'sort': 3,
        'status': 1,
        'bridge': 1,
        'swap': 1,
        'configs': {
            'multiCallAddress': '0xd1F3BE686D64e1EA33fcF64980b65847aA43D79C',
            'crossAddress': '0x9ddc2fb726cf243305349587ae2a33dd7c91460e'
        },
        'mainAsset': {
            'id': 1360884,
            'chain': 'Polygon',
            'registerChain': 'Polygon',
            'chainId': 106,
            'assetId': 1,
            'contractAddress': '',
            'decimals': 18,
            'assetName': 'MATIC',
            'symbol': 'MATIC',
            'symbolBase': 'MATIC',
            'configType': 1,
            'source': 4,
            'icon': 'https://nuls-cf.oss-us-west-1.aliyuncs.com/icon/Polygon.png',
            'nulsCross': false,
            'heterogeneousList': [
                {
                    'heterogeneousChainId': 106,
                    'heterogeneousChainMultySignAddress': '0x9ddc2fb726cf243305349587ae2a33dd7c91460e',
                    'contractAddress': '',
                    'chainName': 'Polygon',
                    'token': false
                }
            ],
            'nerveChainId': 9,
            'nerveAssetId': 160,
            'nerveFlag': false,
            'usdPrice': 1.434,
            'usdPlatform': 'cmc',
            'usdUrl': null
        },
        'assets': [],
        'urlList': [
            {
                'id': 40,
                'chain': 'Polygon',
                'nativeId': 137,
                'name': 'MATIC-1',
                'apiUrl': 'https://rpc-mainnet.matic.network'
            },
            {
                'id': 41,
                'chain': 'Polygon',
                'nativeId': 137,
                'name': 'MATIC-2',
                'apiUrl': 'https://matic-mainnet.chainstacklabs.com'
            },
            {
                'id': 42,
                'chain': 'Polygon',
                'nativeId': 137,
                'name': 'MATIC-3',
                'apiUrl': 'https://rpc-mainnet.maticvigil.com'
            },
            {
                'id': 43,
                'chain': 'Polygon',
                'nativeId': 137,
                'name': 'MATIC-4',
                'apiUrl': 'https://polygon-rpc.com'
            },
            {
                'id': 44,
                'chain': 'Polygon',
                'nativeId': 137,
                'name': 'MATIC-5',
                'apiUrl': 'https://matic-mainnet-archive-rpc.bwarelabs.com'
            }
        ]
    },
    {
        'id': 5,
        'chain': 'Heco',
        'chainName': 'Heco',
        'prefix': '0x',
        'nativeId': 128,
        'chainId': 103,
        'chainType': 2,
        'crossAddress': '0x2ead2e7a3bd88c6a90b3d464bc6938ba56f1407f',
        'intro': null,
        'icon': 'https://files.nabox.io/icon/Heco.png',
        'apiUrl': 'https://http-mainnet.hecochain.com',
        'scanUrl': 'https://hecoinfo.com/',
        'psUrl': null,
        'tokenUrl': 'https://hecoinfo.com/token/',
        'txUrl': 'https://hecoinfo.com/tx/',
        'nft': '',
        'sort': 4,
        'status': 1,
        'bridge': 1,
        'swap': 1,
        'configs': {
            'multiCallAddress': '0xd1F3BE686D64e1EA33fcF64980b65847aA43D79C',
            'crossAddress': '0x2ead2e7a3bd88c6a90b3d464bc6938ba56f1407f'
        },
        'mainAsset': {
            'id': 19090,
            'chain': 'Heco',
            'registerChain': 'Heco',
            'chainId': 103,
            'assetId': 1,
            'contractAddress': '',
            'decimals': 18,
            'assetName': 'HT',
            'symbol': 'HT',
            'symbolBase': 'HT',
            'configType': 1,
            'source': 9,
            'icon': 'https://files.nabox.io/icon/HT.png',
            'nulsCross': true,
            'heterogeneousList': [
                {
                    'heterogeneousChainId': 103,
                    'heterogeneousChainMultySignAddress': '0x2ead2e7a3bd88c6a90b3d464bc6938ba56f1407f',
                    'contractAddress': '',
                    'chainName': 'Heco',
                    'token': false
                },
                {
                    'heterogeneousChainId': 104,
                    'heterogeneousChainMultySignAddress': '0xe096d12d6cb61e11bce3755f938b9259b386523a',
                    'contractAddress': '0xe0ff125e74d8a9afdc495ede8cc0044a78ee84c3',
                    'chainName': 'OKExChain',
                    'token': true
                }
            ],
            'nerveChainId': 9,
            'nerveAssetId': 55,
            'nerveFlag': false,
            'usdPrice': 8.3726,
            'usdPlatform': 'cmc',
            'usdUrl': null
        },
        'assets': [],
        'urlList': [
            {
                'id': 36,
                'chain': 'Heco',
                'nativeId': 128,
                'name': 'HECO-1',
                'apiUrl': 'https://http-mainnet.hecochain.com'
            },
            {
                'id': 37,
                'chain': 'Heco',
                'nativeId': 128,
                'name': 'HECO-2',
                'apiUrl': 'https://http-mainnet-node.defibox.com'
            }
        ]
    },
    {
        'id': 6,
        'chain': 'OKExChain',
        'chainName': 'OKExChain',
        'prefix': '0x',
        'nativeId': 66,
        'chainId': 104,
        'chainType': 2,
        'crossAddress': '0xe096d12d6cb61e11bce3755f938b9259b386523a',
        'intro': null,
        'icon': 'https://files.nabox.io/icon/OKExChain.png',
        'apiUrl': 'https://exchainrpc.okex.org',
        'scanUrl': 'https://www.oklink.com/',
        'psUrl': null,
        'tokenUrl': 'https://www.oklink.com/okexchain/tokenAddr/',
        'txUrl': 'https://www.oklink.com/okexchain/tx/',
        'nft': '',
        'sort': 5,
        'status': 1,
        'bridge': 1,
        'swap': 1,
        'configs': {
            'multiCallAddress': '0xd1F3BE686D64e1EA33fcF64980b65847aA43D79C',
            'crossAddress': '0xe096d12d6cb61e11bce3755f938b9259b386523a'
        },
        'mainAsset': {
            'id': 862100,
            'chain': 'OKExChain',
            'registerChain': 'OKExChain',
            'chainId': 104,
            'assetId': 1,
            'contractAddress': '',
            'decimals': 18,
            'assetName': 'OKT',
            'symbol': 'OKT',
            'symbolBase': 'OKT',
            'configType': 1,
            'source': 4,
            'icon': 'https://files.nabox.io/icon/OKT.png',
            'nulsCross': true,
            'heterogeneousList': [
                {
                    'heterogeneousChainId': 104,
                    'heterogeneousChainMultySignAddress': '0xe096d12d6cb61e11bce3755f938b9259b386523a',
                    'contractAddress': '',
                    'chainName': 'OKExChain',
                    'token': false
                }
            ],
            'nerveChainId': 9,
            'nerveAssetId': 87,
            'nerveFlag': false,
            'usdPrice': 34.3658,
            'usdPlatform': 'cmc',
            'usdUrl': null
        },
        'assets': [],
        'urlList': [
            {
                'id': 38,
                'chain': 'OKExChain',
                'nativeId': 66,
                'name': 'OEC-1',
                'apiUrl': 'https://exchainrpc.okex.org'
            },
            {
                'id': 39,
                'chain': 'OKExChain',
                'nativeId': 66,
                'name': 'OEC-2',
                'apiUrl': 'https://okchain.mytokenpocket.vip'
            }
        ]
    },
    {
        'id': 15,
        'chain': 'Avalanche',
        'chainName': 'Avalanche',
        'prefix': '0x',
        'nativeId': 43114,
        'chainId': 110,
        'chainType': 2,
        'crossAddress': '0x3758AA66caD9F2606F1F501c9CB31b94b713A6d5',
        'intro': null,
        'icon': 'https://files.nabox.io/icon/AVAX.png',
        'apiUrl': 'https://api.avax.network/ext/bc/C/rpc',
        'scanUrl': 'https://snowtrace.io/',
        'psUrl': '',
        'tokenUrl': 'https://snowtrace.io/token/',
        'txUrl': 'https://snowtrace.io/tx/',
        'nft': '',
        'sort': 6,
        'status': 1,
        'bridge': 1,
        'swap': 1,
        'configs': {
            'multiCallAddress': '0xea749848faf37383e48a3004074b327229345943',
            'crossAddress': '0x3758AA66caD9F2606F1F501c9CB31b94b713A6d5'
        },
        'mainAsset': {
            'id': 1364210,
            'chain': 'Avalanche',
            'registerChain': 'Avalanche',
            'chainId': 110,
            'assetId': 1,
            'contractAddress': '',
            'decimals': 18,
            'assetName': 'AVAX',
            'symbol': 'AVAX',
            'symbolBase': 'AVAX',
            'configType': 1,
            'source': 4,
            'icon': 'https://files.nabox.io/icon/AVAX.png',
            'nulsCross': false,
            'heterogeneousList': [
                {
                    'heterogeneousChainId': 110,
                    'heterogeneousChainMultySignAddress': '0x3758aa66cad9f2606f1f501c9cb31b94b713a6d5',
                    'contractAddress': '',
                    'chainName': 'Avalanche',
                    'token': false
                }
            ],
            'nerveChainId': 9,
            'nerveAssetId': 267,
            'nerveFlag': false,
            'usdPrice': 73.7129,
            'usdPlatform': 'cmc',
            'usdUrl': null
        },
        'assets': [],
        'urlList': []
    },
    {
        'id': 7,
        'chain': 'Harmony',
        'chainName': 'Harmony',
        'prefix': '0x',
        'nativeId': 1666600000,
        'chainId': 105,
        'chainType': 2,
        'crossAddress': '0x32fae32961474e6d19b7a6346524b8a6a6fd1d9c',
        'intro': null,
        'icon': 'https://files.nabox.io/icon/Harmony.png',
        'apiUrl': 'https://api.harmony.one/',
        'scanUrl': 'https://explorer.harmony.one/',
        'psUrl': null,
        'tokenUrl': 'https://explorer.harmony.one/address/',
        'txUrl': 'https://explorer.harmony.one/tx/',
        'nft': '',
        'sort': 7,
        'status': 1,
        'bridge': 1,
        'swap': 0,
        'configs': {
            'multiCallAddress': '0xd1F3BE686D64e1EA33fcF64980b65847aA43D79C',
            'crossAddress': '0x32fae32961474e6d19b7a6346524b8a6a6fd1d9c'
        },
        'mainAsset': {
            'id': 1360883,
            'chain': 'Harmony',
            'registerChain': 'Harmony',
            'chainId': 105,
            'assetId': 1,
            'contractAddress': '',
            'decimals': 18,
            'assetName': 'ONE',
            'symbol': 'ONE',
            'symbolBase': 'ONE',
            'configType': 1,
            'source': 4,
            'icon': 'https://nuls-cf.oss-us-west-1.aliyuncs.com/icon/Harmony.png',
            'nulsCross': false,
            'heterogeneousList': [
                {
                    'heterogeneousChainId': 105,
                    'heterogeneousChainMultySignAddress': '0x32fae32961474e6d19b7a6346524b8a6a6fd1d9c',
                    'contractAddress': '',
                    'chainName': 'Harmony',
                    'token': false
                }
            ],
            'nerveChainId': 9,
            'nerveAssetId': 159,
            'nerveFlag': false,
            'usdPrice': 0.1259,
            'usdPlatform': 'cmc',
            'usdUrl': null
        },
        'assets': [],
        'urlList': [
            {
                'id': 45,
                'chain': 'Harmony',
                'nativeId': 1666600000,
                'name': 'ONE-1',
                'apiUrl': 'https://api.harmony.one/'
            }
        ]
    },
    {
        'id': 9,
        'chain': 'KCC',
        'chainName': 'KCC',
        'prefix': '0x',
        'nativeId': 321,
        'chainId': 107,
        'chainType': 2,
        'crossAddress': '0xdb442dff8ff9fd10245406da9a32528c30c10c92',
        'intro': null,
        'icon': 'https://files.nabox.io/icon/KCC.png',
        'apiUrl': 'https://rpc-mainnet.kcc.network',
        'scanUrl': 'https://explorer.kcc.io/cn/',
        'psUrl': null,
        'tokenUrl': 'https://explorer.kcc.io/cn/token/',
        'txUrl': 'https://explorer.kcc.io/cn/tx/',
        'nft': '',
        'sort': 8,
        'status': 1,
        'bridge': 1,
        'swap': 0,
        'configs': {
            'multiCallAddress': '0xd1F3BE686D64e1EA33fcF64980b65847aA43D79C',
            'crossAddress': '0xdb442dff8ff9fd10245406da9a32528c30c10c92'
        },
        'mainAsset': {
            'id': 1360885,
            'chain': 'KCC',
            'registerChain': 'KCC',
            'chainId': 107,
            'assetId': 1,
            'contractAddress': '',
            'decimals': 18,
            'assetName': 'KCS',
            'symbol': 'KCS',
            'symbolBase': 'KCS',
            'configType': 1,
            'source': 4,
            'icon': 'https://nuls-cf.oss-us-west-1.aliyuncs.com/icon/KCC.png',
            'nulsCross': false,
            'heterogeneousList': [
                {
                    'heterogeneousChainId': 107,
                    'heterogeneousChainMultySignAddress': '0xdb442dff8ff9fd10245406da9a32528c30c10c92',
                    'contractAddress': '',
                    'chainName': 'KCC',
                    'token': false
                }
            ],
            'nerveChainId': 9,
            'nerveAssetId': 161,
            'nerveFlag': false,
            'usdPrice': 18.0826,
            'usdPlatform': 'cmc',
            'usdUrl': null
        },
        'assets': [],
        'urlList': [
            {
                'id': 46,
                'chain': 'KCC',
                'nativeId': 321,
                'name': 'KCC-1',
                'apiUrl': 'https://rpc-mainnet.kcc.network'
            }
        ]
    },
    {
        'id': 14,
        'chain': 'Cronos',
        'chainName': 'Cronos',
        'prefix': '0x',
        'nativeId': 25,
        'chainId': 109,
        'chainType': 2,
        'crossAddress': '0x3758AA66caD9F2606F1F501c9CB31b94b713A6d5',
        'intro': null,
        'icon': 'https://files.nabox.io/icon/cronos.png',
        'apiUrl': 'https://evm-cronos.crypto.org',
        'scanUrl': 'https://cronos.crypto.org/explorer/',
        'psUrl': '',
        'tokenUrl': 'https://cronos.crypto.org/explorer/token/',
        'txUrl': 'https://cronos.crypto.org/explorer/tx/',
        'nft': '',
        'sort': 9,
        'status': 1,
        'bridge': 1,
        'swap': 0,
        'configs': {
            'multiCallAddress': '0x51E54e092B93FE31FC277435B1380512D7d27eEe',
            'crossAddress': '0x3758AA66caD9F2606F1F501c9CB31b94b713A6d5'
        },
        'mainAsset': {
            'id': 1364209,
            'chain': 'Cronos',
            'registerChain': 'Cronos',
            'chainId': 109,
            'assetId': 1,
            'contractAddress': '',
            'decimals': 18,
            'assetName': 'CRO',
            'symbol': 'CRO',
            'symbolBase': 'CRO',
            'configType': 1,
            'source': 4,
            'icon': 'https://files.nabox.io/icon/cronos.png',
            'nulsCross': false,
            'heterogeneousList': [
                {
                    'heterogeneousChainId': 109,
                    'heterogeneousChainMultySignAddress': '0x3758aa66cad9f2606f1f501c9cb31b94b713a6d5',
                    'contractAddress': '',
                    'chainName': 'Cronos',
                    'token': false
                }
            ],
            'nerveChainId': 9,
            'nerveAssetId': 266,
            'nerveFlag': false,
            'usdPrice': 0.3887,
            'usdPlatform': 'cmc',
            'usdUrl': null
        },
        'assets': [],
        'urlList': [
            {
                'id': 56,
                'chain': 'Cronos',
                'nativeId': 25,
                'name': 'cronos-1',
                'apiUrl': 'https://evm-cronos.crypto.org'
            }
        ]
    },
    {
        'id': 16,
        'chain': 'Arbitrum',
        'chainName': 'Arbitrum',
        'prefix': '0x',
        'nativeId': 42161,
        'chainId': 111,
        'chainType': 2,
        'crossAddress': '0x3758AA66caD9F2606F1F501c9CB31b94b713A6d5',
        'intro': null,
        'icon': 'https://files.nabox.io/icon/Arbitrum.png',
        'apiUrl': 'https://arb1.arbitrum.io/rpc',
        'scanUrl': 'https://arbiscan.io/',
        'psUrl': '',
        'tokenUrl': 'https://arbiscan.io/token/',
        'txUrl': 'https://arbiscan.io/tx/',
        'nft': '',
        'sort': 10,
        'status': 1,
        'bridge': 1,
        'swap': 1,
        'configs': {
            'multiCallAddress': '0xea749848faF37383e48A3004074b327229345943',
            'crossAddress': '0x3758AA66caD9F2606F1F501c9CB31b94b713A6d5'
        },
        'mainAsset': {
            'id': 1364211,
            'chain': 'Arbitrum',
            'registerChain': 'Arbitrum',
            'chainId': 111,
            'assetId': 1,
            'contractAddress': '',
            'decimals': 18,
            'assetName': 'AETH',
            'symbol': 'AETH',
            'symbolBase': 'AETH',
            'configType': 1,
            'source': 4,
            'icon': 'https://files.nabox.io/icon/Arbitrum.png',
            'nulsCross': false,
            'heterogeneousList': [
                {
                    'heterogeneousChainId': 111,
                    'heterogeneousChainMultySignAddress': '0xf0e406c49c63abf358030a299c0e00118c4c6ba5',
                    'contractAddress': '',
                    'chainName': 'Arbitrum',
                    'token': false
                }
            ],
            'nerveChainId': 9,
            'nerveAssetId': 268,
            'nerveFlag': false,
            'usdPrice': 2604.9417,
            'usdPlatform': 'cmc',
            'usdUrl': null
        },
        'assets': [],
        'urlList': []
    },
    {
        'id': 17,
        'chain': 'Fantom',
        'chainName': 'Fantom',
        'prefix': '0x',
        'nativeId': 250,
        'chainId': 112,
        'chainType': 2,
        'crossAddress': '0x3758AA66caD9F2606F1F501c9CB31b94b713A6d5',
        'intro': null,
        'icon': 'https://files.nabox.io/icon/Fantom.png',
        'apiUrl': 'https://rpc.ftm.tools/',
        'scanUrl': 'https://ftmscan.com/',
        'psUrl': 'https://faucet.fantom.network/',
        'tokenUrl': 'https://ftmscan.com/token/',
        'txUrl': 'https://ftmscan.com/tx/',
        'nft': '',
        'sort': 11,
        'status': 1,
        'bridge': 1,
        'swap': 1,
        'configs': {
            'multiCallAddress': '0xea749848faF37383e48A3004074b327229345943',
            'crossAddress': '0x3758AA66caD9F2606F1F501c9CB31b94b713A6d5'
        },
        'mainAsset': {
            'id': 1364212,
            'chain': 'Fantom',
            'registerChain': 'Fantom',
            'chainId': 112,
            'assetId': 1,
            'contractAddress': '',
            'decimals': 18,
            'assetName': 'FTM',
            'symbol': 'FTM',
            'symbolBase': 'FTM',
            'configType': 1,
            'source': 4,
            'icon': 'https://files.nabox.io/icon/Fantom.png',
            'nulsCross': false,
            'heterogeneousList': [
                {
                    'heterogeneousChainId': 112,
                    'heterogeneousChainMultySignAddress': '0x3758aa66cad9f2606f1f501c9cb31b94b713a6d5',
                    'contractAddress': '',
                    'chainName': 'Fantom',
                    'token': false
                }
            ],
            'nerveChainId': 9,
            'nerveAssetId': 269,
            'nerveFlag': false,
            'usdPrice': 1.2333,
            'usdPlatform': 'cmc',
            'usdUrl': null
        },
        'assets': [],
        'urlList': []
    },
    {
        'id': 19,
        'chain': 'CSC',
        'chainName': 'CSC',
        'prefix': '0x',
        'nativeId': 52,
        'chainId': 0,
        'chainType': 2,
        'crossAddress': '',
        'intro': null,
        'icon': 'https://files.nabox.io/icon/CoinEx.jpeg',
        'apiUrl': 'https://rpc.coinex.net/',
        'scanUrl': 'https://www.coinex.net/',
        'psUrl': '',
        'tokenUrl': 'https://www.coinex.net/token/',
        'txUrl': 'https://www.coinex.net/tx/',
        'nft': '',
        'sort': 12,
        'status': 1,
        'bridge': 0,
        'swap': 0,
        'configs': {
            'multiCallAddress': '0xC1f4F265EC8A46ad19740E7d3c6960db4c595dE5',
            'crossAddress': ''
        },
        'mainAsset': {
            'id': 1364380,
            'chain': 'CSC',
            'registerChain': 'CSC',
            'chainId': 0,
            'assetId': 1,
            'contractAddress': '',
            'decimals': 18,
            'assetName': 'CET',
            'symbol': 'CET',
            'symbolBase': 'CET',
            'configType': 1,
            'source': 0,
            'icon': 'https://files.nabox.io/icon/CoinEx.jpeg',
            'nulsCross': false,
            'heterogeneousList': null,
            'nerveChainId': 0,
            'nerveAssetId': 0,
            'nerveFlag': false,
            'usdPrice': 1.0,
            'usdPlatform': null,
            'usdUrl': null
        },
        'assets': [],
        'urlList': []
    },
    {
        'id': 1,
        'chain': 'NULS',
        'chainName': 'NULS',
        'prefix': 'NULS',
        'nativeId': -1,
        'chainId': 1,
        'chainType': 1,
        'crossAddress': null,
        'intro': '',
        'icon': 'https://files.nabox.io/icon/NULS.png',
        'apiUrl': 'https://api.nuls.io/jsonrpc',
        'scanUrl': 'https://nulscan.io/',
        'psUrl': 'https://public1.nuls.io/',
        'tokenUrl': 'https://nulscan.io/token/info?contractAddress=',
        'txUrl': 'https://nulscan.io/transaction/info?hash=',
        'nft': '',
        'sort': 98,
        'status': 1,
        'bridge': 1,
        'swap': 0,
        'configs': {
            'feeAddress': 'NULSd6HgceXmdyqnK5WzHdJKjXxtZVR3w3rJp',
            'destroyAddress': 'NULSd6HgWSU1iR6BfNoQi85mAMT52JMFzpnok',
            'nft': ''
        },
        'mainAsset': {
            'id': 18505,
            'chain': 'NULS',
            'registerChain': 'NULS',
            'chainId': 1,
            'assetId': 1,
            'contractAddress': '',
            'decimals': 8,
            'assetName': 'NULS',
            'symbol': 'NULS',
            'symbolBase': 'NULS',
            'configType': 1,
            'source': 7,
            'icon': 'https://files.nabox.io/icon/2021_NULS_ICON_Tra-01.png',
            'nulsCross': true,
            'heterogeneousList': [
                {
                    'heterogeneousChainId': 101,
                    'heterogeneousChainMultySignAddress': '0xc707e0854da2d72c90a7453f8dc224dd937d7e82',
                    'contractAddress': '0xa2791bdf2d5055cda4d46ec17f9f429568275047',
                    'chainName': 'Ethereum',
                    'token': true
                },
                {
                    'heterogeneousChainId': 102,
                    'heterogeneousChainMultySignAddress': '0x75ab1d50bedbd32b6113941fcf5359787a4bbef4',
                    'contractAddress': '0x8cd6e29d3686d24d3c2018cee54621ea0f89313b',
                    'chainName': 'BSC',
                    'token': true
                },
                {
                    'heterogeneousChainId': 103,
                    'heterogeneousChainMultySignAddress': '0x2ead2e7a3bd88c6a90b3d464bc6938ba56f1407f',
                    'contractAddress': '0xd938e45680da19ad36646ae8d4c671b2b1270f39',
                    'chainName': 'Heco',
                    'token': true
                },
                {
                    'heterogeneousChainId': 104,
                    'heterogeneousChainMultySignAddress': '0xe096d12d6cb61e11bce3755f938b9259b386523a',
                    'contractAddress': '0x8cd6e29d3686d24d3c2018cee54621ea0f89313b',
                    'chainName': 'OKExChain',
                    'token': true
                },
                {
                    'heterogeneousChainId': 105,
                    'heterogeneousChainMultySignAddress': '0x32fae32961474e6d19b7a6346524b8a6a6fd1d9c',
                    'contractAddress': '0x8b8e48a8cc52389cd16a162e5d8bd514fabf4ba0',
                    'chainName': 'Harmony',
                    'token': true
                },
                {
                    'heterogeneousChainId': 106,
                    'heterogeneousChainMultySignAddress': '0x9ddc2fb726cf243305349587ae2a33dd7c91460e',
                    'contractAddress': '0x8b8e48a8cc52389cd16a162e5d8bd514fabf4ba0',
                    'chainName': 'Polygon',
                    'token': true
                },
                {
                    'heterogeneousChainId': 107,
                    'heterogeneousChainMultySignAddress': '0xdb442dff8ff9fd10245406da9a32528c30c10c92',
                    'contractAddress': '0x8b8e48a8cc52389cd16a162e5d8bd514fabf4ba0',
                    'chainName': 'KCC',
                    'token': true
                }
            ],
            'nerveChainId': 1,
            'nerveAssetId': 1,
            'nerveFlag': true,
            'usdPrice': 0.3932,
            'usdPlatform': 'cmc',
            'usdUrl': null
        },
        'assets': [],
        'urlList': [
            {
                'id': 10,
                'chain': 'NULS',
                'nativeId': -1,
                'name': 'NULS-1',
                'apiUrl': 'https://api.nuls.io/jsonrpc'
            },
            {
                'id': 11,
                'chain': 'NULS',
                'nativeId': -1,
                'name': 'NULS-2',
                'apiUrl': 'https://sg.api.nuls.io/jsonrpc'
            },
            {
                'id': 12,
                'chain': 'NULS',
                'nativeId': -1,
                'name': 'NULS-3',
                'apiUrl': 'https://hk.api.nuls.io/jsonrpc'
            },
            {
                'id': 13,
                'chain': 'NULS',
                'nativeId': -1,
                'name': 'NULS-4',
                'apiUrl': 'https://au.api.nuls.io/jsonrpc'
            },
            {
                'id': 14,
                'chain': 'NULS',
                'nativeId': -1,
                'name': 'NULS-5',
                'apiUrl': 'https://us.api.nuls.io/jsonrpc '
            },
            {
                'id': 15,
                'chain': 'NULS',
                'nativeId': -1,
                'name': 'NULS-6',
                'apiUrl': 'https://id.api.nuls.io/jsonrpc'
            },
            {
                'id': 16,
                'chain': 'NULS',
                'nativeId': -1,
                'name': 'NULS-7',
                'apiUrl': 'http://in.api.nuls.io/jsonrpc'
            }
        ]
    },
    {
        'id': 2,
        'chain': 'NERVE',
        'chainName': 'NERVE',
        'prefix': 'NERVE',
        'nativeId': -2,
        'chainId': 9,
        'chainType': 1,
        'crossAddress': null,
        'intro': null,
        'icon': 'https://files.nabox.io/icon/NERVE.png',
        'apiUrl': 'https://api.nerve.network/jsonrpc',
        'scanUrl': 'https://scan.nerve.network/',
        'psUrl': 'https://public.nerve.network/jsonrpc',
        'tokenUrl': '',
        'txUrl': 'https://scan.nerve.network/transaction/info?hash=',
        'nft': '',
        'sort': 99,
        'status': 1,
        'bridge': 1,
        'swap': 1,
        'configs': {
            'feeAddress': 'NERVEepb69f573sRzfoTX9Kn67WeNtXhG6Y6W8',
            'destroyAddress': 'NERVEepb63T1M8JgQ26jwZpZXYL8ZMLdUAK31L',
            'nft': ''
        },
        'mainAsset': {
            'id': 18683,
            'chain': 'NERVE',
            'registerChain': 'NERVE',
            'chainId': 9,
            'assetId': 1,
            'contractAddress': '',
            'decimals': 8,
            'assetName': 'NVT',
            'symbol': 'NVT',
            'symbolBase': 'NVT',
            'configType': 1,
            'source': 7,
            'icon': 'https://files.nabox.io/icon/Logo-white.png',
            'nulsCross': true,
            'heterogeneousList': [
                {
                    'heterogeneousChainId': 101,
                    'heterogeneousChainMultySignAddress': '0xc707e0854da2d72c90a7453f8dc224dd937d7e82',
                    'contractAddress': '0x7b6f71c8b123b38aa8099e0098bec7fbc35b8a13',
                    'chainName': 'Ethereum',
                    'token': true
                },
                {
                    'heterogeneousChainId': 102,
                    'heterogeneousChainMultySignAddress': '0x75ab1d50bedbd32b6113941fcf5359787a4bbef4',
                    'contractAddress': '0xf0e406c49c63abf358030a299c0e00118c4c6ba5',
                    'chainName': 'BSC',
                    'token': true
                },
                {
                    'heterogeneousChainId': 103,
                    'heterogeneousChainMultySignAddress': '0x2ead2e7a3bd88c6a90b3d464bc6938ba56f1407f',
                    'contractAddress': '0xf0e406c49c63abf358030a299c0e00118c4c6ba5',
                    'chainName': 'Heco',
                    'token': true
                },
                {
                    'heterogeneousChainId': 104,
                    'heterogeneousChainMultySignAddress': '0xe096d12d6cb61e11bce3755f938b9259b386523a',
                    'contractAddress': '0xd1351ec15e8511658c2ba1e1e81e1e60aa39c9cd',
                    'chainName': 'OKExChain',
                    'token': true
                },
                {
                    'heterogeneousChainId': 105,
                    'heterogeneousChainMultySignAddress': '0x32fae32961474e6d19b7a6346524b8a6a6fd1d9c',
                    'contractAddress': '0x0fdb676775cc91042501c0c14ae5b2b5166b24d9',
                    'chainName': 'Harmony',
                    'token': true
                },
                {
                    'heterogeneousChainId': 106,
                    'heterogeneousChainMultySignAddress': '0x9ddc2fb726cf243305349587ae2a33dd7c91460e',
                    'contractAddress': '0x0fdb676775cc91042501c0c14ae5b2b5166b24d9',
                    'chainName': 'Polygon',
                    'token': true
                },
                {
                    'heterogeneousChainId': 107,
                    'heterogeneousChainMultySignAddress': '0xdb442dff8ff9fd10245406da9a32528c30c10c92',
                    'contractAddress': '0x0fdb676775cc91042501c0c14ae5b2b5166b24d9',
                    'chainName': 'KCC',
                    'token': true
                },
                {
                    'heterogeneousChainId': 109,
                    'heterogeneousChainMultySignAddress': '0x3758aa66cad9f2606f1f501c9cb31b94b713a6d5',
                    'contractAddress': '0x0fdb676775cc91042501c0c14ae5b2b5166b24d9',
                    'chainName': 'Cronos',
                    'token': true
                },
                {
                    'heterogeneousChainId': 110,
                    'heterogeneousChainMultySignAddress': '0x3758aa66cad9f2606f1f501c9cb31b94b713a6d5',
                    'contractAddress': '0x0fdb676775cc91042501c0c14ae5b2b5166b24d9',
                    'chainName': 'Avalanche',
                    'token': true
                }
            ],
            'nerveChainId': 9,
            'nerveAssetId': 1,
            'nerveFlag': false,
            'usdPrice': 0.0213,
            'usdPlatform': 'cmc',
            'usdUrl': null
        },
        'assets': [],
        'urlList': [
            {
                'id': 17,
                'chain': 'NERVE',
                'nativeId': -2,
                'name': 'NVT-1',
                'apiUrl': 'https://api.nerve.network/jsonrpc'
            },
            {
                'id': 18,
                'chain': 'NERVE',
                'nativeId': -2,
                'name': 'NVT-2',
                'apiUrl': 'https://sg.api.nerve.network/jsonrpc'
            },
            {
                'id': 19,
                'chain': 'NERVE',
                'nativeId': -2,
                'name': 'NVT-3',
                'apiUrl': 'https://hk.api.nerve.network/jsonrpc'
            },
            {
                'id': 20,
                'chain': 'NERVE',
                'nativeId': -2,
                'name': 'NVT-4',
                'apiUrl': 'https://us.api.nerve.network/jsonrpc'
            },
            {
                'id': 21,
                'chain': 'NERVE',
                'nativeId': -2,
                'name': 'NVT-5',
                'apiUrl': 'https://au.api.nerve.network/jsonrpc'
            },
            {
                'id': 22,
                'chain': 'NERVE',
                'nativeId': -2,
                'name': 'NVT-6',
                'apiUrl': 'https://id.api.nerve.network/jsonrpc'
            },
            {
                'id': 23,
                'chain': 'NERVE',
                'nativeId': -2,
                'name': 'NVT-7',
                'apiUrl': 'http://in.api.nerve.network/jsonrpc'
            }
        ]
    }
];
