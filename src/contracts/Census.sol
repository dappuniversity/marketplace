pragma solidity ^0.5.16;

contract Census {
    address payable owner = 0x8493e8809a45A5aF760dD66F96C86f4aBF62a65C ;
    string public name;
    uint public productCount = 0;
    uint public lasthouseholdID = 0;
    mapping(uint => Household) public households;
    mapping(uint => Person) public persons;

    struct Person {
        uint id;
        string name;
        string photourl;
        
        string role;
        string race;
        string country;
        uint householdID;
        bool alive;
    }
    struct Household {
        uint id;
  //      Person[] Persons;
        string race;
        string country;
   }
   bool[] public HouseholdPaid;

    event ProductCreated(
      uint id,
 //       Person[] Persons,
        string race,
        string country
    );

    event ProductPurchased(
        uint id,
        string name,
        uint price,
        address payable owner,
        bool purchased
    );

    constructor() public {
        name = "DCensus";
    }

    function createPerson(string memory _name, string memory _race, string memory _photourl,string memory _role, string memory _country, bool _alive, uint _householdID) public payable {
        // Require a valid name
        require(bytes(_photourl).length > 0);
        if (!HouseholdPaid[_householdID]){
        require(msg.value >= 20000000);
               address(owner).transfer(msg.value);
 HouseholdPaid[_householdID] = true ;
 lasthouseholdID ++;
 }
                // Pay the seller by sending them Ether
        
        // Increment product count
        productCount ++;
        // Create the product
        persons[productCount] = Person(productCount, _name, _photourl, _role, _race, _country, _householdID, _alive);
        // Trigger an event
        //emit ProductCreated(productCount, _Persons, _race, _country);
    }

    function lasthousehole() public view returns (uint) {
        return lasthouseholdID;
    }
}
