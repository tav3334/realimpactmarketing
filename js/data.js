// ==========================================
// REAL IMPACT MARKETING - DATA
// ==========================================

// SVG Icons (Lucide-style, 24x24 viewBox)
const icons = {
    code: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    megaphone: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 11 18-5v12L3 13v-2z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>',
    palette: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>',
    rocket: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>',
    barChart: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>',
    mail: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
    instagram: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>',
    briefcase: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/></svg>',
    mailIcon: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
    phone: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    mapPin: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>'
};

// Services Data
const servicesData = [
    {
        icon: icons.code,
        title: 'Développement Web',
        description: 'Sites web modernes, performants et responsive adaptés à vos besoins business.',
        features: [
            'Sites vitrine & e-commerce',
            'Applications web sur mesure',
            'Design responsive & UX optimisée',
            'Maintenance & support technique'
        ]
    },
    {
        icon: icons.megaphone,
        title: 'Marketing Digital',
        description: 'Stratégies marketing innovantes pour maximiser votre visibilité et vos conversions.',
        features: [
            'Gestion réseaux sociaux',
            'Campagnes publicitaires (Meta, Google)',
            'Content marketing & storytelling',
            'Analytics & reporting'
        ]
    },
    {
        icon: icons.palette,
        title: 'Design & Branding',
        description: 'Identités visuelles uniques qui marquent les esprits et reflètent vos valeurs.',
        features: [
            'Logo & identité de marque',
            'Charte graphique complète',
            'Design UI/UX',
            'Support print & digital'
        ]
    },
    {
        icon: icons.rocket,
        title: 'SEO & Référencement',
        description: 'Optimisation pour les moteurs de recherche et amélioration de votre visibilité organique.',
        features: [
            'Audit SEO complet',
            'Optimisation on-page & technique',
            'Stratégie de contenu SEO',
            'Suivi des performances'
        ]
    },
    {
        icon: icons.barChart,
        title: 'Stratégie Digitale',
        description: 'Conseils stratégiques pour orienter votre transformation digitale avec succès.',
        features: [
            'Audit digital complet',
            'Roadmap & plan d\'action',
            'Formation & accompagnement',
            'Veille & innovation'
        ]
    },
    {
        icon: icons.mail,
        title: 'Email Marketing',
        description: 'Campagnes email personnalisées pour engager vos audiences et fidéliser vos clients.',
        features: [
            'Newsletters & automation',
            'Segmentation avancée',
            'Templates responsive',
            'A/B testing & optimisation'
        ]
    }
];

// Portfolio Data
const portfolioData = [
    {
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop&q=80',
        title: 'E-commerce Fashion',
        category: 'Développement Web',
        description: 'Site e-commerce complet avec gestion des stocks et paiements sécurisés'
    },
    {
        image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop&q=80',
        title: 'Campagne Social Media',
        category: 'Marketing Digital',
        description: 'Stratégie Instagram qui a généré +300% d\'engagement en 3 mois'
    },
    {
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&q=80',
        title: 'Application Mobile',
        category: 'Développement',
        description: 'App de réservation intuitive avec plus de 10K téléchargements'
    },
    {
        image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&h=600&fit=crop&q=80',
        title: 'Branding Startup Tech',
        category: 'Design & Branding',
        description: 'Identité visuelle complète pour une startup innovante'
    },
    {
        image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&h=600&fit=crop&q=80',
        title: 'SEO Restaurant',
        category: 'SEO',
        description: 'Optimisation SEO locale: +450% de visibilité en 6 mois'
    },
    {
        image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop&q=80',
        title: 'Plateforme E-learning',
        category: 'Développement Web',
        description: 'Système de formation en ligne avec tableau de bord avancé'
    }
];

// Process Steps Data
const processSteps = [
    {
        number: 1,
        title: 'Découverte',
        description: 'Nous analysons vos besoins, vos objectifs et votre marché pour définir la meilleure stratégie.'
    },
    {
        number: 2,
        title: 'Stratégie',
        description: 'Élaboration d\'un plan d\'action détaillé avec timeline et KPIs mesurables.'
    },
    {
        number: 3,
        title: 'Création',
        description: 'Développement et design de votre solution avec points de validation réguliers.'
    },
    {
        number: 4,
        title: 'Lancement',
        description: 'Mise en ligne optimisée avec formation et documentation complète.'
    },
    {
        number: 5,
        title: 'Optimisation',
        description: 'Suivi continu, analyses et améliorations pour maximiser les performances.'
    }
];

// Instagram Accounts Data
const instagramAccounts = [
    {
        icon: icons.instagram,
        handle: '@real_impact_marketing',
        description: 'Notre compte principal avec nos derniers projets, conseils marketing et actualités digitales',
        url: 'https://www.instagram.com/real_impact_marketing'
    }
];

// Instagram Posts Preview Data
const instagramPosts = [
    {
        image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=400&fit=crop&q=80',
        likes: '124',
        caption: 'Stratégie digitale'
    },
    {
        image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=400&fit=crop&q=80',
        likes: '98',
        caption: 'Design créatif'
    },
    {
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop&q=80',
        likes: '156',
        caption: 'Analytics & Data'
    },
    {
        image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=400&fit=crop&q=80',
        likes: '87',
        caption: 'Brainstorming'
    },
    {
        image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=400&h=400&fit=crop&q=80',
        likes: '203',
        caption: 'Résultats clients'
    },
    {
        image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=400&fit=crop&q=80',
        likes: '142',
        caption: 'Web development'
    }
];

// Testimonials Data
const testimonialsData = [
    {
        quote: 'Une équipe exceptionnelle qui a transformé notre présence en ligne. Notre chiffre d\'affaires a doublé en 6 mois !',
        author: 'Mohammed Khalil',
        role: 'CEO, TechStart Morocco',
        initials: 'MK'
    },
    {
        quote: 'Professionnalisme, créativité et résultats au rendez-vous. Je recommande à 100% Real Impact Marketing.',
        author: 'Sarah Alami',
        role: 'Fondatrice, Beauty & Co',
        initials: 'SA'
    },
    {
        quote: 'Le meilleur investissement pour notre entreprise. Une agence qui comprend vraiment les enjeux du digital.',
        author: 'Youssef Bennani',
        role: 'Directeur Marketing, RestauMaroc',
        initials: 'YB'
    }
];

// Contact Details Data
const contactDetails = [
    {
        icon: icons.mailIcon,
        title: 'Email',
        info: 'contact@realimpact-marketing.com'
    },
    {
        icon: icons.phone,
        title: 'Téléphone',
        info: '+212 6XX XX XX XX'
    },
    {
        icon: icons.mapPin,
        title: 'Localisation',
        info: 'Kénitra, Maroc'
    }
];
