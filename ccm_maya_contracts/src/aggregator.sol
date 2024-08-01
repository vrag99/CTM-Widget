// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// 0x97e5889979f62669B3923b106151AF71A8cd900d
// final address of the contract on MAINNET Arbitrum 

import "./IERC20.sol";
import "./IMAYACHAIN_ROUTER.sol";

contract TokenSwapperAggregator {
    receive() external payable {}

    iMAYAChain_Router public routercontract;
    address constant CFVAULT = 0x2bb150e6d4366A1BDBC4275D1F35892CD63F27e3;

    event CCMReceive(
        uint32 srcChain,
        bytes srcAddress,
        bytes message,
        address token,
        uint256 amount
    );

    constructor(address _routeraddress) {
        routercontract = iMAYAChain_Router(_routeraddress);
        // this is the maya router contract address
        // 0x700E97ef07219440487840Dc472E7120A7FF11F4 for arbitrum
        // 0xe3985E6b61b814F7Cdb188766562ba71b446B46d for Ethereum
    }

    function performSwap(address payable vault, address asset , string memory memo,uint expiration, uint amount) public payable {
        
        // This is the Maya contract call for which the contract needs to be white listed
        routercontract.depositWithExpiry(
            vault,
            asset,
            amount,
            memo,
            expiration
        );
    }

    function cfReceive(
        uint32 srcChain,
        bytes calldata srcAddress,
        bytes calldata message,
        address token,
        uint256 amount
    ) external payable {
        require(msg.sender == CFVAULT, "only cfvault");

        (
            address payable _vault,
            address _arb_eth,
            uint _amount,
            string memory _memo,
            uint _expiry
        ) = abi.decode(message, (address, address, uint, string, uint));


        IERC20(token).transfer(address(uint160(bytes20(srcAddress))), amount);
        //This performs the swap x --> ARB.ETH
        // } else if (token == address(0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE)) {
        //     (bool success, ) = address(uint160(bytes20(srcAddress))).call{value: amount}("");
        //     require(success, "Transfer failed");
        // }

        emit CCMReceive(srcChain, srcAddress, message, token, amount);

        performSwap(_vault, _arb_eth, _memo, _expiry, _amount);
        // This will perform the swap from ARB.ETH--> y

        
    }
}
