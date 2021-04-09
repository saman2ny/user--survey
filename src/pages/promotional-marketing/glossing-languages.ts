// tslint:disable: max-line-length
export interface IGlossLanguage {
    bcp47: string; // LanguageCode in Keyman
    internalName: string; // InternalName in Keyman
    useKeyboard?: string; // allow Wu, Cantonese, and Mandarin to show pinyin keyboard
    englishName: string;
    vernacularName: string;
    vernacularAlternate: string;
    // loaded?: boolean;
}

export const glossingLanguages: IGlossLanguage[] = [
    { bcp47: 'am', internalName: 'Keyboard_gff_amharic', englishName: 'Amharic', vernacularName: 'አማርኛ', vernacularAlternate: 'Amarəñña' },
    { bcp47: 'ar', internalName: 'Keyboard_arabic_izza', englishName: 'Arabic', vernacularName: 'العَرَبِيَّة‎', vernacularAlternate: '' },
    { bcp47: 'ay', internalName: 'Keyboard_european2', englishName: 'Aymara', vernacularName: 'Aymar aru', vernacularAlternate: '' },
    { bcp47: 'bn', internalName: 'Keyboard_bengali', englishName: 'Bengali', vernacularName: 'বাংলা', vernacularAlternate: 'Bangla' },
    { bcp47: 'cmn', internalName: 'Keyboard_chinese', englishName: 'Mandarin', vernacularName: '官话', vernacularAlternate: '' }, // possibly 'zh' for chinese macrolanguage
    { bcp47: 'yue', useKeyboard: 'cmn', internalName: 'Keyboard_chinese', englishName: 'Cantonese', vernacularName: '广东话', vernacularAlternate: '' }, // possibly 'zh' for chinese macrolanguage
    { bcp47: 'de', internalName: 'Keyboard_european', englishName: 'German', vernacularName: 'Deutsch', vernacularAlternate: '' },
    { bcp47: 'en', internalName: 'Keyboard_us', englishName: 'English', vernacularName: '', vernacularAlternate: '' },
    { bcp47: 'es', internalName: 'Keyboard_spanish', englishName: 'Spanish', vernacularName: 'español', vernacularAlternate: 'castellano' },
    { bcp47: 'id', internalName: 'Keyboard_basic_kbdus', englishName: 'Indonesian', vernacularName: 'Bahasa Indonesia', vernacularAlternate: '' }, // US Basic keyboard
    { bcp47: 'fr', internalName: 'Keyboard_french', englishName: 'French', vernacularName: 'français', vernacularAlternate: '' },
    { bcp47: 'hi', internalName: 'Keyboard_dev_inscript', englishName: 'Hindi', vernacularName: 'हिन्दी', vernacularAlternate: 'Hindī' }, // Devanagari inscript
    { bcp47: 'ja', internalName: 'Keyboard_japanese', englishName: 'Japanese', vernacularName: '日本語', vernacularAlternate: 'Nihongo' },
    { bcp47: 'mr', internalName: 'Keyboard_marathi', englishName: 'Marathi', vernacularName: 'मराठी', vernacularAlternate: 'Marāṭhī' },
    { bcp47: 'nl', internalName: 'Keyboard_dutch', englishName: 'Dutch', vernacularName: 'Nederlands', vernacularAlternate: '' },
    { bcp47: 'or', internalName: 'Keyboard_isis_oriya', englishName: 'Oriya/Desia', vernacularName: 'ଓଡ଼ିଆ', vernacularAlternate: 'Oṛiā/Odia' },
    { bcp47: 'pa', internalName: 'Keyboard_isis_gurmukhi', englishName: 'Punjabi', vernacularName: 'ਪੰਜਾਬੀ', vernacularAlternate: 'پن٘جابی' },
    { bcp47: 'pt', internalName: 'Keyboard_portuguese', englishName: 'Portuguese', vernacularName: 'português', vernacularAlternate: '' },
    { bcp47: 'qu', internalName: 'Keyboard_european', englishName: 'Quechua', vernacularName: 'Runa Simi', vernacularAlternate: '' },
    { bcp47: 'ru', internalName: 'Keyboard_russian', englishName: 'Russian', vernacularName: 'русский', vernacularAlternate: 'язык' },
    { bcp47: 'sw', internalName: 'Keyboard_basic_kbdus', englishName: 'Swahili', vernacularName: 'Kiswahili', vernacularAlternate: '' },  // US Basic keyboard // swh = kiswahili, sw is macrolanguage
    { bcp47: 'tl', internalName: 'Keyboard_basic_kbdus', englishName: 'Tagalog', vernacularName: 'Wikang Tagalog', vernacularAlternate: '' }, // US Basic keyboard
    { bcp47: 'ta', internalName: 'Keyboard_tamil', englishName: 'Tamil', vernacularName: 'தமிழ்', vernacularAlternate: '' },
    { bcp47: 'tpi', internalName: 'Keyboard_european', englishName: 'Tok Pisin', vernacularName: '', vernacularAlternate: '' },
    { bcp47: 'ur', internalName: 'Keyboard_kbdurdu', englishName: 'Urdu', vernacularName: 'اُردُو', vernacularAlternate: '' },
    { bcp47: 'wuu', useKeyboard: 'cmn', internalName: 'Keyboard_chinese', englishName: 'Wu', vernacularName: '吴语', vernacularAlternate: '' }, // possibly 'zh' for chinese macrolanguage
    { bcp47: 'yo', internalName: 'Keyboard_european', englishName: 'Yoruba', vernacularName: 'Èdè Yorùbá', vernacularAlternate: '' },
];

// BCP 47 language codes used to identify correct Keyman keyboards for language inputs
// Codes pulled from: http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry