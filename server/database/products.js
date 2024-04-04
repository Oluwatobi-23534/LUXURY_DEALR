export const categories = [
  {
    name: "Electronics",
    subcategories: [
      {
        name: "Home Electronics",
        items: [
          "Hisense Uhd Smart TV With Bluetooth +3 Hdmi",
          "Sumec Firman A6000E2 4.2kva Generator",
          "Maxi 90/60cm With Auto Ignition Oven",
          "Rite-tek Air Fryer",
          "Usha Mixer Blender & Grinder",
          "LG Xboom On2d",
          "Refrigerator",
          "Split Inverter Air Conditioner",
          "Microwave Oven",
          "Washing Machine",
        ],
      },
    ],
  },


  {
    name: "VR Products",
    subcategories: [
      {
        name: "Virtual Reality Headsets",
        items: [
          "Play station VR2 headset",
          "Meta Oculus Quest 2 headset",
          "Apple VR headset",
          "Meta Quest 3 headset",
          "Meta Quest Pro headset",
          "Pico 4 VR headset",
          "Apara 5K VR headset",
          "Vive Focus 3 headset",
          "Bigscreen Beyond VR headset",
          "Logitech Chorus Speaker add-on",
        ],
      },
    ],
  },
  // Add more categories here...
];

 export const vrHeadsets = [
   {
     name: "Play station VR2 headset",
     description:
       "Experience stunning visuals with the OLED display boasting a resolution of 2000 x 2040 per eye and a refresh rate of 90Hz or 120Hz. Easily adjustable lens separation and a wide field of view of approximately 110 degrees enhance immersion. The headset incorporates advanced motion sensing technology, 4 embedded cameras, and IR eye tracking. Enjoy tactile feedback, seamless USB Type-C® connectivity to PS5, and crystal-clear audio with built-in microphone and stereo headphone jack.",
     images: [
       "/images/Playstation-VR2-headset1.png",
       "/images/Playstation-VR2-headset2.png",
     ],
     inStock: true,
     brand: "Sony",
     category: "VR Products",
     subcategory: "Virtual Reality Headsets",
     price: 500,
     ratings: [],
   },
   {
     name: "Meta Oculus Quest 2 headset",
     description:
       "Immerse yourself in the Meta Quest 2 VR experience featuring a fast-switch LCD display with 1832 x 1920 resolution per eye and 60, 72, or 90 Hz refresh rate. Benefit from 6DOF tracking, redesigned Touch Controllers, and positional audio for realistic immersion. Access a wide range of apps and games through the Meta Quest Store and choose from 128GB or 256GB storage options for your entertainment needs.",
     images: [
       "/images/Meta-Oculus-Quest-2-headset1.png",
       "/images/Meta-Oculus-Quest-2-headset2.png",
     ],
     inStock: true,
     brand: "Meta",
     category: "VR Products",
     subcategory: "Virtual Reality Headsets",
     price: 300,
     ratings: [],
   },
   {
     name: "Apple VR headset",
     description:
       "The Apple Vision Pro headset features micro-OLED displays offering over 4K resolution per eye and an external EyeSight display to indicate usage mode. It includes custom prescription Zeiss Optical Inserts for glasses wearers, a built-in camera for 3D photos and videos, and the ability to showcase existing media in a large scale for immersive viewing. Running on the visionOS operating system, it has a dedicated App Store and can run iPhone and iPad apps, while also serving as a display for a Mac and supporting Bluetooth accessories for input and control.",
     images: ["/images/Apple-VR-headset1.png", "/images/Apple-VR-headset2.png"],
     inStock: true,
     brand: "Apple",
     category: "VR Products",
     subcategory: "Virtual Reality Headsets",
     price: 1000,
     ratings: [],
   },
   {
     name: "Meta Quest 3 headset",
     description:
       "The Meta Quest 3 Advanced VR Headset (128GB) offers a seamless blend of VR and AR through dual RGB cameras, enabling passthrough of real-world surroundings to insert virtual content. It features an enhanced XR2 Gen 2 Snapdragon processor, providing sharper VR graphics at 2064 x 2208 resolution per eye and 90Hz refresh rate. The Touch Plus controllers include TruTouch haptics for immersive interactions, and the headset is lighter and 40% slimmer than its predecessor, offering heightened comfort. It supports Wi-Fi 6E connectivity and offers a maximum battery life of 2.2 hours.",
     images: [
       "/images/Meta-Quest-3-headset1.png",
       "/images/Meta-Quest-3-headset2.png",
     ],
     inStock: true,
     brand: "Meta",
     category: "VR Products",
     subcategory: "Virtual Reality Headsets",
     price: 400,
     ratings: [],
   },
   {
     name: "Meta Quest Pro headset",
     description:
       "The Meta Quest Pro offers a premium, comfortable design with mixed reality capabilities, including stereoscopic passthrough for natural 3D viewing. Its controllers feature Snapdragon processors for intuitive motion control and offer up to 10 hours of battery life. Enhanced optics, high-performance hardware, and backwards compatibility with the Meta Quest catalog are key features. Additionally, its flexible levels of VR immersion and enhanced audio experience provide a comprehensive and immersive VR experience.",
     images: [
       "/images/Meta-Quest-Pro-headset1.png",
       "/images/Meta-Quest-Pro-headset2.png",
     ],
     inStock: true,
     brand: "Meta",
     category: "VR Products",
     subcategory: "Virtual Reality Headsets",
     price: 600,
     ratings: [],
   },
   {
     name: "Pico 4 VR headset",
     description:
       "The PICO 4 Enterprise VR headset features Omnidirectional SLAM and precise tracking with an infrared optical positioning system and improved sensors. With 6DoF haptic motion controllers and multiple cameras, it provides organic 360° movement. The headset's dual linear Super Speakers and 'Pancake' lens offer over 2K resolution and a wider 105° field of vision, while the RGB camera allows for a clear view of the environment without removing the headset.",
     images: [
       "/images/Pico-4-VR-headset1.png",
       "/images/Pico-4-VR-headset2.png",
     ],
     inStock: true,
     brand: "Pico",
     category: "VR Products",
     subcategory: "Virtual Reality Headsets",
     price: 700,
     ratings: [],
   },
   {
     name: "Apara 5K VR headset",
     description:
       "The Apara 5K VR AIO headset offers a 95° field of view with a 5120 x 2560 px resolution and a 90 Hz OLED display for high color accuracy. Powered by Qualcomm Snapdragon XR2, it weighs 380 g and includes built-in microphones, IPD and lens-to-eye adjustments, and Wi-Fi connectivity for a comfortable and immersive VR experience.",
     images: [
       "/images/Apara-5K-VR-headset1.png",
       "/images/Apara-5K-VR-headset2.png",
     ],
     inStock: true,
     brand: "Apara",
     category: "VR Products",
     subcategory: "Virtual Reality Headsets",
     price: 800,
     ratings: [],
   },
   {
     name: "Vive Focus 3 headset",
     description:
       'The VIVE Focus 3 Standalone Headset offers true wireless VR with dual 2.88" LCD screens, providing a total 4896 x 2448 resolution, 90 Hz refresh rate, and 120° field of view. Powered by Qualcomm Snapdragon XR2, it features 8GB of RAM, 128GB storage (expandable up to 2TB), and high-fidelity hand tracking. The headset includes swappable batteries, a balanced comfort design, and VIVE Business Streaming capability for various applications such as remote collaboration, training simulations, and education. For a natural fit, the headset includes the ergonomically designed VIVE Focus Controller with up to 15 hours of battery life.',
     images: [
       "/images/Vive-Focus-3-headset1.png",
       "/images/Vive-Focus-3-headset2.png",
     ],
     inStock: true,
     brand: "Vive",
     category: "VR Products",
     subcategory: "Virtual Reality Headsets",
     price: 900,
     ratings: [],
   },
   {
     name: "Bigscreen Beyond VR headset",
     description:
       "The Big Screen Beyond VR headset offers a lightweight design at 155 grams with a high resolution of 2560x2560 pixels per eye. It requires a PC connection and external base stations for full tracking and is sold without controllers. The bespoke facial interface, based on a 3D scan of the buyer's face, ensures precise fitting, reduces light bleeding, and enhances comfort. The headset also features fixed IPD settings tailored to the user's IPD based on a 3D scan at the time of purchase and utilizes pancake lenses for a compact form factor.",
     images: [
       "/images/Bigscreen-beyond-VR-headset1.png",
       "/images/Bigscreen-beyond-VR-headset2.png",
     ],
     inStock: true,
     brand: "Bigscreen",
     category: "VR Products",
     subcategory: "Virtual Reality Headsets",
     price: 1000,
     ratings: [],
   },
   {
     name: "Logitech Speaker add-on",
     description:
       "The CHORUS audio device is compatible with all three Meta Quest 2 strap options, providing ultra-realistic audio with off-ear acoustics for an immersive experience. Lightweight and comfortable, it features a flip-to-mute function and open-back audio drivers for a spacious sound stage. The quick and easy mute function activates when rotated up and out of the way, allowing for seamless transitions in and out of VR. The USB-C passthrough connection requires no battery, offering convenient and hassle-free use.",
     images: [
       "/images/Logitech-Chorus-Speaker-add-on1.png",
       "/images/Logitech-Chorus-Speaker-add-on2.png",
     ],
     inStock: true,
     brand: "Logitech",
     category: "VR Products",
     subcategory: "Virtual Reality Headsets",
     price: 200,
     ratings: [],
   },
 ];

 export const homeElectronics = [
   {
     name: "Hisense Uhd Smart TV With Bluetooth +3 Hdmi",
     description:
       "A high-definition smart TV from Hisense that offers a rich and immersive viewing experience. It comes with Bluetooth connectivity and 3 HDMI ports for multiple device connections.",
     images: ["/images/Hisense-smartTV.jpg", "/images/Hisense-smartTV2.jpg"],
     inStock: true,
     brand: "Hisense",
     category: "Electronics",
     subcategory: "Home Electronics",
     price: 500,
     ratings: [],
   },
   {
     name: "Sumec Firman A6000E2 4.2kva Generator",
     description:
       "A reliable power generator from Sumec Firman with a capacity of 4.2kva. It's designed for durability and efficient power supply, making it an excellent choice for power backup.",
     images: ["/images/Firman-Generator.jpg", "/images/Firman-Generator.jpg"],
     inStock: true,
     brand: "Sumec Firman",
     category: "Electronics",
     subcategory: "Home Electronics",
     price: 800,
     ratings: [],
   },
   {
     name: "Maxi 90/60cm With Auto Ignition Oven",
     description:
       "A versatile cooking appliance from Maxi with auto ignition feature. It has a sleek design and is equipped with 4 gas burners and 2 electric burners, providing a variety of cooking options.",
     images: ["/images/Gas-cooker.jpg", "/images/Gas-cooker.jpg"],
     inStock: true,
     brand: "Maxi",
     category: "Electronics",
     subcategory: "Home Electronics",
     price: 200,
     ratings: [],
   },

   {
     name: "Rite-tek Air Fryer",
     description:
       "A modern kitchen appliance from Rite-tek that uses hot air circulation for frying, reducing the need for oil and making your meals healthier.",
     images: ["/images/Airfryer.jpg", "/images/Airfryer.jpg"],
     inStock: true,
     brand: "Rite-tek",
     category: "Electronics",
     subcategory: "Home Electronics",
     price: 100,
     ratings: [],
   },
   {
     name: "Usha Mixer Blender & Grinder",
     description:
       "A multi-functional kitchen appliance from Usha that can mix, blend, and grind ingredients. It's designed for convenience and efficiency, making food preparation easier.",
     images: ["/images/Blender.jpg", "/images/Blender.jpg"],
     inStock: true,
     brand: "Usha",
     category: "Electronics",
     subcategory: "Home Electronics",
     price: 75,
     ratings: [],
   },
   {
     name: "LG Xboom On2d",
     description:
       "A powerful speaker from LG's Xboom series that delivers high-quality sound. It's perfect for parties and gatherings, enhancing your audio experience.",
     images: ["/images/Xboom.jpg", "/images/Xboom2.jpg"],
     inStock: true,
     brand: "LG",
     category: "Electronics",
     subcategory: "Home Electronics",
     price: 200,
     ratings: [],
   },
   {
     name: "Refrigerator",
     description:
       "A home appliance that uses thermally insulated compartments to store food at a temperature below room temperature, slowing down the bacterial growth rate and keeping the food fresh for a longer period.",
     images: ["/images/Refridgerator.jpg", "/images/Refridgerator2.jpg"],
     inStock: true,
     brand: "Generic",
     category: "Electronics",
     subcategory: "Home Electronics",
     price: 300,
     ratings: [],
   },
   {
     name: "Split Inverter Air Conditioner",
     description:
       "An air conditioner that uses inverter technology to control the speed of its compressor, adjusting its cooling capacity based on the needs. It's energy-efficient and provides consistent cooling.",
     images: ["/images/Airconditioner.jpg", "/images/Airconditioner2.jpg"],
     inStock: true,
     brand: "Generic",
     category: "Electronics",
     subcategory: "Home Electronics",
     price: 400,
     ratings: [],
   },
   {
     name: "Microwave Oven",
     description:
       "A kitchen appliance that uses high-frequency electromagnetic waves, known as microwaves, to heat food. It's a convenient tool for quickly heating or cooking food.",
     images: ["/images/Microwave.jpg", "/images//Microwave2.jpg"],
     inStock: true,
     brand: "Generic",
     category: "Electronics",
     subcategory: "Home Electronics",
     price: 150,
     ratings: [],
   },
   {
     name: "Washing Machine",
     description:
       "A home appliance designed to wash laundry. It automates the process of washing clothes, saving time and reducing physical effort.",
     images: ["/images/Washingmachine.jpg", "/images/Washingmachine.jpg"],
     inStock: true,
     brand: "Generic",
     category: "Electronics",
     subcategory: "Home Electronics",
     price: 250,
     ratings: [],
   },
 ];

