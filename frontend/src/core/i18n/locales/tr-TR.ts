import {
  CompassIcon,
  GraduationCapIcon,
  ImageIcon,
  MicroscopeIcon,
  PenLineIcon,
  ShapesIcon,
  SparklesIcon,
  VideoIcon,
} from "lucide-react";

import type { Translations } from "./types";

export const trTR: Translations = {
  // Locale meta
  locale: {
    localName: "Türkçe",
  },

  // Common
  common: {
    home: "Ana Sayfa",
    settings: "Ayarlar",
    delete: "Sil",
    rename: "Yeniden Adlandır",
    share: "Paylaş",
    openInNewWindow: "Yeni pencerede aç",
    close: "Kapat",
    more: "Daha fazla",
    search: "Ara",
    download: "İndir",
    thinking: "Düşünüyor",
    artifacts: "Üretimler",
    public: "Herkese Açık",
    custom: "Özel",
    notAvailableInDemoMode: "Demo modunda kullanılamaz",
    loading: "Yükleniyor...",
    version: "Sürüm",
    lastUpdated: "Son güncelleme",
    code: "Kod",
    preview: "Önizleme",
    cancel: "İptal",
    save: "Kaydet",
    install: "Yükle",
    create: "Oluştur",
  },

  // Welcome
  welcome: {
    greeting: "Tekrar merhaba!",
    description:
      "🦌 DeerFlow'a hoş geldiniz — açık kaynaklı süper ajan. Yerleşik ve özel yeteneklerle DeerFlow, web'de arama yapmanıza, verileri analiz etmenize ve slaytlar, web sayfaları gibi üretimler oluşturmanıza yardımcı olur.",

    createYourOwnSkill: "Kendi Yeteneğini Oluştur",
    createYourOwnSkillDescription:
      "DeerFlow'un gücünü açığa çıkarmak için kendi yeteneğinizi oluşturun. Özelleştirilmiş yeteneklerle\nDeerFlow web'de arama yapmanıza, verileri analiz etmenize ve slaytlar,\n web sayfaları gibi üretimler oluşturmanıza yardımcı olur.",
  },

  // Clipboard
  clipboard: {
    copyToClipboard: "Panoya kopyala",
    copiedToClipboard: "Panoya kopyalandı",
    failedToCopyToClipboard: "Panoya kopyalama başarısız",
    linkCopied: "Bağlantı panoya kopyalandı",
  },

  // Input Box
  inputBox: {
    placeholder: "Bugün size nasıl yardımcı olabilirim?",
    createSkillPrompt:
      "`skill-creator` ile adım adım yeni bir yetenek oluşturacağız. Başlangıç olarak, bu yeteneğin ne yapmasını istiyorsunuz?",
    addAttachments: "Dosya ekle",
    mode: "Mod",
    flashMode: "Hızlı",
    flashModeDescription: "Hızlı ve verimli, ancak doğruluk düşük olabilir",
    reasoningMode: "Mantıksal",
    reasoningModeDescription:
      "Eylemden önce mantık yürütür, zaman ve doğruluk arasında denge",
    proMode: "Profesyonel",
    proModeDescription:
      "Mantık yürütme, planlama ve uygulama ile daha doğru sonuçlar, daha fazla zaman alabilir",
    ultraMode: "Ultra",
    ultraModeDescription:
      "Alt ajanlarla iş bölümü yapan Pro modu; karmaşık çok adımlı görevler için en iyisi",
    reasoningEffort: "Mantık Yürütme Seviyesi",
    reasoningEffortMinimal: "Minimum",
    reasoningEffortMinimalDescription: "Bilgi Getirme + Doğrudan Çıktı",
    reasoningEffortLow: "Düşük",
    reasoningEffortLowDescription: "Basit Mantık Kontrolü + Yüzeysel Çıkarım",
    reasoningEffortMedium: "Orta",
    reasoningEffortMediumDescription:
      "Çok Katmanlı Mantık Analizi + Temel Doğrulama",
    reasoningEffortHigh: "Yüksek",
    reasoningEffortHighDescription:
      "Tam Boyutlu Mantık Çıkarımı + Çok Yollu Doğrulama + Geriye Dönük Kontrol",
    searchModels: "Model ara...",
    surpriseMe: "Sürpriz",
    surpriseMePrompt: "Beni şaşırt",
    followupLoading: "Takip soruları oluşturuluyor...",
    followupConfirmTitle: "Öneri gönderilsin mi?",
    followupConfirmDescription:
      "Giriş alanında zaten metin var. Nasıl göndermek istediğinizi seçin.",
    followupConfirmAppend: "Ekle ve gönder",
    followupConfirmReplace: "Değiştir ve gönder",
    suggestions: [
      {
        suggestion: "Yaz",
        prompt: "[konu] hakkında bir blog yazısı yaz",
        icon: PenLineIcon,
      },
      {
        suggestion: "Araştır",
        prompt:
          "[konu] hakkında derinlemesine bir araştırma yap ve bulguları özetle.",
        icon: MicroscopeIcon,
      },
      {
        suggestion: "Topla",
        prompt: "[kaynak]'tan veri topla ve bir rapor oluştur.",
        icon: ShapesIcon,
      },
      {
        suggestion: "Öğren",
        prompt: "[konu] hakkında bilgi edin ve bir öğretici oluştur.",
        icon: GraduationCapIcon,
      },
    ],
    suggestionsCreate: [
      {
        suggestion: "Web Sayfası",
        prompt: "[konu] hakkında bir web sayfası oluştur",
        icon: CompassIcon,
      },
      {
        suggestion: "Görsel",
        prompt: "[konu] hakkında bir görsel oluştur",
        icon: ImageIcon,
      },
      {
        suggestion: "Video",
        prompt: "[konu] hakkında bir video oluştur",
        icon: VideoIcon,
      },
      {
        type: "separator",
      },
      {
        suggestion: "Yetenek",
        prompt:
          "`skill-creator` ile adım adım yeni bir yetenek oluşturacağız. Başlangıç olarak, bu yeteneğin ne yapmasını istiyorsunuz?",
        icon: SparklesIcon,
      },
    ],
  },

  // Sidebar
  sidebar: {
    newChat: "Yeni sohbet",
    chats: "Sohbetler",
    recentChats: "Son sohbetler",
    demoChats: "Demo sohbetler",
    agents: "Ajanlar",
  },

  // Agents
  agents: {
    title: "Ajanlar",
    description:
      "Özelleştirilmiş prompt'lar ve yeteneklerle özel ajanlar oluşturun ve yönetin.",
    newAgent: "Yeni Ajan",
    emptyTitle: "Henüz özel ajan yok",
    emptyDescription:
      "Özelleştirilmiş bir sistem prompt'u ile ilk özel ajanınızı oluşturun.",
    chat: "Sohbet",
    delete: "Sil",
    deleteConfirm:
      "Bu ajanı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.",
    deleteSuccess: "Ajan silindi",
    newChat: "Yeni sohbet",
    createPageTitle: "Ajanınızı Tasarlayın",
    createPageSubtitle:
      "İstediğiniz ajanı tanımlayın — sohbet yoluyla oluşturmanıza yardımcı olacağım.",
    nameStepTitle: "Yeni Ajanınıza İsim Verin",
    nameStepHint:
      "Sadece harfler, rakamlar ve tireler — küçük harf olarak kaydedilir (ör: kod-inceleyici)",
    nameStepPlaceholder: "ör: kod-inceleyici",
    nameStepContinue: "Devam",
    nameStepInvalidError:
      "Geçersiz isim — sadece harfler, rakamlar ve tireler kullanın",
    nameStepAlreadyExistsError: "Bu isimde bir ajan zaten mevcut",
    nameStepCheckError: "İsim uygunluğu doğrulanamadı — lütfen tekrar deneyin",
    nameStepBootstrapMessage:
      "Yeni özel ajan adı {name}. **RUHUNU** oluşturalım.",
    agentCreated: "Ajan oluşturuldu!",
    startChatting: "Sohbete başla",
    backToGallery: "Galeriye dön",
  },

  // Breadcrumb
  breadcrumb: {
    workspace: "Çalışma Alanı",
    chats: "Sohbetler",
  },

  // Workspace
  workspace: {
    officialWebsite: "DeerFlow resmi web sitesi",
    githubTooltip: "GitHub'da DeerFlow",
    settingsAndMore: "Ayarlar ve daha fazlası",
    visitGithub: "GitHub'da DeerFlow",
    reportIssue: "Sorun bildir",
    contactUs: "Bize ulaşın",
    about: "DeerFlow Hakkında",
  },

  // Conversation
  conversation: {
    noMessages: "Henüz mesaj yok",
    startConversation: "Mesajları burada görmek için bir sohbet başlatın",
  },

  // Chats
  chats: {
    searchChats: "Sohbetlerde ara",
  },

  // Page titles (document title)
  pages: {
    appName: "DeerFlow",
    chats: "Sohbetler",
    newChat: "Yeni sohbet",
    untitled: "Başlıksız",
  },

  // Tool calls
  toolCalls: {
    moreSteps: (count: number) => `${count} adım daha`,
    lessSteps: "Daha az adım",
    executeCommand: "Komutu çalıştır",
    presentFiles: "Dosyaları göster",
    needYourHelp: "Yardımınıza ihtiyacım var",
    useTool: (toolName: string) => `"${toolName}" aracını kullan`,
    searchFor: (query: string) => `"${query}" için ara`,
    searchForRelatedInfo: "İlgili bilgileri ara",
    searchForRelatedImages: "İlgili görselleri ara",
    searchForRelatedImagesFor: (query: string) =>
      `"${query}" için ilgili görselleri ara`,
    searchOnWebFor: (query: string) => `Web'de "${query}" ara`,
    viewWebPage: "Web sayfasını görüntüle",
    listFolder: "Klasörü listele",
    readFile: "Dosyayı oku",
    writeFile: "Dosyaya yaz",
    clickToViewContent: "Dosya içeriğini görüntülemek için tıklayın",
    writeTodos: "Yapılacaklar listesini güncelle",
    skillInstallTooltip: "Yeteneği yükle ve DeerFlow'da kullanılabilir hale getir",
  },

  // Subtasks
  uploads: {
    uploading: "Yükleniyor...",
    uploadingFiles: "Dosyalar yükleniyor, lütfen bekleyin...",
  },

  subtasks: {
    subtask: "Alt görev",
    executing: (count: number) =>
      `${count === 1 ? "" : count + " "}alt görev${count === 1 ? " çalıştırılıyor" : " paralel çalıştırılıyor"}`,
    in_progress: "Alt görev çalışıyor",
    completed: "Alt görev tamamlandı",
    failed: "Alt görev başarısız",
  },

  // Settings
  settings: {
    title: "Ayarlar",
    description: "DeerFlow'un görünümünü ve davranışını özelleştirin.",
    sections: {
      appearance: "Görünüm",
      memory: "Bellek",
      tools: "Araçlar",
      skills: "Yetenekler",
      notification: "Bildirimler",
      about: "Hakkında",
    },
    memory: {
      title: "Bellek",
      description:
        "DeerFlow, sohbetlerinizden arka planda otomatik olarak öğrenir. Bu bellekler DeerFlow'un sizi daha iyi anlamasına ve daha kişiselleştirilmiş bir deneyim sunmasına yardımcı olur.",
      empty: "Gösterilecek bellek verisi yok.",
      rawJson: "Ham JSON",
      markdown: {
        overview: "Genel Bakış",
        userContext: "Kullanıcı bağlamı",
        work: "İş",
        personal: "Kişisel",
        topOfMind: "Gündem",
        historyBackground: "Geçmiş",
        recentMonths: "Son aylar",
        earlierContext: "Önceki bağlam",
        longTermBackground: "Uzun vadeli arka plan",
        updatedAt: "Güncelleme tarihi",
        facts: "Gerçekler",
        empty: "(boş)",
        table: {
          category: "Kategori",
          confidence: "Güvenilirlik",
          confidenceLevel: {
            veryHigh: "Çok yüksek",
            high: "Yüksek",
            normal: "Normal",
            unknown: "Bilinmiyor",
          },
          content: "İçerik",
          source: "Kaynak",
          createdAt: "Oluşturulma",
          view: "Görüntüle",
        },
      },
    },
    appearance: {
      themeTitle: "Tema",
      themeDescription:
        "Arayüzün cihazınızı takip edip etmeyeceğini veya sabit kalıp kalmayacağını seçin.",
      system: "Sistem",
      light: "Aydınlık",
      dark: "Karanlık",
      systemDescription: "İşletim sistemi tercihini otomatik takip et.",
      lightDescription: "Gündüz için yüksek kontrastlı parlak palet.",
      darkDescription: "Odaklanma için parlamayı azaltan karanlık palet.",
      languageTitle: "Dil",
      languageDescription: "Diller arasında geçiş yapın.",
    },
    tools: {
      title: "Araçlar",
      description: "MCP araçlarının yapılandırmasını ve etkin durumunu yönetin.",
    },
    skills: {
      title: "Ajan Yetenekleri",
      description:
        "Ajan yeteneklerinin yapılandırmasını ve etkin durumunu yönetin.",
      createSkill: "Yetenek oluştur",
      emptyTitle: "Henüz ajan yeteneği yok",
      emptyDescription:
        "Ajan yetenek klasörlerinizi DeerFlow kök klasörü altındaki `/skills/custom` klasörüne yerleştirin.",
      emptyButton: "İlk Yeteneğinizi Oluşturun",
    },
    notification: {
      title: "Bildirimler",
      description:
        "DeerFlow yalnızca pencere aktif olmadığında tamamlanma bildirimi gönderir. Bu özellikle uzun süren görevler için kullanışlıdır; böylece başka işlere geçebilir ve tamamlandığında bilgilendirilirsiniz.",
      requestPermission: "Bildirim izni iste",
      deniedHint:
        "Bildirim izni reddedildi. Tamamlanma uyarıları almak için tarayıcınızın site ayarlarından etkinleştirebilirsiniz.",
      testButton: "Test bildirimi gönder",
      testTitle: "DeerFlow",
      testBody: "Bu bir test bildirimidir.",
      notSupported: "Tarayıcınız bildirimleri desteklemiyor.",
      disableNotification: "Bildirimleri kapat",
    },
    acknowledge: {
      emptyTitle: "Teşekkürler",
      emptyDescription: "Katkıda bulunanlar ve teşekkürler burada gösterilecek.",
    },
  },
};
