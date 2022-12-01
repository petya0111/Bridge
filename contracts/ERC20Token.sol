// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "../interfaces/ITokenBase.sol";

contract ERC20Token is ITokenBase, ERC20, ERC20Burnable, Ownable {
    event LogERC20Minted(address to, uint256 amount);
    event LogERC20TransferedOwnership(address owner);
    event LogERC20Approved(address spender, uint256 amount);

    constructor(
        string memory _name,
        string memory _symbol,
        address _owner
    ) ERC20(_name, _symbol) {
        transferOwnership(_owner);
        emit LogERC20TransferedOwnership(_owner);
    }

    function mint(address to, uint256 amount) public override onlyOwner {
        _mint(to, amount);
        emit LogERC20Minted(to, amount);
    }
}
