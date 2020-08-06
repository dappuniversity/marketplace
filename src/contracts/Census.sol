pragma solidity ^0.5.0;


contract Census {
    string public name;
    uint public personCount = 0;
    uint public lasthouseholdID = 0;
    

    mapping(uint => Person) public persons;
    mapping(uint => Household) public households;

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
        uint hid;
        Person[] members;
 
    }


   bool[] public Householdadded;



    constructor() public {
        name = "DCensus";
    }

      function createPerson(string memory _name, string memory _race, string memory _photourl,string memory _role, string memory _country, bool _alive, uint _householdID) public {
        // Require a valid photo
        // require(bytes(_photourl).length > 0);
        Householdadded.push(false);
        if (!Householdadded[_householdID]){
    
           Householdadded[_householdID] = true ;
        lasthouseholdID ++;
         }
        
        // Increment product count
        
        personCount ++;
        // Create the product
        persons[personCount] = Person(personCount, _name, _photourl, _role, _race, _country, _householdID, _alive);
    //    households[_householdID].members.push = 
        // Trigger an event
        //emit ProductCreated(productCount, _Persons, _race, _country);
    }
        
     function addmember(string memory _name, string memory _race, string memory _photourl,string memory _role, string memory _country, bool _alive, uint _householdID) public {
        // Require a valid photo
        
        // require(bytes(_photourl).length > 0);

     
        // Increment product count
        personCount ++;
        // Create the product
        households[_householdID].members.push(Person(personCount, _name, _photourl, _role, _race, _country,_householdID, _alive));
        
        // Trigger an event
        //emit ProductCreated(productCount, _Persons, _race, _country);
    }
    function getmemberslenght(uint _householdID) view public returns (uint) {
        return households[_householdID].members.length;
    }
    function getfamilymember(uint _householdID, uint _member) view public returns (string memory) {
        return households[_householdID].members[_member].name;
    }
// function familysubmit() public {
//     require(households[lasthouseholdID].members.length > 0);
// Householdadded[lasthouseholdID] = true ;
// lasthouseholdID ++;
// } 
function gethousholdID() public returns(uint) {
            Householdadded.push(false);
        if (Householdadded[lasthouseholdID]){
    lasthouseholdID ++;
          }
           return lasthouseholdID;
}
}
