// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <=0.8.4;

//import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract SimpleStorage  {
  //using SafeMath for uint;


  mapping(address => address)  highest_Bidder; // sell_item -> bidder address
  mapping(address => uint256)  bid_Transaction; // sell_item --> bid price
  address payable  bidder;
  uint256 public contract_amount ;
  uint256 public dummy =44;



  function placeBid(address seller,uint256 bid) public
  {     
        //bid=bid*10**18;
        //require(bid<=contract_amount,"insufficient balance");
        //require(bid>bid_Transaction[seller],"Bid should be higher than current one");
        bid_Transaction[seller]=bid;
        highest_Bidder[seller]=bidder;
        dummy=333;
        
  } 
  function setdummy() public view returns(uint256)
  {
     return dummy;
  }
  function getHighestBid(address seller) public view returns(uint256)
  {
      
      return bid_Transaction[seller];
  }

  /*function sendEth(address payable rcv_addr) public  payable
  {
    address payable aa=rcv_addr;
    uint256 xs=msg.value;
    aa.transfer(xs);
  
  }*/

    function completeAuction(address payable rcv) public  payable
  {
      uint256 xs=msg.value;
      rcv.transfer(xs);
      /*contract_amount=contract_amount-bid_Transaction[seller];*/
  }




}
