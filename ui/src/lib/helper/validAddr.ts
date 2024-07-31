import { Chains } from "@chainflip/sdk/swap"
import {validate,Network} from "bitcoin-address-validation"
import { ethers } from "ethers"
import { decodeAddress, encodeAddress } from '@polkadot/keyring';
import { hexToU8a, isHex } from '@polkadot/util';

export const ValidateAddress = (address: string, toChain: string, testnet:boolean) : boolean => {
    if(toChain === Chains.Ethereum || toChain === Chains.Arbitrum){
        try {
            ethers.getAddress(address)
            return true
        } catch (e) {
            return false
        }
    }else if(toChain === Chains.Bitcoin){
        if(testnet){
            return validate(address, Network.testnet)
        }else{
            return validate(address, Network.mainnet)
        }
    }else {
        try {
            encodeAddress(
              isHex(address)
                ? hexToU8a(address)
                : decodeAddress(address)
            );
            return true;
          } catch (error) {
            return false;
          }
    }
}