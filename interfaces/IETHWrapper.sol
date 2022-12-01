// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "../contracts/ERC20Token.sol";

interface IETHWrapper {
    function initiateToken(string memory _name, string memory _symbol)
        external
        returns (ERC20Token wrappedToken);

    function approve(
        address tokenAddress,
        address spender,
        uint256 amount
    ) external;

    function registerToken(
        address sourceTokenAddress,
        address currentTokenAddress
    ) external;
}
