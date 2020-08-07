import React, { Component } from 'react';
import ipfs from './ipfs';
var buf;
class Main extends Component {



  render() {
    return (
      <div id="content">
        <h1>Add Person</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const name = this.productName.value
          const race = this.productRace.value
          const photo =this.productPhoto
          const role = this.role.value
          ipfs.add(this.state.buffer, (error, result) => {
            if(error) {
              console.error(error)
              return
            }
            this.props.createProduct(name, race, result[0].hash, role, this.country.value, true)

          })
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
              required
              />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productRace"
              type="text"
              ref={(input) => { this.productRace = input }}
              className="form-control"
              placeholder="race"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="photo"
              type="file"
              ref={(input) => { this.productPhoto = input }}
              className="form-control"
              placeholder="Prodphotouct "
              onChange={this.props.captureFile}
              required />
              
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="dead"
              type="checkbox"
              ref={(input) => { this.dead = input }}
              className="form-control"
              placeholder="Product Price"
               />
              It is a death proof photo
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
              ref={(input) => { this.role = input }}
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
              ref={(input) => { this.role = input }}
              className="form-control"
              value="kid"
              placeholder="Product Price"
              required />
              <label for="kid">kids</label><br></br>
          </div>

          <button type="submit" className="btn btn-primary">Add family member</button>
        </form>
        <button type="submit" className="btn btn-primary" onSubmit={this.props.familysubmit()}>other family</button>

        <p>&nbsp;</p>
        <h2>Currently added</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">hid</th>
              <th scope="col">Name</th>
              <th scope="col">Race</th>
              <th scope="col">Country</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="productList">
            { this.props.products.map((product, key) => {
              return(
                <tr key={key}>
                  <th scope="row">{ product.householdID.toString() }</th>
                  <td>{product.name}</td>
                  {/* <td>{product.race} Eth</td>
                  <td>{product.owner}</td> */}
                  <td>
                    {/* { !product.purchased
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
                    } */}
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
