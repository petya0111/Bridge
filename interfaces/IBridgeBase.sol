// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IBridgeBase {
    function lock(
        address to,
        uint amount,
        uint nonce,
        bytes calldata signature
    ) external;

    function burn(
        address to,
        uint amount,
        uint nonce,
        bytes calldata signature
    ) external;

    function claim(
        address token,
        address from,
        address to
    ) external;

    function mint(
        address from,
        address to,
        uint amount,
        uint nonce,
        bytes calldata signature
    ) external;
}
