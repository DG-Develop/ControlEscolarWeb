const path = require('path')

module.exports = {
    env:{
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        API_URL: process.env.API_URL,
        // NEXTAUTH_URL:process.env.NEXTAUTH_URL
    }
}