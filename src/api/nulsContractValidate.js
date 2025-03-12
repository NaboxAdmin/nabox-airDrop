import {post, request} from "./https";
import { Times, timesDecimals, Plus, Division } from "./util";
import sdk from "nerve-sdk-js/lib/api/sdk";
import utils from "nuls-sdk-js/lib/utils/utils";

/**
 * from
 * to
 * price
 * contractAddress
 * methodName
 * amount  转账数量
 * decimals 转账资产精度
 */
export async function getContractCallData(from, to, price, contractAddress, methodName, amount, decimals) {
  //console.log(from, to, price, contractAddress, methodName, amount, decimals);
  const gasLimit = sdk.CONTRACT_MAX_GASLIMIT;
  const methodDesc = "";
  let newValue = 0;
  let args = [];
  let newContractAddress = contractAddress;
  if (methodName === "transfer") {
    /// nuls 合约资产  普通token转账、向合约地址转token
    args = [to, timesDecimals(amount, decimals)]
  } else if (methodName === "_payable") {
    //合约 payable 向合约地址转nuls
    newValue = Number(Times(amount, 100000000));
    newContractAddress = to;
  } else if (methodName === "transferCrossChain") {
    // token跨链转账
    args = [to, timesDecimals(amount, decimals)];
    newValue = Number(timesDecimals(0.1, 8));
  }
  return await validateContractCall(from, newValue, gasLimit, price, newContractAddress, methodName, methodDesc, args)
}

/**
 * 验证调用合约交易
 * @param sender
 * @param value
 * @param gasLimit
 * @param price
 * @param contractAddress
 * @param methodName
 * @param methodDesc
 * @param args
 */
async function validateContractCall(sender, value, gasLimit, price, contractAddress, methodName, methodDesc, args) {
  try {
      return await imputedContractCallGas(sender, value, contractAddress, methodName, methodDesc, args, price)
  } catch (e) {
    return {success: false, msg: e};
  }
}

/**
 * 预估调用合约交易的gas
 * @param sender
 * @param value
 * @param contractAddress
 * @param methodName
 * @param methodDesc
 * @param args
 * @param price
 */
async function imputedContractCallGas(sender, value, contractAddress, methodName, methodDesc, args, price) {
  try {
    const config = JSON.parse(sessionStorage.getItem("config"));
    const MAIN_INFO = config.NULS;
    const apiUrl = MAIN_INFO.apiUrl;
    const res = await _imputedContractCallGas(MAIN_INFO.chainId, sender, value, contractAddress, methodName, methodDesc, args, '', apiUrl);
    if (res.success) {
      const newArgs = utils.twoDimensionalArray(args, res.data.argsType);
      const data = {
        fee: Number(Plus(Division(Times(res.data.gasLimit, price), 10000000), 0.001)),
        gas: res.data.gasLimit,
        contractCallData: {
          chainId: MAIN_INFO.chainId,
          sender: sender,
          contractAddress: contractAddress,
          value: value,
          gasLimit: res.data.gasLimit,
          price: price,
          methodName: methodName,
          methodDesc: methodDesc,
          args: newArgs
        }
      };
      //console.log(data);
      return {success: true, data}
    } else {
      return {success: false, msg: res.msg};
    }
  } catch (e) {
    return {success: false, msg: e};
  }
}

function extractMessageAfterKeyword(input) {
  const keyword = "contract error - ";
  const index = input.indexOf(keyword);

  if (index !== -1) {
    return input.substring(index + keyword.length).trim(); // 截取并去掉前后空格
  }
  return input; // 如果没有找到关键词，返回原数据
}

async function _imputedContractCallGas(chainId, sender, value, contractAddress, methodName, methodDesc, args, multyAssetArray, apiUrl) {
  let parms = [chainId, sender, value, contractAddress, methodName, methodDesc, args];
  if (multyAssetArray) {
    parms.push(multyAssetArray);
  }
  return await post(apiUrl, 'imputedContractCallGas', parms)
      .then((response) => {
        if (response.result) {
          if (response.result.errorMsg) {
            response.result.msg = extractMessageAfterKeyword(response.result.errorMsg);
            response.result.success = false;
            response.result.code = 'err_0014';
            return {success: false, data: response.result};
          }
          return {success: true, data: response.result};
        } else {
          const error = response.error;
          if (error && error.message) {
            response.error.msg = extractMessageAfterKeyword(error.message);
          }
          return {success: false, data: response.error};
        }
      })
      .catch((error) => {
        return {success: false, data: error};
      });
}

// 获取合约指定函数的参数类型
async function getContractMethodArgsTypes(contractAddress, methodName) {
  const params = {chain: "NULS", contractAddress, methodName, methodDesc: ""};
  const res = await request({url: "/contract/method/args/type", data: params});
  //console.log(res);
  if (res.code === 1000) {
    return {success: true, data: res.data};
  } else {
    return {success: false, data: res.data};
  }
}
