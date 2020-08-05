import React, { Component } from 'react';

class Main extends Component {

  render() {
    return (
      <div id="content">
        <h1>Add Product</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const name = this.productName.value
          const race = this.productRace.value
          const photo =this.productPhoto
          const role = this.role
          this.props.createProduct(name, race, photo, role, this.country, this.dead)
        }}>
           <div className="form-group mr-sm-2">
            <input
              id="country"
              type="text"
              ref={(input) => { this.country = input }}
              className="form-control"
              placeholder="country"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="Name"
              type="text"
              ref={(input) => { this.productName = input }}
              className="form-control"
              placeholder="Name (optional)"
              />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productRace"
              type="text"
              ref={(input) => { this.productRace = input }}
              className="form-control"
              placeholder="Product Price"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productRace"
              type="file"
              ref={(input) => { this.productPhoto = input }}
              className="form-control"
              placeholder="Prodphotouct "
              required />
              
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="dead"
              type="checkbox"
              ref={(input) => { this.dead = input }}
              className="form-control"
              placeholder="Product Price"
              required />
              It is death proof photo
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="pspouse"
              name="role"
              type="radio"
              ref={(input) => { this.role = input }}
              className="form-control"
              value="pspouse"
              placeholder="Product Price"
              required />
              <label for="pspouse">spouse with photo</label><br></br>
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="spouse2"
              name="role"
              type="radio"
              ref={(input) => { this.productRace = input }}
              className="form-control"
              value="spouse2"
              placeholder="Product Price"
              required />
              <label for="spouse2">spouse 2</label><br></br>
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="kid"
              name="role"
              type="radio"
              ref={(input) => { this.productRace = input }}
              className="form-control"
              value="kid"
              placeholder="Product Price"
              required />
              <label for="kid">spouse with photo</label><br></br>
          </div>

          <button type="submit" className="btn btn-primary">Add Product</button>
        </form>
        <p>&nbsp;</p>
        <h2>Buy Product</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
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
                      : null
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
