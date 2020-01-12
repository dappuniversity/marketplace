pragma solidity ^0.5.0;
/*
1. We are using underscore prefix for all local variables.
2. State variables do not.
3.
4.
*/
contract Marketplace {
    string public name;
    uint public productCount = 0;
    uint public policyCount = 0;

    // Mapping by id's (indexing the arrays).
    mapping(uint => Product) public products;
    mapping(uint => Agent) public agents;
    mapping(uint => User) public users;
    mapping(uint => Policy) public policies;

    

    // Describe the Binder
    struct Binder {
        uint id;
        string name;
        uint price;
        address payable owner;
        bool available;
    }

    // Describe the Product
    struct Product {
        uint id;
        string name;
        uint price;
        address payable owner;
        bool purchased;
        bool available;
    }

    // Describe the Agent
    struct Agent {
        uint id;
        string name;
        string title;
        uint commission;
        address payable owner;
        bool commissionPaid;
    }

    // Describe the User. The user in this case
    // is the potential insured or buyer of the
    // product. The end user.
    struct User {
        uint id;
        string name;
        string title;
        uint commission;
        address payable owner;
        bool commissionPaid;
    }

    event PolicyCreated(
        uint id,
        string name,
        uint price,
        address payable owner,
        bool purchased
    );


    event ProductCreated(
        uint id,
        string name,
        uint price,
        address payable owner,
        bool purchased
    );

    event ProductPurchased(
        uint id,
        string name,
        uint price,
        address payable owner,
        bool purchased
    );

    event PolicyPurchased(
        uint id,
        string name,
        uint price,
        address payable owner,
        bool purchased
    );

    // Describe the Policy
    struct Policy {
        uint id;
        string policyNumber;
        address payable owner;
        uint price;
        uint commission;
        bool active;
        bool purchased;
        bool renewable;
    }

    constructor() public {
        name = "InsureNET Marketplace";
        //products = [];
        //agents = [];
        //users = [];
    }

    // Create a Policy
    function createPolicy(string memory _policyNumber, uint _price, uint _commission) public {
        // Validation
        // Require a valid name
        require(bytes(_policyNumber).length > 0, "Error");
        require(_price > 0, "Error");

        policyCount ++;

        policies[policyCount] = Policy(policyCount, _policyNumber, msg.sender, _price, _commission, true, false, false);

        emit PolicyCreated(policyCount, _policyNumber, _price, msg.sender, false);
    }

    // ToDo: update from memory to store on the blockchain.
    // Currently all the products get wiped out on restart.
    function createProduct(string memory _name, uint _price) public {
        // Require a valid name
        require(bytes(_name).length > 0, "Error");
        // Require a valid price
        require(_price > 0, "Error");
        // Increment product count
        productCount ++;
        // Create the product
        products[productCount] = Product(productCount, _name, _price, msg.sender, false, false);
        // Trigger an event
        emit ProductCreated(productCount, _name, _price, msg.sender, false);
    }

    function purchasePolicy(uint _id) public payable {
        // Fetch the product
        // Create a copy in memory of a new Product (from struct above).
        // This is not the actual product from blockchain. Remember were
        // following _local naming convention.
        Policy memory _policy = policies[_id];
        // Fetch the owner
        address payable _seller = _policy.owner;
        // Make sure the product has a valid id
        require(_policy.id > 0 && _policy.id <= policyCount, "Error");
        // Require that there is enough Ether in the transaction
        require(msg.value >= _policy.price, "Error");
        // Require that the product has not been purchased already
        require(!_policy.purchased, "Error");
        // Require that the is active
        require(!_policy.active, "Error");
        // Require that the buyer is not the seller
        require(_seller != msg.sender, "Error");
        // Transfer ownership to the buyer
        _policy.owner = msg.sender;
        // Mark as purchased.
        // ?? Is there anything else we can add here?
        // Are there limitations, and what?
        _policy.purchased = true;
        _policy.active = true;
        _policy.renewable = false; // set this default for testing

        // Update the product. Put it back into the mapping.
        policies[_id] = _policy;
        // Pay the seller by sending them Ether
        // The amount of Ethereum is the msg.value
        address(_seller).transfer(msg.value);
        // Trigger an event
        emit PolicyPurchased(policyCount, _policy.policyNumber, _policy.price, msg.sender, true);
    }

    function purchaseProduct(uint _id) public payable {
        // Fetch the product
        // Create a copy in memory of a new Product (from struct above).
        // This is not the actual product from blockchain. Remember were
        // following _local naming convention.
        Product memory _product = products[_id];
        // Fetch the owner
        address payable _seller = _product.owner;
        // Make sure the product has a valid id
        require(_product.id > 0 && _product.id <= productCount, "Error");
        // Require that there is enough Ether in the transaction
        // to cover the product price.
        require(msg.value >= _product.price, "Error");
        // Require that the product has not been purchased already
        require(!_product.purchased, "Error");
        // Require that the buyer is not the seller
        require(_seller != msg.sender, "Error");

        // Transfer ownership to the buyer
        _product.owner = msg.sender;
        // Mark as purchased.
        // ?? Is there anything else we can add here?
        // Are there limitations, and what?
        _product.purchased = true;
        _product.available = false;

        // Update the product. Put it back into the mapping.
        products[_id] = _product;
        // Pay the seller by sending them Ether
        // The amount of Ethereum is the msg.value
        address(_seller).transfer(msg.value);
        // Trigger an event
        emit ProductPurchased(productCount, _product.name, _product.price, msg.sender, true);
    }
}
