import {nextui} from "@nextui-org/react";

const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'text-gradient': 'linear-gradient(90deg, rgba(255,255,255,0.9) 0%, rgba(153,153,153,1) 90%)',
        'gradient-radial': 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgb(1, 32, 44) 50%, rgba(0,0,0,1) 100%)',
      },
    },
  },
  darkMode: "class",
  plugins: [ 
    nextui(), 
    require('tailwind-scrollbar')
  ]
};
export default config;
