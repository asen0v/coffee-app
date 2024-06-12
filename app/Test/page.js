'use client';
import {ImgCard} from "../Component/Card";
import Header from "../Component/Header";
import Image from "next/image";

export default function Test(){
    const coffeeData = [
          {
            "brand": "Perleo",
            "name": "100% Arabica Purissima",
            "description": "Discover this 100% arabica blend, Perleo Espresso Purissima! A concentrate of intense aromas that have made and continue to make this Italian-style roast a success. Espresso lovers will love the fruity, rounded flavour of this coffee, with its chocolate notes, praline and orange peel. Packaging: 1kg pack",
            "ptype": "Coffee Beans",
            "weight": "1",
            "type": "100% Arabica",
            "price": "16.90",
            "roast": 8,
            "logo": "perleo.jpg"
          },
          {
            "brand": "Cosmai",
            "name": "The Honest Coffee Beans",
            "description": "Cosmai Caffè The Honest coffee beans: a blend of 30% Arabica & 70% Robusta from Brazil, India, Guatemala and Tanzania. For a strong espresso with intense notes of cocoa. Roasted in Italy. 1kg coffee beans.",
            "ptype": "Coffee Beans",
            "weight": "1",
            "type": "30% Arabica / 70% Robusta",
            "price": "14.50",
            "roast": 8,
            "logo": "cosmai.png"
          },
          {
            "brand": "Novell",
            "name": "Excelsior Plus",
            "description": "Try out this Excelsior Plus whole-bean coffee from Spanish coffee specialist Novell. This 100% Arabica coffee provides a full-bodied cup with notes of cereal, lemon, honey and toasted bread. Introduce your palate to this both gourmet and fruity cup. Best served in macchiato and cappuccino! 1kg coffee beans",
            "ptype": "Coffee Beans",
            "weight": "0.5",
            "type": "100% Arabica",
            "price": "15.90",
            "roast": 7,
            "logo": "novell.jpg"
          },
          {
            "brand": "Perleo",
            "name": "100% Arabica Purissima",
            "description": "Discover this 100% arabica blend, Perleo Espresso Purissima! A concentrate of intense aromas that have made and continue to make this Italian-style roast a success. Espresso lovers will love the fruity, rounded flavour of this coffee, with its chocolate notes, praline and orange peel. Packaging: 1kg pack",
            "ptype": "Coffee Beans",
            "weight": "1",
            "type": "100% Arabica",
            "price": "16.90",
            "roast": 8,
            "logo": "perleo.jpg"
          },
          {
            "brand": "Cosmai",
            "name": "The Honest Coffee Beans",
            "description": "Cosmai Caffè The Honest coffee beans: a blend of 30% Arabica & 70% Robusta from Brazil, India, Guatemala and Tanzania. For a strong espresso with intense notes of cocoa. Roasted in Italy. 1kg coffee beans.",
            "ptype": "Coffee Beans",
            "weight": "1",
            "type": "30% Arabica / 70% Robusta",
            "price": "14.50",
            "roast": 8,
            "logo": "cosmai.png"
          },
          {
            "brand": "Novell",
            "name": "Excelsior Plus",
            "description": "Try out this Excelsior Plus whole-bean coffee from Spanish coffee specialist Novell. This 100% Arabica coffee provides a full-bodied cup with notes of cereal, lemon, honey and toasted bread. Introduce your palate to this both gourmet and fruity cup. Best served in macchiato and cappuccino! 1kg coffee beans",
            "ptype": "Coffee Beans",
            "weight": "0.5",
            "type": "100% Arabica",
            "price": "15.90",
            "roast": 7,
            "logo": "novell.jpg"
          }
    ];
    return(
    <>
 
      <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
        <h1 className="display-5 fw-normal">Coffee Products</h1>
        <p className="fs-4 text-muted">We sell the best coffee worldwide.</p>
      </div>
      <div class="alert alert-info alert-dismissible fade show" role="alert">
  <strong>This is test page!</strong> Mapping the data from already prepared data in the code. Used to prepare my ImageCard Component.
 
</div>
      <div className="row row-cols-1 row-cols-lg-6 row-cols-md-3 row-cols-sm-1 mb-3 text-center">
      {
        coffeeData.map(cof => (
          <ImgCard values={{id:cof.id, brand:cof.brand, name:cof.name, description:cof.description, ptype:cof.ptype, weight:cof.weight, type:cof.type, price:cof.price, roast:cof.roast, logo:cof.logo}} />
        ))
      }
      </div>
    </>
    )
}