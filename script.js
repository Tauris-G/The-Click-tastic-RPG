<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>The Click-tastic Adventure</title>
    <!-- Link to External CSS -->
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="game-container">

        <!-- Tutorial Modal -->
        <div id="tutorialModal" class="modal active">
            <div style="text-align: center;">
                <h2> The Wise Old Wizard 👴</h2>
                <p id="npcDialog">Welcome, young adventurer! 👀 Prepare for an epic journey!</p>

                <button onclick="nextDialog()">Next</button>
                <button id="startGameButton" onclick="startGame()" style="display: none;">Start Game!</button>
            </div>
        </div>

        <!-- Notification Area -->
        <div id="notificationArea"></div>

        <!-- Game Title -->
        <h1>The Click-tastic Adventure 🏰</h1>

        <!-- Navigation Tabs -->
        <div class="nav-tabs">
            <button class="tab-button active" onclick="switchTab('home', this)">Home</button>
            <button class="tab-button" onclick="switchTab('upgrades', this)">Upgrades 🛠️</button>
            <button class="tab-button" onclick="switchTab('swords', this)">Swords 🗡️</button>
            <button class="tab-button" onclick="switchTab('achievements', this)">Achievements 🏆</button>
        </div>

        <!-- Blood Particles Container -->
        <div id="bloodParticles"></div>

        <!-- Level-Up Modal -->
        <div id="levelUpModal" class="modal">
            <h2>🎉 Level Up! 🎉</h2>
            <p>You have reached Level <span id="newLevel">1</span>!</p>
            <button onclick="closeLevelUpModal()">Close</button>
        </div>

        <!-- Victory Modal -->
        <div id="victoryModal" class="modal">
            <h2>🏆 Victory! 🏆</h2>
            <p>Congratulations! You have acquired all 30 swords and reached Level 100!</p>
            <button onclick="closeVictoryModal()">Celebrate 🎉</button>
        </div>

        <!-- Game Over Modal -->
        <div id="gameOverModal" class="modal">
            <h2>💀 Game Over! 💀</h2>
            <p>You have lost all your lives. The game will restart.</p>
            <button onclick="restartGame()">Restart</button>
        </div>

        <!-- Sections Container -->
        <div style="width: 100%; flex: 1; display: flex; flex-direction: column; align-items: center; overflow: hidden;">
            <!-- Home Section -->
            <div id="home" class="section active">
                <!-- Hero -->
                <div id="hero" title="Click to earn gold!">🧝</div>
                <p>Click your hero to earn gold and fend off mischievous monsters! 💰👾</p>

                <!-- Stats -->
                <div class="stats">
                    <p>Gold: <span id="gold">0</span> 💰</p>
                    <p>Level: <span id="level">1</span> 🔼</p>
                    <p>Experience: <span id="experience">0</span> / <span id="expToNext">10</span> XP</p>
                    <div class="progress-bar-container">
                        <div id="xpBar" class="progress-bar"></div>
                    </div>
                    <p>Passive Income: <span id="passiveIncome">0</span> gold/sec ⏳</p>
                    <p>Damage: <span id="attackPower">1</span> 🗡️</p>
                    <p>Defense: <span id="defense">1</span> 🛡️</p>
                    <p>Health: <span id="currentHealth">100</span> / <span id="maxHealth">100</span> ❤️</p>
                    <p>Lives: <span id="lives">3</span> 💔</p>
                </div>

                <!-- Monsters Container -->
                <div id="monstersContainer">
                    <!-- Monsters will appear here -->
                </div>
            </div>

            <!-- Upgrades Section -->
            <div id="upgrades" class="section">
                <h2>Upgrades 🛠️</h2>
                <div id="upgradesList">
                    <!-- Upgrades will be dynamically inserted here -->
                </div>
            </div>

            <!-- Swords Section -->
            <div id="swords" class="section">
                <h2>Sword Upgrades 🗡️</h2>
                <div id="swordsList">
                    <!-- Swords will be dynamically inserted here -->
                </div>
            </div>

            <!-- Achievements Section -->
            <div id="achievements" class="section">
                <h2>Achievements 🏆</h2>
                <div id="achievementsList">
                    <!-- Achievements will be dynamically inserted here -->
                </div>
            </div>
        </div>

        <!-- Save and Load Buttons -->
        <div id="saveLoadButtons">
            <button onclick="saveGame()">💾 Save Game</button>
            <button onclick="loadGame()">📂 Load Game</button>
            <button id="resetButton" onclick="resetGame()">🔄 Reset Game</button>
            <!-- Buy Heart Button Added Here -->
            <button id="buyHeartButton" onclick="buyHeart()">❤️ Buy Full Heart (10k Gold)</button>
            <!-- Mute and Volume Controls -->
            <button id="muteButton" onclick="toggleMusic()">🔊</button>
            <input type="range" id="volumeSlider" min="0" max="1" step="0.01" onchange="setVolume(this.value)">
        </div>

        <!-- Sound Effects -->
        <audio id="clickSound" src="https://cdn.pixabay.com/audio/2024/08/30/audio_60cd586a99.mp3" preload="auto"></audio>
        <audio id="upgradeSound" src="https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg" preload="auto"></audio>
        <audio id="levelUpSound" src="https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg" preload="auto"></audio>
        <audio id="monsterAttackSound" src="https://cdn.pixabay.com/audio/2024/08/29/audio_9a0bfbcd2a.mp3" preload="auto"></audio>
        <audio id="monsterDefeatedSound" src="https://cdn.pixabay.com/audio/2024/03/12/audio_eb26b5444b.mp3" preload="auto"></audio>
        <audio id="victorySound" src="https://actions.google.com/sounds/v1/cartoon/celebration_whistle.ogg" preload="auto"></audio>
        <audio id="bossAppearSound" src="https://actions.google.com/sounds/v1/cartoon/concussive_hit_guitar_boing.ogg" preload="auto"></audio>
        <audio id="bossDefeatedSound" src="https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg" preload="auto"></audio>
        <audio id="gameOverSound" src="https://actions.google.com/sounds/v1/human_voices/breathing_deep_fast.ogg" preload="auto"></audio>
        <audio id="criticalHitSound" src="https://cdn.pixabay.com/audio/2024/02/20/audio_6d4de9d80e.mp3" preload="auto"></audio>
        <audio id="monsterAppearSound" src="https://cdn.pixabay.com/audio/2022/03/20/audio_ee34a46a5f.mp3" preload="auto"></audio>

        <!-- New Sound for Spell Casting -->
        <audio id="spellCastSound" src="https://cdn.pixabay.com/audio/2024/08/31/audio_f9943b511b.mp3" preload="auto"></audio>
        <!-- New Sound for Buying Heart -->
        <audio id="buyHeartSound" src="https://actions.google.com/sounds/v1/cartoon/metal_hit_and_jingle.ogg" preload="auto"></audio>

        <!-- Background Music -->
        <audio id="backgroundMusic" src="https://cdn.pixabay.com/audio/2021/11/05/audio_6acc538346.mp3" preload="auto" loop></audio>
        

    </div>

    <!-- Link to External JavaScript -->
    <script src="script.js"></script>

    <footer id="gameFooter">
        <p>© 2024 Tauris Games Inc.™ All Rights Reserved. Unauthorized clicking may result in humorous consequences. 🤪 | Version 1.0.0</p>
    </footer>
</body>
</html>
