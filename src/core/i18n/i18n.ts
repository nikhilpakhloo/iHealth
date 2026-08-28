import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "Consultations": "Consultations",
      "Shop": "Shop",
      "Records": "Records",
      "Cart": "Cart",
      "Search by name...": "Search by name...",
      "Search products...": "Search products...",
      "Search records...": "Search records...",
      "Session expired. Please login again.": "Session expired. Please login again.",
      "Slot already booked. Please choose another.": "Slot already booked. Please choose another.",
      "An error occurred": "An error occurred",
      "Network Error. Please check your connection.": "Network Error. Please check your connection.",
      "Consultation confirmed!": "Consultation confirmed!",
      "Book Consultation": "Book Consultation",
      "Add to Cart": "Add to Cart",
      "Added to cart": "Added to cart",
      "Removed from cart": "Removed from cart",
      "Remove": "Remove",
      "Checkout": "Checkout",
      "Total:": "Total:",
      "Your cart is empty": "Your cart is empty",
      "No doctors found for": "No doctors found for",
      "No products found.": "No products found.",
      "No records found": "No records found",
      "Failed to load products.": "Failed to load products.",
      "Failed to load doctors.": "Failed to load doctors.",
      "Failed to load records.": "Failed to load records.",
      "Tap to retry": "Tap to retry",
      "Cancel": "Cancel",
      "Upcoming Consultations": "Upcoming Consultations",
      "Confirmed": "Confirmed",
      "Pending (Offline)": "Pending (Offline)",
      "Doctor Details": "Doctor Details",
      "Select a Time Slot": "Select a Time Slot",
      "Available Slots:": "Available Slots:",
      "Rating": "Rating",
      "doctors found": "doctors found",
      
      // Categories
      "All": "All",
      "Medicine": "Medicine",
      "Equipment": "Equipment",
      "Vitamins": "Vitamins",
      "Ayurvedic": "Ayurvedic",
      "Personal Care": "Personal Care",

      // Specialties
      "Ayurveda General": "Ayurveda General",
      "Panchakarma": "Panchakarma",
      "Skin & Hair": "Skin & Hair",
      "Digestion": "Digestion",
      "Mental Health": "Mental Health",

      // Records
      "Timeline": "Timeline",
      "Lab Results": "Lab Results",
      "Prescriptions": "Prescriptions",
      "Vitals": "Vitals",
      "Lab Report": "Lab Report",
      "Prescription": "Prescription",
      "Consultation": "Consultation",
      "Vaccination": "Vaccination",
      "Allergy": "Allergy",
      "content coming soon...": "content coming soon..."
    }
  },
  hi: {
    translation: {
      "Consultations": "परामर्श",
      "Shop": "दुकान",
      "Records": "रिकॉर्ड",
      "Cart": "कार्ट",
      "Search by name...": "नाम से खोजें...",
      "Search products...": "उत्पाद खोजें...",
      "Search records...": "रिकॉर्ड खोजें...",
      "Session expired. Please login again.": "सत्र समाप्त हो गया। कृपया पुनः लॉगिन करें।",
      "Slot already booked. Please choose another.": "स्लॉट पहले ही बुक हो चुका है। कृपया दूसरा चुनें।",
      "An error occurred": "एक त्रुटि हुई",
      "Network Error. Please check your connection.": "नेटवर्क त्रुटि। कृपया अपना कनेक्शन जांचें।",
      "Consultation confirmed!": "परामर्श की पुष्टि हो गई!",
      "Book Consultation": "परामर्श बुक करें",
      "Add to Cart": "कार्ट में डालें",
      "Added to cart": "कार्ट में जोड़ा गया",
      "Removed from cart": "कार्ट से हटा दिया गया",
      "Remove": "निकालें",
      "Checkout": "चेकआउट",
      "Total:": "कुल:",
      "Your cart is empty": "आपकी कार्ट खाली है",
      "No doctors found for": "के लिए कोई डॉक्टर नहीं मिला",
      "No products found.": "कोई उत्पाद नहीं मिला।",
      "No records found": "कोई रिकॉर्ड नहीं मिला",
      "Failed to load products.": "उत्पाद लोड करने में विफल।",
      "Failed to load doctors.": "डॉक्टर लोड करने में विफल।",
      "Failed to load records.": "रिकॉर्ड लोड करने में विफल।",
      "Tap to retry": "पुनः प्रयास करने के लिए टैप करें",
      "Cancel": "रद्द करें",
      "Upcoming Consultations": "आगामी परामर्श",
      "Confirmed": "पुष्टि हो गई",
      "Pending (Offline)": "लंबित (ऑफ़लाइन)",
      "Doctor Details": "डॉक्टर का विवरण",
      "Select a Time Slot": "एक समय चुनें",
      "Available Slots:": "उपलब्ध समय:",
      "Rating": "रेटिंग",
      "doctors found": "डॉक्टर मिले",

      // Categories
      "All": "सभी",
      "Medicine": "दवा",
      "Equipment": "उपकरण",
      "Vitamins": "विटामिन",
      "Ayurvedic": "आयुर्वेदिक",
      "Personal Care": "व्यक्तिगत देखभाल",

      // Specialties
      "Ayurveda General": "सामान्य आयुर्वेद",
      "Panchakarma": "पंचकर्म",
      "Skin & Hair": "त्वचा और बाल",
      "Digestion": "पाचन",
      "Mental Health": "मानसिक स्वास्थ्य",

      // Records
      "Timeline": "समयरेखा",
      "Lab Results": "लैब परिणाम",
      "Prescriptions": "पर्चे",
      "Vitals": "महत्वपूर्ण",
      "Lab Report": "लैब रिपोर्ट",
      "Prescription": "पर्चा",
      "Consultation": "परामर्श",
      "Vaccination": "टीकाकरण",
      "Allergy": "एलर्जी",
      "content coming soon...": "सामग्री जल्द आ रही है..."
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
