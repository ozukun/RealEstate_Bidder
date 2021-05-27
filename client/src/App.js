import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
import ReactHouse1 from './svg/h1.svg';
import ReactHouse2 from './svg/h2.svg';
import ReactHouse3 from './svg/h3.svg';
import "./App.css";

class App extends Component {
  

  constructor(props) {
    super(props);


    this.state = { 
      storageValue: 0, 
      web3: null, 
      accounts: null, 
      contract: null,
      Hlist: [
        ["0x9A00348361887FF759c277451150fCc02737A671",10,"false"],
        ["0xcB41eFBfcC89068EeDa8fBDafE4B914204C9b506",5,"false"],
        ["0x3bD574fF3D4a4FDde865804968B48a8863EDC1C5",20,"false"]
       ] 
    };

    this.handleChange = this.handleChange.bind(this);
   
  }


  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      
  

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      //this.setState({ web3, accounts, contract: instance }, this.runExample);
      this.setState({ web3, accounts, contract: instance });
      
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    //await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    //const response = await contract.methods.get().call();
    
    const eth_amount=document.getElementById("input_eth").value;
    const rcv_address=document.getElementById("input_rcv").value;

    const load_up=
    {  
      //to: '0x9A00348361887FF759c277451150fCc02737A671',
      from: accounts[0],
      //gas: 50000, gasPrice: 1e6 ,
      value : eth_amount   
    };
    
    console.log(accounts[0]);
    //await contract.methods.sendEth(rcv_address).send(load_up);
    
    var i;
    for (i = 0; i < this.state.Hlist.length; i++) 
    {
      if (rcv_address===this.state.Hlist[i][0])
      {
         console.log(this.state.Hlist[i][0]);
         console.log(this.state.Hlist[i][1]);
         console.log("%%%%");
         console.log(eth_amount);
         if(parseInt(eth_amount, 10)>= parseInt(this.state.Hlist[i][1],10)  )
         {
          await contract.methods.placeBid(this.state.Hlist[i][0],eth_amount).send({ from: accounts[0] });
          console.log("Bid Completed !!")
          //await contract.methods.setdummy().send({ from: accounts[0] });
          //let x=await contract.methods.dummy.call().call();
          //console.log(x);
          let Highest_Bid= await contract.methods.getHighestBid(this.state.Hlist[i][0]).call();
          let array_tmp=this.state.Hlist.slice();
          array_tmp[i][1]=Highest_Bid.toString();
          array_tmp[i][2]="true";
          this.setState({ Hlist: array_tmp });

         }
      } 
    } 
    
    
    ///await contract.methods.placeBid(accounts[0],eth_amount).send({ from: accounts[0] });
    ////console.log("done !!");
     
    
    /*const x = await  contract.methods.getBidder().call();
    console.log(x);
    const x2 =await  contract.methods.getBidPrice().call();
    console.log(x2);*/

    // Update state with the result.
    //this.setState({ storageValue: response });
  };

  handleChange(event) {
    this.setState({storageValue: event.target.value});
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    var i;
    for (i = 0; i < this.state.Hlist.length; i++) 
    {
      if (this.state.Hlist[i][2]==="true" && i===0)
      {
        document.getElementById('mydiv0').className = 'price_change';
      }
      else if(this.state.Hlist[i][2]==="true" && i===1)
      {
        document.getElementById('mydiv1').className = 'price_change';
      }
      else if(this.state.Hlist[i][2]==="true" && i===2)
      {
        document.getElementById('mydiv2').className = 'price_change';
      }
    }



    return (

      <div className="App">
         <div className="Title">REAL ESTATE BIDDING</div>
         <div className="HouseContainer" >
            <div className="House"><img src={ReactHouse1} alt="React Logo" />
            <div class="caption">House1: {"\n"}{this.state.Hlist[0][0]} {"\n"}
            <div id="mydiv0" class="price" >Price: {"\n"}{this.state.Hlist[0][1]} Ether </div>
            </div></div>

            <div className="House"><img src={ReactHouse2} alt="React Logo" />
            <div class="caption">House2: {"\n"}{this.state.Hlist[1][0]} {"\n"} 
            <div id="mydiv1" class="price" >Price: {"\n"}{this.state.Hlist[1][1]} Ether </div>
            </div></div>

            <div className="House"><img src={ReactHouse3} alt="React Logo" />
            <div class="caption">House3: {"\n"}{this.state.Hlist[2][0]} {"\n"}
            <div id="mydiv2" class="price" >Price: {"\n"}{this.state.Hlist[2][1]} Ether </div>
            </div></div>
            
            

            
        </div>
        <div className="App-input" >
          
          <div>Reciever account address :</div>
          <input type="text" id="input_rcv"  ></input>

          <div className="App-msg">Sender account address and ETH amount :</div>
          <input type="text" id="input" value={this.state.accounts[0]} ></input>
          <input type="text" id="input_eth" value={this.state.storageValue} onChange={this.handleChange} className="App-input-eth"  ></input>
          <div><button type="submit" class="btn btn-sm btn-warning" onClick={()=>this.runExample()}>BID</button></div>

        </div>
      </div>
    );
  }
}

export default App;



//<div class={this.state.storageValue>0? "cap1" : "cap2"}>House1: {"\n"}{this.state.Hlist[0]}</div></div>