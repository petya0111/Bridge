// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./ETHWrapper.sol";
import "../interfaces/IBridgeBase.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BridgeBase is IBridgeBase, Ownable {
    ETHWrapperContract public ethWrapper;
    uint256 serviceFee = 0.005 ether;
    mapping(address => mapping(address => uint256))
        public setTokensForClaimMapping;

    constructor(address _ethWrapperContract) {
        ethWrapper = ETHWrapperContract(_ethWrapperContract);
    }

    event LogLock(
        address indexed from,
        uint32 indexed targetChainId,
        address tokenAddress,
        uint256 amount
    );
    event LogTokenCreated(address indexed token);
    event LogMint(address indexed receiver, address token, uint256 amount);
    event LogBurn(
        address indexed from,
        uint32 indexed targetChainId,
        address wrappedToken,
        uint256 amount
    );
    event LogRelease(address indexed receiver, address token, uint256 amount);
    event LogTokenClaimRegistered(
        address indexed sourceERCToken,
        address indexed targetWToken,
        uint256 amount,
        address to
    );

    // needs to be executed another approve transaction in order to lock the token
    function lockToken(
        uint32 _targetChainId,
        address payable _token,
        uint256 _amount
    ) external payable override {
        require(_amount > 0, "Bridged amount is required.");
        require(msg.value >= serviceFee, "Not enough service fee");

        ERC20(_token).transferFrom(msg.sender, address(this), _amount);

        emit LogLock(msg.sender, _targetChainId, _token, _amount);
    }

    // needs to be executed another approve transaction in order to mint the token
    function mint(
        address _receiver,
        uint256 _amount,
        address payable _wrappedToken
    ) external override {
        ERC20Token wrappedTokenContract = ethWrapper.getTokenContractAddress(
            _wrappedToken
        );
        require(
            address(wrappedTokenContract) != address(0),
            "Wrapped Token is not existing"
        );
        wrappedTokenContract.mint(_receiver, _amount);

        emit LogMint(_receiver, _wrappedToken, _amount);
    }

    function burn(
        uint32 _targetChainId,
        address _wrappedToken,
        uint256 _amount
    ) external payable override {
        require(_amount > 0, "Burnt amount is required.");
        require(msg.value >= serviceFee, "Not enough service fee");

        ERC20Token wrappedTokenContract = ethWrapper.getTokenContractAddress(
            _wrappedToken
        );
        require(
            address(wrappedTokenContract) != address(0),
            "Wrapped Token is not existing"
        );
        wrappedTokenContract.burnFrom(msg.sender, _amount);

        emit LogBurn(msg.sender, _targetChainId, _wrappedToken, _amount);
    }

    function release(uint256 _amount, address payable _token)
        external
        override
    {
        ERC20Token(_token).transfer(msg.sender, _amount);

        emit LogRelease(msg.sender, _token, _amount);
    }

    function createToken(string calldata _name, string calldata _symbol)
        external
        override
    {
        ERC20Token wToken = ethWrapper.initiateToken(_name, _symbol);
        emit LogTokenCreated(address(wToken));
    }

    function setTokensForClaim(
        address to,
        address sourceToken,
        string calldata sourceTokenName,
        string calldata sourceTokenSymbol,
        uint256 amount
    ) external {
        address tokenAddress = ethWrapper.savedTokens(sourceToken);

        if (tokenAddress == address(0)) {
            ERC20Token wrappedToken = ethWrapper.initiateToken(
                sourceTokenName,
                sourceTokenSymbol
            );
            ethWrapper.registerToken(sourceToken, address(wrappedToken));
            tokenAddress = address(wrappedToken);
        }

        setTokensForClaimMapping[to][tokenAddress] = amount;
        emit LogTokenClaimRegistered(sourceToken, tokenAddress, amount, to);
    }
}
