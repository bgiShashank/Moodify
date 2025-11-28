// Using the working JioSaavn API from https://github.com/cyberboysumanjay/JioSaavnAPI
const JIOSAAVN_API_BASE = "https://saavnapi-nine.vercel.app/result/?query=";
const PEXELS_API_KEY = "YGkq7qTJ4EA7JIP3WupezEdKjmAjtmymwSEtxIqK5OO5ZvxYQAOVcR55";

// Fallback sample music data when API is unavailable
const fallbackMusicData = {
  happy: [
    { id: "1", name: "Happy Happy", artists: { primary: [{ name: "Vishal-Shekhar" }] }, image: [{ url: "https://via.placeholder.com/500?text=Happy+Song" }], downloadUrl: [{ url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" }], duration: 180 },
    { id: "2", name: "Uplifting Beats", artists: { primary: [{ name: "Bollywood Mix" }] }, image: [{ url: "https://via.placeholder.com/500?text=Upbeat+Song" }], downloadUrl: [{ url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" }], duration: 200 }
  ],
  sad: [
    { id: "3", name: "Melancholy", artists: { primary: [{ name: "Arijit Singh" }] }, image: [{ url: "https://via.placeholder.com/500?text=Sad+Song" }], downloadUrl: [{ url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" }], duration: 240 },
    { id: "4", name: "Heartbreak", artists: { primary: [{ name: "Atif Aslam" }] }, image: [{ url: "https://via.placeholder.com/500?text=Emotional+Song" }], downloadUrl: [{ url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" }], duration: 220 }
  ],
  energetic: [
    { id: "5", name: "Dance Anthem", artists: { primary: [{ name: "Punjabi Mix" }] }, image: [{ url: "https://via.placeholder.com/500?text=Dance+Song" }], downloadUrl: [{ url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" }], duration: 190 },
    { id: "6", name: "Party Time", artists: { primary: [{ name: "DJ Mix" }] }, image: [{ url: "https://via.placeholder.com/500?text=Party+Song" }], downloadUrl: [{ url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" }], duration: 210 }
  ],
  calm: [
    { id: "7", name: "Peaceful Melody", artists: { primary: [{ name: "Soft Music" }] }, image: [{ url: "https://via.placeholder.com/500?text=Calm+Song" }], downloadUrl: [{ url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3" }], duration: 250 },
    { id: "8", name: "Serenity", artists: { primary: [{ name: "Instrumental" }] }, image: [{ url: "https://via.placeholder.com/500?text=Relaxing+Song" }], downloadUrl: [{ url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" }], duration: 230 }
  ],
  angry: [
    { id: "9", name: "Rock Power", artists: { primary: [{ name: "Rock Band" }] }, image: [{ url: "https://via.placeholder.com/500?text=Rock+Song" }], downloadUrl: [{ url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" }], duration: 180 },
    { id: "10", name: "Intense", artists: { primary: [{ name: "Metal Mix" }] }, image: [{ url: "https://via.placeholder.com/500?text=Intense+Song" }], downloadUrl: [{ url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3" }], duration: 200 }
  ],
  fear: [
    { id: "11", name: "Dark Mystery", artists: { primary: [{ name: "Thriller Mix" }] }, image: [{ url: "https://via.placeholder.com/500?text=Thriller+Song" }], downloadUrl: [{ url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3" }], duration: 220 },
    { id: "12", name: "Suspense", artists: { primary: [{ name: "Dark Music" }] }, image: [{ url: "https://via.placeholder.com/500?text=Suspense+Song" }], downloadUrl: [{ url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3" }], duration: 240 }
  ],
  love: [
    { id: "13", name: "Romantic Ballad", artists: { primary: [{ name: "Arijit Singh" }] }, image: [{ url: "https://via.placeholder.com/500?text=Love+Song" }], downloadUrl: [{ url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3" }], duration: 260 },
    { id: "14", name: "Love Story", artists: { primary: [{ name: "Romantic Duet" }] }, image: [{ url: "https://via.placeholder.com/500?text=Romantic+Song" }], downloadUrl: [{ url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3" }], duration: 250 }
  ],
  mix: [
    { id: "15", name: "Top Hits", artists: { primary: [{ name: "Bollywood Hits" }] }, image: [{ url: "https://via.placeholder.com/500?text=Hit+Song" }], downloadUrl: [{ url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3" }], duration: 200 },
    { id: "16", name: "Popular Mix", artists: { primary: [{ name: "Trending Now" }] }, image: [{ url: "https://via.placeholder.com/500?text=Popular+Song" }], downloadUrl: [{ url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3" }], duration: 210 }
  ],
  lofi: [
    { id: "17", name: "Lofi Vibes", artists: { primary: [{ name: "Lofi Mix" }] }, image: [{ url: "https://via.placeholder.com/500?text=Lofi+Song" }], downloadUrl: [{ url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3" }], duration: 180 },
    { id: "18", name: "Chill Beats", artists: { primary: [{ name: "Relaxing Lofi" }] }, image: [{ url: "https://via.placeholder.com/500?text=Chill+Song" }], downloadUrl: [{ url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-18.mp3" }], duration: 190 }
  ]
};

// Track API availability to avoid repeated failed attempts
let apiUnavailable = false;
let lastApiCheck = 0;
const API_CHECK_INTERVAL = 60000; // Check API again after 1 minute

// Fetch function for the new JioSaavn API
async function fetchWithCORS(url, options = {}) {
  // Skip API calls if we recently determined it's unavailable
  const now = Date.now();
  if (apiUnavailable && (now - lastApiCheck) < API_CHECK_INTERVAL) {
    throw new Error("API unavailable - using fallback");
  }
  
  const timeout = 8000; // 8 second timeout
  
  // Helper to add timeout to fetch
  const fetchWithTimeout = (url, options, timeoutMs) => {
    return Promise.race([
      fetch(url, {
        ...options,
        mode: 'cors',
        credentials: 'omit'
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timeout')), timeoutMs)
      )
    ]);
  };
  
  // Try direct fetch - new API should work without CORS issues
  try {
    const response = await fetchWithTimeout(url, options, timeout);
    if (response.ok) {
      apiUnavailable = false; // API is working
      return response;
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    // Mark API as unavailable after failure
    apiUnavailable = true;
    lastApiCheck = now;
    throw error;
  }
}
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
// Mood button click handler - unified handler for both music and active state
document.querySelectorAll(".mood-btn").forEach(btn => {
  btn.addEventListener('click', async (e) => {
    // Remove active class from all buttons
    document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('active'));
    // Add active class to clicked button
    btn.classList.add('active');
    
    // Get mood from button (handle clicks on child elements like span)
    const mood = btn.getAttribute("data-mood");
    if (mood) {
      fetchJioSaavnMusicRandom(mood);
      fetchPexelsWallpaper(mood);
    }
  });
});
let lastPlayedTrackId = {}, currentTrackIndex = 0, currentTracks = [];
const shuffleArray = arr => {
  for(let i=arr.length-1;i>0;i--){
  const j=Math.floor(Math.random()*(i+1));
  [arr[i],arr[j]]=[arr[j],arr[i]];
}};
async function fetchJioSaavnMusicRandom(mood) {
  const queries = moodToQuery[mood]?.music || ["hindi songs"];
  const songDetailsEl = document.getElementById("song-details");
  if (songDetailsEl) {
    songDetailsEl.textContent = "Loading music...";
    songDetailsEl.style.display = "block";
    songDetailsEl.style.visibility = "visible";
  }
  currentTracks = [];
  currentTrackIndex = 0;
  let found = false;
  
  // Helper function to extract tracks from API response
  const extractTracks = (data) => {
    console.log("Raw API data:", data); // Debug log
    
    // New JioSaavn API (saavnapi-nine.vercel.app) returns array directly or wrapped
    if (Array.isArray(data)) {
      console.log("Found array directly, length:", data.length);
      return data;
    }
    
    // Check for common response structures
    if (data && typeof data === 'object') {
      // Try data.results first (common structure)
      if (data.results && Array.isArray(data.results)) {
        console.log("Found data.results, length:", data.results.length);
        return data.results;
      }
      
      // Try data.data.results (nested structure)
      if (data.data?.results && Array.isArray(data.data.results)) {
        console.log("Found data.data.results, length:", data.data.results.length);
        return data.data.results;
      }
      
      // Try data.data (direct array)
      if (data.data && Array.isArray(data.data)) {
        console.log("Found data.data, length:", data.data.length);
        return data.data;
      }
      
      // Try success wrapper
      if (data.success && data.data?.results) {
        console.log("Found success.data.results, length:", data.data.results.length);
        return data.data.results;
      }
      
      // Search for any array property
      for (const key in data) {
        if (Array.isArray(data[key]) && data[key].length > 0) {
          console.log(`Found array in key "${key}", length:`, data[key].length);
          return data[key];
        }
      }
    }
    
    console.warn("No tracks found in API response");
    return [];
  };
  
  // For lofi mood, use parallel fetching with fewer queries
  if (mood === 'lofi') {
    try {
      // Show loading state
      const songDetailsEl = document.getElementById("song-details");
      if (songDetailsEl) {
        songDetailsEl.textContent = "Loading lofi tracks...";
        songDetailsEl.style.display = "block";
      }
      
      // Only try first 2 queries to fail fast
      const queriesToTry = queries.slice(0, 2);
      // Fetch tracks in parallel
      const fetchPromises = queriesToTry.map(async q => {
        try {
          const url = `${JIOSAAVN_API_BASE}${encodeURIComponent(q)}`;
          const res = await fetchWithCORS(url);
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          const data = await res.json();
          const tracks = extractTracks(data);
          return tracks || [];
        } catch (err) {
          // Silently return empty - we'll use fallback
          return [];
        }
      });
      
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
        apiUnavailable = false; // API is working
      }
    } catch (error) {
      console.error("Error fetching lofi tracks:", error);
      // Use fallback for lofi
      const fallbackTracks = fallbackMusicData.lofi || fallbackMusicData.calm;
      if (fallbackTracks && fallbackTracks.length > 0) {
        shuffleArray(fallbackTracks);
        currentTracks = fallbackTracks;
        currentTrackIndex = 0;
        showJioSaavnTrack(currentTracks, 0);
        setTimeout(() => {
          const currentText = document.getElementById("song-details").textContent;
          document.getElementById("song-details").textContent = currentText + " (Using Fallback - API Unavailable)";
        }, 500);
      } else {
        document.getElementById("song-details").textContent = "Error loading tracks. Please try again.";
      }
    }
  } else {
    // Original logic for other moods - try first 2 queries only to fail fast
    const queriesToTry = queries.slice(0, 2);
    for (let q of queriesToTry) {
      try {
        const url = `${JIOSAAVN_API_BASE}${encodeURIComponent(q)}`;
        const res = await fetchWithCORS(url);
        if (!res.ok) {
          continue;
        }
        const data = await res.json();
        console.log("API Response (full):", JSON.stringify(data, null, 2)); // Debug log - full response
        console.log("API Response type:", typeof data);
        console.log("Is array?", Array.isArray(data));
        
        const tracks = extractTracks(data);
        console.log("Extracted tracks count:", tracks.length);
        console.log("First track sample:", tracks[0] ? JSON.stringify(tracks[0], null, 2) : "No tracks");
        
        // If we have tracks, log the first one's structure
        if (tracks.length > 0) {
          console.log("First track keys:", Object.keys(tracks[0]));
          console.log("First track title field:", tracks[0].title);
          console.log("First track name field:", tracks[0].name);
        }
        
        if (tracks && tracks.length > 0) {
          if (mood === 'calm') shuffleArray(tracks);
          let randomIndex = Math.floor(Math.random() * tracks.length);
          if (lastPlayedTrackId[mood] && tracks.length > 1) {
            let attempts = 0;
            while (tracks[randomIndex]?.id === lastPlayedTrackId[mood] && attempts++ < 5)
              randomIndex = Math.floor(Math.random() * tracks.length);
          }
          if (tracks[randomIndex]?.id) {
            lastPlayedTrackId[mood] = tracks[randomIndex].id;
          }
          currentTracks = tracks;
          currentTrackIndex = randomIndex;
          showJioSaavnTrack(currentTracks, randomIndex);
          found = true;
          apiUnavailable = false; // API is working
          break;
        }
      } catch (error) {
        // Silently continue - we'll use fallback
        continue;
      }
    }
  }

  // If API failed, use fallback sample music
  if (!found) {
    console.log("API unavailable, using fallback music data for mood:", mood);
    const fallbackTracks = fallbackMusicData[mood] || fallbackMusicData.happy;
    const songDetailsEl = document.getElementById("song-details");
    
    if (fallbackTracks && fallbackTracks.length > 0) {
      shuffleArray(fallbackTracks);
      currentTracks = fallbackTracks;
      currentTrackIndex = 0;
      showJioSaavnTrack(currentTracks, 0);
      // Show a notice that we're using fallback music
      setTimeout(() => {
        if (songDetailsEl) {
          const currentText = songDetailsEl.textContent;
          songDetailsEl.textContent = currentText + " (Using Fallback - API Unavailable)";
          songDetailsEl.style.display = "block";
        }
      }, 500);
    } else {
      const errorMsg = "Unable to load music. The music API is currently unavailable. Please try again later or refresh the page.";
      if (songDetailsEl) {
        songDetailsEl.textContent = errorMsg;
        songDetailsEl.style.display = "block";
      }
      ["album-art","audio-player","player-controls"].forEach(id=>{
        const el = document.getElementById(id);
        if (el) el.style.display="none";
      });
      updateProgressBar(0,0);
    }
  }
}

function showJioSaavnTrack(tracks, idx) {
  if (!tracks || !tracks[idx]) {
    console.error("Invalid track data", { tracks, idx });
    const songDetailsEl = document.getElementById("song-details");
    if (songDetailsEl) {
      songDetailsEl.textContent = "Error: Invalid track data";
      songDetailsEl.style.display = "block";
    }
    return;
  }
  
  currentTracks = tracks;
  currentTrackIndex = idx;
  const t = tracks[idx];
  console.log("Displaying track:", t); // Debug log
  
  // Extract audio URL - try multiple possible structures
  let audioUrl = "";
  if (t.downloadUrl && Array.isArray(t.downloadUrl) && t.downloadUrl.length > 0) {
    audioUrl = t.downloadUrl[t.downloadUrl.length - 1]?.url || t.downloadUrl[0]?.url || "";
  } else if (t.downloadUrl && typeof t.downloadUrl === 'string') {
    audioUrl = t.downloadUrl;
  } else if (t.media_url) {
    audioUrl = t.media_url;
  } else if (t.url) {
    audioUrl = t.url;
  } else if (t.download_url) {
    audioUrl = t.download_url;
  }
  
  // Extract album art - try multiple possible structures
  let albumArt = "";
  if (t.image_url) {
    // New API uses image_url
    albumArt = t.image_url;
  } else if (t.image && Array.isArray(t.image) && t.image.length > 0) {
    albumArt = t.image[t.image.length - 1]?.url || t.image[0]?.url || "";
  } else if (t.image && typeof t.image === 'string') {
    albumArt = t.image;
  } else if (t.cover_image) {
    albumArt = t.cover_image;
  } else if (t.thumbnail) {
    albumArt = t.thumbnail;
  }
  
  // Extract song name and artist - check all possible field names
  let songName = "";
  // Try all possible song name fields
  if (t.title) {
    songName = t.title;
  } else if (t.name) {
    songName = t.name;
  } else if (t.song) {
    songName = t.song;
  } else if (t.song_name) {
    songName = t.song_name;
  } else if (t.track) {
    songName = t.track;
  } else if (t.track_name) {
    songName = t.track_name;
  } else {
    songName = "Unknown Song";
  }
  
  // Log all available fields for debugging
  console.log("Track object keys:", Object.keys(t));
  console.log("Song name extracted:", songName);
  
  let artistName = "Unknown Artist";
  // Try all possible artist fields
  if (t.singers) {
    // New API uses 'singers' as a string
    artistName = t.singers;
  } else if (t.singer) {
    artistName = t.singer;
  } else if (t.artist) {
    artistName = Array.isArray(t.artist) ? t.artist.join(", ") : t.artist;
  } else if (t.artists) {
    if (t.artists.primary && Array.isArray(t.artists.primary)) {
      artistName = t.artists.primary.map(a => a.name || a).join(", ");
    } else if (Array.isArray(t.artists)) {
      artistName = t.artists.map(a => a.name || a).join(", ");
    } else if (typeof t.artists === 'string') {
      artistName = t.artists;
    }
  } else if (t.artist_name) {
    artistName = t.artist_name;
  } else if (t.performer) {
    artistName = t.performer;
  }
  
  console.log("Artist name extracted:", artistName);
  
  // Update UI
  const albumArtEl = document.getElementById("album-art");
  if (albumArt) {
    albumArtEl.src = albumArt;
    albumArtEl.style.display = "block";
    albumArtEl.onerror = () => {
      console.warn("Failed to load album art:", albumArt);
      albumArtEl.style.display = "none";
    };
  } else {
    albumArtEl.style.display = "none";
  }
  
  // Ensure song details element is visible and update it
  const songDetailsEl = document.getElementById("song-details");
  if (songDetailsEl) {
    // Build display text with fallbacks
    let displayText = "";
    if (songName && songName !== "Unknown Song" && artistName && artistName !== "Unknown Artist") {
      displayText = `${songName} - ${artistName}`;
    } else if (songName && songName !== "Unknown Song") {
      displayText = songName;
    } else if (artistName && artistName !== "Unknown Artist") {
      displayText = `Unknown Song - ${artistName}`;
    } else {
      // Last resort: try to get any text from the track object
      displayText = t.title || t.name || t.song || JSON.stringify(t).substring(0, 50) || "Song information unavailable";
    }
    
    // Update the element with multiple methods to ensure it works
    songDetailsEl.textContent = displayText;
    songDetailsEl.innerText = displayText;
    songDetailsEl.innerHTML = displayText.replace(/-/g, " - "); // Also set innerHTML
    songDetailsEl.style.display = "block";
    songDetailsEl.style.visibility = "visible";
    songDetailsEl.style.opacity = "1";
    songDetailsEl.style.color = "#333";
    
    // Force a reflow to ensure the browser updates
    songDetailsEl.offsetHeight;
    
    console.log("Song details updated:", displayText);
    console.log("Element textContent after update:", songDetailsEl.textContent);
    console.log("Element innerHTML after update:", songDetailsEl.innerHTML);
    console.log("Element computed style display:", window.getComputedStyle(songDetailsEl).display);
  } else {
    console.error("song-details element not found in DOM!");
  }
  
  const audio = document.getElementById("audio-player");
  if (audioUrl) {
    audio.src = audioUrl;
    audio.style.display = "block";
    document.getElementById("player-controls").style.display = "flex";
    const playPauseBtn = document.getElementById("play-pause-btn");
    playPauseBtn.querySelector('.fa-play').style.display = "inline";
    playPauseBtn.querySelector('.fa-pause').style.display = "none";
    // Handle duration - new API returns it as string, old API as number
    const duration = typeof t.duration === 'string' ? parseInt(t.duration) : (t.duration || 30);
    updateProgressBar(0, duration);
    
    // Load the audio
    audio.load();
  } else {
    console.warn("No audio URL found for track:", t);
    audio.src = "";
    audio.style.display = "none";
    document.getElementById("player-controls").style.display = "none";
    updateProgressBar(0, 0);
    document.getElementById("song-details").textContent = `${songName} - ${artistName} (No preview available)`;
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
const playPauseBtn = document.getElementById("play-pause-btn");
const playIcon = playPauseBtn.querySelector('.fa-play');
const pauseIcon = playPauseBtn.querySelector('.fa-pause');

audio.ontimeupdate = () => updateProgressBar(audio.currentTime, audio.duration || 30);
audio.onended = () => {
  playIcon.style.display = "inline";
  pauseIcon.style.display = "none";
  updateProgressBar(0, audio.duration || 30);
};
audio.onplay = () => {
  playIcon.style.display = "none";
  pauseIcon.style.display = "inline";
};
audio.onpause = () => {
  playIcon.style.display = "inline";
  pauseIcon.style.display = "none";
};

document.getElementById("progress-bar").onclick = e => {
  if (audio.duration) {
    const percent = e.offsetX / e.target.offsetWidth;
    audio.currentTime = percent * audio.duration;
  }
};
document.getElementById("prev-btn").onclick = () => {
  if (currentTracks.length) {
    showJioSaavnTrack(currentTracks, (currentTrackIndex - 1 + currentTracks.length) % currentTracks.length);
  }
};
document.getElementById("next-btn").onclick = () => {
  if (currentTracks.length) {
    showJioSaavnTrack(currentTracks, (currentTrackIndex + 1) % currentTracks.length);
  }
};
playPauseBtn.onclick = () => {
  if (!audio.src) {
    console.warn("No audio source available");
    return;
  }
  if (audio.paused) {
    audio.play().catch(err => {
      console.error("Error playing audio:", err);
      document.getElementById("song-details").textContent += " (Playback error - may need user interaction)";
    });
  } else {
    audio.pause();
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

// Active state is now handled in the unified click handler above

// Initialize song details element on page load
document.addEventListener('DOMContentLoaded', () => {
  const songDetailsEl = document.getElementById("song-details");
  if (songDetailsEl) {
    songDetailsEl.style.display = "block";
    songDetailsEl.style.visibility = "visible";
    if (!songDetailsEl.textContent) {
      songDetailsEl.textContent = "Select a mood to get music recommendations";
    }
  }
});

// Also run immediately in case DOM is already loaded
if (document.readyState === 'loading') {
  // DOM is still loading, wait for DOMContentLoaded
} else {
  // DOM is already loaded
  const songDetailsEl = document.getElementById("song-details");
  if (songDetailsEl) {
    songDetailsEl.style.display = "block";
    songDetailsEl.style.visibility = "visible";
    if (!songDetailsEl.textContent) {
      songDetailsEl.textContent = "Select a mood to get music recommendations";
    }
  }
}
