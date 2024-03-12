import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
/**
 * @param {number} n
 * @return {boolean}
 */
/**
 * @param {number} n
 * @return {boolean}
 */
//202

// var isHappy = function(n) {
//   if(n==1) return true

//   let s = String(n).split('');

//   let result = power(s);
// let seen = new Set();
//   while (result !== 1 && !seen.has(result)) {
// seen.add(result);
//       s = String(result).split('');

//       result = power(s);

//   }

//   return result === 1;
// };

// let power = (s) => {
//   return s.reduce((acc, value) => {
//       return acc + Math.pow(parseInt(value), 2);
//   }, 0);
// };

//1893
// var isCovered = function(ranges, left, right) {
//   const numsSet = new Set();
//   for (const [start, end] of ranges) {
//       for (let i = start; i <= end; i++) {
//           numsSet.add(i);
//       }
//   }

//   for (let i = left; i <= right; i++) {
//       if (!numsSet.has(i)) {
//           return false;
//       }
//   }

//   return true;
// };

//1588
// let result = 0;

//     for (let i = 0; i < arr.length; i++) {
//         for (let j = i; j < arr.length; j += 2) {
//             for (let k = i; k <= j; k++) {
//                 result += arr[k];
//             }
//         }
//     }

//     return result;

// 2264
// var largestGoodInteger = function (num) {
//   let max = "";
//   for (let i = 2; i < num.length; i++) {
//     if (num[i] === num[i - 1] && num[i] === num[i - 2]) {
//       const subString = num[i].repeat(3);
//       console.log(subString,"kkkk");
//       if (subString > max) {
//         max = subString;
//       }
//     }
//   }
//   return max;
// };
