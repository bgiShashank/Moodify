const JIOSAAVN_API_BASE = "https://saavn.dev/api/search/songs?query=";
const PEXELS_API_KEY = "YGkq7qTJ4EA7JIP3WupezEdKjmAjtmymwSEtxIqK5OO5ZvxYQAOVcR55";
const moodToQuery = {
  happy: {
    wallpaper: ["nature landscape beautiful scenery", "sunny nature", "vibrant nature"],
    music: ["hindi happy songs", "hindi upbeat songs", "hindi feel good songs", "hindi cheerful songs", "bollywood happy songs"]
  },
  sad: {
    wallpaper: ["broken heart", "dark rainy mood", "lonely dark person", "rainy night city", "dark stormy weather", "melancholy rain", "broken glass love", "broken heart symbolism", "shattered glass dark", "cracked glass abstract"],
    music: ["hindi sad songs", "hindi heartbreak songs", "hindi emotional songs", "bollywood sad songs", "hindi romantic sad songs"]
  },
  energetic: {
    wallpaper: ["positiveenergy feeling", "indian dance", "punjabi dance", "energatic", "indian festival dance", "energetic dynamic vibrant", "high energy"],
    music: ["hindi dance songs", "hindi party songs", "hindi upbeat songs", "bollywood dance songs", "hindi energetic songs"]
  },
  calm: {
    wallpaper: ["calm peaceful serene", "tranquil"],
    music: ["hindi soft songs", "hindi romantic songs", "hindi peaceful songs", "bollywood romantic songs", "hindi melodious songs"]
  },
  angry: {
    wallpaper: ["angry rock metal intense rage aggression", "rock"],
    music: ["hindi rock songs", "hindi metal songs", "hindi intense songs", "bollywood rock songs", "hindi aggressive songs"]
  },
  fear: {
    wallpaper: ["fear suspense thriller dark haunting", "dark suspense"],
    music: ["hindi thriller songs", "hindi suspense songs", "hindi dark songs", "bollywood thriller songs", "hindi mysterious songs"]
  },
  love: {
    wallpaper: [
      "romantic couple",
      "love hearts",
      "romantic sunset",
      "love background",
      "romantic flowers",
      "love aesthetic",
      "romantic beach",
      "love wallpaper",
      "romantic night",
      "love couple"
    ],
    music: [
      "arijit singh romantic songs",
      "hindi romantic songs",
      "bollywood love songs",
      "hindi love songs",
      "romantic hindi songs",
      "bollywood romantic hits",
      "hindi romantic hits",
      "arijit singh love songs",
      "hindi romantic duets",
      "bollywood romantic duets",
      "hindi romantic classics",
      "bollywood romantic classics",
      "hindi romantic new songs",
      "bollywood romantic new songs",
      "hindi romantic playlist"
    ]
  },
  mix: {
    wallpaper: ["top songs mix popular trending chart"],
    music: ["hindi top songs", "hindi hit songs", "hindi popular songs", "bollywood hit songs", "hindi trending songs"]
  },
  lofi: {
    wallpaper: ["lofi aesthetic", "lofi room", "lofi study", "lofi chill", "lofi vibes", "lofi background", "lofi aesthetic room", "lofi study room", "lofi bedroom", "lofi cafe"],
    music: [
      "hindi lofi love songs",
      "bollywood lofi remix",
      "hindi romantic lofi",
      "bollywood lofi mix",
      "hindi lofi mashup"
    ]
  }
};
document.querySelectorAll(".mood-btn").forEach(btn => btn.onclick = async e => {
  const mood = e.currentTarget.getAttribute("data-mood");
  fetchJioSaavnMusicRandom(mood);
  fetchPexelsWallpaper(mood);
});
let lastPlayedTrackId = {}, currentTrackIndex = 0, currentTracks = [];
const shuffleArray = arr => {
  for(let i=arr.length-1;i>0;i--){
  const j=Math.floor(Math.random()*(i+1));
  [arr[i],arr[j]]=[arr[j],arr[i]];
}};
async function fetchJioSaavnMusicRandom(mood) {
  const queries = moodToQuery[mood].music || ["hindi songs"];
  document.getElementById("song-details").textContent = "Loading music...";
  currentTracks = [];
  currentTrackIndex = 0;
  let found = false;
  
  // For lofi mood, use parallel fetching with fewer queries
  if (mood === 'lofi') {
    try {
      // Show loading state
      document.getElementById("song-details").textContent = "Loading lofi tracks...";
      
      // Fetch tracks in parallel
      const fetchPromises = queries.map(q => 
        fetch(`${JIOSAAVN_API_BASE}${encodeURIComponent(q)}`)
          .then(res => res.json())
          .then(data => data.success ? data.data.results : [])
          .catch(() => [])
      );
      
      const results = await Promise.all(fetchPromises);
      let allTracks = results.flat();
      
      if (allTracks.length > 0) {
        // Remove duplicates based on song ID
        allTracks = allTracks.filter((track, index, self) =>
          index === self.findIndex((t) => t.id === track.id)
        );
        
        // Shuffle and take first 10 tracks
        shuffleArray(allTracks);
        currentTracks = allTracks.slice(0, 10);
        currentTrackIndex = 0;
        showJioSaavnTrack(currentTracks, currentTrackIndex);
        found = true;
      }
    } catch (error) {
      console.error("Error fetching lofi tracks:", error);
    }
  } else {
    // Original logic for other moods
    for (let q of queries) {
      try {
        let res = await fetch(`${JIOSAAVN_API_BASE}${encodeURIComponent(q)}`), data = await res.json();
        if (data.success && data.data.results.length) {
          let tracks = data.data.results;
          if (mood === 'calm') shuffleArray(tracks);
          let randomIndex = Math.floor(Math.random() * tracks.length);
          if (lastPlayedTrackId[mood] && tracks.length > 1) {
            let attempts = 0;
            while (tracks[randomIndex].id === lastPlayedTrackId[mood] && attempts++ < 5)
              randomIndex = Math.floor(Math.random() * tracks.length);
          }
          lastPlayedTrackId[mood] = tracks[randomIndex].id;
          currentTracks = tracks;
          currentTrackIndex = randomIndex;
          showJioSaavnTrack(currentTracks, randomIndex);
          found = true;
          break;
        }
      } catch {}
    }
  }

  if (!found) {
    document.getElementById("song-details").textContent = "No tracks found for this mood. Please try another mood or try again later.";
    ["album-art","audio-player","player-controls"].forEach(id=>document.getElementById(id).style.display="none");
    updateProgressBar(0,0);
  }
}

function showJioSaavnTrack(tracks, idx) {
  currentTracks = tracks;
  currentTrackIndex = idx;
  const t = tracks[idx],
    audioUrl = t.downloadUrl?.length ? t.downloadUrl.at(-1).url : "",
    albumArt = t.image?.length ? t.image.at(-1).url : "";
  document.getElementById("album-art").src = albumArt;
  document.getElementById("album-art").style.display = "block";
  document.getElementById("song-details").textContent = `${t.name} - ${t.artists.primary.map(a=>a.name).join(", ")}`;
  const audio = document.getElementById("audio-player");
  if (audioUrl) {
    audio.src = audioUrl;
    audio.style.display = "block";
    document.getElementById("player-controls").style.display = "flex";
    document.getElementById("play-pause-btn").textContent = "Play";
    updateProgressBar(0, t.duration || 30);
  } else {
    audio.src = "";
    updateProgressBar(0, 0);
  }
}

function updateProgressBar(cur, dur) {
  let bar = document.getElementById("progress-bar"), time = document.getElementById("time");
  if (!bar || !time) return;
  bar.value = dur ? (cur / dur) * 100 : 0;
  time.textContent = `${formatTime(cur)} / ${formatTime(dur)}`;
}

const formatTime = sec => `${Math.floor(sec/60)}:${("0"+Math.floor(sec%60)).slice(-2)}`;

const audio = document.getElementById("audio-player");
audio.ontimeupdate = () => updateProgressBar(audio.currentTime, audio.duration || 30);
audio.onended = () => {
  document.getElementById("play-pause-btn").textContent = "Play";
  updateProgressBar(0, audio.duration || 30);
};
document.getElementById("progress-bar").onclick = e => {
  const percent = e.offsetX / e.target.offsetWidth;
  audio.currentTime = percent * (audio.duration || 30);
};
document.getElementById("prev-btn").onclick = () => currentTracks.length && showJioSaavnTrack(currentTracks, (currentTrackIndex - 1 + currentTracks.length) % currentTracks.length);
document.getElementById("next-btn").onclick = () => currentTracks.length && showJioSaavnTrack(currentTracks, (currentTrackIndex + 1) % currentTracks.length);
document.getElementById("play-pause-btn").onclick = () => {
  if (audio.paused) {
    audio.play();
    document.getElementById("play-pause-btn").textContent = "Pause";
  } else {
    audio.pause();
    document.getElementById("play-pause-btn").textContent = "Play";
  }
};

// Add wallpaper tracking
let lastShownWallpaperIds = {};

async function fetchPexelsWallpaper(mood) {
    const query = moodToQuery[mood].wallpaper[0] || "nature";
    document.getElementById("wallpaper").style.display = "none";
    
    try {
        const res = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=30`, {
            headers: { Authorization: PEXELS_API_KEY }
        });
        const data = await res.json();
        
        if (data.photos?.length) {
            // Filter out previously shown wallpapers for this mood
            const availablePhotos = data.photos.filter(photo => 
                !lastShownWallpaperIds[mood]?.includes(photo.id)
            );
            
            // If we've shown all photos, reset the tracking for this mood
            if (availablePhotos.length === 0) {
                lastShownWallpaperIds[mood] = [];
                return fetchPexelsWallpaper(mood);
            }
            
            // Select a random photo from available ones
            const photo = availablePhotos[Math.floor(Math.random() * availablePhotos.length)];
            
            // Update tracking
            if (!lastShownWallpaperIds[mood]) {
                lastShownWallpaperIds[mood] = [];
            }
            lastShownWallpaperIds[mood].push(photo.id);
            
            // Display the wallpaper
            document.getElementById("wallpaper").src = photo.src.landscape;
            document.getElementById("wallpaper").style.display = "block";
        }
    } catch (error) {
        console.error("Error fetching wallpaper:", error);
    }
}

// Wallpaper controls
document.getElementById('download-wallpaper').addEventListener('click', () => {
    const wallpaper = document.getElementById('wallpaper');
    if (wallpaper.src) {
        const link = document.createElement('a');
        link.href = wallpaper.src;
        link.download = 'wallpaper.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
});

document.getElementById('refresh-wallpaper').addEventListener('click', () => {
    const currentMood = document.querySelector('.mood-btn.active')?.getAttribute('data-mood') || 'happy';
    fetchPexelsWallpaper(currentMood);
});

// Update mood button active state
document.querySelectorAll('.mood-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
    });
});