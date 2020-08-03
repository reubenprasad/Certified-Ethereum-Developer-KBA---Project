//SPDX-License-Identifier: MIT
pragma solidity >= 0.5.0 < 0.7.0;

contract ProductTracker {

  address payable public product_manufacturer;
  uint public productCount = 0;

  struct productDetail {
        string name;
        uint dateOfPurchase;
        uint warrantyPeriod;
        uint price;
        address payable ownerAddress;
    }

  mapping(uint => productDetail) public product;

  event ProductAdded(
        string name,
        uint dateOfPurchase,
        uint warrantyPeriod,
        uint price,
        address payable ownerAddress
  );

  constructor () public {
   product_manufacturer = msg.sender;
    }

   modifier only_manufacturer (){
       require (msg.sender == product_manufacturer, "Only manufacturer can add products");
       _;
    }

   modifier buy_conditions (){
       require (msg.sender != product_manufacturer, "Manufacturer cant buy own product");
       _;
    }

   function addProduct(uint _pId, string memory _name, uint _dateOfPurchase,uint _wPeriod, uint _price) public only_manufacturer{
       //Require a valid name
        require(bytes(_name).length > 0, 'name cannot be empty');
       //Require a valid price
        require(_price > 0,'price cannot be 0');
       //Add the Product
        product[_pId] = productDetail(_name, _dateOfPurchase, _wPeriod, _price, product_manufacturer);
       //Increment the Product Count
        productCount++;
       //Emit an event when product is added
        emit ProductAdded(_name, _dateOfPurchase, _wPeriod, _price, product_manufacturer);

    }

    function buyProduct(uint _pId) public payable buy_conditions{
        require(msg.value > product[_pId].price, "Value of sent ether is less than product price");
        
    }
}
