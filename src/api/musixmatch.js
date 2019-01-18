import jsonp from 'jsonp';

const ApiUrl = 'https://api.musixmatch.com/ws/1.1/';
const ApiKey = process.env.REACT_APP_MUSIXMATCH_API_KEY;

export const fetchQuestions = (nrQuestions, answersNr) => {
  return new Promise((resolve, reject) => {
    getChartRandomTracks(nrQuestions)
    .then((tracks) => {
      const fillLyricsPromises = tracks.map(fillTrackLyrics);
      Promise.all([
        getChartArtistNames(),
        ...fillLyricsPromises,
      ]).then(([ artists, ...tracks ]) =>
        resolve(tracks
                  .map(track =>
                      buildFinalData(track, artists, answersNr)
                  ))
      ).catch(reject);
    }).catch(reject);
  });
}

const getChartRandomTracks = (tracksNr) => {
  // 'top' is returning no tracks
  const chart = getRandomItem(['hot', 'mxmweekly', 'mxmweekly_new']);
  const url = `${ApiUrl}chart.tracks.get?apikey=${ApiKey}&chart_name=${chart}&page_size=100&format=jsonp&country=XW&f_has_lyrics=true`;
  return jsonpPromise(url)
    .then((data) => {
      const randomTracks = Array(tracksNr).fill({})
                            .map(() => {
                              const track = getRandomItem(data.message.body.track_list, true);
                              return track && track.track;
                            })
                            .filter((track) => !!track);
      if (randomTracks.length > 0) {
        return randomTracks;
      }
      throw new Error('No track found');
    });
}

const fillTrackLyrics = (track) =>
  getRandomLineLyrics(track.track_id)
    .then((lyricData) => Object.assign(track, { lyricData }))

const getRandomLineLyrics = (trackId) => {
  const url = `${ApiUrl}track.lyrics.get?apikey=${ApiKey}&track_id=${trackId}&format=jsonp`;

  return jsonpPromise(url)
    .then((data) => {
        const lyrics = data.message.body.lyrics;
        // Remove the last part about 30%
        const lyricPart = lyrics.lyrics_body.split('\n...\n\n*******')[0]
        const lines = lyricPart.split('\n')
                        .filter(str => !!str);
        const randomLine = lyrics && getRandomItem(lines);
        if (randomLine) {
          return {
            line: randomLine,
            copyright: lyrics.lyrics_copyright
          };
        }
        throw new Error('No lyrics found');
    });
}

const getChartArtistNames = () => {
  const url = `${ApiUrl}chart.artists.get?apikey=${ApiKey}&page_size=100&format=jsonp`;
  return jsonpPromise(url)
    .then((data) => {
      let artists = data.message.body.artist_list;
        if (artists.length > 0) {
          return artists
                  .map(artist =>
                        artist && artist.artist && artist.artist.artist_name
                  )
                  .filter((artist) => !!artist);
        }
        throw new Error('Not enouth artists found');
  });
}

const buildFinalData = (track, artists, answersNr) => {
  const { artist_name, lyricData } = track;
  const filteredArtists = artists.filter(artist => artist !== artist_name);
  const randomArtists = Array(answersNr-1).fill({})
                          .map(() => getRandomItem(filteredArtists, true));
  const answers = shuffle([...randomArtists, artist_name]);
  const correctAnswer = answers.indexOf(artist_name);
  return({
    content: lyricData.line,
    copyright: lyricData.copyright,
    answers,
    correctAnswer
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

const getRandomItem = (items, removeItem=false) => {
  const index = Math.floor(Math.random()*items.length);
  const item = items[index];
  if (removeItem) {
    items.splice(index, 1);
  }
  return item;
}

