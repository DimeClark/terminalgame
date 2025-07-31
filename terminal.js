// Terminal Game JavaScript - Hack The Terminal
// Built by Dime C. with love 💚

class Terminal {
    constructor() {
        this.output = document.getElementById('terminal-output');
        this.input = document.getElementById('command-input');
        this.cursor = document.getElementById('cursor');
        this.commandHistory = [];
        this.historyIndex = 0;
        this.currentTheme = 'matrix';
        this.gameActive = false;
        this.easterEggSequence = []; // Track Easter egg combinations
        
        this.initializeTerminal();
        this.setupEventListeners();
        this.displayASCIIArt();
    }
    
    initializeTerminal() {
        this.input.focus();
        this.updateCursor();
    }
    
    setupEventListeners() {
        // Handle command input
        this.input.addEventListener('keydown', (e) => {
            // Don't handle arrow keys if a game is active
            if (this.gameActive && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
                return;
            }
            
            if (e.key === 'Enter') {
                this.processCommand();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.navigateHistory(-1);
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.navigateHistory(1);
            }
        });
        
        // Update cursor position
        this.input.addEventListener('input', () => {
            this.updateCursor();
        });
        
        // Keep input focused
        document.addEventListener('click', () => {
            this.input.focus();
        });
    }
    
    updateCursor() {
        const inputRect = this.input.getBoundingClientRect();
        const textWidth = this.getTextWidth(this.input.value);
        this.cursor.style.left = `${textWidth}px`;
    }
    
    getTextWidth(text) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = '16px JetBrains Mono, Courier New, monospace';
        return context.measureText(text).width;
    }
    
    processCommand() {
        const command = this.input.value.trim().toLowerCase();
        
        if (command) {
            this.commandHistory.push(command);
            this.historyIndex = this.commandHistory.length;
        }
        
        // Display the command
        this.addOutput(`guest@terminal:~$ ${this.input.value}`, 'command');
        
        // Clear input
        this.input.value = '';
        
        // Execute command
        this.executeCommand(command);
        
        // Scroll to bottom
        this.scrollToBottom();
    }
    
    executeCommand(command) {
        const args = command.split(' ');
        const cmd = args[0];
        
        // Track Easter egg sequences
        this.trackEasterEggSequence(cmd);
        
        // Handle special game commands with parameters
        if (cmd === 'guess' && args.length > 1) {
            this.handleGuess(args[1]);
            return;
        }
        if (cmd === 'type' && args.length > 1) {
            this.handleTyping(args.slice(1).join(' '));
            return;
        }
        
        switch (cmd) {
            case '':
                break;
            case 'help':
                this.showHelp();
                break;
            case 'about':
                this.showAbout();
                break;
            case 'clear':
                this.clearTerminal();
                break;
            case 'projects':
                this.showProjects();
                break;
            case 'play':
                this.startGame();
                break;
            case 'theme':
                this.changeTheme(args[1]);
                break;
            case 'love':
                this.showLove();
                break;
            case 'whoami':
                this.addOutput('guest', 'success');
                break;
            case 'me':
            case 'dime':
            case 'about-dime':
                this.showPersonalInfo();
                break;
            case 'date':
                this.addOutput(new Date().toString(), 'info');
                break;
            case 'pwd':
                this.addOutput('/home/guest', 'info');
                break;
            case 'ls':
                this.listFiles();
                break;
            case 'echo':
                this.addOutput(args.slice(1).join(' '), 'info');
                break;
            case 'history':
                this.showHistory();
                break;
            case 'exit':
                this.exitTerminal();
                break;
            case 'snake':
                this.playSnake();
                break;
            case 'guess':
                this.playGuessGame();
                break;
            case 'type':
                this.playTypingGame();
                break;
            case 'matrix':
                this.showMatrix();
                break;
            case 'hack':
                this.showHackSequence();
                break;
            case 'garfield':
            case 'lasagna':
                this.showGarfieldEasterEgg();
                break;
            case 'johnwick':
            case 'john-wick':
            case 'pencil':
                this.showJohnWickEasterEgg();
                break;
            case 'netflix':
                this.showNetflixEasterEgg();
                break;
            case 'code':
            case 'programming':
            case 'developer':
                this.showDeveloperEasterEgg();
                break;
            case 'coffee':
            case 'caffeine':
                this.showCoffeeEasterEgg();
                break;
            case 'midnight':
            case 'night':
                this.showMidnightEasterEgg();
                break;
            case 'universe':
            case 'cosmos':
                this.showUniverseEasterEgg();
                break;
            case 'tori':
                this.handleToriEasterEgg();
                break;
            default:
                this.addOutput(`Command not found: ${cmd}. Type 'help' for available commands.`, 'error');
        }
    }
    
    showHelp() {
        const helpText = `
<div class="help-command"><span class="cmd">help</span><span class="desc">Show this help message</span></div>
<div class="help-command"><span class="cmd">about</span><span class="desc">Learn about this project and its creator</span></div>
<div class="help-command"><span class="cmd">me</span><span class="desc">Get to know Dime C. personally 👋</span></div>
<div class="help-command"><span class="cmd">clear</span><span class="desc">Clear the terminal screen</span></div>
<div class="help-command"><span class="cmd">projects</span><span class="desc">View Dime's coding projects</span></div>
<div class="help-command"><span class="cmd">play</span><span class="desc">Show available games</span></div>
<div class="help-command"><span class="cmd">snake</span><span class="desc">Play the classic Snake game</span></div>
<div class="help-command"><span class="cmd">guess</span><span class="desc">Start number guessing game</span></div>
<div class="help-command"><span class="cmd">type</span><span class="desc">Start typing speed challenge</span></div>
<div class="help-command"><span class="cmd">theme [name]</span><span class="desc">Change terminal theme (matrix, hacker, retro)</span></div>
<div class="help-command"><span class="cmd">love</span><span class="desc">Display a secret message ❤️</span></div>
<div class="help-command"><span class="cmd">matrix</span><span class="desc">🔮 Secret Matrix digital rain effect</span></div>
<div class="help-command"><span class="cmd">hack</span><span class="desc">💀 Secret hacking simulation</span></div>
<div class="help-command"><span class="cmd">whoami</span><span class="desc">Display current user</span></div>
<div class="help-command"><span class="cmd">date</span><span class="desc">Show current date and time</span></div>
<div class="help-command"><span class="cmd">history</span><span class="desc">Show command history</span></div>
<div class="help-command"><span class="cmd">exit</span><span class="desc">Close the terminal</span></div>
<br>
<div style="color: #888; font-style: italic;">💡 Hint: Try exploring words like "coffee", "midnight", "universe", "code"...</div>
<div style="color: #888; font-style: italic;">🔍 Some secrets unlock with special command combinations...</div>
<div style="color: #ff69b4; font-style: italic;">💕 Personal Easter eggs may be hidden behind certain names...</div>
        `;
        this.addOutput(helpText, 'info');
    }
    
    showAbout() {
        const aboutText = `
<div class="project-item">
    <div class="project-title">🖥️ Hack The Terminal</div>
    <div class="project-desc">
        A creative web-based fake terminal interface built by <span class="highlight">Dime C.</span><br>
        This project showcases front-end skills, JavaScript logic, and creative UI thinking.<br><br>
        
        <span class="highlight">Tech Stack:</span> HTML5, CSS3, Vanilla JavaScript<br>
        <span class="highlight">Purpose:</span> Portfolio project + having fun with code<br>
        <span class="highlight">Inspiration:</span> Linux terminals meet personality<br><br>
        
        Want to collaborate? Fork it on GitHub!<br>
        Want to chat about coding or college? DM me! 🚀
    </div>
</div>
        `;
        this.addOutput(aboutText, 'info');
    }
    
    showProjects() {
        const projectsText = `
<div class="project-item">
    <div class="project-title">🖥️ Hack The Terminal</div>
    <div class="project-desc">This very project! A web-based terminal interface with interactive commands.</div>
</div>
<div class="project-item">
    <div class="project-title">🎮 Snake Game</div>
    <div class="project-desc">Classic snake game implementation (coming to this terminal soon!)</div>
</div>
<div class="project-item">
    <div class="project-title">⌨️ Typing Challenge</div>
    <div class="project-desc">Speed typing game with programming quotes and code snippets</div>
</div>
<div class="project-item">
    <div class="project-title">📄 Terminal Resume</div>
    <div class="project-desc">Interactive resume viewer through terminal commands</div>
</div>
        `;
        this.addOutput(projectsText, 'info');
    }
    
    startGame() {
        this.addOutput('🎮 Available Games:', 'success');
        this.addOutput('<div class="help-command"><span class="cmd">snake</span><span class="desc">Play the classic Snake game</span></div>', 'info');
        this.addOutput('<div class="help-command"><span class="cmd">guess</span><span class="desc">Number guessing game</span></div>', 'info');
        this.addOutput('<div class="help-command"><span class="cmd">type</span><span class="desc">Typing speed challenge</span></div>', 'info');
        this.addOutput('Type the game name to start playing! 🚀', 'success');
    }
    
    changeTheme(themeName) {
        if (!themeName) {
            this.addOutput('Available themes: matrix, hacker, retro', 'info');
            this.addOutput(`Current theme: ${this.currentTheme}`, 'success');
            return;
        }
        
        const validThemes = ['matrix', 'hacker', 'retro'];
        if (validThemes.includes(themeName)) {
            this.currentTheme = themeName;
            document.body.className = `theme-${themeName}`;
            this.addOutput(`Theme changed to: ${themeName}`, 'success');
        } else {
            this.addOutput(`Invalid theme: ${themeName}. Available: ${validThemes.join(', ')}`, 'error');
        }
    }
    
    showLove() {
        const loveMessages = [
            "💚 You're awesome for exploring this terminal!",
            "❤️ Built with love, coffee, and late-night coding sessions",
            "💙 Thanks for checking out my work!",
            "💜 Keep coding, keep creating, keep being amazing!",
            "🧡 Remember: every expert was once a beginner",
            "💛 Code is poetry, and you're reading mine ✨"
        ];
        
        const randomMessage = loveMessages[Math.floor(Math.random() * loveMessages.length)];
        this.addOutput(randomMessage, 'success');
    }
    
    listFiles() {
        const files = [
            'index.html',
            'styles.css',
            'terminal.js',
            'README.md',
            'assets/',
            'games/',
            '.git/'
        ];
        
        this.addOutput(files.join('  '), 'info');
    }
    
    showHistory() {
        if (this.commandHistory.length === 0) {
            this.addOutput('No commands in history', 'info');
            return;
        }
        
        this.commandHistory.forEach((cmd, index) => {
            this.addOutput(`${index + 1}  ${cmd}`, 'info');
        });
    }
    
    exitTerminal() {
        this.addOutput('Thanks for visiting! 👋', 'success');
        this.addOutput('Goodbye from Dime C. 💚', 'success');
        setTimeout(() => {
            if (confirm('Really close the terminal?')) {
                window.close();
            }
        }, 1000);
    }
    
    showPersonalInfo() {
        this.addOutput('👋 Meet Dime C. - The Human Behind The Code', 'success');
        this.addOutput('', 'info');
        
        const personalInfo = `
<div class="project-item">
    <div class="project-title">🎓 Current Status</div>
    <div class="project-desc">College student grinding through code and caffeine ☕</div>
</div>
<div class="project-item">
    <div class="project-title">💻 Passion</div>
    <div class="project-desc">I love to code! Building cool projects like this terminal 🚀</div>
</div>
<div class="project-item">
    <div class="project-title">🍝 Favorite Food</div>
    <div class="project-desc">Lasagna! Basically I'm Garfield in human form 🐱</div>
</div>
<div class="project-item">
    <div class="project-title">🎬 Netflix & Chill</div>
    <div class="project-desc">When I'm not coding, I'm binge-watching shows on Netflix</div>
</div>
<div class="project-item">
    <div class="project-title">🎯 Favorite Movie</div>
    <div class="project-desc">John Wick - because sometimes you need a pencil... and good coding skills ✏️</div>
</div>
        `;
        
        this.addOutput(personalInfo, 'info');
        this.addOutput('', 'info');
        
        // Random fun facts
        const funFacts = [
            "🐱 Fun fact: I probably think about lasagna as much as Garfield does!",
            "⌨️ Fun fact: I code better after watching John Wick - it's all about focus!",
            "📚 Fun fact: College + coding + Netflix = my perfect day equation",
            "🎮 Fun fact: I built this terminal because regular portfolios are boring!",
            "☕ Fun fact: My code-to-coffee ratio is perfectly balanced, as all things should be"
        ];
        
        const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
        this.addOutput(randomFact, 'warning');
        this.addOutput('', 'info');
        this.addOutput('💬 Wanna chat about coding, college, or Netflix shows? Hit me up!', 'success');
    }
    
    // ========== EASTER EGG TRACKING SYSTEM ==========
    
    trackEasterEggSequence(command) {
        this.easterEggSequence.push(command);
        
        // Keep only last 5 commands for sequence detection
        if (this.easterEggSequence.length > 5) {
            this.easterEggSequence.shift();
        }
        
        // Check for special sequences
        this.checkEasterEggSequences();
    }
    
    checkEasterEggSequences() {
        const sequence = this.easterEggSequence.join(' ');
        
        // Secret developer sequence: "code love coffee"
        if (sequence.includes('code love coffee')) {
            this.showSecretDeveloperMode();
            this.easterEggSequence = [];
        }
        
        // Secret time sequence: "midnight coffee code"
        if (sequence.includes('midnight coffee code')) {
            this.showNightOwlMode();
            this.easterEggSequence = [];
        }
        
        // Secret universe sequence: "universe matrix hack"
        if (sequence.includes('universe matrix hack')) {
            this.showCosmicHackerMode();
            this.easterEggSequence = [];
        }
        
        // Tori sequence: any command + "tori"
        if (this.easterEggSequence.length >= 2 && this.easterEggSequence[this.easterEggSequence.length - 1] === 'tori') {
            this.showToriPoem();
            this.easterEggSequence = [];
        }
    }
    
    handleToriEasterEgg() {
        if (this.easterEggSequence.length >= 2) {
            this.showToriPoem();
        } else {
            this.addOutput('💫 "Tori" - a name that carries poetry...', 'warning');
            this.addOutput('💡 Hint: Try typing any command before "tori" to unlock something special', 'info');
        }
    }
    
    showToriPoem() {
        this.addOutput('', 'info');
        this.addOutput('💕 ✨ UNLOCKED: Personal Easter Egg ✨ 💕', 'success');
        this.addOutput('', 'info');
        this.addOutput('📝 "Wild Things" - A Poem by Dime C.', 'warning');
        this.addOutput('', 'info');
        
        const poem = `
<div style="font-style: italic; line-height: 1.6; color: #ff69b4;">
we weren't planted,<br><br>

we happened.<br><br>

two wild things,<br>
shoulder to stem<br>
in a field that never asked for us.<br><br>


you bloomed sideways,<br>
i bloomed stubborn.<br>
petals torn from wind,<br>
still leaning in.<br><br>


no gardener,<br>
no purpose—<br>
just sun,<br>
just soil,<br>
just you<br>
saying my name<br>
like it meant something more<br>
than survival.
</div>
        `;
        
        this.addOutput(poem, 'info');
        this.addOutput('', 'info');
        this.addOutput('💝 Written with love by Dime C. 💝', 'success');
        this.addOutput('🌸 Some things in code, like in life, are meant to be discovered... 🌸', 'warning');
    }
    
    // ========== NEW EASTER EGGS ==========
    
    showDeveloperEasterEgg() {
        this.addOutput('👨‍💻 DEVELOPER MODE ACTIVATED!', 'success');
        this.addOutput('', 'info');
        
        const devFacts = [
            '🐛 "99 little bugs in the code, 99 little bugs... take one down, patch it around, 117 little bugs in the code!"',
            '☕ "Code + Coffee = Magic (Coffee² = Legendary Code)"',
            '🌙 "The best debugging happens at 3 AM when your brain is 50% caffeine"',
            '💡 "There are only 10 types of people: those who understand binary and those who don\'t"',
            '🔥 "Programming is like writing a book... except if you miss a single comma, the whole story explodes"',
            '⚡ "Real programmers count from 0... and sometimes forget where they started"'
        ];
        
        const randomFact = devFacts[Math.floor(Math.random() * devFacts.length)];
        this.addOutput(randomFact, 'warning');
        this.addOutput('', 'info');
        this.addOutput('🚀 Keep coding, keep creating, keep being awesome!', 'success');
    }
    
    showCoffeeEasterEgg() {
        this.addOutput('☕ CAFFEINE PROTOCOL INITIATED!', 'warning');
        this.addOutput('', 'info');
        
        const coffeeArt = `
        (  )   (   )  )
         ) (   )  (  (
         ( )  (    ) )
         _____________
        <_____________> ___
        |             |/ _ \\
        |               | | |
        |               |_| |
     ___|             |\\___/
    /    \\___________/    \\
    \\_____________________/
        `;
        
        this.addOutput(coffeeArt, 'info');
        this.addOutput('☕ "Coffee: Because adulting is hard, but coding is harder"', 'success');
        this.addOutput('📊 Dime\'s Coffee Stats:', 'warning');
        this.addOutput('• Lines of code per cup: ~50', 'info');
        this.addOutput('• Debug sessions survived: Countless', 'info');
        this.addOutput('• 3 AM coding sessions: More than I care to admit', 'info');
        this.addOutput('• Coffee-to-code ratio: Perfectly balanced ⚖️', 'info');
        this.addOutput('', 'info');
        this.addOutput('💡 Pro tip: Good code is like good coffee - strong, smooth, and keeps you going!', 'success');
    }
    
    showMidnightEasterEgg() {
        this.addOutput('🌙 MIDNIGHT CODER MODE ACTIVATED!', 'error');
        this.addOutput('', 'info');
        
        const midnightQuotes = [
            '🦉 "The night is dark and full of... syntax errors"',
            '💻 "3 AM: When the code finally makes sense but you don\'t"',
            '⭐ "Coding under the stars hits different"',
            '🌃 "Night owls don\'t choose the coding life, the coding life chooses them"',
            '🕛 "Midnight: When bugs become features and features become art"',
            '🌙 "In the darkness, only the glow of the terminal remains..."'
        ];
        
        const randomQuote = midnightQuotes[Math.floor(Math.random() * midnightQuotes.length)];
        this.addOutput(randomQuote, 'warning');
        this.addOutput('', 'info');
        this.addOutput('🎭 The Midnight Coder\'s Creed:', 'success');
        this.addOutput('• Sleep is for the compiled', 'info');
        this.addOutput('• Coffee is life, code is love', 'info');
        this.addOutput('• Best solutions come at 2:47 AM', 'info');
        this.addOutput('• The terminal light guides the way', 'info');
        this.addOutput('', 'info');
        this.addOutput('✨ "May your code compile and your coffee never run cold" ✨', 'success');
    }
    
    showUniverseEasterEgg() {
        this.addOutput('🌌 COSMIC PROTOCOL INITIATED...', 'success');
        this.addOutput('', 'info');
        
        const cosmicFacts = [
            '⭐ "In the vastness of the universe, we\'re all just stardust writing code"',
            '🌟 "Every line of code is a small act of creation in an infinite cosmos"',
            '🪐 "If aliens exist, they probably debug their code too"',
            '🌠 "The universe is like a massive program, and we\'re trying to understand its source code"',
            '🔭 "42 is the answer... but what was the question again?"',
            '🌌 "Space is big. Really big. But so are the possibilities in code."'
        ];
        
        const randomFact = cosmicFacts[Math.floor(Math.random() * cosmicFacts.length)];
        this.addOutput(randomFact, 'warning');
        this.addOutput('', 'info');
        this.addOutput('🛸 Universal Constants:', 'info');
        this.addOutput('• Speed of light: 299,792,458 m/s', 'warning');
        this.addOutput('• Speed of debugging: Highly variable 🐛', 'warning');
        this.addOutput('• Probability of perfect code: Approaching 0', 'warning');
        this.addOutput('• Love for coding: Infinite ∞', 'warning');
        this.addOutput('', 'info');
        this.addOutput('🌟 "We are all made of star stuff... and semicolons" - Carl Sagan (probably)', 'success');
    }
    
    // ========== SECRET COMBINATION EASTER EGGS ==========
    
    showSecretDeveloperMode() {
        this.addOutput('', 'info');
        this.addOutput('🎉 ✨ SECRET COMBINATION UNLOCKED! ✨ 🎉', 'success');
        this.addOutput('🔓 "code love coffee" - The Developer\'s Trinity!', 'warning');
        this.addOutput('', 'info');
        
        const secretMessage = `
<div style="color: #00ffff; text-align: center;">
╔══════════════════════════════════════╗
║        THE SACRED DEVELOPER CODE     ║
║                                      ║
║  1. Code with passion 💻             ║
║  2. Love what you build ❤️           ║
║  3. Coffee fuels the soul ☕          ║
║                                      ║
║    "In code we trust, in coffee      ║
║     we find the strength to debug"   ║
╚══════════════════════════════════════╝
</div>
        `;
        
        this.addOutput(secretMessage, 'info');
        this.addOutput('', 'info');
        this.addOutput('🏆 Achievement Unlocked: Master of the Sacred Trinity!', 'success');
        this.addOutput('💎 You\'ve discovered one of the deepest secrets in the terminal...', 'warning');
    }
    
    showNightOwlMode() {
        this.addOutput('', 'info');
        this.addOutput('🦉 ✨ NIGHT OWL SEQUENCE DETECTED! ✨ 🦉', 'error');
        this.addOutput('🌙 "midnight coffee code" - The Nocturnal Coder\'s Path!', 'warning');
        this.addOutput('', 'info');
        
        const nightOwlArt = `
         ___     ___
        (o,o)   (o,o)
       ( V )   ( V )
      --m-m-----m-m--
      NIGHT OWL CODERS
        `;
        
        this.addOutput(nightOwlArt, 'info');
        this.addOutput('🕰️ Time Check: It\'s always coding time somewhere...', 'warning');
        this.addOutput('', 'info');
        this.addOutput('🎭 The Night Owl\'s Wisdom:', 'success');
        this.addOutput('• The best code is written when the world sleeps', 'info');
        this.addOutput('• Midnight inspiration strikes like lightning', 'info');
        this.addOutput('• Coffee at 3 AM tastes like liquid motivation', 'info');
        this.addOutput('• Bugs fear the darkness... wait, that\'s not right 🐛', 'info');
        this.addOutput('', 'info');
        this.addOutput('🌟 "You are officially part of the 3 AM Coding Club!" 🌟', 'success');
    }
    
    showCosmicHackerMode() {
        this.addOutput('', 'info');
        this.addOutput('🚀 ✨ COSMIC HACKER SEQUENCE ACTIVATED! ✨ 🚀', 'error');
        this.addOutput('🌌 "universe matrix hack" - The Ultimate Combination!', 'warning');
        this.addOutput('', 'info');
        
        const cosmicHackerArt = `
    🌟     *  .  ✦  .  *     🌟
       .    ╔══════════╗    .
    *       ║ ACCESSING ║       *
         .  ║ UNIVERSE  ║  .
    ✦       ║ MAINFRAME ║       ✦
       *    ╚══════════╝    *
    🌟     .  *  ✦  *  .     🌟
        `;
        
        this.addOutput(cosmicHackerArt, 'info');
        this.addOutput('', 'info');
        this.addOutput('💫 COSMIC CLEARANCE GRANTED:', 'success');
        this.addOutput('• Access Level: Universal', 'warning');
        this.addOutput('• Permissions: Reality.exe', 'warning');
        this.addOutput('• Status: Hacking the fabric of spacetime...', 'warning');
        this.addOutput('• Coffee Levels: Transcendent ☕∞', 'warning');
        this.addOutput('', 'info');
        this.addOutput('🎊 Congratulations! You\'ve unlocked the deepest secret!', 'success');
        this.addOutput('🔮 "You are now a certified Cosmic Code Wizard" 🔮', 'error');
        this.addOutput('', 'info');
        this.addOutput('📜 Honorary Title Granted: "Breaker of Digital Dimensions"', 'warning');
    }
    
    // ========== GAMES SECTION ==========
    
    playSnake() {
        // Prevent multiple games running
        if (this.gameActive) {
            this.addOutput('❌ A game is already running! Press ESC to quit current game.', 'error');
            return;
        }
        
        this.addOutput('🐍 Starting Snake Game...', 'success');
        this.addOutput('Use WASD or Arrow Keys to move. Eat the food (🍎) to grow!', 'info');
        this.addOutput('Press ESC to quit the game.', 'warning');
        
        // Create game canvas
        const gameArea = document.createElement('div');
        gameArea.innerHTML = `
            <div id="snake-game" style="
                border: 2px solid #00ff00;
                width: 400px;
                height: 400px;
                position: relative;
                background: #001100;
                margin: 10px 0;
                font-family: monospace;
            ">
                <div id="snake-score" style="color: #00ff00; text-align: center; padding: 5px;">Score: 0</div>
                <canvas id="snake-canvas" width="380" height="360" style="display: block; margin: 0 auto;"></canvas>
            </div>
        `;
        this.output.appendChild(gameArea);
        
        // Initialize Snake Game
        this.initSnakeGame();
        this.scrollToBottom();
    }
    
    initSnakeGame() {
        const canvas = document.getElementById('snake-canvas');
        const ctx = canvas.getContext('2d');
        const scoreElement = document.getElementById('snake-score');
        
        // Error check for missing elements
        if (!canvas || !ctx || !scoreElement) {
            this.addOutput('❌ Game elements failed to load. Try again.', 'error');
            this.gameActive = false;
            return;
        }
        
        const gridSize = 20;
        const tileCount = canvas.width / gridSize;
        
        let snake = [{ x: 10, y: 10 }];
        let food = { x: 15, y: 10 }; // Place food away from starting position
        let dx = 0;
        let dy = 0;
        let score = 0;
        let gameRunning = true;
        let gameStarted = false; // Track if game has started moving
        
        // Generate random food position
        function randomFood() {
            let newFood;
            do {
                newFood = {
                    x: Math.floor(Math.random() * tileCount),
                    y: Math.floor(Math.random() * tileCount)
                };
            } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
            food = newFood;
        }
        
        function drawGame() {
            // Clear canvas
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw snake
            ctx.fillStyle = '#00ff00';
            snake.forEach(segment => {
                ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
            });
            
            // Draw food
            ctx.fillStyle = '#ff0000';
            ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
        }
        
        function updateGame() {
            if (!gameRunning || !gameStarted) return;
            
            const head = { x: snake[0].x + dx, y: snake[0].y + dy };
            
            // Check wall collision
            if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
                gameRunning = false;
                this.addOutput('💀 Game Over! You hit the wall!', 'error');
                this.addOutput(`Final Score: ${score}`, 'success');
                return;
            }
            
            // Check self collision (only if snake has more than 1 segment)
            if (snake.length > 1 && snake.some(segment => segment.x === head.x && segment.y === head.y)) {
                gameRunning = false;
                this.addOutput('💀 Game Over! You ate yourself!', 'error');
                this.addOutput(`Final Score: ${score}`, 'success');
                return;
            }
            
            snake.unshift(head);
            
            // Check food collision
            if (head.x === food.x && head.y === food.y) {
                score += 10;
                scoreElement.textContent = `Score: ${score}`;
                randomFood();
            } else {
                snake.pop();
            }
            
            drawGame();
        }
        
        // Game controls
        const gameKeyHandler = (e) => {
            if (!gameRunning) return;
            
            const key = e.key.toLowerCase();
            let moved = false;
            
            switch(key) {
                case 'w':
                case 'arrowup':
                    if (dy === 0) { 
                        dx = 0; 
                        dy = -1; 
                        moved = true;
                        gameStarted = true; // Start the game
                    }
                    break;
                case 's':
                case 'arrowdown':
                    if (dy === 0) { 
                        dx = 0; 
                        dy = 1; 
                        moved = true;
                        gameStarted = true; // Start the game
                    }
                    break;
                case 'a':
                case 'arrowleft':
                    if (dx === 0) { 
                        dx = -1; 
                        dy = 0; 
                        moved = true;
                        gameStarted = true; // Start the game
                    }
                    break;
                case 'd':
                case 'arrowright':
                    if (dx === 0) { 
                        dx = 1; 
                        dy = 0; 
                        moved = true;
                        gameStarted = true; // Start the game
                    }
                    break;
                case 'escape':
                    gameRunning = false;
                    this.addOutput('🎮 Snake game ended by player', 'warning');
                    document.removeEventListener('keydown', gameKeyHandler);
                    this.gameActive = false; // Re-enable terminal controls
                    return;
            }
            
            // Only prevent default for game-related keys
            if (moved || key === 'escape') {
                e.preventDefault();
                e.stopPropagation();
            }
        };
        
        document.addEventListener('keydown', gameKeyHandler);
        
        // Temporarily disable terminal's arrow key handling
        this.gameActive = true;
        
        // Start game loop
        const gameLoop = () => {
            updateGame.call(this);
            if (gameRunning) {
                setTimeout(gameLoop, 150);
            } else {
                document.removeEventListener('keydown', gameKeyHandler);
                this.gameActive = false; // Re-enable terminal controls
            }
        };
        
        this.addOutput('🎮 Snake game loaded! Start moving with WASD or arrow keys!', 'success');
        gameLoop();
        drawGame();
    }
    
    playGuessGame() {
        if (this.guessGameActive) {
            this.addOutput('❌ Guess game already active! Finish current game first.', 'error');
            return;
        }
        
        this.addOutput('🔢 Number Guessing Game Started!', 'success');
        this.addOutput('I\'m thinking of a number between 1 and 100...', 'info');
        this.addOutput('Type "guess 27" (for example) to make a guess!', 'warning');
        this.addOutput('💡 Don\'t use brackets - just: guess [your number]', 'info');
        
        this.guessNumber = Math.floor(Math.random() * 100) + 1;
        this.guessAttempts = 0;
        this.guessGameActive = true;
        
        this.addOutput('💡 Hint: The number is between 1 and 100. Good luck!', 'info');
    }
    
    handleGuess(number) {
        if (!this.guessGameActive) {
            this.addOutput('No active guessing game! Type "guess" to start a new game.', 'error');
            return;
        }
        
        const guess = parseInt(number);
        if (isNaN(guess) || guess < 1 || guess > 100) {
            this.addOutput(`❌ "${number}" is not a valid number!`, 'error');
            this.addOutput('Please enter a number between 1 and 100 (example: guess 42)', 'warning');
            this.addOutput('💡 Don\'t use brackets or quotes - just the number!', 'info');
            return;
        }
        
        this.guessAttempts++;
        
        if (guess === this.guessNumber) {
            this.addOutput(`🎉 Congratulations! You guessed it in ${this.guessAttempts} attempts!`, 'success');
            this.addOutput(`The number was ${this.guessNumber}!`, 'success');
            this.guessGameActive = false;
        } else if (guess < this.guessNumber) {
            this.addOutput(`📈 Too low! Try a higher number. (Attempt ${this.guessAttempts})`, 'warning');
        } else {
            this.addOutput(`📉 Too high! Try a lower number. (Attempt ${this.guessAttempts})`, 'warning');
        }
        
        if (this.guessAttempts >= 10 && this.guessGameActive) {
            this.addOutput(`💀 Game Over! The number was ${this.guessNumber}. Better luck next time!`, 'error');
            this.guessGameActive = false;
        }
    }
    
    playTypingGame() {
        if (this.typingGameActive) {
            this.addOutput('❌ Typing game already active! Finish current challenge first.', 'error');
            return;
        }
        
        const quotes = [
            "The only way to do great work is to love what you do.",
            "Code is like humor. When you have to explain it, it's bad.",
            "First, solve the problem. Then, write the code.",
            "Experience is the name everyone gives to their mistakes.",
            "In order to be irreplaceable, one must always be different.",
            "Java is to JavaScript what car is to Carpet.",
            "The best error message is the one that never shows up.",
            "Debugging is twice as hard as writing the code in the first place."
        ];
        
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        this.typingQuote = randomQuote;
        this.typingStartTime = Date.now();
        this.typingGameActive = true;
        
        this.addOutput('⌨️ Typing Challenge Started!', 'success');
        this.addOutput('Type the following quote as fast and accurately as you can:', 'info');
        this.addOutput(`"${randomQuote}"`, 'warning');
        this.addOutput('Type "type" followed by the exact text (no brackets!):', 'info');
        this.addOutput(`Example: type ${randomQuote}`, 'warning');
    }
    
    handleTyping(text) {
        if (!this.typingGameActive) {
            this.addOutput('No active typing game! Type "type" to start a new challenge.', 'error');
            return;
        }
        
        const endTime = Date.now();
        const timeTaken = (endTime - this.typingStartTime) / 1000;
        const wordsTyped = text.length / 5; // Average word length
        const wpm = Math.round((wordsTyped / timeTaken) * 60);
        
        // Show what was expected vs what was typed
        this.addOutput('📝 Comparison:', 'info');
        this.addOutput(`Expected: "${this.typingQuote}"`, 'warning');
        this.addOutput(`You typed: "${text}"`, 'info');
        
        // Calculate accuracy - character by character comparison
        let correctChars = 0;
        const maxLength = Math.max(text.length, this.typingQuote.length);
        
        for (let i = 0; i < maxLength; i++) {
            const expectedChar = this.typingQuote[i] || '';
            const typedChar = text[i] || '';
            
            if (expectedChar === typedChar) {
                correctChars++;
            }
        }
        
        // Calculate accuracy as percentage of correct characters
        const accuracy = Math.round((correctChars / this.typingQuote.length) * 100);
        
        this.addOutput('⏱️ Typing Results:', 'success');
        this.addOutput(`Time: ${timeTaken.toFixed(2)} seconds`, 'info');
        this.addOutput(`Speed: ${wpm} WPM`, 'info');
        this.addOutput(`Correct characters: ${correctChars}/${this.typingQuote.length}`, 'info');
        this.addOutput(`Accuracy: ${accuracy}%`, accuracy > 90 ? 'success' : accuracy > 70 ? 'warning' : 'error');
        
        if (accuracy === 100) {
            this.addOutput('🏆 Perfect! You typed it exactly right!', 'success');
        } else if (accuracy > 90) {
            this.addOutput('🎯 Excellent typing skills!', 'success');
        } else if (accuracy > 70) {
            this.addOutput('📚 Good effort! Keep practicing!', 'warning');
        } else {
            this.addOutput('💪 Keep practicing to improve your accuracy!', 'error');
            this.addOutput('💡 Remember: Type exactly what you see, including punctuation!', 'warning');
        }
        
        this.typingGameActive = false;
    }
    
    // ========== EASTER EGGS SECTION ==========
    
    showMatrix() {
        this.addOutput('🔮 Initializing Matrix Protocol...', 'success');
        
        // Create matrix effect
        const matrixContainer = document.createElement('div');
        matrixContainer.innerHTML = `
            <div id="matrix-rain" style="
                width: 100%;
                height: 200px;
                background: #000;
                position: relative;
                overflow: hidden;
                border: 1px solid #00ff00;
                margin: 10px 0;
            ">
                <canvas id="matrix-canvas" width="800" height="200" style="display: block;"></canvas>
            </div>
        `;
        this.output.appendChild(matrixContainer);
        
        const canvas = document.getElementById('matrix-canvas');
        const ctx = canvas.getContext('2d');
        
        // Safety check
        if (!canvas || !ctx) {
            this.addOutput('❌ Matrix display failed to initialize.', 'error');
            return;
        }
        
        const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
        const matrixArray = matrix.split("");
        
        const fontSize = 10;
        const columns = canvas.width / fontSize;
        const drops = [];
        
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }
        
        function drawMatrix() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#00ff00';
            ctx.font = fontSize + 'px arial';
            
            for (let i = 0; i < drops.length; i++) {
                const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        
        const matrixInterval = setInterval(drawMatrix, 35);
        
        setTimeout(() => {
            clearInterval(matrixInterval);
            this.addOutput('🌌 Matrix protocol completed. Welcome to the real world.', 'success');
        }, 5000);
        
        this.scrollToBottom();
    }
    
    showHackSequence() {
        this.addOutput('💀 INITIATING HACK SEQUENCE...', 'error');
        this.addOutput('🔐 Bypassing firewall...', 'warning');
        
        const hackMessages = [
            'Scanning network topology...',
            'Injecting payload into target system...',
            'Escalating privileges...',
            'Accessing mainframe database...',
            'Decrypting secure channels...',
            'Downloading classified files...',
            'Covering digital footprints...',
            'HACK SUCCESSFUL! 💚'
        ];
        
        let index = 0;
        const hackInterval = setInterval(() => {
            if (index < hackMessages.length - 1) {
                this.addOutput(`[${Date.now()}] ${hackMessages[index]}`, 'info');
            } else {
                this.addOutput(hackMessages[index], 'success');
                this.addOutput('Just kidding! 😄 This is just for fun!', 'warning');
                clearInterval(hackInterval);
            }
            index++;
            this.scrollToBottom();
        }, 800);
    }
    
    showGarfieldEasterEgg() {
        const garfieldArt = `
    ∩─────∩
   (  ◕     ◕ )
    \\   ○   /     "I hate Mondays... but I love lasagna!"
     \\     /
      \\___/
        `;
        
        this.addOutput('🐱 GARFIELD MODE ACTIVATED!', 'warning');
        this.addOutput(garfieldArt, 'info');
        this.addOutput('🍝 "Dime is basically me, but with coding skills!"', 'success');
        this.addOutput('📅 Today\'s mood: Need more lasagna and less Mondays', 'warning');
        this.addOutput('💭 Fun fact: Both Dime and I believe in the power of carbs!', 'info');
    }
    
    showJohnWickEasterEgg() {
        this.addOutput('🎯 JOHN WICK MODE ACTIVATED!', 'error');
        this.addOutput('', 'info');
        this.addOutput('👤 "People keep asking if I\'m back..."', 'warning');
        this.addOutput('✏️ "Yeah... I\'m thinking I\'m back."', 'success');
        this.addOutput('', 'info');
        this.addOutput('🎬 Dime\'s favorite movie wisdom:', 'info');
        this.addOutput('• Focus, determination, consequences', 'warning');
        this.addOutput('• Sometimes a pencil is mightier than the sword', 'warning');
        this.addOutput('• And sometimes debugging is like hunting... you need patience', 'warning');
        this.addOutput('', 'info');
        this.addOutput('💻 "Now excuse me, I have some code to debug with... focus."', 'success');
    }
    
    showNetflixEasterEgg() {
        const shows = [
            'Stranger Things 📺',
            'The Office 🏢', 
            'Breaking Bad ⚗️',
            'Money Heist 💰',
            'The Crown 👑',
            'Narcos 🇨🇴',
            'Black Mirror 🖤',
            'Ozark 💵'
        ];
        
        this.addOutput('📺 NETFLIX & CHILL MODE!', 'success');
        this.addOutput('🍿 Dime\'s current binge-watching status:', 'info');
        this.addOutput('', 'info');
        
        const randomShow = shows[Math.floor(Math.random() * shows.length)];
        this.addOutput(`Currently watching: ${randomShow}`, 'warning');
        this.addOutput('Status: Probably should be coding but... one more episode 😅', 'error');
        this.addOutput('', 'info');
        this.addOutput('🎭 Perfect Day Formula:', 'success');
        this.addOutput('Code + Lasagna + Netflix + Repeat = 💯', 'info');
        this.addOutput('', 'info');
        this.addOutput('💭 "Are you still watching?" - Netflix', 'warning');
        this.addOutput('💭 "Yes, and I\'m still coding!" - Dime', 'success');
    }
    
    navigateHistory(direction) {
        if (this.commandHistory.length === 0) return;
        
        this.historyIndex += direction;
        
        if (this.historyIndex < 0) {
            this.historyIndex = 0;
        } else if (this.historyIndex >= this.commandHistory.length) {
            this.historyIndex = this.commandHistory.length;
            this.input.value = '';
            return;
        }
        
        this.input.value = this.commandHistory[this.historyIndex];
        this.updateCursor();
    }
    
    clearTerminal() {
        this.output.innerHTML = '';
    }
    
    addOutput(text, className = '') {
        const outputLine = document.createElement('div');
        outputLine.className = `output-line ${className}`;
        outputLine.innerHTML = text;
        this.output.appendChild(outputLine);
    }
    
    scrollToBottom() {
        const terminalBody = document.querySelector('.terminal-body');
        if (terminalBody) {
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }
    }
    
    displayASCIIArt() {
        const asciiArt = `
██╗  ██╗ █████╗  ██████╗██╗  ██╗    ████████╗██╗  ██╗███████╗
██║  ██║██╔══██╗██╔════╝██║ ██╔╝    ╚══██╔══╝██║  ██║██╔════╝
███████║███████║██║     █████╔╝        ██║   ███████║█████╗  
██╔══██║██╔══██║██║     ██╔═██╗        ██║   ██╔══██║██╔══╝  
██║  ██║██║  ██║╚██████╗██║  ██╗       ██║   ██║  ██║███████╗
╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝       ╚═╝   ╚═╝  ╚═╝╚══════╝
                                                               
████████╗███████╗██████╗ ███╗   ███╗██╗███╗   ██╗ █████╗ ██╗  
╚══██╔══╝██╔════╝██╔══██╗████╗ ████║██║████╗  ██║██╔══██╗██║  
   ██║   █████╗  ██████╔╝██╔████╔██║██║██╔██╗ ██║███████║██║  
   ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║██║██║╚██╗██║██╔══██║██║  
   ██║   ███████╗██║  ██║██║ ╚═╝ ██║██║██║ ╚████║██║  ██║███████╗
   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝
        `;
        
        document.getElementById('ascii-art').textContent = asciiArt;
    }
}

// Initialize the terminal when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new Terminal();
});

// Easter egg: Konami code
let konamiCode = [];
const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konami.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.length === konami.length && 
        konamiCode.every((code, index) => code === konami[index])) {
        
        const terminal = document.querySelector('.terminal-container');
        terminal.style.animation = 'matrix-rain 2s ease-in-out';
        
        setTimeout(() => {
            alert('🎮 Konami Code activated! You found the easter egg!');
            terminal.style.animation = '';
        }, 2000);
        
        konamiCode = [];
    }
});

// Add matrix rain animation for easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes matrix-rain {
        0% { filter: hue-rotate(0deg) saturate(1); }
        25% { filter: hue-rotate(90deg) saturate(2); }
        50% { filter: hue-rotate(180deg) saturate(3); }
        75% { filter: hue-rotate(270deg) saturate(2); }
        100% { filter: hue-rotate(360deg) saturate(1); }
    }
`;
document.head.appendChild(style);
