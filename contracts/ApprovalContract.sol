// SPDX-License-Identifier: MIT
pragma solidity >=0.4.18;

contract ApprovalContract {
    address public sender;
    address payable public receiver;
    address public constant approver = 0xD516AEFa17fbc6aCe949bCDF2275E2c93fE8FA52;

    function deposit(address payable _receiver) external payable {
        require(msg.value > 0, "Must deposit a non-zero amount");
        sender = msg.sender;
        receiver = _receiver;
    }

    function viewApprover() external pure returns(address) {
        return(approver);
    }

    function approve() external {
        require(msg.sender == approver, "Sender not authorized");
        receiver.transfer(address(this).balance);
    }
}