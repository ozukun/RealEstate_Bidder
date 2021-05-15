// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract SimpleStorage {
  uint storedData;

  function set(uint x) public {
    storedData = x;
  }

  function get() public view returns (uint) {
    return storedData;
  }

  function sendEth(address payable rcv_addr) public  payable
  {
    address payable aa=rcv_addr;
    uint256 xs=msg.value;
    aa.transfer(xs);
  }
}
