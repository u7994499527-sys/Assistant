// Configuration des stations de radio
const STATIONS = [
    {
        id: 'franceinfo',
        name: 'France Info',
        streamUrl: 'https://icecast.radiofrance.fr/franceinfo-midfi.mp3',
        logo: 'france-info.png',
        favicon: 'https://www.francetvinfo.fr/favicons/favicon-32x32.png',
        genre: 'Info',
        favorite: true
    },
    {
        id: 'franceinter',
        name: 'France Inter',
        streamUrl: 'https://icecast.radiofrance.fr/franceinter-midfi.mp3',
        logo: 'France_Inter_logo.svg',
        favicon: 'https://www.franceinter.fr/favicons/favicon-32x32.png',
        genre: 'Généraliste',
        favorite: true
    },
    {
        id: 'francemusique',
        name: 'France Musique',
        streamUrl: 'https://icecast.radiofrance.fr/francemusique-midfi.mp3',
        logo: 'France_Musique_logo_2005.svg.png',
        favicon: 'https://www.francemusique.fr/favicons/favicon-32x32.png',
        genre: 'Musique classique',
        favorite: true
    },
    {
        id: 'fip',
        name: 'FIP',
        streamUrl: 'https://icecast.radiofrance.fr/fip-midfi.mp3',
        logo: '20131010030412!FIP_logo.png',
        favicon: 'https://www.fip.fr/favicons/favicon-32x32.png',
        genre: 'Musique éclectique',
        favorite: true
    },
    {
        id: 'nova',
        name: 'Nova',
        streamUrl: 'https://novazz.ice.infomaniak.ch/nova-1-128.mp3',
        logo: null,
        favicon: 'https://www.nova.fr/sites/default/files/favicon.ico',
        genre: 'Musique alternative',
        favorite: false
    },
    {
        id: 'franceculture',
        name: 'France Culture',
        streamUrl: 'https://icecast.radiofrance.fr/franceculture-midfi.mp3',
        logo: null,
        favicon: 'https://www.franceculture.fr/favicons/favicon-32x32.png',
        genre: 'Culture & Société',
        favorite: false
    },
    {
        id: 'rtl',
        name: 'RTL',
        streamUrl: 'https://streaming.radio.rtl.fr/rtl-1-44-128',
        logo: null,
        favicon: 'https://www.rtl.fr/favicon.ico',
        genre: 'Généraliste',
        favorite: false
    },
    {
        id: 'rmc',
        name: 'RMC',
        streamUrl: 'https://audio.bfmtv.com/rmcradio_128.mp3',
        logo: null,
        favicon: 'https://www.rmc.fr/favicon.ico',
        genre: 'Info & Talk',
        favorite: false
    },
    {
        id: 'nrj',
        name: 'NRJ',
        streamUrl: 'https://scdn.nrjaudio.fm/audio1/fr/30001/mp3_128.mp3',
        logo: null,
        favicon: 'https://www.nrj.fr/favicon.ico',
        genre: 'Hits & Pop',
        favorite: false
    },
    {
        id: 'skyrock',
        name: 'Skyrock',
        streamUrl: 'https://icecast.skyrock.net/s/natio_mp3_128k',
        logo: null,
        favicon: 'https://www.skyrock.fm/favicon.ico',
        genre: 'Rap & Hip-Hop',
        favorite: false
    },
    {
        id: 'funradio',
        name: 'Fun Radio',
        streamUrl: 'https://streaming.radio.funradio.fr/fun-1-44-128',
        logo: null,
        favicon: 'https://www.funradio.fr/favicon.ico',
        genre: 'Dance & Électro',
        favorite: false
    },
    {
        id: 'europe1',
        name: 'Europe 1',
        streamUrl: 'https://stream.europe1.fr/europe1.mp3',
        logo: null,
        favicon: 'https://www.europe1.fr/favicon.ico',
        genre: 'Généraliste',
        favorite: false
    },
    {
        id: 'radioclassique',
        name: 'Radio Classique',
        streamUrl: 'https://radioclassique.ice.infomaniak.ch/radioclassique-high.mp3',
        logo: null,
        favicon: 'https://www.radioclassique.fr/favicon.ico',
        genre: 'Musique classique',
        favorite: false
    },
    {
        id: 'jazz',
        name: 'TSF Jazz',
        streamUrl: 'https://tsfjazz.ice.infomaniak.ch/tsfjazz-high.mp3',
        logo: null,
        favicon: 'https://www.tsfjazz.com/favicon.ico',
        genre: 'Jazz',
        favorite: false
    },
    {
        id: 'rfm',
        name: 'RFM',
        streamUrl: 'https://stream.rfm.fr/rfm.mp3',
        logo: null,
        favicon: 'https://www.rfm.fr/favicon.ico',
        genre: 'Pop & Rock',
        favorite: false
    }
];

// Gestion des favoris
function loadFavorites() {
    const savedFavorites = localStorage.getItem('radioFavorites');
    if (savedFavorites) {
        const favorites = JSON.parse(savedFavorites);
        STATIONS.forEach(station => {
            station.favorite = favorites[station.id] || false;
        });
    }
    renderFavorites(); // Mettre à jour l'affichage des favoris
}

function saveFavorites() {
    const favorites = {};
    STATIONS.forEach(station => {
        favorites[station.id] = station.favorite;
    });
    localStorage.setItem('radioFavorites', JSON.stringify(favorites));
    renderFavorites(); // Mettre à jour l'affichage des favoris
}

function renderFavorites() {
    const favoritesList = document.getElementById('favorites-list');
    favoritesList.innerHTML = '';
    
    const favoriteStations = STATIONS.filter(station => station.favorite);
    
    if (favoriteStations.length === 0) {
        favoritesList.innerHTML = `
            <div class="w-full text-center py-4 text-gray-500">
                <i class="fas fa-heart text-2xl mb-2"></i>
                <p>Ajoutez des stations à vos favoris</p>
            </div>
        `;
        return;
    }
    
    favoriteStations.forEach(station => {
        const favoriteElement = document.createElement('div');
        favoriteElement.className = 'bg-white shadow-sm p-3 flex items-center gap-3 cursor-pointer hover:shadow-md transition-shadow';
        favoriteElement.innerHTML = `
            <div class="w-10 h-10 bg-gray-50 overflow-hidden flex items-center justify-center">
                ${station.logo ? 
                    `<img src="${station.logo}" alt="${station.name}" class="w-full h-full object-contain p-1" 
                          onerror="this.onerror=null; this.src='${station.favicon}'; this.classList.add('p-2');">` :
                    station.favicon ?
                    `<img src="${station.favicon}" alt="${station.name}" class="w-full h-full object-contain p-2">` :
                    '<i class="fas fa-broadcast-tower text-xl text-gray-500"></i>'}
            </div>
            <div class="flex-1 min-w-0">
                <h4 class="font-medium text-sm text-gray-800 truncate">${station.name}</h4>
                <p class="text-xs text-gray-500 truncate">${station.genre}</p>
            </div>
        `;
        
        favoriteElement.addEventListener('click', () => {
            const stationIndex = STATIONS.findIndex(s => s.id === station.id);
            loadStation(stationIndex);
            if (!isPlaying) togglePlayPause();
        });
        
        favoritesList.appendChild(favoriteElement);
    });
}

function toggleFavorite(stationId) {
    const station = STATIONS.find(s => s.id === stationId);
    if (station) {
        station.favorite = !station.favorite;
        saveFavorites();
        renderStationsList(); // Mettre à jour l'affichage
    }
}

// Éléments du DOM
const audioPlayer = new Audio();
let currentStationIndex = 0;
let isPlaying = false;
let updateInterval;

// Récupération des éléments DOM
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const volumeControl = document.getElementById('volume');
const progressBar = document.getElementById('progress-bar');
const currentTimeElement = document.getElementById('current-time');
const durationElement = document.getElementById('duration');
const stationNameElement = document.getElementById('station-name');
const songInfoElement = document.getElementById('song-info');
const equalizer = document.getElementById('equalizer');

// Sauvegarder la station courante
function saveCurrentStation() {
    const currentState = {
        stationId: STATIONS[currentStationIndex].id,
        isPlaying: isPlaying,
        volume: audioPlayer.volume
    };
    localStorage.setItem('radioCurrentState', JSON.stringify(currentState));
}

// Charger la dernière station écoutée
function loadLastStation() {
    const savedState = localStorage.getItem('radioCurrentState');
    if (savedState) {
        const state = JSON.parse(savedState);
        const stationIndex = STATIONS.findIndex(s => s.id === state.stationId);
        if (stationIndex !== -1) {
            // Restaurer le volume
            audioPlayer.volume = state.volume;
            volumeControl.value = state.volume;
            
            // Charger la station et démarrer la lecture
            loadStation(stationIndex);
            
            // Force la lecture
            if (audioPlayer.paused) {
                togglePlayPause();
            }
            return true;
        }
    }
    return false;
}

// Initialisation de l'application
function init() {
    // Charger les favoris depuis le stockage local
    loadFavorites();
    
    // Initialiser la recherche
    initSearch();
    
    // Créer la liste des stations
    renderStationsList();
    
    // Configurer les écouteurs d'événements
    setupEventListeners();
    
    // Restaurer la dernière station écoutée ou démarrer avec la première
    if (!loadLastStation()) {
        loadStation(0);
    }
    
    // Créer l'animation de l'égaliseur
    createEqualizer();
}

// Créer l'animation de l'égaliseur
function createEqualizer() {
    for (let i = 0; i < 12; i++) {
        const bar = document.createElement('div');
        bar.className = 'w-1.5 bg-gradient-to-t from-gray-400 to-gray-300';
        bar.style.height = '8px';
        bar.style.animation = `equalizer${i % 3 + 1} 1.2s infinite ease-in-out`;
        bar.style.animationDelay = `${i * 0.1}s`;
        bar.style.opacity = '0.8';
        equalizer.appendChild(bar);
    }
}

// Fonction de recherche et filtrage des stations
function filterStations(query) {
    if (!query) return STATIONS;
    
    query = query.toLowerCase().trim();
    return STATIONS.filter(station => 
        station.name.toLowerCase().includes(query) ||
        station.genre.toLowerCase().includes(query)
    );
}

// Gestionnaire de la recherche
function initSearch() {
    const searchInput = document.getElementById('search-input');
    let debounceTimeout;

    searchInput.addEventListener('input', (e) => {
        // Annuler le timeout précédent
        if (debounceTimeout) clearTimeout(debounceTimeout);
        
        // Définir un nouveau timeout pour le debounce
        debounceTimeout = setTimeout(() => {
            const query = e.target.value;
            renderStationsList(query);
        }, 300); // Délai de 300ms pour éviter trop de rafraîchissements
    });

    // Empêcher la soumission du formulaire
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    });
}

// Afficher la liste des stations
function renderStationsList(searchQuery = '') {
    const leftList = document.getElementById('stations-list-left');
    const rightList = document.getElementById('stations-list-right');
    
    leftList.innerHTML = '';
    rightList.innerHTML = '';
    
    // Filtrer les stations selon la recherche
    const filteredStations = filterStations(searchQuery);
    
    // Calculer le milieu pour répartir équitablement les stations
    const middleIndex = Math.ceil(filteredStations.length / 2);

    filteredStations.forEach((station, index) => {
        const stationElement = document.createElement('div');
        stationElement.className = `flex items-center p-4 hover:bg-gray-50 cursor-pointer transition-all duration-300 relative ${index === currentStationIndex ? 'bg-gray-50' : ''}`;
        
        // Ajouter la barre de sélection avec une transition
        const selectionBar = document.createElement('div');
        selectionBar.className = `absolute left-0 top-0 bottom-0 w-1 bg-blue-500 transition-all duration-500 transform origin-left ${index === currentStationIndex ? 'scale-y-100' : 'scale-y-0'}`;
        stationElement.appendChild(selectionBar);
        
        stationElement.innerHTML += `
            <div class="flex-shrink-0 w-16 h-16 bg-gray-50 overflow-hidden shadow-sm flex items-center justify-center">
                ${station.logo ? 
                    `<img src="${station.logo}" alt="${station.name}" class="w-full h-full object-contain p-1" 
                          onerror="this.onerror=null; this.src='${station.favicon}'; this.classList.add('p-2'); this.onerror=function() {
                              this.parentNode.innerHTML='<i class=&quot;fas fa-broadcast-tower text-3xl text-gray-500&quot;></i>';
                          }">` :
                    station.favicon ?
                    `<img src="${station.favicon}" alt="${station.name}" class="w-full h-full object-contain p-2" 
                          onerror="this.onerror=null; this.parentNode.innerHTML='<i class=&quot;fas fa-broadcast-tower text-3xl text-gray-400&quot;></i>';">` :
                    '<i class="fas fa-broadcast-tower text-3xl text-gray-500"></i>'}
            </div>
            <div class="ml-4 flex-1">
                <h4 class="font-medium text-gray-800">${station.name}</h4>
                <p class="text-sm text-gray-500">${station.genre}</p>
            </div>
            <div class="text-gray-400 cursor-pointer hover:scale-110 transform transition-transform">
                <i class="fas fa-heart ${station.favorite ? 'text-red-500' : ''}" data-station-id="${station.id}"></i>
            </div>
        `;
        
        // Ajouter l'événement de clic pour lire la station
        stationElement.addEventListener('click', (e) => {
            // Ne pas déclencher si on clique sur l'icône de favori
            if (!e.target.closest('.text-gray-400')) {
                loadStation(index);
                if (!isPlaying) togglePlayPause();
            }
        });
        
        // Ajouter l'événement de clic sur l'icône de favori
        const favoriteIcon = stationElement.querySelector('.fa-heart');
        favoriteIcon.addEventListener('click', (e) => {
            e.stopPropagation(); // Empêcher le déclenchement de l'événement de la station
            toggleFavorite(station.id);
        });
        
        // Répartir équitablement les stations
        if (index < middleIndex) {
            leftList.appendChild(stationElement);
        } else {
            rightList.appendChild(stationElement);
        }
    });
}

// Configurer les écouteurs d'événements
function setupEventListeners() {
    // Bouton lecture/pause
    playBtn.addEventListener('click', togglePlayPause);
    
    // Boutons précédent/suivant
    prevBtn.addEventListener('click', playPreviousStation);
    nextBtn.addEventListener('click', playNextStation);
    
    // Contrôle du volume
    volumeControl.addEventListener('input', updateVolume);
    
    // Mettre à jour la barre de progression
    audioPlayer.addEventListener('timeupdate', updateProgress);
    
    // Gérer la fin de la lecture
    audioPlayer.addEventListener('ended', playNextStation);
    
    // Gérer les erreurs
    audioPlayer.addEventListener('error', handleError);
    
    // Raccourcis clavier
    document.addEventListener('keydown', handleKeyPress);
}

// Charger une station de radio
function loadStation(index) {
    // Mettre à jour l'index de la station courante
    currentStationIndex = index;
    const station = STATIONS[index];
    
    // Mettre à jour l'interface
    stationNameElement.textContent = station.name;
    songInfoElement.textContent = 'Connexion...';
    
    // Mettre à jour l'icône de la station
    const currentStationIcon = document.getElementById('current-station-icon');
    if (station.logo) {
        currentStationIcon.innerHTML = `<img src="${station.logo}" alt="${station.name}" class="w-full h-full object-contain p-1" 
            onerror="this.onerror=null; this.src='${station.favicon}'; this.classList.add('p-2'); this.onerror=function() {
                this.parentNode.innerHTML='<i class=&quot;fas fa-broadcast-tower text-2xl text-gray-400&quot;></i>';
            }">`;
    } else if (station.favicon) {
        currentStationIcon.innerHTML = `<img src="${station.favicon}" alt="${station.name}" class="w-full h-full object-contain p-2" 
            onerror="this.onerror=null; this.parentNode.innerHTML='<i class=&quot;fas fa-broadcast-tower text-2xl text-gray-400&quot;></i>';">`;
    } else {
        currentStationIcon.innerHTML = '<i class="fas fa-broadcast-tower text-2xl text-gray-500"></i>';
    }
    
    // Mettre à jour la station active dans les listes avec animation
    const stationElements = document.querySelectorAll('#stations-list-left > div, #stations-list-right > div');
    stationElements.forEach((el, i) => {
        const selectionBar = el.querySelector('div:first-child');
        if (i === index) {
            el.classList.add('bg-white', 'shadow-md');
            selectionBar.classList.remove('scale-y-0');
            selectionBar.classList.add('scale-y-100');
        } else {
            el.classList.remove('bg-white', 'shadow-md');
            selectionBar.classList.remove('scale-y-100');
            selectionBar.classList.add('scale-y-0');
        }
    });
    
    // Arrêter la lecture en cours
    audioPlayer.pause();
    
    // Charger la nouvelle source
    audioPlayer.src = station.streamUrl;
    
    // Démarrer la lecture avec retry automatique
    const startPlayback = (retryCount = 3) => {
        audioPlayer.play().then(() => {
            isPlaying = true;
            updatePlayButton();
        }).catch(error => {
            console.error('Erreur de lecture:', error);
            if (retryCount > 0) {
                // Réessayer après 1 seconde
                setTimeout(() => startPlayback(retryCount - 1), 1000);
                songInfoElement.textContent = 'Tentative de connexion...';
            } else {
                songInfoElement.textContent = 'Erreur de lecture';
                isPlaying = false;
                updatePlayButton();
            }
        });
    };
    
    startPlayback();
    
    // Mettre à jour l'état de lecture
    isPlaying = true;
    updatePlayButton();
    
    // Sauvegarder l'état
    saveCurrentStation();
    
    // Simuler des informations de chanson (dans une vraie application, cela viendrait d'une API)
    updateSongInfo();
}

// Basculer entre lecture et pause
function togglePlayPause() {
    if (audioPlayer.paused) {
        audioPlayer.play().then(() => {
            isPlaying = true;
            updatePlayButton();
            saveCurrentStation();
        }).catch(error => {
            console.error('Erreur de lecture:', error);
            songInfoElement.textContent = 'Erreur de lecture';
        });
    } else {
        audioPlayer.pause();
        isPlaying = false;
        updatePlayButton();
        saveCurrentStation();
    }
}

// Mettre à jour l'état du bouton lecture/pause
function updatePlayButton() {
    const icon = playBtn.querySelector('i');
    if (isPlaying) {
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
    } else {
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
    }
}

// Jouer la station précédente
function playPreviousStation() {
    currentStationIndex = (currentStationIndex - 1 + STATIONS.length) % STATIONS.length;
    loadStation(currentStationIndex);
}

// Jouer la station suivante
function playNextStation() {
    currentStationIndex = (currentStationIndex + 1) % STATIONS.length;
    loadStation(currentStationIndex);
}

// Mettre à jour le volume
function updateVolume() {
    audioPlayer.volume = volumeControl.value;
    saveCurrentStation(); // Sauvegarder le nouveau volume
}

// Mettre à jour la barre de progression
function updateProgress() {
    const { currentTime, duration } = audioPlayer;
    const progressPercent = (currentTime / duration) * 100 || 0;
    progressBar.style.width = `${progressPercent}%`;
    
    // Mettre à jour les temps affichés
    currentTimeElement.textContent = formatTime(currentTime);
    durationElement.textContent = isFinite(duration) ? formatTime(duration) : '--:--';
}

// Formater le temps en MM:SS
function formatTime(seconds) {
    if (!isFinite(seconds)) return '--:--';
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Mettre à jour les informations de la chanson en cours (simulé)
function updateSongInfo() {
    // Dans une vraie application, vous feriez une requête à une API pour obtenir ces informations
    const stationsInfo = {
        'franceinfo': 'Les dernières actualités en continu',
        'franceinter': 'Émission en cours : Le 7/9',
        'francemusique': 'Concert de musique classique en direct',
        'fip': 'Session spéciale : Découvertes musicales',
        'nova': 'Nova Club - Musiques électroniques'
    };
    
    const currentStation = STATIONS[currentStationIndex];
    songInfoElement.textContent = stationsInfo[currentStation.id] || 'En direct';
    
    // Changer le texte périodiquement pour simuler des mises à jour
    if (updateInterval) clearInterval(updateInterval);
    
    updateInterval = setInterval(() => {
        const now = new Date();
        const hour = now.getHours();
        
        // Simuler des changements en fonction de l'heure
        if (currentStation.id === 'franceinfo') {
            songInfoElement.textContent = `Journal de ${hour}h`;
        } else if (currentStation.id === 'franceinter') {
            const shows = [
                'Le 7/9',
                'La bande originale',
                'Grand bien vous fasse',
                'Le téléphone sonne',
                'Par Jupiter !'
            ];
            songInfoElement.textContent = `Émission en cours : ${shows[hour % shows.length]}`;
        } else if (currentStation.id === 'francemusique') {
            const concerts = [
                'Concert de musique classique',
                'Opéra en direct',
                'Récital de piano',
                'Orchestre philharmonique',
                'Musique de chambre'
            ];
            songInfoElement.textContent = concerts[Math.floor(Math.random() * concerts.length)];
        } else if (currentStation.id === 'fip') {
            const genres = [
                'Jazz',
                'Rock',
                'Électro',
                'World',
                'Hip-hop',
                'Reggae',
                'Soul',
                'Funk'
            ];
            const artist1 = `Artiste ${Math.floor(Math.random() * 100)}`;
            const artist2 = `Artiste ${Math.floor(Math.random() * 100)}`;
            const genre1 = genres[Math.floor(Math.random() * genres.length)];
            let genre2;
            do {
                genre2 = genres[Math.floor(Math.random() * genres.length)];
            } while (genre2 === genre1);
            
            songInfoElement.textContent = `${artist1} (${genre1}) - ${artist2} (${genre2})`;
        } else if (currentStation.id === 'nova') {
            const shows = [
                'Nova Club',
                'Nova World',
                'Nova Rock',
                'Nova Electro',
                'Nova Hip-hop',
                'Nova Reggae',
                'Nova Soul',
                'Nova Funk'
            ];
            songInfoElement.textContent = `${shows[Math.floor(Math.random() * shows.length)]} - En direct`;
        }
    }, 10000); // Changer toutes les 10 secondes
}

// Gérer les erreurs
function handleError(error) {
    console.error('Erreur audio:', error);
    songInfoElement.textContent = 'Erreur de lecture - Vérifiez votre connexion';
    isPlaying = false;
    updatePlayButton();
}

// Gérer les raccourcis clavier
function handleKeyPress(e) {
    switch(e.key.toLowerCase()) {
        case ' ':
        case 'k':
            e.preventDefault();
            togglePlayPause();
            break;
        case 'arrowleft':
            playPreviousStation();
            break;
        case 'arrowright':
            playNextStation();
            break;
        case 'arrowup':
            volumeControl.stepUp();
            updateVolume();
            break;
        case 'arrowdown':
            volumeControl.stepDown();
            updateVolume();
            break;
        case 'm':
            audioPlayer.muted = !audioPlayer.muted;
            break;
    }
}

// Enregistrer le service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker enregistré avec succès:', registration.scope);
      })
      .catch(error => {
        console.error('Échec de l\'enregistrement du Service Worker:', error);
      });
  });
}

// Détecter si l'application est installée en PWA
window.addEventListener('appinstalled', (evt) => {
  console.log('Application installée avec succès');
  // Vous pouvez ajouter ici un suivi d'installation ou afficher un message de bienvenue
});

// Détecter si l'utilisateur est sur mobile
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Détecter si l'application est en mode standalone (installée sur l'écran d'accueil)
const isInStandaloneMode = () =>
  (window.matchMedia('(display-mode: standalone)').matches) ||
  (window.navigator.standalone) ||
  document.referrer.includes('android-app://');

// Gestion du thème sombre
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    
    // Vérifier si un thème est sauvegardé
    const isDark = localStorage.getItem('darkTheme') === 'true';
    if (isDark) {
        document.documentElement.classList.add('dark');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
    
    // Gérer le changement de thème
    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        const isDarkMode = document.documentElement.classList.contains('dark');
        localStorage.setItem('darkTheme', isDarkMode);
        
        // Changer l'icône
        if (isDarkMode) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
}

// Gérer le menu mobile
function initMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeSidebarButton = document.getElementById('close-sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    function openSidebar() {
        sidebar.classList.remove('-translate-x-full');
        overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
        sidebar.classList.add('-translate-x-full');
        overlay.classList.add('hidden');
        document.body.style.overflow = '';
    }

    // Gestionnaires d'événements pour le menu mobile
    mobileMenuButton.addEventListener('click', openSidebar);
    closeSidebarButton.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);

    // Fermer le menu si on clique sur une station
    sidebar.addEventListener('click', (e) => {
        if (e.target.closest('#stations-list-left') || e.target.closest('#stations-list-right')) {
            if (window.innerWidth < 768) { // Uniquement sur mobile
                closeSidebar();
            }
        }
    });

    // Gérer le redimensionnement de la fenêtre
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) { // Breakpoint md de Tailwind
            sidebar.classList.remove('-translate-x-full');
            overlay.classList.add('hidden');
            document.body.style.overflow = '';
        }
    });
}

// Gérer le formulaire d'inscription
function handleSignupForm() {
    const form = document.getElementById('signup-form');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Récupérer les données du formulaire
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Simuler une inscription (dans une vraie application, cela serait envoyé à un serveur)
        try {
            // Simuler un délai de traitement
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Stocker les informations localement (pour la démo)
            localStorage.setItem('user', JSON.stringify({ name, email }));
            
            // Afficher un message de succès
            alert('Inscription réussie !');
            
            // Réinitialiser le formulaire
            form.reset();
            
        } catch (error) {
            console.error('Erreur lors de l\'inscription:', error);
            alert('Une erreur est survenue lors de l\'inscription. Veuillez réessayer.');
        }
    });
}

// Démarrer l'application lorsque le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    init();
    initTheme();
    initMobileMenu();
    handleSignupForm();
    
    // Afficher la bannière d'installation sur mobile
    if (isMobile && !isInStandaloneMode()) {
        showInstallBanner();
    }
});

// Afficher la bannière d'installation
function showInstallBanner() {
  // Créer la bannière
  const banner = document.createElement('div');
  banner.className = 'fixed bottom-0 left-0 right-0 bg-blue-600 text-white p-4 flex justify-between items-center z-50';
  banner.innerHTML = `
    <div class="flex items-center">
      <img src="icone.png" alt="Logo" class="w-8 h-8 mr-2">
      <div>
        <p class="font-medium">Installer l'application</p>
        <p class="text-sm opacity-80">Profitez d'une meilleure expérience avec notre application</p>
      </div>
    </div>
    <button id="install-button" class="bg-white text-blue-600 px-4 py-2 rounded font-medium">Installer</button>
  `;
  
  document.body.appendChild(banner);
  
  // Gérer le clic sur le bouton d'installation
  const installButton = document.getElementById('install-button');
  let deferredPrompt;
  
  window.addEventListener('beforeinstallprompt', (e) => {
    // Empêcher l'affichage automatique de la bannière
    e.preventDefault();
    // Stocker l'événement pour une utilisation ultérieure
    deferredPrompt = e;
    
    // Afficher la bannière
    banner.style.display = 'flex';
  });
  
  installButton.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    
    // Afficher l'invite d'installation
    deferredPrompt.prompt();
    
    // Attendre que l'utilisateur réponde à l'invite
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`Résultat de l'installation: ${outcome}`);
    
    // Cacher la bannière
    banner.style.display = 'none';
    
    // Réinitialiser la variable deferredPrompt car elle ne peut être utilisée qu'une seule fois
    deferredPrompt = null;
  });
  
  // Cacher la bannière après 15 secondes
  setTimeout(() => {
    banner.style.display = 'none';
  }, 15000);
}
