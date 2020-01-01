pragma solidity ^0.5.0;

contract SimpleMarketplace {
    // Application & Workflow
    string public ApplicationName;// = "SimpleMarketplace";
    string internal WorkflowName = "Agency Marketplace";

    // StateType
    enum  StateType {
        ItemAvailable,
        OfferPlaced,
        Accepted
    }

    struct Product {
        uint id;
        string name;
        uint price;
        address payable owner;
        bool purchased;
    }

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

    event ContractCreated(
        string applicationName,
        string workflowName,
        address originationAddress
    );

    event ContractUpdated(
        string applicationName,
        string workflowName,
        string action,
        address originationAddress
    );

    // Owner Info
    address public InstanceOwner;
    string public Description;
    uint public AskingPrice;
    StateType public State;

    // Buyer Info
    address public InstanceBuyer;
    int public OfferPrice;

    // Product Info
    uint public productCount = 0;
    mapping(uint => Product) public products;

    constructor (string memory description, uint256 price) public {
        ApplicationName = "Agency Marketplace";
        InstanceOwner = msg.sender;
        AskingPrice = price;
        Description = description;
        State = StateType.ItemAvailable;

        emit ContractCreated(ApplicationName, WorkflowName, msg.sender);
    }

    function CreateProduct(string memory _name, uint _price) public {
        // Require a valid name
        require(bytes(_name).length > 0);
        // Require a valid price
        require(_price > 0);
        // Increment product count
        productCount ++;
        // Create the product
        products[productCount] = Product(productCount, _name, _price, msg.sender, false);
        // Trigger an event
        emit ProductCreated(productCount, _name, _price, msg.sender, false);
    }

    function PurchaseProduct(uint _id) public payable {
        // Fetch the product
        Product memory _product = products[_id];
        // Fetch the owner
        address payable _seller = _product.owner;
        // Make sure the product has a valid id
        require(_product.id > 0 && _product.id <= productCount, "Error");
        // Require that there is enough Ether in the transaction
        require(msg.value >= _product.price, "Error");
        // Require that the product has not been purchased already
        require(!_product.purchased, "Error");
        // Require that the buyer is not the seller
        require(_seller != msg.sender, "Error");
        // Transfer ownership to the buyer
        _product.owner = msg.sender;
        // Mark as purchased
        _product.purchased = true;
        // Update the product
        products[_id] = _product;
        // Pay the seller by sending them Ether
        address(_seller).transfer(msg.value);
        // Trigger an event
        emit ProductPurchased(productCount, _product.name, _product.price, msg.sender, true);
    }

    // Make Offer
    function MakeOffer(int offerPrice) public {
        if (offerPrice == 0) {
            revert("MakeOffer function NEEDS to have an offerPrice greater than zero");
        }

        if(State != StateType.ItemAvailable) {
            revert("MakeOffer function can ONLY be called when in ItemAvailable state");
        }

        if(InstanceOwner == msg.sender) {
            revert("MakeOffer function can NOT be called by Owner");
        }

        InstanceBuyer = msg.sender;
        OfferPrice = offerPrice;
        State = StateType.OfferPlaced;

        emit ContractUpdated(ApplicationName, WorkflowName, "MakeOffer", msg.sender);
    }

    // Reject
    function Reject() public {
        if(State != StateType.OfferPlaced) {
            revert("Reject function can ONLY be called when in OfferPlaced state");
        }

        if(InstanceOwner != msg.sender) {
            revert("Revert functin can ONLY be called by Owner");
        }

        InstanceOwner = address(0x0);
        State = StateType.ItemAvailable;

        emit ContractUpdated(ApplicationName, WorkflowName, "Reject", msg.sender);
    }

    // Accept Offer
    function AcceptOffer() public {
        if (InstanceOwner != msg.sender) {
            revert("AcceptOffer fucntion can ONLY be called by Owner");
        }

        State = StateType.Accepted;

        emit ContractUpdated(ApplicationName, WorkflowName, "AcceptOffer", msg.sender);
    }
}