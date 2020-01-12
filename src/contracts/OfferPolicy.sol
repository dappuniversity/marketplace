pragma solidity ^0.5.0;

contract OfferPolicy {
    string public name;
    uint id;

     struct Policy {
        uint id;
        string name;
        string coverages;
        string policyNumber;
        address payable owner;
        uint price;
        uint commission;
        bool active;
        bool purchased;
        bool renewable;
    }

    // Describe the Binder
    struct Binder {
        uint id;
        string name;
        uint price;
        address payable owner;
        bool available;
    }

    // StateType
    enum  StateType {
        PolicyAvailable,
        BinderAvailableForPolicy,
        OfferPlaced,
        OfferAccepted,
        OfferDeclined
    }
    // Owner Info
    address public InstanceOwner;
    string public Description;
    uint public AskingPrice;
    StateType public State;

    // Buyer Info
    address public InstanceBuyer;
    int public OfferPrice;

    // Product Info
    uint public policyCount = 0;
    mapping(uint => Policy) public products;

    // Binder
    uint public binderCount = 0;
    mapping(uint => Binder) public binders;

    function generatePolicy(string memory _name) public payable {
        name = _name;
    }
}