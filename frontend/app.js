const app = Vue.createApp({
    data() {
        return {
            username: "",
            tweet: "",
            tweets: [],
            errors: [],
            loading: true,
        };
    },

    methods: {
        toLocaleTimeString(date) {
            return new Date(date).toLocaleTimeString();
        },

        async fetchTweets() {
            //TODO hide url in .env
            const res = await fetch("http://localhost:8000/tweets/", {
                headers: {},
            });
            if (!res.ok) {
                throw new Error(res.message || "Failed fetch !");
            }
            this.tweets = await res.json();
            return this.tweets;
        },

        async postTweet(data) {
            const response = await fetch("http://localhost:8000/tweet/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            return response;
        },

        addTweet() {
            this.errors = [];
            const dateTweet = new Date(Date.now());
            if (this.tweet.length > 50 || this.tweet === "") {
                this.errors.push("tweet too long or empty");
            } else if (this.username.length > 10 || this.username === "") {
                this.errors.push("username too long or empty");
            } else {
                const data = {
                    username: this.username,
                    tweet: this.tweet,
                    created: dateTweet,
                };
                const res = this.postTweet(data);
                if (res) {
                    this.tweets.push(data);
                    this.username = "";
                    this.tweet = "";
                }
            }
        },
    },

    mounted() {
        this.fetchTweets();
    },
});
app.mount("#main");
