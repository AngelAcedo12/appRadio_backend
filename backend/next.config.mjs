/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                // matching all API routes
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                ]
            }
        ]
    },
    env:{
        DB_URL: "mongodb+srv://angelacedomelli:Solana2014@bdradio.zivtuq0.mongodb.net/pruebasAppRadio",
        DB_URL: "mongodb://localhost:27017/pruebasAppRadio",
        SECRET: "asdasdvaeeriuwqey23h4b2jh3b44jasdlkakcvnjasldijakejqkj3b1k3bj1kjnmasdlkajdlkasdnaskdjaslkdnacnxaklnvxcasd1oiu4hu2h4baejrhsdbaksdf"
    }
}

export default nextConfig



