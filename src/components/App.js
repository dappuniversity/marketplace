import React, { Component } from 'react';
import Web3 from 'web3'
import logo from '../logo.png';
import './App.css';
import Marketplace from '../abis/Marketplace.json'
import Navbar from './Navbar'
import Main from './Main'
import fleek from '@fleekhq/fleek-storage-js'


class App extends Component {
  
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
    const networkData = Marketplace.networks[networkId]
    if(networkData) {
      const marketplace = web3.eth.Contract(Marketplace.abi, networkData.address)
      this.setState({ marketplace })
      console.log(marketplace.methods)
      //window.alert(marketplace.methods)
      const personCount = await marketplace.methods.personCount().call()
      const householdID =  marketplace.methods.lasthouseholdID()
      this.setState({ personCount })
//      this.setState({ householdID })
//      window.alert(householdID)
      // Load products
      for (var i = 1; i <= personCount; i++) {
        const product = await marketplace.methods.products(i).call()
        this.setState({
          products: [...this.state.products, product]
        })
      }
      this.setState({ loading: false})
    } else {
      window.alert('Marketplace contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      productCount: 0,
      products: [],
      loading: true
    }

    this.createProduct = this.createProduct.bind(this)
    this.purchaseProduct = this.purchaseProduct.bind(this)
  }

  createProduct(name, race, photo, role, country, alive) {
    this.setState({ loading: true })
    var price ;
    price = 20000000000;
    var photurl = fleek.upload({
      apiKey: '1Rc+ytXp/AlF3LseOVgk7Q==',
        apiSecret: 'my-6sd3b5ZQCfUT++Aym8kSe6AtpD3w0QtQxQ3NBr8mgbg=',
        key: 'my-file-key',
        data: photo,
      });

if (this.state.HouseholdPaid[this.householdID].call()) {
  price = 0;
}
    this.state.marketplace.methods.createPerson(name, race, photurl, role, country, this.householdID, alive).send({ from: this.state.account , value: price })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }




  purchaseProduct(id, price) {
    this.setState({ loading: true })
    this.state.marketplace.methods.purchaseProduct(id).send({ from: this.state.account, value: price })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
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
                  purchaseProduct={this.purchaseProduct} />
              }
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
