var config = {
//  _get: function (key) {
//		return new Promise(function(resolve, reject) {
//			if (!key in this) {
//				console.log('Missing key '+key+' in config');
//				reject(this[key]);
//			}
//		  resolve(this[key]);
//		}.bind(this));
//  }
}
config.persist = ['rpos', 'mode', 'modeinfo', 'theme', 'hidden', 'authed', 'interests', 'stayExpanded', 'unloadNonVisibleBars'];

config.baseUrl   = 'www.stumbleupon.com';
config.baseProto = 'https';

config.webtbPath = '/su/([^/]+)(/([^/]+)/(.*))?';
config.webtbPathNames = { path: 0, urlid: 1, socialid: 3, vanityurl: 4 }
config.convoPath = '/convo/([^/]+)(/([^/]+))?';
config.convoPathNames = { path: 0, convoid: 1, stateId: 3 }

config.defaults = {
	mode: 'all',
	theme: 'dark-sidebar',
	user: 0,
	stumble: { list: [], pos: -1, mode: 'all' },
	interests: [],
};

config.interests = [];
config.unloadNonVisibleBars = false;

config.miniModeTimeout = 500;
config.suPagesNeedAuth = ['profile', 'settings', 'interests'];
config.externalShare = {
	reddit:    'https://www.reddit.com/submit?url=:url&title=:title',
	twitter:   'https://twitter.com/intent/tweet?text=:title+:url',
	tumblr:    'https://www.tumblr.com/share?url=:url&title=:title',
	facebook:  'https://www.facebook.com/sharer/sharer.php?u=:url&title=:title&src=sdkpreparse',
	pinterest: 'https://www.pinterest.com/pin/create/button/?url=:url&description=:title&media=:rawurl',
	mix:       'https://mix.com/mixit?url=:url&title=:title',
}
config.suPages = {
	profile:   ':baseProto://:baseUrl/stumbler',
	settings:  ':baseProto://:baseUrl/settings',
	sponsored: ':baseProto://:baseUrl/sponsored-page',
	signout:   ':baseProto://:baseUrl/logout',
	signin:    ':baseProto://:baseUrl/login',
	help:      'http://help.stumbleupon.com/',
	interests: ':baseProto://:baseUrl/discover/interests',
	stumble:   ':baseProto://:baseUrl/su/:urlid/:code/:slug',
}
config.url = {
  info:    '/content/:urlid',
}
config.modes = {
	all:       { name: 'All Interests'   },
	following: { name: 'People I Follow', post: { keyword: 'Following' } },
	trending:  { name: 'Trending'        },
	photo:     { name: 'Photos'         , mode: 'interest', post: { interests: [302], keyword: 'Photos' } },
	video:     { name: 'Videos'         , post: { keyword: 'Video' } },
	domain:    { name: 'Domain'         , post: { domains: [ 'wikiepdia.com' ] } },
	interest:  { name: 'Interest'       , post: { } },
	keyword:   { name: 'Tag'            , post: { keyword: 'Photos' } },
}


config.accessToken = 'su_accesstoken'
config.accessTokenHeader = 'X-Su-AccessTokenKey';
config.defaultHeaders = {
    "X-Su-ConsumerKey":    "fdca7c36dbe636926ba914ac07c6d00241ec3441",
    "X-Su-Version"    :    "Unibar " + browser.runtime.getManifest().version,
};


config.api = {}
config.api.conversations = {
	baseUrl:  'svc.stumbleupon.com',
	baseProto:'https',
	apiPath:  '/convo',
	endpoint: {
	  auth:         '/auth/token',
	  participants: '/participants',
	  messages:     '/conversations/:id',
	  comment:      '/conversations/:id/comments',
	  share:        '/conversations',
	  addRecipient: '/conversations/:id/participants',
	},
	defaultHeaders: config.defaultHeaders,
	defaults: {},
	accessToken: config.accessToken,
	accessTokenHeader: config.accessTokenHeader,
}
config.api.stumbleupon = {
	baseUrl:  'www.stumbleupon.com',
	baseProto:'https',
	apiPath:  '/api/v2_0',
	endpoint: {
		ping:        '/p',
		user:        '/user/?version=2',
		stumble:     '/stumble/:mode',
		rate:        '/discovery/rating',
		unrate:      '/discovery/:urlid/rating',
		url:         '/url',
		activities:  '/activities',
		contacts:    '/connection/:userid/mutual',
		markactivity:'/activities/:id/:action',
		submit:      '/submit',
		classify:    '/classification/:urlid/doClassification',
		unread:      '/activities/snapshot',
		lists:       '/user/:userid/lists',
		addtolist:   '/list/:listid/items',
		blocksite:   '/domain/:urlid/block',
		interests:   '/user/:userid/interests',
		report:      '/report/:report',
	},
	defaultHeaders: config.defaultHeaders,
	defaults: config.defaults,
	post: {
		stumble: {
			guesses: 10,
			prefill_ad_hole: true,
			userid: 0,
			local_buffer_item_count: 0,
			guess_only: 1
		},
		seen: {
			guesses: 0,
			prefill_ad_hole: true,
			userid: 0,
			local_buffer_item_count: 0,
			guess_only: 1,
			guess_urlids: []
		},
	},
	maxRetries: 3,
	refillPos: 3,
	conversationsAPI: config.api.conversations,
	accessToken: config.accessToken,
	accessTokenHeader: config.accessTokenHeader,
}

browser.storage.local.get('clientid', function(obj) {
	if(obj && obj.clientid) {
		config.defaultHeaders['X-Su-ClientId'] = obj.clientid
	} else {
		var guid = Guid.create().value
		config.defaultHeaders['X-Su-ClientId'] = guid
		return browser.storage.local.set({clientid: guid})
	}
})
