import React, { Component } from 'react';


class Main extends Component {

  render() {
    return (
      <div id="content">
        <h1>Add Policy</h1>
        <div className="">
          <form onSubmit={(event) => {
            event.preventDefault()
            const name = this.productName.value
            const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
            this.props.createProduct(name, price)
          }}>
          {/* <h1>Add Policy</h1>
          <form onSubmit={(event) => {
            event.preventDefault()
            const name = this.productName.value
            const price = window.web3.utils.toWei(this.policyPrice.value.toString(), 'Ether')
            this.props.createPolicy(name, price)
          }}></form> */}

            <div className="form-group mr-sm-2">
              <input
                id="productName"
                type="text"
                ref={(input) => { this.productName = input }}
                className="form-control"
                placeholder="Name"
                required />
            </div>
            <div className="form-group mr-sm-2">
              <input
                id="policyNumber"
                type="text"
                ref={(input) => { this.policyNumber = input }}
                className="form-control"
                placeholder="Policy Number"
                required />
            </div>
            <div className="form-group mr-sm-2">
              <input
                id="productPrice"
                type="text"
                ref={(input) => { this.productPrice = input }}
                className="form-control"
                placeholder="Price"
                required />
            </div>

            <button type="submit" className="btn btn-primary">Add Policy</button>
          </form>
        </div>
        <p>&nbsp;</p>
        <hr />
        <h2>Buy Policy</h2>
        <table className="table table-striped table-bordered table-dark">
          <thead>
            <tr>
              <th scope="col">Item #</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Owner</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="productList">
            { this.props.products.map((product, key) => {
              return(
                <tr key={key}>
                  <th scope="row">{product.id.toString()}</th>
                  <td>{product.name}</td>
                  <td>{window.web3.utils.fromWei(product.price.toString(), 'Ether')} Eth</td>
                  <td>{product.owner}</td>
                  <td>
                    { !product.purchased
                      ? <button
                          name={product.id}
                          value={product.price}
                          onClick={(event) => {
                            this.props.purchaseProduct(event.target.name, event.target.value)
                          }}
                        >
                          Buy
                        </button>
                      : <button
                          name={'Sold'}
                          value={product.price}
                          disabled>
                            Sold
                          </button>
                    }
                    </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Main;
