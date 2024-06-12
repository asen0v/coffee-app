import React from 'react';
import Image from 'next/image';

const RoastStars = ({ roast }) => {
  const stars = [];

  for (let i = 0; i < 10; i++) {
    if (i < roast) {
      stars.push(
        <Image
          key={i}
          src="/icons/coffee-roast.png"
          width={21}
          height={21}
          alt="coffee roast"
        />
      );
    } else {
      stars.push(
        <Image
          key={i}
          src="/icons/coffee-noroast.png"
          width={16}
          height={16}
          alt="coffee no-roast"
        />
      );
    }
  }

  return <div className="list-inline">{stars}</div>;
};

export default RoastStars;
