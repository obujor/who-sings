import jsonp from 'jsonp';

const ApiUrl = 'https://api.musixmatch.com/ws/1.1/';
const ApiKey = process.env.REACT_APP_MUSIXMATCH_API_KEY;

export const fetchQuestion = (answersNr) => {
  return new Promise((resolve, reject) => {
    getChartRandomTrack()
    .then((track) => {
      const { artist_name, artist_id, track_id } = track;
      Promise.all([
        getRandomLineLyrics(track_id),
        getChartRandomArtistNames(answersNr-1, artist_id)
      ]).then(([lyricData, artists]) => {
        const answers = shuffle([...artists, artist_name]);
        const correctAnswer = answers.indexOf(artist_name);
        resolve({
          content: lyricData.line,
          copyright: lyricData.copyright,
          answers,
          correctAnswer
        })
      }).catch(reject);
    }).catch(reject);
  });
  // Return mock data
  // return new Promise((resolve, reject) => setTimeout(() => resolve({
  //   content: "love of my life love of my life love of my life love of my life",
  //   correctAnswer: 1,
  //   answers: ['Pink','Madonna','Ligabue']
  // }), 500));
}

const getChartRandomTrack = (cb) => {
  // 'top' is returning no tracks
  const chart = getRandomItem(['hot', 'mxmweekly', 'mxmweekly_new']);
  const url = `${ApiUrl}chart.tracks.get?apikey=${ApiKey}&chart_name=${chart}&page_size=100&format=jsonp&country=XW&f_has_lyrics=true`;
  return jsonpPromise(url)
    .then((data) => {
      const randomTrack = getRandomItem(data.message.body.track_list);
      if (randomTrack) {
        return randomTrack.track;
      }
      throw new Error('No track found');
    });
}

const getChartRandomArtistNames = (artistsNr, exludeId) => {
  const url = `${ApiUrl}chart.artists.get?apikey=${ApiKey}&page_size=100&format=jsonp`;
  return jsonpPromise(url)
    .then((data) => {
      let artists = data.message.body.artist_list
                        .filter((artist) => artist.artist_id !== exludeId);
        if (artists.length >= artistsNr) {
          const randomArtists =
            Array(artistsNr).fill({})
              .map(() => {
                const index = getRandomItem(artists, true);
                const artist = artists[index];
                if (artist) {
                  artists.splice(index, 1);
                }
                return artist && artist.artist && artist.artist.artist_name;
              })
              .filter((artist) => !!artist);
          return randomArtists;
        }
        throw new Error('Not enouth artists found');
  });
}

const getRandomLineLyrics = (trackId) => {
  const url = `${ApiUrl}track.lyrics.get?apikey=${ApiKey}&track_id=${trackId}&format=jsonp`;

  return jsonpPromise(url)
    .then((data) => {
        console.log(data);
        const lyrics = data.message.body.lyrics;
        console.log(lyrics)
        // Remove the last part about 30%
        const lyricPart = lyrics.lyrics_body.split('\n...\n\n*******')[0]
        console.log(lyricPart)
        const lines = lyricPart.split('\n')
                        .filter(str => !!str);
        console.log(lines);
        const randomLine = lyrics && getRandomItem(lines);
        console.log(randomLine)
        if (randomLine) {
          return {
            line: randomLine,
            copyright: lyrics.lyrics_copyright
          };
        }
        throw new Error('No lyrics found');
    });
}

const jsonpPromise = (url) => {
  // jsonp lib is not handling HTTP errors
  // https://github.com/webmodules/jsonp/issues/22
  // implement kind of error handling by waiting and
  // throw an error if the callback was not called
  const requestPromise = new Promise((resolve, reject) => {
                          jsonp(url, null, (err, data) => {
                            if (err) {
                              return reject(err.message);
                            }
                            resolve(data);
                          });
                        });
  const timerPromise = new Promise((resolve) => {
    setTimeout(resolve, 5000);
  });

  return Promise.race([requestPromise, timerPromise])
          .then((val) => {
            if (val) {
              return val;
            } else {
              throw new Error('timeout exceeded')
            }
          });
}

const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const getRandomItem = (items, returnIndex=false) => {
  const index = Math.floor(Math.random()*items.length);
  return returnIndex ? index : items[index];
}

