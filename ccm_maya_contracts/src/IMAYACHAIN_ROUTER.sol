// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Interface for MAYAChain_Router
interface iMAYAChain_Router {
    // Deposit with Expiry (preferred)
    function depositWithExpiry(
        address payable vault,
        address asset,
        uint amount,
        string calldata memo,
        uint expiration
    ) external payable;
}
