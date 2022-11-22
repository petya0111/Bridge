// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IETHWrapper {
    function wrap() external payable;

    function unwrap(uint value) external payable;
}