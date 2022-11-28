// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

interface ITokenLedger {
    function getTargetTokenAddress(address _sourceToken, uint16 _targetChainId)
        external
        view
        returns (address);

    function getSourceTokenAddress(address _targetToken, uint16 _sourceChainId)
        external
        view
        returns (address);

    function registerTargetTokenAddress(
        address _sourceToken,
        uint16 _targetChainId,
        address _targetToken
    ) external;
}
