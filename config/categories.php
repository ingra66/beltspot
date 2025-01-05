<?php

return [
    'cinturones' => [
        'name' => 'Cinturones BB Simon',
        'title' => 'Cinturones BB Simon con Cristales Swarovski',
        'description' => 'Descubre nuestra colección exclusiva de cinturones BB Simon con cristales Swarovski. Diseños únicos y elegantes para complementar tu estilo.',
        'keywords' => ['cinturones', 'BB Simon', 'Swarovski', 'lujo', 'accesorios', 'moda'],
        'heroImage' => '/images/hero-bg.jpg',
        'heroSubtitle' => 'Descubre nuestra colección de cinturones con cristales Swarovski',
        'route' => '/productos/cinturones'
    ],
    'cadenas' => [
        'name' => 'Cadenas Premium',
        'title' => 'Cadenas Premium y Joyería Exclusiva',
        'description' => 'Explora nuestra colección exclusiva de cadenas de alta calidad. Diseños únicos que combinan elegancia y estilo.',
        'keywords' => ['cadenas', 'joyería', 'accesorios', 'lujo', 'moda'],
        'heroImage' => '/images/chains-hero.jpg',
        'heroSubtitle' => 'Descubre nuestra colección de cadenas de alta calidad',
        'route' => '/productos/cadenas'
    ],
    'gorros' => [
        'name' => 'Gorras New Era',
        'title' => 'Gorras New Era Originales',
        'description' => 'Explora nuestra colección de gorras originales New Era. Diseños exclusivos y auténticos para complementar tu estilo.',
        'keywords' => ['gorras', 'New Era', 'gorros', 'accesorios', 'moda'],
        'heroImage' => '/images/caps-hero.jpg',
        'heroSubtitle' => 'Descubre nuestra colección de gorras originales New Era',
        'route' => '/productos/gorros'
    ],
    'otros' => [
        'name' => 'Accesorios Premium',
        'title' => 'Accesorios Premium y Complementos de Lujo',
        'description' => 'Descubre nuestra colección de accesorios exclusivos y complementos de moda. Productos únicos para elevar tu estilo.',
        'keywords' => ['accesorios', 'complementos', 'moda', 'lujo'],
        'heroImage' => '/images/others-hero.jpg',
        'heroSubtitle' => 'Descubre nuestra colección de accesorios exclusivos',
        'route' => '/productos/otros'
    ],
    'metadata' => [
        'og_type' => 'product.group',
        'twitter_card' => 'summary_large_image',
        'site_name' => 'Beltspot',
        'base_url' => env('APP_URL', 'https://beltspot.com'),
        'default_image' => '/images/og-default.jpg',
        'brand' => [
            'name' => 'Beltspot',
            'description' => 'Tienda especializada en cinturones BB Simon, cadenas y accesorios de lujo',
            'logo' => '/images/logo.png'
        ]
    ]
];