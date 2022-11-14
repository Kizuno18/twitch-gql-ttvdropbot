const GraphQL = require("./graphql");

const Twitch = {
    async SetClientID(ClientID) {
        GraphQL.ClientID = ClientID;
    },
    async SetRetryTimeout(timeout) {
        GraphQL.retrytimeout = timeout
    },
    async SetRetryAmount(amount) {
        GraphQL.maxretries = amount
    },
    async GetUser(login, variables = {}, proxy = '') {
        console.log('GetUser -> ' + proxy)
        variables = {...variables, login};
        return await GraphQL.SendQuery("GET_USER", variables, "", "", false, {}, false, proxy);
    },
    async GetTopStreams(amount = 25, variables = {}, proxy = '') {
        console.log(proxy)
        variables = {after: "", ...variables, amount};
        return await GraphQL.SendQuery("GET_TOP_STREAMS", variables, "", "", false, {}, false, proxy);
    },
    async GetVideos(login, variables = {}, proxy = '') {
        console.log('GetVideos -> ' + proxy)
        let opts = {
            broadcastType: "ARCHIVE",
            channelOwnerLogin: login,
            limit: 30,
            videoSort: "TIME",
            ...variables
        }
        return await GraphQL.SendQuery("FilterableVideoTower_Videos", opts, '', '', true, {}, false, proxy);
    },
    async GetPlaybackAccessToken(vodID, variables = {}, proxy = '') {
        console.log('GetPlaybackAccessToken -> ' + proxy)
        let opts = {
            isLive: false,
            isVod: true,
            login: "",
            playerType: "channel_home_carousel",
            vodID: vodID,
            ...variables
        };
        return await GraphQL.SendQuery("PlaybackAccessToken", opts, '', '', true, {}, false, proxy);
    },
    async GetVideoMoments(vodID, variables = {}, proxy = '') {
        console.log('GetVideoMoments -> ' + proxy)
        let opts = {
            videoId: vodID,
            ...variables
        };
        return await GraphQL.SendQuery("VideoPreviewCard__VideoMoments", opts, '', '', true, {}, false, proxy);
    },
    async GetVideoMetadata(channelLogin, vodID, variables = {}, proxy = '') {
        console.log('GetVideoMetadata -> ' + proxy)
        let opts = {
            channelLogin,
            videoID: vodID,
            ...variables
        };
        return await GraphQL.SendQuery("VideoMetadata", opts, '', '', true, {}, false, proxy);
    },
    async GetChatClip(clipSlug, variables = {}, proxy = '') {
        console.log('GetChatClip -> ' + proxy)
        let opts = {
            clipSlug,
            ...variables
        };
        return await GraphQL.SendQuery("ChatClip", opts, '', '', true, {}, false, proxy);
    },
    async GetDirectoryPageGame(game, variables = {}, proxy = '') {
        console.log('GetDirectoryPageGame -> ' + proxy)
        let opts = {
            name: game,
            ...variables
        };
        return await GraphQL.SendQuery("DirectoryPage_Game", opts, '', '', true, {}, false, proxy);
    },
    async GetLiveStatus(channelLogin, variables = {}, proxy = '') {
        console.log('GetLiveStatus -> ' + proxy)
        let opts = {
            channelLogin: channelLogin,
            ...variables
        };
        let livestatus = await GraphQL.SendQuery("UseLive", opts, '', "", true, {}, false, proxy)
        if (livestatus[0].data.user == null) {
            return null
        } else {
            return livestatus[0].data.user.stream != null
        }
    },
    async _SendQuery(QueryName, variables, sha256Hash = null, OAuth = null, preset = false, headers = {}, Integrity = false, proxy = '') {
        
        return await GraphQL.SendQuery(QueryName, variables, sha256Hash, OAuth, preset, headers, Integrity, proxy);
    }
};

module.exports = Twitch;
