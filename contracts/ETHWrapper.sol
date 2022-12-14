// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;
import "../interfaces/IETHWrapper.sol";
import "./ERC20Token.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ETHWrapperContract is Ownable, IETHWrapper {
    mapping(address => ERC20Token) private wTokenContracts;
    mapping(address => address) public savedTokens;
    address[] public createdWTokens;

    event LogETHApproved(address spender, uint256 amount);
    event LogETHRegistered(
        address sourceTokenAddress,
        address currentTokenAddress
    );
    event LogETHTokenCreated(
        address indexed contractAddr,
        string name,
        string symbol
    );
    event LogWTokenMinted(address to, uint256 amount);

    function initiateToken(string memory _name, string memory _symbol)
        external
        override
        onlyOwner
        returns (ERC20Token wrappedToken)
    {
        ERC20Token ercToken = new ERC20Token(_name, _symbol, msg.sender);
        wTokenContracts[address(ercToken)] = ercToken;
        createdWTokens.push(address(ercToken));
        emit LogETHTokenCreated(address(ercToken), _name, _symbol);
        return ercToken;
    }

    function approve(
        address tokenAddress,
        address spender,
        uint256 amount
    ) public override {
        wTokenContracts[tokenAddress].approve(spender, amount);
        emit LogETHApproved(spender, amount);
    }

    function registerToken(
        address sourceTokenAddress,
        address currentTokenAddress
    ) external override {
        savedTokens[sourceTokenAddress] = currentTokenAddress;
        emit LogETHRegistered(sourceTokenAddress, currentTokenAddress);
    }

    function increaseAllowance(
        address tokenAddress,
        address spender,
        uint256 addedValue
    ) public {
        wTokenContracts[tokenAddress].increaseAllowance(spender, addedValue);
    }

    function balanceOf(address tokenAddress, address owner)
        public
        view
        returns (uint256)
    {
        return wTokenContracts[tokenAddress].balanceOf(owner);
    }

    function getTokenContractAddress(address token)
        public
        view
        returns (ERC20Token)
    {
        return wTokenContracts[token];
    }

    function getAllTokenIds() public view returns (address[] memory) {
        return createdWTokens;
    }

}
