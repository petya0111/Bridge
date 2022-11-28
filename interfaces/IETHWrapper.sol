// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

interface IETHWrapper {
    function initiateToken(string memory _name, string memory _symbol) external;

    function approve(
        address tokenAddress,
        address spender,
        uint256 amount
    ) external;
}
