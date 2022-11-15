// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ETHWrapper {
    WETH public WETHToken;

    event LogETHWrapped(address sender, uint256 amount);
    event LogETHUnwrapped(address sender, uint256 amount);

    constructor() {
        WETHToken = new WETH();
    }

    function wrap() public payable {
        require(msg.value > 0, "We need to wrap at least 1 WETH");
        WETHToken.mint(msg.sender, msg.value);
        emit LogETHWrapped(msg.sender, msg.value);
    }

    function unwrap(uint value) public {
        require(value > 0, "We need to unwrap at least 1 WETH");
        WETHToken.transferFrom(msg.sender, address(this), value);
        WETHToken.burn(value);
        msg.sender.transfer(value);
        emit LogETHUnwrapped(msg.sender, value);
    }
}
