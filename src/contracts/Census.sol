pragma solidity ^0.5.17;


contract Census {
    string public name;
    uint public personCount = 0;
    uint public lasthouseholdID;
    

    mapping(uint => Person) public persons;
    mapping(uint => Household) public households;
    mapping(uint => ho) public hos;

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
        uint[] members;
        bool Householdadded;
        address submitter;
    }
    struct ho
           {
               uint hid;
               Person[] member;
           }
event ProductCreated (
    address indexed wallet,
    uint _householdID 
);



    constructor() public {
        name = "DCensus";
    }

      function createPerson(string memory _name, string memory _race, string memory _photourl,string memory _role, string memory _country, bool _alive, uint _householdID) public {
        // Require a valid photo
        // require(bytes(_photourl).length > 0);

        
        // Increment product count
        
        personCount ++;
        // Create the product
        persons[personCount] = Person(personCount, _name, _photourl, _role, _race, _country, _householdID, _alive);
        households[_householdID].members.push(personCount);
        households[_householdID].submitter = msg.sender;
        hos[_householdID].member.push(persons[personCount]);
        lasthouseholdID++;
        // Trigger an event
        emit ProductCreated(msg.sender,_householdID);
    }
        
/*      function addmember(string memory _name, string memory _race, string memory _photourl,string memory _role, string memory _country, bool _alive, uint _householdID) public {
        // Require a valid photo
        
        // require(bytes(_photourl).length > 0);

     
        // Increment product count
        personCount ++;
        // Create the product
        households[_householdID].members.push(Person(personCount, _name, _photourl, _role, _race, _country,_householdID, _alive));
        
        // Trigger an event
        //emit ProductCreated(productCount, _Persons, _race, _country);
    } */
    function getmemberslenght(uint _householdID) view public returns (uint) {
        uint m; 
        m = households[_householdID].members.length; //it apeares you cannot directly return global varaibles
        return m;
    }
    function getfamilymember(uint _householdID, uint _member) view public returns (uint) {
        uint m;
        m = households[_householdID].members[_member];
        return m;
    }
// function familysubmit() public {
//     require(households[lasthouseholdID].members.length > 0);
// Householdadded[lasthouseholdID] = true ;
// lasthouseholdID ++;
// } 
    function gethousholdID() public {
           
        
        
          
       
           
    }
     function getpersonsstruct() public returns(string memory) {
           string memory m;
         //   hos[0].member[0]=persons[1];
           m = persons[1].name;
           return m;
    }
}
