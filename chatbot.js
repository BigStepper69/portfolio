const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');

// Strictly Professional Knowledge Base
const botKnowledge = {
    greeting: "Hello! I am Abdoulaziz's Virtual Assistant. I can answer questions about his engineering projects, technical skills, and academic background.",

    purpose: "The purpose of this website is to showcase Abdoulaziz's technical projects and engineering skills to potential collaborators and academic recruiters. It serves as a professional portfolio for his journey in Computer Engineering.",

    projects: "Abdoulaziz's featured projects include:<br><br>1. **English Revision App**: A C-language application built with interactive study modules and quiz logic. Watch the demo video on the Projects page!<br>2. **Luigi Platformer**: A 2D game using Object-Oriented Programming with custom spritesheet animations, collision detection, and platforming physics. Check out the demo video on the Projects page!",

    videos: "Abdoulaziz has created demo videos for both projects:<br><br>• **demo1.mp4**: Shows the English Revision App in action with all 7 chapters and quiz features.<br>• **demo2.mp4**: Demonstrates the Luigi Platformer game with physics, animations, and gameplay.",

    about: "Abdoulaziz is a 2nd-year Computer Engineering student at the **University of Djibouti**. He is fully bilingual in English and French, having completed 7 years of full-time education at the **International School of Africa (ISA)**.",

    education: "He is currently pursuing his degree in **Computer Engineering** at the **Faculty of Engineering (Génie Informatique)** at the University of Djibouti. His academic focus includes software architecture, web development, and system electronics.",

    skills: "His technical expertise includes:<br>• **Languages**: C , C++ , Python , Kotlin , XML , HTML , CSS JavaScript.<br>• **Tools**: MATLAB, Bootstrap, and Hardware System Optimization (Console & Laptop maintenance).",

    contact: "You can find all professional links, his GitHub, and email on the **Contacts** page of this website.",

    offTopic: "I appreciate your curiosity! However, I'm specifically designed to help with questions about Abdoulaziz's engineering projects, technical skills, and academic background. Could you please ask something related to his portfolio? I'd be happy to tell you about his C programming projects, his studies at the University of Djibouti, or his demo videos!",

    default: "I can help you with information about Abdoulaziz's projects, skills, purpose, or education. What would you like to know?"
};

// Off-topic keywords to detect unrelated questions
const offTopicKeywords = [
    'weather', 'time', 'date', 'news', 'sports', 'football', 'soccer', 'basketball', 
    'movie', 'music', 'song', 'food', 'recipe', 'restaurant', 'politics', 'election',
    'joke', 'funny', 'riddle', 'game', 'play', 'chatgpt', 'openai', 'google', 'facebook',
    'instagram', 'tiktok', 'youtube', 'netflix', 'amazon', 'shopping', 'price', 'buy',
    'sell', 'crypto', 'bitcoin', 'stock', 'market', 'love', 'dating', 'relationship',
    'health', 'doctor', 'medicine', 'covid', 'virus', 'travel', 'flight', 'hotel',
    'vacation', 'holiday', 'christmas', 'birthday', 'party', 'drink', 'alcohol'
];

function toggleChat() {
    const chatbox = document.getElementById('chatbox');
    chatbox.style.display = (chatbox.style.display === 'none' || chatbox.style.display === '') ? 'flex' : 'none';
}

function handleKey(event) {
    if (event.key === 'Enter') sendMessage();
}

function isOffTopic(text) {
    return offTopicKeywords.some(keyword => text.includes(keyword));
}

function sendMessage() {
    const input = userInput.value.trim();
    if (!input) return;

    const text = input.toLowerCase();

    addMessage(input, 'user');
    userInput.value = '';

    setTimeout(() => {
        let response = botKnowledge.default;

        // Check for off-topic first
        if (isOffTopic(text)) {
            response = botKnowledge.offTopic;
        }
        // Greetings
        else if (text.includes('hi') || text.includes('hello') || text.includes('hey') || text.includes('bonjour') || text.includes('salut')) {
            response = botKnowledge.greeting;
        }
        // Purpose/Goal
        else if (text.includes('purpose') || text.includes('why') || text.includes('goal') || text.includes('aim') || text.includes('objective')) {
            response = botKnowledge.purpose;
        }
        // Projects/Work
        else if (text.includes('project') || text.includes('work') || text.includes('app') || text.includes('application') || text.includes('program') || text.includes('software')) {
            response = botKnowledge.projects;
        }
        // Videos/Demos
        else if (text.includes('video') || text.includes('demo') || text.includes('demo1') || text.includes('demo2') || text.includes('mp4') || text.includes('watch') || text.includes('show')) {
            response = botKnowledge.videos;
        }
        // About/Biography
        else if (text.includes('who') || text.includes('about') || text.includes('isa') || text.includes('background') || text.includes('biography') || text.includes('born') || text.includes('sanaa')) {
            response = botKnowledge.about;
        }
        // Education/Studies
        else if (text.includes('education') || text.includes('university') || text.includes('study') || text.includes('studies') || text.includes('univ') || text.includes('college') || text.includes('school') || text.includes('degree') || text.includes('student')) {
            response = botKnowledge.education;
        }
        // Skills/Coding
        else if (text.includes('skill') || text.includes('language') || text.includes('code') || text.includes('programming') || text.includes('c++') || text.includes('c language') || text.includes('python') || text.includes('java') || text.includes('javascript') || text.includes('matlab')) {
            response = botKnowledge.skills;
        }
        // Contact/Reach
        else if (text.includes('contact') || text.includes('reach') || text.includes('email') || text.includes('phone') || text.includes('github') || text.includes('linkedin') || text.includes('message')) {
            response = botKnowledge.contact;
        }
        // English App specifically
        else if (text.includes('english') || text.includes('revision') || text.includes('quiz') || text.includes('chapter') || text.includes('study')) {
            response = "The **English Revision App** is a C-language application featuring 7 interactive study chapters and custom quiz logic. It helps students master English fundamentals through modular architecture. You can see it in action in the demo1.mp4 video on the Projects page!";
        }
        // Luigi Game specifically
        else if (text.includes('luigi') || text.includes('game') || text.includes('platformer') || text.includes('oop') || text.includes('object oriented') || text.includes('sprite') || text.includes('animation') || text.includes('collision') || text.includes('physics')) {
            response = "The **Luigi Platformer** is a 2D game built with C++ using Object-Oriented Programming principles. It features custom spritesheet animations, collision detection, and platforming physics. Check out demo2.mp4 on the Projects page to see the gameplay!";
        }
        // Website/Portfolio
        else if (text.includes('website') || text.includes('portfolio') || text.includes('site') || text.includes('web') || text.includes('design') || text.includes('ui') || text.includes('ux')) {
            response = "This portfolio website was built with HTML5, CSS3, Bootstrap, and JavaScript. It features a responsive dark theme with gold accents, integrated chat assistant, and video demonstrations. The site showcases Abdoulaziz's web development skills alongside his C/C++ projects.";
        }
        // Thanks/Goodbye
        else if (text.includes('thank') || text.includes('thanks') || text.includes('merci') || text.includes('bye') || text.includes('goodbye') || text.includes('au revoir')) {
            response = "You're welcome! Feel free to explore the Projects page to see Abdoulaziz's demo videos, or visit the Contacts page if you'd like to get in touch. Have a great day!";
        }

        addMessage(response, 'bot');
    }, 400);
}

function addMessage(text, sender) {
    const msgDiv = document.createElement('div');

    msgDiv.style.marginBottom = "12px";
    msgDiv.style.padding = "10px 14px";
    msgDiv.style.borderRadius = "15px";
    msgDiv.style.maxWidth = "85%";
    msgDiv.style.fontSize = "0.9rem";
    msgDiv.style.lineHeight = "1.4";

    if (sender === 'user') {
        msgDiv.style.alignSelf = "flex-end";
        msgDiv.style.backgroundColor = "#f0f2f0";
        msgDiv.style.color = "#333";
        msgDiv.style.marginLeft = "auto";
        msgDiv.style.borderBottomRightRadius = "2px";
    } else {
        // BOT MESSAGES NOW GOLD (#C9A84C) instead of sage green
        msgDiv.style.backgroundColor = "#C9A84C";
        msgDiv.style.color = "#0a0a0a";  // Dark text for contrast on gold
        msgDiv.style.borderBottomLeftRadius = "2px";
        msgDiv.style.fontWeight = "500";
    }

    msgDiv.innerHTML = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}