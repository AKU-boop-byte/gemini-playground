import { languages } from './language-selector.js';
import { voices } from './voice-selector.js';

const voiceSelect = document.getElementById('voice-select');
const languageSelect = document.getElementById('language-select');
const systemInstructionInput = document.getElementById('system-instruction-input');
const saveSettingsButton = document.getElementById('save-settings');

// Populate language options
languages.forEach(lang => {
    const option = document.createElement('option');
    option.textContent = lang.name;
    option.value = lang.code;
    languageSelect.appendChild(option);
});

// Populate voice options
voices.forEach(voice => {
    const option = document.createElement('option');
    option.textContent = voice.name;
    option.value = voice.code;
    voiceSelect.appendChild(option);
});

// Load saved settings
const savedLanguage = localStorage.getItem('gemini_language');
const savedVoice = localStorage.getItem('gemini_voice');
const savedSystemInstruction = localStorage.getItem('system_instruction');

if (savedLanguage) {
    languageSelect.value = savedLanguage;
}

if (savedVoice) {
    voiceSelect.value = savedVoice;
}

if (savedSystemInstruction) {
    systemInstructionInput.value = savedSystemInstruction;
}

// Save settings
saveSettingsButton.addEventListener('click', () => {
    localStorage.setItem('gemini_language', languageSelect.value);
    localStorage.setItem('gemini_voice', voiceSelect.value);
    localStorage.setItem('system_instruction', systemInstructionInput.value);
    alert('Settings saved!');
});

// Dummy implementation for other parts to avoid errors
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
});
