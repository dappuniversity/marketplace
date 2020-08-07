import React, { Component } from 'react';
import Web3 from 'web3'
import logo from '../logo.png';
import './App.css';
import Census from '../abis/Census.json'
import Navbar from './Navbar'
import Main from './Main'




class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      productCount: 0,
      products: [],
      buffer: null,
      loading: true
    }
    this.captureFile = this.captureFile.bind(this);
    this.createProduct = this.createProduct.bind(this)
    this.familysubmit = this.familysubmit.bind(this)
    
  }

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = Census.networks[networkId]
    if(networkData) {
      const marketplace = web3.eth.Contract(Census.abi, networkData.address);
      this.setState({ marketplace });
    
      //window.alert(marketplace.methods)
       var householdID = 0;
      
      //window.alert(await marketplace.methods.getpersonsstruct().call());
      var PastEvents = await marketplace.getPastEvents('ProductCreated', {filter: {wallet: this.state.account}});
      if (PastEvents.length >0) {
      householdID = PastEvents[0].returnValues._householdID;
      }else {
        
        householdID = await marketplace.methods.lasthouseholdID().call();
      }
      var member;
      member = await marketplace.methods.getmemberslenght(householdID).call();
      //window.alert(householdID,'mem');
 //     var households = await marketplace.methods.households()
      // this.setState({ member })
      this.setState({ householdID });
      this.setState({ member });
      
      // Load products
       for (var i = 0; i < member; i++) {
        const id = await marketplace.methods.getfamilymember(householdID,i).call()
        const product = await marketplace.methods.persons(id).call()
       this.setState({
          products: [...this.state.products, product]
        })
      } 
      this.setState({ loading: false});
    } else {
      window.alert('Marketplace contract not deployed to detected network.')
    }
  }

  captureFile(event) {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
      buf = this.state.buffer
    }
  }

  createProduct(name, race, photo, role, country, alive) {
    this.setState({ loading: true })
    var vhash;
/*     async function uplo(_data) {
      var phot = await fleek.upload({
        apiKey: '1Rc+ytXp/AlF3LseOVgk7Q==',
          apiSecret: 'my-6sd3b5ZQCfUT++Aym8kSe6AtpD3w0QtQxQ3NBr8mgbg=',
          key: 'my-file-key',
          data: _data,
        });
        return await phot.hashV0;
    } */
 
    
      //vhash = uplo(photo);
    //window.alert (name, race, "vhash", role, country, alive, this.state.householdID);
      



    // this.state.marketplace.methods.createPerson(name, race, photurl, role, country, alive, this.householdID).send({ from: this.state.account })
    // .once('receipt', (receipt) => {
    //   this.setState({ loading: false })
    // })
    const hid = this.state.householdID;

    this.state.marketplace.methods.createPerson(name, race, "vhash", role, country, alive, hid).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
  })
}
  



  familysubmit() {
    // this.setState({ loading: true })
    // this.state.marketplace.methods.familysubmit().send({ from: this.state.account})
    // .once('receipt', (receipt) => {
    //   this.setState({ loading: false })
    // })
  } 
  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
              { this.state.loading
                ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                : <Main
                  products={this.state.products}
                  createProduct={this.createProduct}
                  familysubmit={this.familysubmit} 
                  captureFile={this.captureFile}
                  />
              }
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
