const prod = {
    env: 'production',
    api_host: 'https://cryptic-citadel-45712.herokuapp.com/' // an empty string to signify a relative path. can also put a deployment URL.
};

const dev = {
    env: "development",
    api_host: "http://localhost:5000"
}
export default process.env.NODE_ENV === 'production' ? prod : dev;