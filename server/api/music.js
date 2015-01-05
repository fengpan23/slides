var http = require('http');
/**
 * get the music list
 * @param  search word and callback
 * @return array [{}] 
 * {
        "song": "冬天的故事",
        "song_id": "2121984",
        "singer": "杨千嬅",
        "album": "冬天的故事",
        "singerPicSmall": "e2.qianqian.com/data2/pic/36205546/36205546.jpg",
        "singerPicLarge": "ukufile2.qianqian.com/data2/pic/36205560/36205560.jpg",
        "albumPicLarge": "//qukufile2.qianqian.com/data2/pic/38500242/38500242.jpg",
        "albumPicSmall": "16.jpg"
    }
 */
exports.search = function(word, cb){
	word = '好汉歌';
	var url = "http://mp3.baidu.com/dev/api/?tn=getinfo&ct=0&word="+ word +"&ie=utf-8&format=json";

	http.get(url, function(res) {
        var info = '';
        res.on('data', function (chunk) {
            info += chunk;
        }).on('end', function() {
            var data = JSON.parse(info);
            console.log(data);
            // cb(data);
        }).on('error', function(e) {
        	console.log("Got error: " + e.message);
           	cb({message: e.message, code: e.code});
        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
        cb({message: e.message});
    });
}

/**
 * [detail description]
 * @param  {[type]}   song_id [description]
 * @param  {Function} cb      [description]
 * @return  queryId: '85773800
	 songId: 85773800,
	 songName: '逼上梁山
	 artistId: '8801074
	 artistName: '佚名'
	 albumId: 0,
	 albumName: '',
	 songPicSmall: '',
	 songPicBig: '',
	 songPicRadio: '',
	 lrcLink: '',
	 version: '',
	 copyType: 1,
	 time: 236,
	 linkCode: 22000,
	 songLink: 'http://
	cfc5cba56608f014520
	share%2Flink%3Fshar
	 showLink: 'http://
	 format: 'mp3',
	 rate: 128,
	 size: 3791970,
	 relateStatus: '1',
	 resourceType: '2'           [description]
 */
exports.detail = function(song_id, cb){
	var url = "http://ting.baidu.com/data/music/links?songIds=" + song_id;
	http.get(url, function(res) {
		var info = '';
		res.on('data', function (chunk) {
			info += chunk;
		}).on('end', function() {
			var data = JSON.parse(info);
			if(data.errorCode === 22000){
			    var songData = data.data.songList[0];
			    // console.log(songData);
			    // songData.songLink, songData.songName, songData.format
			    var file = {
			    	src: songData.songLink,
			    	name: songData.songName,
			    	extension: songData.format
			    };
			    transform.fileModel.transpondFile(file, function(mess){
			        mess.songName = songData.songName;
			        mess.artistName = songData.artistName;
			        //time formart
	                if(typeof songData.time === 'number'){
	                    var sTime = Math.floor(songData.time/60) +":" + songData.time%6;
	                    mess.time = sTime;
	                }else{
			        	mess.time = songData.time;
	                }
			        // console.log(mess);
			        resXM.send(mess);
			    });
			}else{
				cb({message: 'data empty'});
			}
		}).on('error', function(e) {
			// console.log("Got error: " + e.message);
			cb({message: e.message, code: 23404});
		});
	}).on('error', function(e) {
		// console.log("Got error: " + e.message);
		cb({message: e.message, code: 23404});
	});
}