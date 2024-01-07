import logo from "./logo.png";
import heroImg from "./heroImg.jpg";
import contactUs from "./contactUs.jpg";


import wd1 from "./women/dresses/blackDress.jpg";
import wd2 from "./women/dresses/orangeDress.jpg";

import wp1 from "./women/pants/greyPants.jpg";
import wp2 from "./women/pants/jeans.jpg";

import ws1 from "./women/skirts/blackSkirt.jpg";
import ws2 from "./women/skirts/blueSkirt.jpg";


import mh1 from "./men/hoodies/blackHoodie.jpg";
import mh2 from "./men/hoodies/greyHoodie.jpg";

import mp1 from "./men/pants/blackJeans.jpg";
import mp2 from "./men/pants/jeans.jpg";

import ms1 from "./men/shirts/blackShirt.jpg";
import ms2 from "./men/shirts/greyshirt.jpg";


import k1 from "./kids/blueKidsDress.jpg";
import k2 from "./kids/childDress.jpg";
import k3 from "./kids/kidsHalloweenDress.jpg";
import k4 from "./kids/kidsHoodies.jpg";
import k5 from "./kids/kidsShirt.jpg";
import k6 from "./kids/princessDress.jpg";


export const womenImg = [
    { src: wd1, title: "Women's Dress", price: '$15' },
    { src: wd2, title: "Women's Dress", price: '$15' },

    { src: wp1, title: "Women's Pant", price: '$15' },
    { src: wp2, title: "Women's Pant", price: '$15' },

    { src: ws1, title: "Women's Skirt", price: '$15' },
    { src: ws2, title: "Women's Skirt", price: '$15' },
];


export const kidImg = [
    { src: k1, title: "Kid's Clothes", price: '$15' },
    { src: k2, title: "Kid's Clothes", price: '$15' },
    { src: k3, title: "Kid's Clothes", price: '$15' },
    { src: k4, title: "Kid's Clothes", price: '$15' },
    { src: k5, title: "Kid's Clothes", price: '$15' },
    { src: k6, title: "Kid's Clothes", price: '$15' },
];


export const menImg = [
    { src: mh1, title: "Men's Hoodie", price: '$15' },
    { src: mh2, title: "Men's Hoodie", price: '$15' },

    { src: mp1, title: "Men's Pant", price: '$15' },
    { src: mp2, title: "Men's Pant", price: '$15' },

    { src: ms1, title: "Men's Shirt", price: '$15' },
    { src: ms2, title: "Men's Shirt", price: '$15' },
];

export const homeImg = {
    logo, heroImg, contactUs
}
