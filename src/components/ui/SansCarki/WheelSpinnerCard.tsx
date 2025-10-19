// import  { useState } from "react";
// import { Card,  } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { motion } from "framer-motion";

// const WheelSpinner = () => {
//   const [isSpinning, setIsSpinning] = useState(false);
//   const [rotation, setRotation] = useState(0);

//   const prizes = [
//     { value: 1000, color: "from-red-700 to-red-500" },
//     { value: 750, color: "from-orange-700 to-orange-500" },
//     { value: 500, color: "from-yellow-600 to-yellow-400" },
//     { value: 250, color: "from-green-700 to-green-500" },
//     { value: 150, color: "from-amber-700 to-amber-500" },
//     { value: 100, color: "from-blue-900 to-blue-700" },
//     { value: 75, color: "from-indigo-900 to-indigo-700" },
//     { value: 50, color: "from-black to-gray-800" },
//   ];

//   const handleSpin = () => {
//     if (isSpinning) return;
//     setIsSpinning(true);

//     // Random spin (between 3 and 6 full rotations + random segment)
//     const randomRotation = 360 * (3 + Math.floor(Math.random() * 3)) + Math.floor(Math.random() * 360);
//     setRotation(rotation + randomRotation);

//     setTimeout(() => {
//       setIsSpinning(false);
//     }, 4000); // Match the animation duration
//   };

//   return (
//     <Card className="flex flex-col items-center p-6 gap-4">
//       <h2 className="text-2xl font-bold text-center">🎯 Ekocoin Çarkı</h2>
//       <div className="relative w-72 h-72">
//         <motion.div
//           className="absolute w-full h-full rounded-full border-4 border-gray-200 overflow-hidden"
//           animate={{ rotate: rotation }}
//           transition={{ duration: 4, ease: "easeOut" }}
//         >
//           {prizes.map((prize, index) => (
//             <div
//               key={index}
//               className={`absolute w-1/2 h-1/2 origin-bottom-left bg-gradient-to-br ${prize.color}`}
//               style={{
//                 transform: `rotate(${index * 45}deg) skewY(-45deg)`
//               }}
//             >
//               <div
//                 className="absolute w-full h-full flex justify-center items-center text-white font-bold text-sm rotate-45"
//               >
//                 {prize.value} Ekocoin
//               </div>
//             </div>
//           ))}
//         </motion.div>
//         <div className="absolute top-1/2 left-1/2 w-12 h-12 bg-white rounded-full border-2 border-gray-400 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
//           <div className="w-0 h-0 border-l-8 border-r-8 border-b-16 border-transparent border-b-black"></div>
//         </div>
//       </div>
//       <Button
//         onClick={handleSpin}
//         disabled={isSpinning}
//         className="bg-green-500 hover:bg-green-600 text-white"
//       >
//         {isSpinning ? "Dönüyor..." : "Çevir!"}
//       </Button>
//     </Card>
//   );
// };

// export default WheelSpinner;
