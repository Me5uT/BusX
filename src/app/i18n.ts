import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      common: {
        search: "Search Trips",
        loading: "Loading...",
        error: "An error occurred",
        continue: "Continue to Checkout",
        back: "Back",
        confirm: "Confirm Payment",
        success: "Success",
        from: "From",
        to: "To",
        date: "Date",
        price: "Price",
        tryAgain: "Try Again",
        selectSeat: "Select Seat",
        close: "Close",
        themeDark: "Dark",
        themeLight: "Light",
        where: "Where will you go next?",
        whereDescription: "Book your bus tickets easily and securely.",
        noTripsFound: "No trips found for this date.",
      },
      filters: {
        sortBy: "Sort By",
        priceAsc: "Price (Low to High)",
        priceDesc: "Price (High to Low)",
        timeAsc: "Time (Earliest)",
        timeDesc: "Time (Latest)",
        allCompanies: "All Companies",
      },
      seats: {
        selectTitle: "Select Seats",
        legendEmpty: "Available",
        legendTaken: "Taken",
        legendSelected: "Selected",
        maxSeats: "You can select a maximum of 4 seats.",
        total: "Total",
        selected: "Selected Seat(s)",
      },
      form: {
        passengerTitle: "Passenger Information",
        contactTitle: "Contact Details",
        name: "First Name",
        surname: "Last Name",
        idNo: "ID / Passport No",
        gender: "Gender",
        male: "Male",
        female: "Female",
        phone: "Phone",
        email: "Email",
        agreement: "I accept the terms and conditions and privacy policy.",
        required: "Required",
        invalidEmail: "Invalid email",
      },
      success: {
        title: "Payment Successful!",
        message:
          "Your payment has been successfully completed and your ticket is created.",
        pnr: "Your PNR Code",
        home: "Return Home",
      },
      errorBoundary: {
        title: "Something went wrong",
        message: "We apologize for the inconvenience. Please refresh the page.",
        reload: "Reload Page",
      },
    },
  },
  tr: {
    translation: {
      common: {
        search: "Sefer Ara",
        loading: "Yükleniyor...",
        error: "Bir hata oluştu",
        continue: "Ödemeye Geç",
        back: "Geri",
        confirm: "Ödemeyi Tamamla",
        success: "Başarılı",
        from: "Nereden",
        to: "Nereye",
        date: "Tarih",
        price: "Fiyat",
        tryAgain: "Tekrar Dene",
        selectSeat: "Koltuk Seç",
        close: "Kapat",
        themeDark: "Koyu",
        themeLight: "Açık",
        where: "Nereye gitmek istiyorsunuz?",
        whereDescription: "Otobüs biletlerini güvenli ve kolayca sipariş edin.",
        noTripsFound: "Bu tarihe uygun sefer bulunamadı.",
      },
      filters: {
        sortBy: "Sıralama",
        priceAsc: "Fiyat (Artan)",
        priceDesc: "Fiyat (Azalan)",
        timeAsc: "Saat (Erken)",
        timeDesc: "Saat (Geç)",
        allCompanies: "Tüm Firmalar",
      },
      seats: {
        selectTitle: "Koltuk Seçimi",
        legendEmpty: "Boş",
        legendTaken: "Dolu",
        legendSelected: "Seçili",
        maxSeats: "En fazla 4 koltuk seçebilirsiniz.",
        total: "Toplam",
        selected: "Seçilen Koltuk(lar)",
      },
      form: {
        passengerTitle: "Yolcu Bilgileri",
        contactTitle: "İletişim Bilgileri",
        name: "Ad",
        surname: "Soyad",
        idNo: "TCKN / Pasaport",
        gender: "Cinsiyet",
        male: "Erkek",
        female: "Kadın",
        phone: "Telefon",
        email: "E-posta",
        agreement:
          "Ön bilgilendirme formunu ve mesafeli satış sözleşmesini okudum, onaylıyorum.",
        required: "Zorunlu",
        invalidEmail: "Geçersiz e-posta",
      },
      success: {
        title: "Ödeme Başarılı!",
        message:
          "Ödemeniz başarılı bir şekilde tamamlandı ve biletiniz oluşturuldu.",
        pnr: "PNR Kodunuz",
        home: "Ana Sayfaya Dön",
      },
      errorBoundary: {
        title: "Bir şeyler ters gitti",
        message:
          "Yaşanan aksaklık için özür dileriz. Lütfen sayfayı yenileyin.",
        reload: "Sayfayı Yenile",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "tr",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
