// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/Aggregator.sol";

contract DeployTokenSwapperAggregator is Script {
    function run() external {
        // Define the router address (update with the correct address if needed)
        address routerAddress = 0x700E97ef07219440487840Dc472E7120A7FF11F4;

        vm.startBroadcast();

        TokenSwapperAggregator tokenSwapperAggregator = new TokenSwapperAggregator(
                routerAddress
            );

        vm.stopBroadcast();

        // Log the contract address
        console.log(
            "TokenSwapperAggregator deployed at:",
            address(tokenSwapperAggregator)
        );
    }
}
