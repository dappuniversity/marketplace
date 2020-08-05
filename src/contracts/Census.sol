pragma solidity ^0.5.0;

contract Census {
    string public name;
    uint public personCount = 0;
    uint public lasthouseholdID = 0;

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

   bool[] public Householdadded;



    constructor() public {
        name = "DCensus";
    }

    function createPerson(string memory _name, string memory _race, string memory _photourl,string memory _role, string memory _country, bool _alive, uint _householdID) public {
        // Require a valid name
        require(bytes(_photourl).length > 0);
        if (!Householdadded[_householdID]){
    
           Householdadded[_householdID] = true ;
        lasthouseholdID ++;
         }
        
        // Increment product count
        personCount ++;
        // Create the product
        persons[personCount] = Person(personCount, _name, _photourl, _role, _race, _country, _householdID, _alive);
        // Trigger an event
        //emit ProductCreated(productCount, _Persons, _race, _country);
    }

    function getlasthouseholdID() public view returns (uint) {
        return lasthouseholdID;
    }
}
