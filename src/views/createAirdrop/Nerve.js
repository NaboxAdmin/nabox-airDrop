import {post} from "@/api/https";
import {ETransfer} from "@/api/api";
import {MAIN_INFO} from "@/config";
import {Plus, Times, timesDecimals} from "../../api/util";

export default class Nerve {
    // 发送nerve通道异构链稳定币兑换交易
    async sendNerveBridgeTransaction(params) {
        console.log('==sendNerveBridgeTransaction==');
        const transfer = new ETransfer();
        return await transfer.crossInII(params);
    }
    // 发送nerve通道nerve => 异构链稳定币兑换交易
    async sendNerveCommonTransaction(params) {
        const {
            currentChannel,
            currentAccount,
            swapNerveAddress,
            swapNulsAddress,
            fromAsset,
            toNetwork,
            chainId,
            assetId,
            signAddress,
            amountIn,
            fee,
            orderId,
            fromNetwork,
            NULSContractGas,
            NULSContractTxData,
            nativeId
        } = params;
        const originCrossChainFee = currentChannel.originCrossChainFee || 0;
        let type = 2;
        let txData = {};
        let transferInfo = {
            from: currentAccount && currentAccount['address'][fromNetwork] || currentAccount && currentAccount['address'][nativeId] || '',
            to: swapNerveAddress,
            amount: amountIn,
            fee: timesDecimals(fee, MAIN_INFO['decimal']),
            assetsChainId: chainId,
            assetsId: assetId
        };
        if (fromNetwork === 'NULS') {
            if (fromAsset.contractAddress) {
                type = 16;
                const price = 25;
                transferInfo = {
                    from: currentAccount && currentAccount['address'][fromNetwork] || '',
                    assetsChainId: NULS_INFO.chainId,
                    assetsId: NULS_INFO.assetId,
                    amount: Plus(10000000, Times(NULSContractGas, price)).toFixed(), // 计算input output函数里面再加上0.001
                    toContractValue: 10000000,
                    to: fromAsset.contractAddress,
                    nulsValueToOthers: [{ // 往nuls中转地址转的nuls数量
                        value: timesDecimals(originCrossChainFee, 8),
                        address: swapNulsAddress
                    }]
                };
                console.log(originCrossChainFee.toString(), '1231231');
                if (originCrossChainFee == 0) {
                    delete transferInfo['nulsValueToOthers'];
                }
                txData = NULSContractTxData;
            } else {
                // 只做普通转账交易、将手续费和转账资产转到nuls中转地址
                transferInfo.to = swapNulsAddress;
                transferInfo.fee = timesDecimals(0.001, 8);
            }
        }
        const transfer = new NTransfer({
            chain: fromNetwork,
            type
        });
        let inputsOutputs = await transfer.inputsOrOutputs(transferInfo);
        if (fromNetwork === 'NERVE') {
            const data = {
                inputOutputs: inputsOutputs,
                from: currentAccount && currentAccount['address']['NERVE'] || '',
                to: swapNerveAddress,
                originCrossChainFee,
                fromAsset,
                currentAccount,
                toNetwork
            };
            inputsOutputs = await this.handleNerveCross(data);
        }
        if (fromNetwork === 'NULS' && !fromAsset.contractAddress) {
            const data = {
                inputOutputs: inputsOutputs,
                from: currentAccount && currentAccount['address']['NULS'] || '',
                to: swapNulsAddress,
                originCrossChainFee,
                fromAsset,
                currentAccount,
                toNetwork
            };
            console.log(data, '213123data');
            inputsOutputs = await this.handleNulsCross(data);
        }
        const txHex = await transfer.getTxHex({
            inputs: inputsOutputs.inputs,
            outputs: inputsOutputs.outputs,
            txData,
            pub: currentAccount.pub,
            signAddress,
            remarks: orderId || ''
        });
        return await this.broadcastHex(txHex, fromNetwork);
    }
    // 将手续费转到nerve中转地址
    async handleNerveCross(data) {
        const { inputOutputs, from, to, originCrossChainFee, fromAsset, toNetwork, currentAccount } = data;
        const { inputs, outputs } = inputOutputs;
        const { nerveChainId: assetsChainId, nerveAssetId: assetsId } = fromAsset;
        const { chainId: NerveChainId, assetId: NerveAssetId } = MAIN_INFO;
        const { chainId: NulsChainId, assetId: NulsAssetId } = NULS_INFO;
        const NVTNonce = await this.getNonce({ chain: 'NERVE', chainId: NerveChainId, assetId: NerveAssetId, currentAccount });
        if (toNetwork === 'NULS') {
            const feeAmount = timesDecimals(crossFee, 8);
            const NULSNonce = await this.getNonce({ chain: 'NERVE', chainId: NulsChainId, assetId: NulsAssetId, currentAccount });
            if (assetsChainId === NerveChainId && assetsId === NerveAssetId) {
                const newNvtAmount = Plus(inputs[0].amount, feeAmount).toFixed();
                inputs[0].amount = newNvtAmount;
                outputs[0].amount = newNvtAmount;
                inputs.push({
                    address: from,
                    assetsChainId: NulsChainId,
                    assetsId: NulsAssetId,
                    amount: feeAmount,
                    locked: 0,
                    nonce: NULSNonce
                });
                outputs.push({
                    address: to,
                    assetsChainId: NulsChainId,
                    assetsId: NulsAssetId,
                    amount: feeAmount,
                    lockTime: 0
                });
            } else if (assetsChainId === NulsChainId && assetsId === NulsAssetId) {
                const newNulsAmount = Plus(inputs[0].amount, feeAmount).toFixed();
                inputs[0].amount = newNulsAmount;
                outputs[0].amount = newNulsAmount;
                inputs.push({
                    address: from,
                    assetsChainId: NerveChainId,
                    assetsId: NerveAssetId,
                    amount: feeAmount,
                    locked: 0,
                    nonce: NVTNonce
                });
                outputs.push({
                    address: to,
                    assetsChainId: NerveChainId,
                    assetsId: NerveAssetId,
                    amount: feeAmount,
                    lockTime: 0
                });
            } else {
                inputs.push({
                    address: from,
                    assetsChainId: NerveChainId,
                    assetsId: NerveAssetId,
                    amount: feeAmount,
                    locked: 0,
                    nonce: NVTNonce
                }, {
                    address: from,
                    assetsChainId: NulsChainId,
                    assetsId: NulsAssetId,
                    amount: feeAmount,
                    locked: 0,
                    nonce: NULSNonce
                });
                outputs.push({
                    address: to,
                    assetsChainId: NerveChainId,
                    assetsId: NerveAssetId,
                    amount: feeAmount,
                    lockTime: 0
                }, {
                    address: to,
                    assetsChainId: NulsChainId,
                    assetsId: NulsAssetId,
                    amount: feeAmount,
                    lockTime: 0
                });
            }
        } else {
            console.log(inputs, outputs, 'inputs, outputs');
            console.log(originCrossChainFee.toString(), inputs, outputs, 'crossOutFeecrossOutFeecrossOutFee');
            const feeAmount = timesDecimals(originCrossChainFee, 8);
            if (assetsChainId === NerveChainId && assetsId === NerveAssetId) {
                const newNvtAmount = Plus(inputs[0].amount, feeAmount).toFixed();
                inputs[0].amount = newNvtAmount;
                outputs[0].amount = newNvtAmount;
            } else {
                inputs.push({
                    address: from,
                    assetsChainId: NerveChainId,
                    assetsId: NerveAssetId,
                    amount: feeAmount,
                    locked: 0,
                    nonce: NVTNonce
                });
                outputs.push({
                    address: to,
                    assetsChainId: NerveChainId,
                    assetsId: NerveAssetId,
                    amount: feeAmount,
                    lockTime: 0
                });
            }
        }
        console.log(inputs, outputs);
        return { inputs, outputs };
    }
    // 特殊处理nuls跨链, 合约资产前面已经处理了， 转到nerve中转地址
    async handleNulsCross(data) {
        const { to, originCrossChainFee, fromAsset } = data;
        const { inputs, outputs } = data.inputOutputs;
        const { nerveChainId: assetsChainId, nerveAssetId: assetsId } = fromAsset;
        const { chainId: NulsChainId, assetId: NulsAssetId } = NULS_INFO;
        const fee = Plus(crossFee, originCrossChainFee || 0).toFixed();
        const feeAmount = timesDecimals(fee, 8);
        if (assetsChainId === NulsChainId && assetsId === NulsAssetId) {
            const amount = inputs[0].amount;
            const txSizeFee = timesDecimals(0.001, 8);
            inputs[0].amount = Plus(amount, feeAmount).toFixed();
            outputs[0].amount = Minus(inputs[0].amount, txSizeFee).toFixed();
        } else {
            inputs.forEach(input => {
                if (input.assetsChainId === NulsChainId && input.assetsId === NulsAssetId) {
                    const amount = input.amount;
                    input.amount = Plus(amount, feeAmount).toFixed();
                }
            });
            outputs.push({
                address: to,
                assetsChainId: NulsChainId,
                assetsId: NulsAssetId,
                amount: feeAmount,
                lockTime: 0
            });
        }
        return { inputs, outputs };
    }
    // 获取nonce值
    async getNonce(assetInfo) {
        const { chainId, assetId, contractAddress, chain, currentAccount } = assetInfo;
        const tempParams = [{
            chainId,
            assetId,
            contractAddress
        }];
        const params = [chain === 'NULS' ? NULS_INFO.chainId : MAIN_INFO.chainId, currentAccount['address'][chain], tempParams];
        const url = chain === 'NULS' ? NULS_INFO.batchRPC : MAIN_INFO.batchRPC;
        const res = await post(url, 'getBalanceList', params);
        if (res.result && res.result.length !== 0) {
            const tempAssetInfo = res.result[0];
            return tempAssetInfo.nonce;
        } else {
            return null;
        }
    }
    // 广播nerve交易
    async broadcastHex(txHex, chain) {
        const config = JSON.parse(sessionStorage.getItem('config'));
        const url = config[chain].apiUrl;
        const chainId = config[chain].chainId;
        console.log(txHex, '---NERVE swap txHex---');
        const res = await post(url, 'broadcastTx', [chainId, txHex]);
        if (res.result && res.result.hash) {
            return { hash: res.result.hash, success: true };
        }
        return { hash: null, msg: `${res.error.code}:${res.error.data}` || res.error.data };
    }
}
