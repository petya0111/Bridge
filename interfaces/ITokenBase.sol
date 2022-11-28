// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

interface ITokenBase {
    function updateOwner(address newAdmin) external;

    function mint(address to, uint256 amount) external;

    function burn(address owner, uint256 amount) external;
}
