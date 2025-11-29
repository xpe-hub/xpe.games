// ===== CONFIGURACIÓN GLOBAL =====
const CONFIG = {
    featuredGames: [
        {
            title: "Tic Tac Toe",
            description: "El clásico juego de tres en raya con IA inteligente",
            icon: "🎮",
            rating: "5.0",
            category: "Clásicos",
            path: "games/tateti/index.html"
        },
        {
            title: "Snake Game",
            description: "¡Haz crecer la serpiente y evita chocar!",
            icon: "🐍",
            rating: "4.8",
            category: "Clásicos",
            path: null // Próximamente
        },
        {
            title: "Super Mario",
            description: "El héroe de plataformas más famoso",
            icon: "🍄",
            rating: "4.9",
            category: "Aventura",
            path: null // Próximamente
        },
        {
            title: "Tetris",
            description: "El rompecabezas icónico de bloques",
            icon: "🧩",
            rating: "4.7",
            category: "Puzzle",
            path: null // Próximamente
        }
    ]
};

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    initializeParticles();
    loadFeaturedGames();
    initializeEventListeners();
    addCrownAnimation();
    
    console.log('👑 XPE Games inicializado correctamente');
});

// ===== SISTEMA DE PARTÍCULAS =====
function initializeParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    // Crear partículas de fondo dinámicas
    for (let i = 0; i < 20; i++) {
        createParticle(particlesContainer);
    }
    
    // Crear nuevas partículas cada 3 segundos
    setInterval(() => {
        createParticle(particlesContainer);
    }, 3000);
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 1}px;
        height: ${Math.random() * 4 + 1}px;
        background: radial-gradient(circle, rgba(255, 215, 0, 0.8), transparent);
        border-radius: 50%;
        pointer-events: none;
        animation: float ${Math.random() * 3 + 2}s ease-in-out infinite;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
    `;
    
    container.appendChild(particle);
    
    // Remover partícula después de la animación
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 5000);
}

// ===== CARGA DE JUEGOS DESTACADOS =====
function loadFeaturedGames() {
    const gamesGrid = document.getElementById('gamesGrid');
    if (!gamesGrid) return;
    
    gamesGrid.innerHTML = '';
    
    CONFIG.featuredGames.forEach((game, index) => {
        const gameCard = createGameCard(game, index);
        gamesGrid.appendChild(gameCard);
    });
}

function createGameCard(game, index) {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    const iconHtml = game.path 
        ? `<div class="game-icon">${game.icon}</div>`
        : `<div class="game-icon">🎮</div>`;
    
    card.innerHTML = `
        ${iconHtml}
        <div class="game-info">
            <h3>${game.title}</h3>
            <p class="game-description">${game.description}</p>
            <div class="game-meta">
                <div class="game-rating">
                    <span class="rating-stars">${'★'.repeat(5)}</span>
                    <span>${game.rating}</span>
                </div>
                <span class="game-category">${game.category}</span>
            </div>
            <button class="play-button" onclick="playGame(${JSON.stringify(game).replace(/"/g, '&quot;')})">
                ${game.path ? 'JUGAR AHORA' : 'PRÓXIMAMENTE'}
            </button>
        </div>
    `;
    
    return card;
}

// ===== SISTEMA DE JUEGOS =====
function playGame(gameData) {
    if (gameData.path) {
        // Juego disponible - abrir en modal
        showLoadingOverlay();
        setTimeout(() => {
            hideLoadingOverlay();
            openGameInModal(gameData.path, gameData.title);
        }, 1500);
    } else {
        // Juego próximamente
        showComingSoonModal();
    }
}

function openGameInModal(gamePath, gameTitle) {
    const modal = document.getElementById('gameModal');
    const title = document.getElementById('gameTitle');
    const iframe = document.getElementById('gameIframe');
    
    if (!modal || !title || !iframe) return;
    
    title.textContent = gameTitle;
    iframe.src = gamePath;
    modal.classList.add('active');
    
    // Prevenir scroll del body
    document.body.style.overflow = 'hidden';
}

function closeGameModal() {
    const modal = document.getElementById('gameModal');
    const iframe = document.getElementById('gameIframe');
    
    if (!modal) return;
    
    modal.classList.remove('active');
    
    // Limpiar iframe para liberar memoria
    if (iframe) {
        iframe.src = 'about:blank';
    }
    
    // Restaurar scroll del body
    document.body.style.overflow = 'auto';
}

// ===== SISTEMA DE MODALES =====
function showLoadingOverlay() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function hideLoadingOverlay() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function showComingSoonModal() {
    const modal = document.getElementById('comingSoonModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function hideComingSoonModal() {
    const modal = document.getElementById('comingSoonModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// ===== EVENTOS =====
function initializeEventListeners() {
    // Botón cerrar juego
    const closeGameBtn = document.getElementById('closeGameBtn');
    if (closeGameBtn) {
        closeGameBtn.addEventListener('click', closeGameModal);
    }
    
    // Botón cerrar próximamente
    const comingCloseBtn = document.getElementById('comingCloseBtn');
    if (comingCloseBtn) {
        comingCloseBtn.addEventListener('click', hideComingSoonModal);
    }
    
    // Cerrar modales con ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeGameModal();
            hideComingSoonModal();
        }
    });
    
    // Cerrar modal haciendo clic fuera del contenido
    const gameModal = document.getElementById('gameModal');
    if (gameModal) {
        gameModal.addEventListener('click', function(e) {
            if (e.target === gameModal) {
                closeGameModal();
            }
        });
    }
    
    const comingSoonModal = document.getElementById('comingSoonModal');
    if (comingSoonModal) {
        comingSoonModal.addEventListener('click', function(e) {
            if (e.target === comingSoonModal) {
                hideComingSoonModal();
            }
        });
    }
    
    // Efectos hover mejorados
    initializeHoverEffects();
}

function initializeHoverEffects() {
    // Efecto de brillos en las tarjetas
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Efecto de pulsación en la corona principal
    const crown = document.querySelector('.golden-crown');
    if (crown) {
        crown.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        crown.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
}

// ===== ANIMACIONES ESPECIALES =====
function addCrownAnimation() {
    // Animación de entrada para la corona
    const crown = document.querySelector('.golden-crown');
    if (crown) {
        crown.style.opacity = '0';
        crown.style.transform = 'translateY(-50px) scale(0.5)';
        
        setTimeout(() => {
            crown.style.transition = 'all 1s ease-out';
            crown.style.opacity = '1';
            crown.style.transform = 'translateY(0) scale(1)';
        }, 500);
    }
    
    // Animación de título
    const title = document.querySelector('.main-title');
    if (title) {
        title.style.opacity = '0';
        title.style.transform = 'translateY(-30px)';
        
        setTimeout(() => {
            title.style.transition = 'all 1s ease-out 0.3s';
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        }, 500);
    }
    
    // Animación de subtítulo
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
        subtitle.style.opacity = '0';
        subtitle.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            subtitle.style.transition = 'all 0.8s ease-out 0.6s';
            subtitle.style.opacity = '1';
            subtitle.style.transform = 'translateY(0)';
        }, 500);
    }
}

// ===== UTILIDADES =====
function showNotification(message, type = 'success') {
    // Crear notificación temporal
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(45deg, #FFD700, #FFA500)' : 'linear-gradient(45deg, #FF6B6B, #FF8E8E)'};
        color: #0F0F23;
        padding: 15px 25px;
        border-radius: 10px;
        font-weight: 600;
        z-index: 9999;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        animation: slideInRight 0.5s ease-out;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-in forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 500);
    }, 3000);
}

// ===== ANIMACIONES CSS DINÁMICAS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0) rotate(0deg); opacity: 1; }
        50% { transform: translateY(-20px) rotate(180deg); opacity: 0.7; }
    }
`;
document.head.appendChild(style);

// ===== EXPORTAR FUNCIONES GLOBALES =====
window.playGame = playGame;
window.closeGameModal = closeGameModal;
window.showComingSoonModal = showComingSoonModal;
window.hideComingSoonModal = hideComingSoonModal;

console.log('🚀 XPE Games JavaScript cargado correctamente');