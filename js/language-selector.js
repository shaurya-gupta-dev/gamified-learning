// Language Selector Functionality
document.addEventListener('DOMContentLoaded', function() {
    const languageBtn = document.getElementById('languageBtn');
    const languageDropdown = document.getElementById('languageDropdown');
    const languageOptions = document.querySelectorAll('.language-option');
    
    // Current language
    let currentLanguage = localStorage.getItem('selectedLanguage') || 'en';
    
    // Initialize language on page load
    initializeLanguage();
    
    // Toggle dropdown
    languageBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        languageDropdown.classList.toggle('active');
        languageBtn.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.language-selector')) {
            languageDropdown.classList.remove('active');
            languageBtn.classList.remove('active');
        }
    });
    
    // Language option click
    languageOptions.forEach(option => {
        option.addEventListener('click', function() {
            const selectedLang = this.getAttribute('data-lang');
            changeLanguage(selectedLang);
            
            // Close dropdown
            languageDropdown.classList.remove('active');
            languageBtn.classList.remove('active');
        });
    });
    
    function initializeLanguage() {
        // Set active option
        languageOptions.forEach(option => {
            if (option.getAttribute('data-lang') === currentLanguage) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
        
        // Update button text
        updateButtonText(currentLanguage);
        
        // Apply translations
        applyTranslations(currentLanguage);
    }
    
    function changeLanguage(lang) {
        currentLanguage = lang;
        localStorage.setItem('selectedLanguage', lang);
        
        // Update active state
        languageOptions.forEach(option => {
            if (option.getAttribute('data-lang') === lang) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
        
        // Update button text
        updateButtonText(lang);
        
        // Apply translations
        applyTranslations(lang);
    }
    
    function updateButtonText(lang) {
        const langText = document.querySelector('.lang-text');
        const langMap = {
            'en': 'EN',
            'hi': 'HI',
            'od': 'OD'
        };
        langText.textContent = langMap[lang] || 'EN';
    }
    
    function applyTranslations(lang) {
        const translations = {
            'en': {
                'nav-home': 'Home',
                'nav-dashboard': 'Dashboard',
                'nav-features': 'Features',
                'nav-contact': 'Contact',
                'nav-get-started': 'Get Started',
                'hero-title-line1': 'Level Up Your',
                'hero-title-line2': 'Learning Journey',
                'hero-subtitle': 'Transform education into an epic adventure. Earn XP, build streaks, unlock achievements, and master subjects like a champion.',
                'hero-btn-primary': 'Start Learning Now',
                'hero-btn-secondary': 'View Demo',
                'stat-students': 'Active Students',
                'stat-lessons': 'Lessons Completed',
                'stat-success': 'Success Rate'
            },
            'hi': {
                'nav-home': 'होम',
                'nav-dashboard': 'डैशबोर्ड',
                'nav-features': 'विशेषताएं',
                'nav-contact': 'संपर्क',
                'nav-get-started': 'शुरू करें',
                'hero-title-line1': 'अपने को',
                'hero-title-line2': 'सीखने की यात्रा को अपग्रेड करें',
                'hero-subtitle': 'शिक्षा को एक महाकाव्य साहसिक कार्य में बदलें। XP अर्जित करें, स्ट्रीक बनाएं, उपलब्धियां अनलॉक करें, और एक चैंपियन की तरह विषयों में महारत हासिल करें।',
                'hero-btn-primary': 'अभी सीखना शुरू करें',
                'hero-btn-secondary': 'डेमो देखें',
                'stat-students': 'सक्रिय छात्र',
                'stat-lessons': 'पूर्ण पाठ',
                'stat-success': 'सफलता दर'
            },
            'od': {
                'nav-home': 'ହୋମ',
                'nav-dashboard': 'ଡ୍ୟାସବୋର୍ଡ',
                'nav-features': 'ବୈଶିଷ୍ଟ୍ୟ',
                'nav-contact': 'ଯୋଗାଯୋଗ',
                'nav-get-started': 'ଆରମ୍ଭ କରନ୍ତୁ',
                'hero-title-line1': 'ଆପଣଙ୍କୁ',
                'hero-title-line2': 'ଶିକ୍ଷା ଯାତ୍ରା ଅପଗ୍ରେଡ କରନ୍ତୁ',
                'hero-subtitle': 'ଶିକ୍ଷାକୁ ଏକ ମହାକାବ୍ୟ ଅଭିଯାନରେ ରୂପାନ୍ତରିତ କରନ୍ତୁ। XP ଅର୍ଜନ କରନ୍ତୁ, ଷ୍ଟ୍ରିକ ତିରି କରନ୍ତୁ, ଅର୍ଜନ ଅନଲକ କରନ୍ତୁ, ଏବଂ ଚ୍ୟାମ୍ପିଅନ ପରି ବିଷୟ ଆୟତ୍ତ କରନ୍ତୁ।',
                'hero-btn-primary': 'ବର୍ତ୍ତମାନ ଶିଖିବା ଶୁରୁ କରନ୍ତୁ',
                'hero-btn-secondary': 'ଡେମୋ ଦେଖନ୍ତୁ',
                'stat-students': 'ସକ୍ରିୟ ଛାତ୍ର',
                'stat-lessons': 'ସମ୍ପୂର୍ଣ୍ଣ ପାଠ',
                'stat-success': 'ସଫଳତା ହାର'
            }
        };
        
        // Apply translations to elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
    }
});
