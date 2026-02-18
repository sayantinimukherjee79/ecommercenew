import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";

dotenv.config();

const run = async () => {
    try {
        // 1️⃣ Connect DB
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");

        // 2️⃣ CATEGORY IDS (use YOUR real IDs here)
        const CATEGORIES = {
            MEN: "69762227c8da9af66e679bc5",
            WOMEN: "6976231012b49e672a0efcb5",
            JEWELLERY: "6976237bf6caf54372fd21b9",
            MAKEUP: "697623d806890b906f1b42bd",
            SKINCARE: "697624221e5f65e868d2b925",
            FOOTWEAR: "6976247d6225b75abc4ce6b4",
            FRAGRANCE: "6976250eebaa4b73cb2bf206",
            ETHNIC: "6976254939d0bd887af4159d",
            WATCH: "69762585259d74fc2fb263dc",
            FITNESS: "6976262e5d4f74e61779dfe8",
            DENIM: "697626d05b488df55d052725",
            HAIRCARE: "6976276ccc63f050648c5829",
            ELECTRONICS: "697627e741f2b0724a333326",
            FURNITURES: "6976285472c73bf54e8fb776"
        };

        // 3️⃣ PRODUCTS DATA (sample – you will extend to all 76)
        const products = [
            {
                title: "Pearl Necklace",
                price: 500,
                description: "Elevate your style with this timeless pearl necklace, designed to add effortless elegance to any outfit. Crafted with lustrous, high-quality pearls, it offers a classic charm that never goes out of fashion. Perfect for weddings, festive occasions, or everyday sophistication, this necklace blends tradition with modern grace.",
                image: "gold-necklace.jpg",
                stock: 15,
                brand: "Zaveri Pearls",
                category: CATEGORIES.JEWELLERY
            },


            {
                title: "Pendant Necklace",
                price: 299,
                description: "This elegant pendant necklace features a timeless design that adds subtle charm to any outfit. Crafted with a delicate chain and a beautifully finished pendant, it is perfect for daily wear as well as special occasions. A versatile accessory that complements both casual and formal looks.",
                image: "gold-necklace.jpg",
                stock: 10,
                brand: "Zaveri Pearls",
                category: CATEGORIES.JEWELLERY
            },


            {
                title: "Gold Statement Necklace",
                price: 499,
                description: "A bold and luxurious gold statement necklace designed to stand out effortlessly. Featuring an eye-catching structure with rich gold tones, it instantly elevates any outfit. Perfect for parties, weddings, or festive occasions, this necklace adds confidence and elegance to your overall look.",
                image: "gold-necklace.jpg",
                stock: 50,
                brand: "Pipa Bella",
                category: CATEGORIES.JEWELLERY
            },

            {
                title: "Elegant White Dial Watch",
                price: 999,
                description: "A timeless watch featuring a clean white dial paired with a refined, minimalist design. Crafted for everyday elegance, it complements both formal and casual outfits effortlessly. The sleek finish and classic appeal make it a perfect accessory for those who appreciate understated sophistication.",
                image: "titanwatch.jpg",
                stock: 30,
                brand: "Titan",
                category: CATEGORIES.WATCH,
                color: "White"
            },


            {
                title: "Silver Statement Necklace",
                price: 299,
                description: "A bold and eye-catching silver necklace designed to make a statement. Featuring a polished finish and modern detailing, it adds instant elegance to any outfit. Perfect for special occasions or elevating a simple look with a touch of shine.",
                image: "necklace.jpg",
                stock: 45,
                brand: "Giva",
                category: CATEGORIES.JEWELLERY
            },


            {
                title: "Gold Chain",
                price: 199,
                description: "A timeless golden chain with a sleek and refined design. Crafted to be worn effortlessly on its own or layered with pendants, it adds a subtle touch of luxury to both everyday and occasion wear.",
                image: "necklace.jpg",
                stock: 5,
                brand: "Giva",
                category: CATEGORIES.JEWELLERY
            },


            {
                title: "Minimalist Charm Necklace",
                price: 349,
                description: "A delicate minimalist charm necklace designed for effortless elegance. Its clean lines and subtle charm make it perfect for everyday wear, adding a graceful accent without overpowering your look.",
                image: "necklace.jpg",
                stock: 15,
                brand: "Pipa Bella",
                category: CATEGORIES.JEWELLERY
            },


            {
                title: "Layered Necklace",
                price: 399,
                description: "A stylish layered necklace featuring multiple delicate chains that create a chic, modern look. Perfect for adding depth and elegance to both casual and dressy outfits, it makes a subtle statement with minimal effort.",
                image: "necklace.jpg",
                stock: 90,
                brand: "Pipa Bella",
                category: CATEGORIES.JEWELLERY
            },


            {
                title: "Classic Men’s Watch",
                price: 1099,
                description: "A timeless men’s watch designed with a clean dial and refined detailing. Crafted to balance style and functionality, it’s ideal for everyday wear as well as formal occasions, adding a touch of classic sophistication to any look.",
                image: "necklace.jpg",
                stock: 200,
                brand: "Fastrack",
                category: CATEGORIES.WATCH
            },


            {
                title: "Hydrating Aloe Vera Moisturizer",
                price: 499,
                description: "A lightweight, soothing moisturizer enriched with aloe vera to deeply hydrate and calm the skin. It helps lock in moisture, reduce dryness, and leave your skin feeling soft, fresh, and comfortably nourished throughout the day.",
                image: "necklace.jpg",
                stock: 60,
                brand: "Mamaearth",
                category: CATEGORIES.SKINCARE
            },

            {
                title: "Vitamin-E Moisturizer",
                price: 549,
                description: "A nourishing moisturizer infused with Vitamin E to protect and repair the skin’s natural barrier. It provides long-lasting hydration, helps improve skin texture, and leaves your skin smooth, healthy, and naturally radiant.",
                image: "necklace.jpg",
                stock: 180,
                brand: "Plum Goodness",
                category: CATEGORIES.SKINCARE
            },


            {
                title: "Nude Hydrating Lipstick",
                price: 399,
                description: "A soft nude lipstick formulated to deliver intense hydration with a smooth, creamy finish. It enhances your natural lip color while keeping lips moisturized, comfortable, and effortlessly elegant throughout the day.",
                image: "necklace.jpg",
                stock: 187,
                brand: "Mars",
                category: CATEGORIES.MAKEUP,
                color: "Nude"
            },


            {
                title: "Hydrating Face Moisturizer",
                price: 499,
                description: "A lightweight, deeply hydrating face moisturizer that nourishes the skin and locks in moisture for long-lasting softness. It absorbs quickly without feeling greasy, leaving your skin refreshed, smooth, and naturally radiant.",
                image: "necklace.jpg",
                stock: 87,
                brand: "Mamaearth",
                category: CATEGORIES.SKINCARE
            },

            {
                title: "Classic Black Watch",
                price: 1199,
                description: "A timeless classic black watch designed for everyday elegance and versatility. Featuring a sleek black dial and a refined strap, it complements both formal and casual outfits while offering reliable timekeeping and lasting comfort.",
                image: "necklace.jpg",
                stock: 68,
                brand: "Fastrack",
                category: CATEGORIES.WATCH,
                color: "Black"
            },

            {
                title: "Rose Pink Hydrating Lip Gloss",
                price: 399,
                description: "A glossy rose-pink lip gloss that delivers intense hydration with a smooth, non-sticky finish. Enhances your natural lip color with a soft shine while keeping lips moisturized and comfortable throughout the day.",
                image: "necklace.jpg",
                stock: 78,
                brand: "Sugar",
                category: CATEGORIES.MAKEUP,
                color: "Pink"
            },

            {
                title: "Brick Red Lipstick",
                price: 290,
                description: "A rich brick-red lipstick with a bold, timeless shade that adds instant elegance to your look. Its creamy formula glides on smoothly, offering long-lasting color with a comfortable, hydrating feel.",
                image: "necklace.jpg",
                stock: 28,
                brand: "Mars",
                category: CATEGORIES.MAKEUP,
                color: "Red"
            },


            {
                title: "Shimmer Pink Lip Gloss",
                price: 350,
                description: "A glossy shimmer pink lip gloss that adds a soft sparkle and a fresh, radiant shine to your lips. Lightweight and non-sticky, it enhances your natural lip color while keeping lips smooth and hydrated.",
                image: "necklace.jpg",
                stock: 328,
                brand: "Mayblline",
                category: CATEGORIES.MAKEUP,
                color: "Pink"
            },


            {
                title: "Matte Face Compact",
                price: 300,
                description: "A lightweight matte face compact that helps control oil and shine for a smooth, flawless finish. It evens out skin tone, blurs minor imperfections, and is perfect for everyday touch-ups without feeling heavy on the skin.",
                image: "necklace.jpg",
                stock: 98,
                brand: "Mayblline",
                category: CATEGORIES.MAKEUP
            },


            {
                title: "Earthy Tone Palettes",
                price: 340,
                description: "A versatile eyeshadow palette featuring warm, earthy shades inspired by natural tones. Perfect for creating soft everyday looks as well as deeper, bold eye makeup, with blendable textures and rich color payoff.",
                image: "necklace.jpg",
                stock: 78,
                brand: "Mars",
                category: CATEGORIES.MAKEUP
            },


            {
                title: "Glow Radiance Highlighter",
                price: 340,
                description: "A luminous highlighter designed to enhance your natural glow with a radiant, light-reflecting finish. Smooth and silky in texture, it blends effortlessly to give your skin a healthy, dewy shimmer without looking overpowering.",
                image: "necklace.jpg",
                stock: 56,
                brand: "Mayblline",
                category: CATEGORIES.MAKEUP
            },


            {
                title: "Peach Pink Blusher",
                price: 400,
                description: "A soft peach-pink blusher that adds a fresh, natural flush to your cheeks. Its lightweight, blendable formula gives a smooth finish and enhances your complexion with a subtle, healthy glow suitable for everyday wear.",
                image: "necklace.jpg",
                stock: 51,
                brand: "Swiss Beauty",
                category: CATEGORIES.MAKEUP,
                color: "Pink"
            },


            {
                title: "Coco Eau de Parfum",
                price: 500,
                description: "A luxurious and timeless fragrance with a rich blend of warm, floral, and slightly spicy notes. Coco Eau de Parfum leaves a long-lasting, elegant trail that feels sophisticated and confident, perfect for both special occasions and evening wear.",
                image: "necklace.jpg",
                stock: 11,
                brand: "Bella Vita",
                category: CATEGORIES.FRAGRANCE
            },

            {
                title: "Sauvage Eau de Toilette",
                price: 800,
                description: " A bold and invigorating fragrance with fresh, spicy, and woody notes. Dior Sauvage Eau de Toilette exudes confidence and masculinity, making it perfect for everyday wear as well as evening outings.",
                image: "necklace.jpg",
                stock: 1,
                brand: "Wild Stone",
                category: CATEGORIES.FRAGRANCE
            },

            {
                title: "Bloom Eau de Perfume",
                price: 900,
                description: "A luxurious and feminine fragrance with delicate floral notes that evoke elegance and grace. Bloom Eau de Parfum captures the essence of fresh blossoms, creating a soft, romantic, and timeless scent.",
                image: "necklace.jpg",
                stock: 21,
                brand: "Renne",
                category: CATEGORIES.FRAGRANCE


            },

            {
                title: "Blue Pour Perfume",
                price: 400,
                description: "A bold and modern fragrance with a captivating blend of citrus, aquatic, and woody notes. Dylan Blue Pour Perfume exudes confidence and sophistication, perfect for making a strong, memorable impression.",
                image: "necklace.jpg",
                stock: 45,
                brand: "Bella Vita",
                category: CATEGORIES.FRAGRANCE
            },


            {
                title: "Orient Electric Desk Fan",
                price: 699,
                description: "A powerful and efficient desk fan designed to keep you cool and comfortable. With adjustable speed settings and a sleek design, the Orient Electric Desk Fan is perfect for home or office use.",
                image: "necklace.jpg",
                stock: 5,
                brand: "CoolAir",
                category: CATEGORIES.ELECTRONICS
            },


            {
                title: "Round Neck T-Shirt",
                price: 449,
                description: "A classic round neck t-shirt made from soft, breathable fabric for all-day comfort. Perfect for casual wear, layering, or pairing with your favorite jeans or shorts.",
                image: "necklace.jpg",
                stock: 20,
                brand: "CottonEase",
                category: CATEGORIES.MEN,
                type: "Western",
                color: "White"
            },



            {
                title: "Men’s Classic Formal Pant",
                price: 1199,
                description: "A tailored men’s classic formal pant crafted from premium fabric, offering a sharp, polished look. Ideal for office wear, formal events, or professional meetings.",
                image: "necklace.jpg",
                stock: 78,
                brand: "PureCotton Co.",
                category: CATEGORIES.MEN,
                type: "Formal",
                color: "Gray"
            },



            {
                title: "Women’s Woolen Pullover",
                price: 1299,
                description: "A cozy and stylish women’s woolen pullover, designed to keep you warm while adding a touch of elegance to your winter wardrobe. Perfect for casual outings or layering during chilly days.",
                image: "necklace.jpg",
                stock: 300,
                brand: "WoolAura",
                category: CATEGORIES.WOMEN,
                type: "Western",
                color: "Beige"
            },



            {
                title: "Anti-Dandruff Shampoo",
                price: 399,
                description: "A gentle yet effective anti-dandruff shampoo that helps remove flakes, soothe the scalp, and maintain healthy, clean, and manageable hair. Ideal for regular use to keep your hair fresh and dandruff-free.",
                image: "necklace.jpg",
                stock: 50,
                brand: "NutriScalp",
                category: CATEGORIES.HAIRCARE
            },


            {
                title: "L’Oréal Color Protect Shampoo",
                price: 749,
                description: "A nourishing shampoo specially formulated to protect and preserve hair color, keeping it vibrant and shiny while gently cleansing and strengthening each strand. Perfect for color-treated hair.",
                image: "necklace.jpg",
                stock: 51,
                brand: "L’Oréal",
                category: CATEGORIES.HAIRCARE
            },



            {
                title: "L’Oréal Protein Shampoo",
                price: 699,
                description: "A revitalizing shampoo enriched with protein to strengthen and repair damaged hair, leaving it soft, smooth, and resilient while promoting healthy hair growth.",
                image: "necklace.jpg",
                stock: 67,
                brand: "L’Oréal",
                category: CATEGORIES.HAIRCARE
            },


            {
                title: "Phillips Hair Dryer",
                price: 999,
                description: "A powerful hair dryer designed for quick and efficient drying, featuring multiple heat and speed settings to give smooth, frizz-free hair with a professional finish.",
                image: "necklace.jpg",
                stock: 7,
                brand: "Phillips",
                category: CATEGORIES.ELECTRONICS
            },


            {
                title: "ProStyle Hair Curler",
                price: 1499,
                description: "A sleek and easy-to-use hair curler that creates long-lasting, bouncy curls while protecting hair from heat damage with advanced temperature control.",
                image: "necklace.jpg",
                stock: 10,
                brand: "Agaro",
                category: CATEGORIES.ELECTRONICS
            },

            {
                title: "Rose Gold Charm Ring",
                price: 299,
                description: "A delicate and stylish rose gold ring featuring a charming accent, perfect for adding a touch of elegance and sophistication to any outfit.",
                image: "necklace.jpg",
                stock: 250,
                brand: "Giva",
                category: CATEGORIES.JEWELLERY
            },
            {
                title: "Silver Shine Ring",
                price: 349,
                description: "A sleek and polished silver ring with a radiant shine, designed to add a subtle yet sophisticated touch to your everyday look.",
                image: "necklace.jpg",
                stock: 69,
                brand: "Pipa Bella",
                category: CATEGORIES.JEWELLERY
            },
            {
                title: "Golden Elegance Ring",
                price: 399,
                description: "A luxurious gold ring with a timeless design, exuding elegance and sophistication for special occasions or daily wear.",
                image: "necklace.jpg",
                stock: 77,
                brand: "Pipa Bella",
                category: CATEGORIES.JEWELLERY
            },
            {
                title: "Elegant White Heels",
                price: 799,
                description: "Chic white heels with a sleek design, perfect for adding a touch of elegance and style to any outfit.",
                image: "necklace.jpg",
                stock: 430,
                brand: "StepEase",
                category: CATEGORIES.FOOTWEAR,
                color: "White"
            },
            {
                title: "Chic Black Heels",
                price: 699,
                description: "Sophisticated black heels designed for both comfort and style,Perfect for evening events or elevating your everyday look with a touch of elegance.",
                image: "necklace.jpg",
                stock: 78,
                brand: "StepEase",
                category: CATEGORIES.FOOTWEAR,
                color: "Black"
            },

            {
                title: "Classic Black Heels",
                price: 599,
                description: "Timeless black heels that blend elegance with versatility.Ideal for formal occasions or adding a polished finish to any outfit.",
                image: "necklace.jpg",
                stock: 30,
                brand: "Nike",
                category: CATEGORIES.FOOTWEAR,
                color: "Black"
            },

            {
                title: "Men’s Black Leather Jacket",
                price: 3999,
                description: "A sleek black leather jacket crafted for style and durability.Perfect for casual outings or adding an edgy touch to your wardrobe.",
                image: "necklace.jpg",
                stock: 14,
                brand: "Savana",
                category: CATEGORIES.MEN,
                type: "Jacket",
                color: "Black"
            },

            {
                title: "Nude Tone Gym Set",
                price: 1099,
                description: "A comfortable and stylish nude-toned gym set designed for flexibility and ease of movement.Ideal for workouts or athleisure wear, combining performance with a chic look.",
                image: "necklace.jpg",
                stock: 40,
                brand: "FitFlex",
                category: CATEGORIES.FITNESS,
                type: "Gym Wear",
                color: "Beige"
            },
            {
                title: "Gray Melange Workout Set",
                price: 999,
                description: "A versatile gray melange workout set crafted for comfort and breathability.Perfect for yoga, gym sessions, or casual athleisure wear with a sleek, modern look.",
                image: "necklace.jpg",
                stock: 240,
                brand: "FitFlex",
                category: CATEGORIES.FITNESS,
                type: "Gym Wear",
                color: "Gray"
            },
            {
                title: "Sleek Black Activewear Set",
                price: 999,
                description: "A sleek black activewear set designed for maximum comfort and flexibility.Ideal for workouts, running, or athleisure, combining style with performance.",
                image: "necklace.jpg",
                stock: 180,
                brand: "FitFlex",
                category: CATEGORIES.FITNESS,
                type: "Gym Wear",
                color: "Black"
            },

            {
                title: "Soft Pink Fitness Set",
                price: 1049,
                description: "A soft pink fitness set that blends comfort and style effortlessly.Perfect for yoga, gym sessions, or casual athleisure wear.",
                image: "necklace.jpg",
                stock: 400,
                brand: "FitFlex",
                category: CATEGORIES.FITNESS,
                type: "Gym Wear",
                color: "Pink"
            },

            {
                title: "Wine Color Salwar Suit",
                price: 799,
                description: "A rich wine-colored salwar suit that exudes elegance and tradition.Perfect for festive occasions, family gatherings, or cultural celebrations.",
                image: "necklace.jpg",
                stock: 350,
                brand: "EthnicCharm",
                category: CATEGORIES.ETHNIC,
                type: "Ethnic",
                color: "Wine"
            },

            {
                title: "Pastel Color Salwar Suit",
                price: 799,
                description: "A soft pastel-colored salwar suit that radiates grace and charm.Lightweight and comfortable, ideal for daytime events and casual gatherings.",
                image: "necklace.jpg",
                stock: 90,
                brand: "EthnicCharm",
                category: CATEGORIES.ETHNIC,
                type: "Ethnic",
                color: "Pastel"
            },

            {
                title: "Navy Blue Salwar Suit",
                price: 1099,
                description: "A deep navy blue salwar suit that exudes elegance and sophistication.Perfect for festive occasions or evening gatherings, combining style with comfort.",
                image: "necklace.jpg",
                stock: 89,
                brand: "EthnicCharm",
                category: CATEGORIES.ETHNIC,
                type: "Ethnic",
                color: "Blue"
            },

            {
                title: "Pink Salwar Suit",
                price: 999,
                description: "A lovely pink salwar suit that radiates charm and femininity.Designed for comfort and style, perfect for casual outings or festive celebrations.",
                image: "necklace.jpg",
                stock: 59,
                brand: "EthnicCharm",
                category: CATEGORIES.ETHNIC,
                type: "Ethnic",
                color: "Pink"
            },

            {
                title: "Mint Green Chikankari Kurti",
                price: 1099,
                description: "A refreshing mint green Chikankari kurti with delicate embroidery detailing.Lightweight and elegant, ideal for festive occasions or casual gatherings.",
                image: "necklace.jpg",
                stock: 54,
                brand: "EthnicAura",
                category: CATEGORIES.ETHNIC,
                type: "Ethnic",
                color: "Green"
            },

            {
                title: "Elegant White Chikankari Kurti",
                price: 1199,
                description: "A graceful white Chikankari kurti featuring intricate hand-embroidered patterns.Perfect for festive occasions or casual day outings, offering both comfort and style.",
                image: "necklace.jpg",
                stock: 30,
                brand: "EthnicAura",
                category: CATEGORIES.ETHNIC,
                type: "Ethnic",
                color: "White"
            },

            {
                title: "Sunny Yellow Anarkali Kurti",
                price: 599,
                description: "A vibrant sunny yellow Anarkali kurti with delicate embroidery and flared silhouette.Ideal for festive celebrations or special gatherings, combining elegance with comfort.",
                image: "necklace.jpg",
                stock: 250,
                brand: "EthnicAura",
                category: CATEGORIES.ETHNIC,
                type: "Ethnic",
                color: "Yellow"
            },

            {
                title: "Classic Black Salwar Suit",
                price: 1499,
                description: "A timeless classic black salwar suit featuring subtle embroidery and a graceful cut.Perfect for formal occasions or evening events, exuding sophistication and elegance.",
                image: "necklace.jpg",
                stock: 190,
                brand: "EthnicCharm",
                category: CATEGORIES.ETHNIC,
                type: "Ethnic",
                color: "Black"
            },

            {
                title: "Soft Pastel Saree",
                price: 1299,
                description: "A delicate soft pastel saree in soothing hues with subtle embroidery.Ideal for daytime events or festive occasions, offering a graceful and elegant look.",
                image: "necklace.jpg",
                stock: 48,
                brand: "EthnicAura",
                category: CATEGORIES.ETHNIC,
                type: "Ethnic",
                color: "Pastel"
            },

            {
                title: "Light Green Chiffon Saree",
                price: 1299,
                description: "A flowing light green chiffon saree with a delicate shimmer and soft drape.Perfect for casual gatherings or summer events, exuding freshness and elegance.",
                image: "necklace.jpg",
                stock: 99,
                brand: "EthnicAura",
                category: CATEGORIES.ETHNIC,
                type: "Ethnic",
                color: "Green"
            },

            {
                title: "Party Wear Pink Saree",
                price: 1499,
                description: "A vibrant party wear pink saree with intricate embroidery and sequined accents.Designed to make a statement, it’s perfect for weddings, receptions, and festive occasions.",
                image: "necklace.jpg",
                stock: 41,
                brand: "FestiveGrace",
                category: CATEGORIES.ETHNIC,
                type: "Ethnic",
                color: "Pink"
            },

            {
                title: "Purple Tissue Saree",
                price: 1899,
                description: "A luxurious purple tissue saree with delicate zari work and subtle shimmer.Perfect for festive occasions or evening events, adding elegance and charm to your look.",
                image: "necklace.jpg",
                stock: 130,
                brand: "FestiveGrace",
                category: CATEGORIES.ETHNIC,
                type: "Ethnic",
                color: "Purple"
            },

            {
                title: "Pastel Purple Bridal Lehenga",
                price: 5999,
                description: "A dreamy pastel purple bridal lehenga adorned with intricate embroidery and delicate sequins.Ideal for weddings and special celebrations, radiating elegance and sophistication.",
                image: "necklace.jpg",
                stock: 110,
                brand: "BridalElegance",
                category: CATEGORIES.ETHNIC,
                type: "Ethnic",
                color: "Purple"
            },

            {
                title: "Red Bridal Lehenga",
                price: 7999,
                description: "A stunning red bridal lehenga featuring elaborate zari and sequin work.Perfect for traditional weddings, exuding timeless elegance and festive charm.",
                image: "necklace.jpg",
                stock: 10,
                brand: "BridalElegance",
                category: CATEGORIES.ETHNIC,
                type: "Ethnic",
                color: "Red"
            },

            {
                title: "Pastel Nude Bridal Lehenga",
                price: 3799,
                description: "A delicate pastel nude bridal lehenga adorned with subtle embroidery and soft embellishments.Ideal for a graceful and understated wedding look, radiating elegance and sophistication.",
                image: "necklace.jpg",
                stock: 15,
                brand: "BridalElegance",
                category: CATEGORIES.ETHNIC,
                type: "Ethnic",
                color: "Pastel"
            },

            {
                title: "Elegant Sarara Set",
                price: 2499,
                description: "An elegant sarara set featuring a flowing kurta paired with flared pants, delicately embellished for a festive and stylish appearance.Perfect for special occasions and traditional celebrations.",
                image: "necklace.jpg",
                stock: 20,
                brand: "EthnicAura",
                category: CATEGORIES.ETHNIC,
                type: "Ethnic",
                color: "Nude"
            },

            {
                title: "Yellow Embroidered Lehenga",
                price: 3299,
                description: "A vibrant yellow lehenga adorned with intricate embroidery, perfect for festive occasions and wedding celebrations.Its bright hue and detailed craftsmanship make it a standout traditional outfit.",
                image: "necklace.jpg",
                stock: 201,
                brand: "FestiveGrace",
                category: CATEGORIES.ETHNIC,
                type: "Ethnic",
                color: "Yellow"
            },

            {
                title: "Wine Tube Bodycon Dress",
                price: 1799,
                description: "A chic wine-colored bodycon dress with a sleek tube design, perfect for evening parties or cocktail events.Its form-fitting silhouette highlights elegance and modern style.",
                image: "necklace.jpg",
                stock: 215,
                brand: "GlamWear",
                category: CATEGORIES.WOMEN,
                type: "Bodycon",
                color: "Wine"
            },

            {
                title: "Classic Black Bodycon Dress",
                price: 1499,
                description: "A timeless black bodycon dress with a flattering, figure-hugging fit.Perfect for formal events or a stylish night out, exuding elegance and sophistication.",
                image: "necklace.jpg",
                stock: 251,
                brand: "GlamWear",
                category: CATEGORIES.WOMEN,
                type: "Bodycon",
                color: "Black"
            },

            {
                title: "Sky Blue Bodycon Dress",
                price: 1299,
                description: "A chic sky blue bodycon dress that highlights a sleek and modern silhouette.Ideal for casual parties or evening outings, offering a fresh and vibrant look.",
                image: "necklace.jpg",
                stock: 205,
                brand: "GlamWear",
                category: CATEGORIES.WOMEN,
                type: "Bodycon",
                color: "Blue"
            },

            {
                title: "Vertical Striped Bodycon Dress",
                price: 1199,
                description: "A stylish vertical striped bodycon dress that elongates the figure and adds a trendy flair.Perfect for casual events or evening gatherings, combining comfort with contemporary style.",
                image: "necklace.jpg",
                stock: 105,
                brand: "GlamWear",
                category: CATEGORIES.WOMEN,
                type: "Bodycon"

            },

            {
                title: "Off-Shoulder Bodycon Dress",
                price: 1799,
                description: "A chic off-shoulder bodycon dress that highlights your neckline and shoulders.Ideal for parties or dinner dates, offering a blend of elegance and modern style.",
                image: "necklace.jpg",
                stock: 65,
                brand: "GlamWear",
                category: CATEGORIES.WOMEN,
                type: "Bodycon"

            },

            {
                title: "Washed Blue Jacket",
                price: 1499,
                description: "A stylish washed blue jacket with a relaxed fit and casual vibe.Perfect for layering over tees or shirts for a trendy, effortless look.",
                image: "necklace.jpg",
                stock: 20,
                brand: "UrbanEdge",
                category: CATEGORIES.MEN,
                type: "Jacket",
                color: "Blue"
            },

            {
                title: "Urban Casual Denim Outfit",
                price: 1599,
                description: "A trendy urban casual denim outfit crafted for comfort and style.Ideal for city strolls or casual meet-ups, giving a laid-back yet fashionable look.",
                image: "necklace.jpg",
                stock: 0,
                brand: "DenimVibe",
                category: CATEGORIES.MEN,
                type: "Denim",
                color: "Blue"
            },

            {
                title: "Denim Jacket",
                price: 1799,
                description: "A classic denim jacket with a timeless design.Perfect for layering over any outfit, adding both style and casual comfort.",
                image: "necklace.jpg",
                stock: 0,
                brand: "DenimVibe",
                category: CATEGORIES.MEN,
                type: "Jacket",
                color: "Blue"
            },

            {
                title: "Classic Blue Denim Jacket",
                price: 1299,
                description: "A versatile blue denim jacket with a clean, timeless design.Ideal for casual outings or layering over shirts and tees for a stylish look.",
                image: "necklace.jpg",
                stock: 30,
                brand: "DenimVibe",
                category: CATEGORIES.MEN,
                type: "Jacket",
                color: "Blue"
            },

            {
                title: "Women’s Ripped Jeans",
                price: 1499,
                description: "Trendy ripped jeans for a casual, edgy look.Comfortable fit with a modern distressed design perfect for everyday wear.",
                image: "necklace.jpg",
                stock: 6,
                brand: "UrbanEdge",
                category: CATEGORIES.WOMEN,
                type: "Denim",

            },

            {
                title: "Sofa Set",
                price: 2000,
                description: "A comfortable and stylish sofa set, perfect for living rooms, adding elegance and relaxation to your home.",
                image: "sofa-set.jpg",
                stock: 15,
                brand: "HomeComfort",
                category: CATEGORIES.FURNITURES,
                isNew: true
            },
            {
                title: "Recliner Chair",
                price: 759,
                description: "Ergonomic recliner chair for ultimate comfort, perfect for lounging or reading.",
                image: "recliner-chair.jpg",
                stock: 20,
                brand: "HomeComfort",
                category: CATEGORIES.FURNITURES
            },
            {
                title: "Table",
                price: 859,
                description: "A sturdy and elegant table, ideal for dining or workspaces, blending functionality with style.",
                image: "table.jpg",
                stock: 30,
                brand: "HomeComfort",
                category: CATEGORIES.FURNITURES
            },
            {
                title: "TV",
                price: 800,
                description: "Modern TV with sleek design, perfect for entertainment setups at home.",
                image: "tv.jpg",
                stock: 25,
                brand: "ElectroHome",
                category: CATEGORIES.FURNITURES,
                isOnSale: true,
                discountPercentage: 15
            },
            {
                title: "Dressing Table",
                price: 440,
                description: "Elegant dressing table with mirror and storage, perfect for bedrooms.",
                image: "dressing-table.jpg",
                stock: 10,
                brand: "HomeComfort",
                category: CATEGORIES.FURNITURES
            },
            {
                title: "Bookshelf",
                price: 650,
                description: "Stylish bookshelf to organize books and decor, combining practicality with aesthetics.",
                image: "bookshelf.jpg",
                stock: 12,
                brand: "HomeComfort",
                category: CATEGORIES.FURNITURES
            },
            {
                title: "Bed",
                price: 699,
                description: "Comfortable bed with solid frame and modern design, ideal for a good night’s sleep.",
                image: "bed.jpg",
                stock: 18,
                brand: "SleepWell",
                category: CATEGORIES.FURNITURES,
                isNew: true
            },
            {
                title: "Closet",
                price: 600,
                description: "Spacious closet to organize clothes and accessories, crafted for durability and style.",
                image: "closet.jpg",
                stock: 14,
                brand: "HomeComfort",
                category: CATEGORIES.FURNITURES
            },
            {
                title: "Closet",
                price: 699,
                description: "Premium closet with modern design, perfect for bedrooms requiring extra storage.",
                image: "closet-2.jpg",
                stock: 8,
                brand: "HomeComfort",
                category: CATEGORIES.FURNITURES,
                isOnSale: true,
                discountPercentage: 10
            },

            {
                title: "Smartphone",
                price: 19800,
                description: "High-performance smartphone with sleek design, perfect for work, entertainment, and photography.",
                image: "smartphone.jpg",
                stock: 25,
                brand: "TechZone",
                category: CATEGORIES.ELECTRONICS,
                isNew: true
            },
            {
                title: "Tablet",
                price: 2759,
                description: "Lightweight tablet with vivid display and long battery life, ideal for reading and streaming.",
                image: "tablet.jpg",
                stock: 30,
                brand: "TechZone",
                category: CATEGORIES.ELECTRONICS
            },
            {
                title: "Smartwatch",
                price: 8859,
                description: "Smartwatch with health tracking, notifications, and stylish design for daily use.",
                image: "smartwatch.jpg",
                stock: 20,
                brand: "TechZone",
                category: CATEGORIES.ELECTRONICS,
                isOnSale: true,
                discountPercentage: 10
            },
            {
                title: "Power Bank",
                price: 800,
                description: "Portable power bank with fast charging, perfect for keeping your devices powered on the go.",
                image: "power-bank.jpg",
                stock: 40,
                brand: "TechZone",
                category: CATEGORIES.ELECTRONICS
            },
            {
                title: "Wireless Earbuds",
                price: 440,
                description: "Compact wireless earbuds with clear sound and long battery life, ideal for music and calls.",
                image: "wireless-earbuds.jpg",
                stock: 50,
                brand: "TechZone",
                category: CATEGORIES.ELECTRONICS
            },
            {
                title: "Laptop",
                price: 650,
                description: "Versatile laptop for work and entertainment, combining power, speed, and portability.",
                image: "laptop.jpg",
                stock: 15,
                brand: "TechZone",
                category: CATEGORIES.ELECTRONICS,
                isNew: true
            },
            {
                title: "Electric Kettle",
                price: 699,
                description: "Fast-boiling electric kettle with safety features, perfect for tea, coffee, or instant meals.",
                image: "electric-kettle.jpg",
                stock: 35,
                brand: "HomeAppliance",
                category: CATEGORIES.ELECTRONICS
            },
            {
                title: "Coffee Maker",
                price: 600,
                description: "Automatic coffee maker for fresh and aromatic coffee at home, easy to use and clean.",
                image: "coffee-maker.jpg",
                stock: 20,
                brand: "HomeAppliance",
                category: CATEGORIES.ELECTRONICS
            },
            {
                title: "Gaming Controller",
                price: 699,
                description: "Ergonomic gaming controller for an immersive gaming experience with responsive controls.",
                image: "gaming-controller.jpg",
                stock: 25,
                brand: "TechZone",
                category: CATEGORIES.ELECTRONICS,
                isOnSale: true,
                discountPercentage: 5
            }



        ];


        // 4️⃣ Insert into DB
        const inserted = await Product.insertMany(products);
        console.log(`Inserted ${inserted.length} products`);

        // 5️⃣ Disconnect
        await mongoose.disconnect();
        console.log("Seeding completed successfully");

    } catch (error) {
        console.error("Seeding failed ❌", error);
        process.exit(1);
    }
};

run();
