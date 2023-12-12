/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        "primary-blue": "#1E88E5",
        "primary-green": "#16A75C",
        "primary-yellow": "#FFD026",
        "yellow": {
          "900": "#FF7500",
          "800": "#FF9500",
          "700": "#FFA600",
          "600": "#FFB900",
          "500": "#FFC800",
          "400": "#FFD026",
          "300": "#FFDA4F",
          "200": "#FFE483",
          "100": "#FFEEB4",
          "50": "#FFF9E1",
        },
        "green": {
          "900": "#006430",
          "800": "#008444",
          "700": "#069550",
          "600": "#16A75C",
          "500": "#1FB767",
          "400": "#4DC27E",
          "300": "#70CD94",
          "200": "#9BDBB3",
          "100": "#C3E9D0",
          "50": "#E6F6EC",
        },
        "blue": {
          "900": "#0D47A1",
          "800": "#1565C0",
          "700": "#1976D2",
          "600": "#1E88E5",
          "500": "#2196F3",
          "400": "#42A5F5",
          "300": "#64B5F6",
          "200": "#90CAF9",
          "100": "#BBDEFB",
          "50": "#E3F2FD",
        },
        "pink": {
          "900": "#9D1951",
          "800": "#C12357",
          "700": "#D62A59",
          "600": "#EC305D",
          "500": "#FD355F",
          "400": "#FF4D77",
          "300": "#FF6C8F",
          "200": "#FF96AF",
          "100": "#FFBFCF",
          "50": "#FFE6EC",
        },
        "red": {
          "900": "#B71B1C",
          "800": "#C62828",
          "700": "#D32F2F",
          "600": "#E53935",
          "500": "#F44336",
          "400": "#EF5350",
          "300": "#E57373",
          "200": "#EF9A9A",
          "100": "#FFCDD2",
          "50": "#FFEBEE",
        },
        "purple": {
          "900": "#49148C",
          "800": "#691B9A",
          "700": "#7A1FA2",
          "600": "#8D24AA",
          "500": "#9B27B0",
          "400": "#AB47BC",
          "300": "#BA68C8",
          "200": "#CE93D8",
          "100": "#E1BEE7",
          "50": "#F3E5F5",
        },
        "gray": {
          "900": "#212121",
          "800": "#424242",
          "700": "#616161",
          "600": "#757575",
          "500": "#9E9E9E",
          "400": "#BDBDBD",
          "300": "#E0E0E0",
          "200": "#EEEEEE",
          "100": "#F5F5F5",
          "50": "#FAFAFA",
        },
        "blue-gray": {
          "900": "#001B3D",
          "800": "#022B55",
          "700": "#083461",
          "600": "#133C6B",
          "500": "#1A4373",
          "400": "#415C84",
          "300": "#627798",
          "200": "#8D9DB5",
          "100": "#B9C3D3",
          "50": "#E3E7ED",
        },
        "netral-black": "#000000",
        "netral-white": "#FFFFFF",
        "netral-gray": "#929292",
        "black": "#111313",
        "low-emphasis": "1F2121",
        "medium-emphasis": "#4F5050",
        "medium-emphasis-2": "#292C2A",
        "high-emphasis": "D7D7D7",
        "success": "#20A95A",
        "warning": "#FED32C",
        "error": "#DD5E5E"
      }
    },
    fontFamily: {
      "roboto": "Roboto, sans-serif",
      "lato": "Lato, sans-serif"
    },
    screens: {
      'lg': '1024px',
    },
  },
  plugins: [require('flowbite/plugin')],
}

