// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IETHWrapper {
    function initiateToken(string memory _name, string memory _symbol) external;

    function wrap(address tokenAddress) external payable;

    function unwrap(address tokenAddress, uint256 value) external payable;
}
