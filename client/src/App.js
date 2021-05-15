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

    const HouseList=[["0x9A00348361887FF759c277451150fCc02737A671",10],
    ["0xcB41eFBfcC89068EeDa8fBDafE4B914204C9b506",5],
    ["0x3bD574fF3D4a4FDde865804968B48a8863EDC1C5",20] ]

    this.state = { storageValue: 0, web3: null, accounts: null, contract: null ,Hlist: HouseList };

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
    
    const eth_amount=document.getElementById("input_eth").value*10**18;
    const rcv_address=document.getElementById("input_rcv").value;

    const load_up={  
      //to: '0x9A00348361887FF759c277451150fCc02737A671',
      from: accounts[0],
      //gas: 50000, gasPrice: 1e6 ,
      value : eth_amount   
    };
    
    console.log(accounts[0]);
    await contract.methods.sendEth(rcv_address).send(load_up);
    console.log("done !!");



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
    return (
      <div className="App">
         <div className="Title">REAL ESTATE BIDDING</div>
         <div className="HouseContainer" >
            <div className="House"><img src={ReactHouse1} alt="React Logo" />
            <div class="caption">House1: {"\n"}{this.state.Hlist[0][0]} {"\n"}
            Price: {"\n"}{this.state.Hlist[0][1]} Ether</div></div>
            <div className="House"><img src={ReactHouse2} alt="React Logo" />
            <div class="caption">House2: {"\n"}{this.state.Hlist[1][0]} {"\n"}
            Price: {"\n"}{this.state.Hlist[1][1]} Ether </div></div>
            <div className="House"><img src={ReactHouse3} alt="React Logo" />
            <div class="caption">House3: {"\n"}{this.state.Hlist[2][0]} {"\n"}
            Price: {"\n"}{this.state.Hlist[2][1]} Ether </div></div>
            
        </div>
        <div className="App-input" >
          
          <div>Reciever account address :</div>
          <input type="text" id="input_rcv"  ></input>

          <div className="App-msg">Sender account address and ETH amount :</div>
          <input type="text" id="input" value={this.state.accounts[0]} ></input>
          <input type="text" id="input_eth" value={this.state.storageValue} onChange={this.handleChange} className="App-input-eth"  ></input>
          <div><button type="submit" class="btn btn-sm btn-warning" onClick={()=>this.runExample()}>Submit</button></div>

        </div>
      </div>
    );
  }
}

export default App;



//<div class={this.state.storageValue>0? "cap1" : "cap2"}>House1: {"\n"}{this.state.Hlist[0]}</div></div>