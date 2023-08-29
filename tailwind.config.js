/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            borderWidth: {
                primary: 1
            },
            borderColor: {
                primary: "rgba(255, 255, 255, 0.2)",
                secondary: "rgba(255, 255, 255, 0.3)"
            },
            borderRadius: {
                10: "10px",
                20: "20px",
                30: "30px",
                40: "40px",
                50: "50px",
            },
            padding: {
                10: "10px",
                15: "15px",
                20: "20px",
                25: "25px",
                30: "30px",
                35: "35px",
                40: "40px",
                45: "45px",
                50: "50px",
            },
            margin: {
                10: "10px",
                15: "15px",
                20: "20px",
                25: "25px",
                30: "30px",
                35: "35px",
                40: "40px",
                45: "45px",
                50: "50px",
            },
            colors: {
                white10: "rgba(255, 255, 255, 0.1)",
                white50: "rgba(255, 255, 255, 0.5)",
                white66: "rgba(255, 255, 255, 0.66)",
                white70: "rgba(255, 255, 255, 0.70)",
                white75: "rgba(255, 255, 255, 0.75)",
                white80: "rgba(255, 255, 255, 0.8)",
                white90: "rgba(255, 255, 255, 0.9)",
                lightpink: "#FBF8FF",
                darkpink: "#D2C4F9",
                darkBlue: "#4A1FC4",
                red: "#c41f1f",
                dark75: "rgba(7, 1, 24, 0.66)",
                blue66: "rgba(61, 25, 164, 0.66)",
                blue80: "rgba(61, 25, 164, 0.80)",
                bgWhite: '#FFFCF9',
                purple: "#884BD6"
            },
            backgroundImage: {
                bgGradient: "linear-gradient(180deg, #000 0%, #190359 300%)",
                secondaryGradient: "linear-gradient(132deg, #FF5137 0%, #FD16D5 100%)",
            },
            zIndex: {
                0: 0,
                1: 1,
                2: 2,
                3: 3
            }
        }
    }
}