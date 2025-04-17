<!DOCTYPE html>
<html lang="sk">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Šepot lesa - Interaktívna audiohra</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        /* Vlastné CSS pre efekty a animácie */
        @keyframes pulse {
            0% { opacity: 0.2; transform: scale(0.8); }
            100% { opacity: 0.5; transform: scale(1.2); }
        }

        @keyframes flicker {
            0%, 18%, 22%, 25%, 53%, 57%, 100% { opacity: 0.05; }
            20%, 24%, 55% { opacity: 0.2; }
        }

        @keyframes glitch {
            0% { transform: none; opacity: 1; }
            7% { transform: skew(-0.5deg, -0.9deg); opacity: 0.75; }
            10% { transform: none; opacity: 1; }
            27% { transform: none; opacity: 1; }
            30% { transform: skew(0.8deg, -0.1deg); opacity: 0.75; }
            35% { transform: none; opacity: 1; }
            52% { transform: none; opacity: 1; }
            55% { transform: skew(-1deg, 0.2deg); opacity: 0.75; }
            50% { transform: none; opacity: 1; }
            72% { transform: none; opacity: 1; }
            75% { transform: skew(0.4deg, 1deg); opacity: 0.75; }
            80% { transform: none; opacity: 1; }
            100% { transform: none; opacity: 1; }
        }

        /* Štýl pre scrollbar (voliteľné) */
        ::-webkit-scrollbar {
            width: 8px;
        }
        ::-webkit-scrollbar-track {
            background: #1f2937; /* tmavý podklad */
        }
        ::-webkit-scrollbar-thumb {
            background: #9333ea; /* fialová */
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #ec4899; /* ružová */
        }

        /* Zabezpečenie, aby obsah nebol prekrytý fixným fog efektom */
        body {
            position: relative;
            z-index: 1;
        }

        /* Zabezpečenie, že audio prehrávač je vždy viditeľný */
        audio {
            min-height: 50px; /* Alebo iná vhodná výška */
        }
    </style>
</head>
<body class="bg-black text-gray-100 font-sans">
    <div class="fixed inset-0 pointer-events-none z-50 opacity-50 mix-blend-screen" style="background: radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.03), transparent);"></div>

    <header class="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <div class="absolute inset-0 bg-gradient-to-b from-black to-gray-900 opacity-95 z-0"></div>

        <div class="absolute inset-0 opacity-30 z-0">
            <img src="https://i.imgur.com/ST2nkj5.png"
                 alt="Pozadie lesa"
                 class="w-full h-full object-cover"
                 onerror="this.onerror=null; this.src='https://placehold.co/1920x1080/000000/FFFFFF?text=Obrázok+sa+nepodarilo+načítať'; this.alt='Záložný obrázok';">
        </div>

        <div class="absolute inset-0 z-0 pointer-events-none opacity-20" style="background: repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 2px);"></div>

        <div class="container mx-auto px-4 text-center z-10">
            <div class="mb-2 text-xs md:text-sm tracking-widest glitch-effect font-medium" style="background: linear-gradient(to right, #9333ea, #ec4899); -webkit-background-clip: text; background-clip: text; color: transparent; animation: glitch 5s linear infinite;">127.5 MHz</div>

            <h1 class="text-5xl md:text-7xl font-bold mb-4 text-white relative">
                Šepot lesa
                <span class="absolute inset-0 opacity-50 blur-sm" style="animation: pulse 3s infinite alternate; background: radial-gradient(circle, rgba(147, 51, 234, 0.3), transparent 70%); border-radius: 50%;"></span>
            </h1>

            <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                Interaktívna audiohra o tichu, vine a hľadaní pravdy v hlbinách lesa.
            </p>

            <div class="my-3 opacity-80">
                <span class="inline-block w-16 h-px bg-purple-500"></span>
                <span class="mx-2 text-xs tracking-widest font-medium">HOLLOW</span>
                <span class="inline-block w-16 h-px bg-pink-500"></span>
            </div>

            <div class="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                <a href="#tracks" class="px-8 py-3 text-lg font-semibold rounded-md bg-transparent text-white border-2 border-purple-600 relative overflow-hidden transition-all duration-300 hover:text-white hover:shadow-lg hover:shadow-purple-500/30 uppercase tracking-wider group">
                    <span class="relative z-10">Vypočuť ukážku</span>
                    <span class="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></span>
                </a>
                <a href="#contact" class="px-8 py-3 text-lg font-semibold rounded-md bg-transparent text-white border-2 border-purple-600 relative overflow-hidden transition-all duration-300 hover:text-white hover:shadow-lg hover:shadow-purple-500/30 uppercase tracking-wider group">
                    <span class="relative z-10">Kontaktovať autora</span>
                    <span class="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></span>
                </a>
            </div>
        </div>

        <div class="absolute bottom-0 left-0 right-0 h-32 opacity-20 z-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="w-full h-full">
                <path fill="#000000" d="M0,96L48,128C96,160,192,224,288,224C384,224,480,160,576,138.7C672,117,768,139,864,165.3C960,192,1056,224,1152,218.7C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
        </div>

        <div class="absolute bottom-10 left-0 right-0 text-center z-10">
            <a href="#about" class="text-white opacity-70 hover:opacity-100 transition-opacity">
                <i class="fas fa-chevron-down text-2xl animate-bounce"></i>
            </a>
        </div>

        <div class="absolute inset-0 z-0 opacity-20 pointer-events-none" style="animation: flicker 8s infinite alternate;">
            <div class="absolute inset-0 bg-black"></div>
        </div>
    </header>

    <section id="about" class="py-20 px-4 relative">
        <div class="absolute inset-0 opacity-5 z-0" style="background-image: radial-gradient(rgba(147, 51, 234, 0.03) 1px, transparent 1px); background-size: 20px 20px;"></div>

        <div class="container mx-auto max-w-4xl">
            <h2 class="text-4xl font-bold mb-2 text-center">O hre</h2>
            <div class="text-center mb-10">
                <div class="inline-block">
                    <span class="text-xs tracking-widest font-medium" style="background: linear-gradient(to right, #9333ea, #ec4899); -webkit-background-clip: text; background-clip: text; color: transparent;">HLAS LESA</span>
                    <div class="h-px w-full bg-gradient-to-r from-purple-500 to-pink-500 mt-1"></div>
                </div>
            </div>

            <div class="bg-black bg-opacity-40 p-8 rounded-2xl shadow-2xl border border-gray-800 backdrop-filter backdrop-blur-md relative overflow-hidden">
                <div class="absolute inset-0 z-0 opacity-[0.02]">
                     <div style="background-image: url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\"><path d=\"M10 0L0 10h10v10L20 10h-10V0z\" fill=\"%23FFFFFF\"/></svg>'); background-size: 20px 20px;"></div>
                </div>

                <div class="relative z-10">
                    <p class="text-lg leading-relaxed">
                        <span class="font-bold text-xl" style="background: linear-gradient(to right, #9333ea, #ec4899); -webkit-background-clip: text; background-clip: text; color: transparent;">Šepot lesa</span> je interaktívna audiohra odohrávajúca sa v rodnej dedine hlavnej postavy, novinára Jakuba Horáka, ktorý sa po rokoch vracia odhaliť pravdu o <span style="background: linear-gradient(to right, #9333ea, #ec4899); -webkit-background-clip: text; background-clip: text; color: transparent;" class="font-semibold">zmiznutí svojho brata Samuela</span>. Hra má viacero koncov, obsahuje viacero paralelných liniek a rozhodnutí, ktoré ovplyvnia dej.
                    </p>
                    <p class="text-lg leading-relaxed mt-4">
                        Je nahraná ako plnohodnotný dramatický zážitok s profesionálnymi hercami a zvukovým dizajnom. V hre sa objavuje tajomná frekvencia <span style="background: linear-gradient(to right, #9333ea, #ec4899); -webkit-background-clip: text; background-clip: text; color: transparent;" class="font-semibold">127.5 MHz</span>, entita „<span style="background: linear-gradient(to right, #9333ea, #ec4899); -webkit-background-clip: text; background-clip: text; color: transparent;">Hollow</span>" a kult „<span style="background: linear-gradient(to right, #9333ea, #ec4899); -webkit-background-clip: text; background-clip: text; color: transparent;">Hlas lesa</span>".
                    </p>
                </div>

                <div class="absolute inset-0 pointer-events-none" style="background: repeating-linear-gradient(transparent, transparent 2px, rgba(0, 0, 0, 0.05) 2px, rgba(0, 0, 0, 0.05) 4px); z-index: 11;"></div>

                <div class="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                    <div class="absolute top-0 right-0 w-4 h-4 bg-gradient-to-br from-purple-500 to-pink-500 transform rotate-45 translate-x-1/2 -translate-y-1/2 opacity-70"></div>
                </div>
            </div>
        </div>
    </section>

    <div class="h-px w-4/5 mx-auto bg-gradient-to-r from-transparent via-purple-500 to-transparent my-16 relative">
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg shadow-purple-500/50"></div>
    </div>

    <section id="tracks" class="py-20 px-4">
        <div class="container mx-auto">
            <h2 class="text-4xl font-bold mb-10 text-center">Tracklist</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div class="bg-gray-900 bg-opacity-60 p-5 rounded-xl border border-gray-800 shadow-lg hover:shadow-purple-500/20 transform transition-all duration-300 hover:-translate-y-2 track-card">
                    <div class="aspect-square mb-4 overflow-hidden rounded-md">
                        <img src="https://cdn.midjourney.com/492ba641-df8c-4f60-aa1d-ef2fde96dcea/0_1.png" alt="Artwork pre Track 1" class="w-full h-full object-cover transition-all duration-300 filter grayscale hover:grayscale-0 hover:scale-105" onerror="this.onerror=null; this.src='https://placehold.co/400x400/374151/FFFFFF?text=Obrázok'; this.alt='Záložný obrázok';">
                    </div>
                    <h3 class="text-xl font-bold mb-2">Track 01: Návrat</h3>
                    <p class="text-gray-300 mb-4 text-sm">Jakub prichádza do rodnej dediny po rokoch absencie. Začína objavovať stopy vedúce k záhade zmiznutia jeho brata.</p>
                    <audio controls class="w-full">
                        <source src="https://raw.githubusercontent.com/Vlado361/Audiohra-/main/1_Cesta%20domov.mp3" type="audio/mpeg">
                        Váš prehliadač nepodporuje HTML5 audio.
                    </audio>
                </div>

                <div class="bg-gray-900 bg-opacity-60 p-5 rounded-xl border border-gray-800 shadow-lg hover:shadow-purple-500/20 transform transition-all duration-300 hover:-translate-y-2 track-card">
                    <div class="aspect-square mb-4 overflow-hidden rounded-md">
                        <img src="https://cdn.midjourney.com/6cf957bc-499b-431d-9b7a-c2b089594e4a/0_3.png" alt="Artwork pre Track 2" class="w-full h-full object-cover transition-all duration-300 filter grayscale hover:grayscale-0 hover:scale-105" onerror="this.onerror=null; this.src='https://placehold.co/400x400/374151/FFFFFF?text=Obrázok'; this.alt='Záložný obrázok';">
                    </div>
                    <h3 class="text-xl font-bold mb-2">Track 02: Staré rany</h3>
                    <p class="text-gray-300 mb-4 text-sm">Rozhovor s matkou odhaľuje bolestivé spomienky. Jakubove prvé zistenia o Samuelovom záujme o miestne legendy.</p>
                    <audio controls class="w-full">
                        <source src="https://raw.githubusercontent.com/Vlado361/Sepot_Lesa/main/2_Zastaveny_cas%20pri%20kaplnke.mp3" type="audio/mpeg">
                        Váš prehliadač nepodporuje HTML5 audio.
                    </audio>
                </div>

                <div class="bg-gray-900 bg-opacity-60 p-5 rounded-xl border border-gray-800 shadow-lg hover:shadow-purple-500/20 transform transition-all duration-300 hover:-translate-y-2 track-card">
                    <div class="aspect-square mb-4 overflow-hidden rounded-md">
                        <img src="https://cdn.midjourney.com/2923fa72-adbf-45fe-919f-0fe2db046ff8/0_1.png" alt="Artwork pre Track 3" class="w-full h-full object-cover transition-all duration-300 filter grayscale hover:grayscale-0 hover:scale-105" onerror="this.onerror=null; this.src='https://placehold.co/400x400/374151/FFFFFF?text=Obrázok'; this.alt='Záložný obrázok';">
                    </div>
                    <h3 class="text-xl font-bold mb-2">Track 03: Rádiová veža</h3>
                    <p class="text-gray-300 mb-4 text-sm">Jakub objavuje bratov denník s poznámkami o frekvencii 127.5 MHz. Prvé zmienky o entite "Hollow" sa začínajú objavovať.</p>
                    <audio controls class="w-full">
                        <source src="https://raw.githubusercontent.com/Vlado361/Sepot_Lesa/main/3_Radiova_veza.mp3" type="audio/mpeg">
                        Váš prehliadač nepodporuje HTML5 audio.
                    </audio>
                </div>

                <div class="bg-gray-900 bg-opacity-60 p-5 rounded-xl border border-gray-800 shadow-lg hover:shadow-purple-500/20 transform transition-all duration-300 hover:-translate-y-2 track-card">
                    <div class="aspect-square mb-4 overflow-hidden rounded-md">
                        <img src="https://cdn.midjourney.com/2fbafcd6-5051-454a-b93e-0e78d3b1d072/0_3.png" alt="Artwork pre Track 4" class="w-full h-full object-cover transition-all duration-300 filter grayscale hover:grayscale-0 hover:scale-105" onerror="this.onerror=null; this.src='https://placehold.co/400x400/374151/FFFFFF?text=Obrázok'; this.alt='Záložný obrázok';">
                    </div>
                    <h3 class="text-xl font-bold mb-2">Track 04: Nočná frekvencia</h3>
                    <p class="text-gray-300 mb-4 text-sm">Jakub sa rozhodne naladiť na frekvenciu 127.5 MHz. Zvláštne zvuky a šepoty lesa sa začínajú ozývať z rádia.</p>
                    <audio controls class="w-full">
                        <source src="https://raw.githubusercontent.com/Vlado361/Sepot_Lesa/main/4_Vystup_do_neznama.mp3" type="audio/mpeg">
                        Váš prehliadač nepodporuje HTML5 audio.
                    </audio>
                </div>

                <div class="bg-gray-900 bg-opacity-60 p-5 rounded-xl border border-gray-800 shadow-lg hover:shadow-purple-500/20 transform transition-all duration-300 hover:-translate-y-2 track-card">
                    <div class="aspect-square mb-4 overflow-hidden rounded-md">
                        <img src="https://cdn.midjourney.com/ece7f546-fdb8-445e-a266-3f7f248dd86e/0_0.png" alt="Artwork pre Track 5" class="w-full h-full object-cover transition-all duration-300 filter grayscale hover:grayscale-0 hover:scale-105" onerror="this.onerror=null; this.src='https://placehold.co/400x400/374151/FFFFFF?text=Obrázok'; this.alt='Záložný obrázok';">
                    </div>
                    <h3 class="text-xl font-bold mb-2">Track 05: Starý známy</h3>
                    <p class="text-gray-300 mb-4 text-sm">Stretnutie s Petrom, kamarátom z detstva, ktorý teraz pracuje ako lesník. Zdá sa, že o zmiznutí Samuela vie viac, než priznáva.</p>
                    <audio controls class="w-full">
                        <source src="https://raw.githubusercontent.com/Vlado361/Sepot_Lesa/main/5_technicka_miestnost.mp3" type="audio/mpeg">
                        Váš prehliadač nepodporuje HTML5 audio.
                    </audio>
                </div>

                <div class="bg-gray-900 bg-opacity-60 p-5 rounded-xl border border-gray-800 shadow-lg hover:shadow-purple-500/20 transform transition-all duration-300 hover:-translate-y-2 track-card">
                    <div class="aspect-square mb-4 overflow-hidden rounded-md">
                        <img src="https://cdn.midjourney.com/c00dcc26-c7e3-4c46-93f0-c8555eea9354/0_0.png" alt="Artwork pre Track 6" class="w-full h-full object-cover transition-all duration-300 filter grayscale hover:grayscale-0 hover:scale-105" onerror="this.onerror=null; this.src='https://placehold.co/400x400/374151/FFFFFF?text=Obrázok'; this.alt='Záložný obrázok';">
                    </div>
                    <h3 class="text-xl font-bold mb-2">Track 06: Hlas lesa</h3>
                    <p class="text-gray-300 mb-4 text-sm">Prvá zmienka o kulte "Hlas lesa". Jakub sa dozvedá o tajných stretnutiach v hlbokých lesoch a rituáloch spájaných s miestnou legendou.</p>
                    <audio controls class="w-full">
                         <source src="https://raw.githubusercontent.com/Vlado361/Sepot_Lesa/main/6_temny_les.mp3" type="audio/mpeg">
                        Váš prehliadač nepodporuje HTML5 audio.
                    </audio>
                </div>

                <div class="col-span-1 sm:col-span-2 lg:col-span-3 text-center mt-6">
                    <p class="text-gray-400">
                        [Pre úplnú verziu by tu bolo všetkých 36 trackov...]
                    </p>
                </div>
            </div>
        </div>
    </section>

    <div class="h-px w-4/5 mx-auto bg-gradient-to-r from-transparent via-purple-500 to-transparent my-16 relative">
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg shadow-purple-500/50"></div>
    </div>

    <section id="appeal" class="py-20 px-4 bg-black bg-opacity-50">
        <div class="container mx-auto max-w-4xl">
            <h2 class="text-4xl font-bold mb-10 text-center">Psychologický horor s dušou slovenského folklóru</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="bg-gray-900 bg-opacity-70 p-6 rounded-xl shadow-lg border border-gray-800 backdrop-filter backdrop-blur-sm hover:shadow-purple-500/20 transition-all duration-300 feature-card">
                    <div class="mb-5 text-purple-500 text-2xl">
                        <i class="fas fa-headphones-alt"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-3">Unikátny formát audiohry na Spotify</h3>
                    <p class="text-gray-300 text-sm">Šepot lesa využíva Spotify ako platformu pre interaktívnu audiohru, čo prináša prístupnosť a jednoduchosť používania na rôznych zariadeniach.</p>
                </div>

                <div class="bg-gray-900 bg-opacity-70 p-6 rounded-xl shadow-lg border border-gray-800 backdrop-filter backdrop-blur-sm hover:shadow-purple-500/20 transition-all duration-300 feature-card">
                    <div class="mb-5 text-purple-500 text-2xl">
                        <i class="fas fa-brain"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-3">Prepojenie s realitou a ľudskou psychológiou</h3>
                    <p class="text-gray-300 text-sm">Hra skúma temnú stránku ľudskej mysle, strachy, vinu a hanbu, čím vytvára hlboký psychologický zážitok pre poslucháča.</p>
                </div>

                <div class="bg-gray-900 bg-opacity-70 p-6 rounded-xl shadow-lg border border-gray-800 backdrop-filter backdrop-blur-sm hover:shadow-purple-500/20 transition-all duration-300 feature-card">
                    <div class="mb-5 text-purple-500 text-2xl">
                        <i class="fas fa-tree"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-3">Temná, poetická atmosféra slovenských hôr</h3>
                    <p class="text-gray-300 text-sm">Autentické zachytenie slovenského prostredia, folklóru a legiend vytvára jedinečnú atmosféru, ktorá rezonuje s domácim publikom.</p>
                </div>

                <div class="bg-gray-900 bg-opacity-70 p-6 rounded-xl shadow-lg border border-gray-800 backdrop-filter backdrop-blur-sm hover:shadow-purple-500/20 transition-all duration-300 feature-card">
                    <div class="mb-5 text-purple-500 text-2xl">
                        <i class="fas fa-microphone-alt"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-3">Profesionálne nahrávky a zvukový dizajn</h3>
                    <p class="text-gray-300 text-sm">Hlas hlavnej postavy nahrávaný profesionálne (Isomic + UAD/FabFilter) v štúdiovej kvalite pre maximálny zvukový zážitok.</p>
                </div>

                <div class="bg-gray-900 bg-opacity-70 p-6 rounded-xl shadow-lg border border-gray-800 backdrop-filter backdrop-blur-sm hover:shadow-purple-500/20 transition-all duration-300 md:col-span-2 feature-card">
                    <div class="mb-5 text-purple-500 text-2xl">
                        <i class="fas fa-route"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-3">Rozhodnutia, ktoré ovplyvňujú koniec</h3>
                    <p class="text-gray-300 text-sm">Príbeh sa mení podľa rozhodnutí poslucháča, čo zvyšuje znovuhrateľnosť a záujem publika vracať sa k hre opakovane. Viacero možných koncov ponúka rozdielne vysvetlenia tajomstva.</p>
                </div>
            </div>
        </div>
    </section>

    <div class="h-px w-4/5 mx-auto bg-gradient-to-r from-transparent via-purple-500 to-transparent my-16 relative">
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg shadow-purple-500/50"></div>
    </div>

    <section id="stats" class="py-20 px-4">
        <div class="container mx-auto max-w-6xl">
            <h2 class="text-4xl font-bold mb-3 text-center">Dosah a komunita</h2>
            <p class="text-xl text-center mb-6 max-w-3xl mx-auto text-gray-300">
                Podcast <span class="font-bold" style="background: linear-gradient(to right, #9333ea, #ec4899); -webkit-background-clip: text; background-clip: text; color: transparent;">Krvavý Dobšinský</span> bude hlavným propagačným kanálom pre uvedenie hry Šepot lesa na Spotify.
            </p>
            <div class="text-center mb-10">
                 <div class="mx-auto w-24 md:w-32 mb-4">
                     <img src="https://i.imgur.com/F9fKCIr.png" alt="Krvavý Dobšinský logo" class="w-full opacity-80">
                 </div>
                <span class="text-lg font-semibold">4,8</span>
                <i class="fas fa-star text-yellow-400 mx-1"></i>
                <span class="text-gray-400 text-sm">(zo 485 hodnotení)</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div class="bg-gray-900 bg-opacity-70 p-6 rounded-xl text-center border border-gray-800 shadow-lg backdrop-filter backdrop-blur-sm hover:shadow-purple-500/20 transition-all duration-300 stats-card">
                    <div class="text-3xl sm:text-4xl font-bold mb-2" style="background: linear-gradient(to right, #9333ea, #ec4899); -webkit-background-clip: text; background-clip: text; color: transparent;">846,548</div>
                    <div class="text-lg text-gray-300">celkových prehratí</div>
                </div>

                <div class="bg-gray-900 bg-opacity-70 p-6 rounded-xl text-center border border-gray-800 shadow-lg backdrop-filter backdrop-blur-sm hover:shadow-purple-500/20 transition-all duration-300 stats-card">
                    <div class="text-3xl sm:text-4xl font-bold mb-2" style="background: linear-gradient(to right, #9333ea, #ec4899); -webkit-background-clip: text; background-clip: text; color: transparent;">8,591</div>
                    <div class="text-lg text-gray-300">sledovateľov na Spotify</div>
                </div>

                <div class="bg-gray-900 bg-opacity-70 p-6 rounded-xl text-center border border-gray-800 shadow-lg backdrop-filter backdrop-blur-sm hover:shadow-purple-500/20 transition-all duration-300 stats-card">
                    <div class="text-3xl sm:text-4xl font-bold mb-2" style="background: linear-gradient(to right, #9333ea, #ec4899); -webkit-background-clip: text; background-clip: text; color: transparent;">22,183</div>
                    <div class="text-lg text-gray-300">streamov za posledných 30 dní</div>
                </div>

                <div class="bg-gray-900 bg-opacity-70 p-6 rounded-xl text-center border border-gray-800 shadow-lg backdrop-filter backdrop-blur-sm hover:shadow-purple-500/20 transition-all duration-300 stats-card">
                    <div class="text-3xl sm:text-4xl font-bold mb-2" style="background: linear-gradient(to right, #9333ea, #ec4899); -webkit-background-clip: text; background-clip: text; color: transparent;">5,505</div>
                    <div class="text-lg text-gray-300">hodín počúvania mesačne</div>
                </div>

                <div class="bg-gray-900 bg-opacity-70 p-6 rounded-xl text-center border border-gray-800 shadow-lg backdrop-filter backdrop-blur-sm hover:shadow-purple-500/20 transition-all duration-300 stats-card">
                    <div class="text-3xl sm:text-4xl font-bold mb-2" style="background: linear-gradient(to right, #9333ea, #ec4899); -webkit-background-clip: text; background-clip: text; color: transparent;">29</div>
                    <div class="text-lg text-gray-300">nových followerov mesačne</div>
                </div>

                <div class="bg-gray-900 bg-opacity-70 p-6 rounded-xl text-center border border-gray-800 shadow-lg backdrop-filter backdrop-blur-sm hover:shadow-purple-500/20 transition-all duration-300 stats-card">
                    <div class="text-3xl sm:text-4xl font-bold mb-2" style="background: linear-gradient(to right, #9333ea, #ec4899); -webkit-background-clip: text; background-clip: text; color: transparent;">84%</div>
                    <div class="text-lg text-gray-300">konverzia (3,369 poslucháčov po ukážke)</div>
                </div>
            </div>

            <div class="mt-12 text-center">
                <p class="text-lg text-gray-300">
                    Vďaka vybudovanej komunite a vysokému engagementu dokážeme osloviť relevantné publikum bez potreby ďalšej investície do reklamy.
                </p>
            </div>
        </div>
    </section>

    <div class="h-px w-4/5 mx-auto bg-gradient-to-r from-transparent via-purple-500 to-transparent my-16 relative">
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg shadow-purple-500/50"></div>
    </div>

    <section id="contact" class="py-20 px-4">
        <div class="container mx-auto max-w-2xl">
            <h2 class="text-4xl font-bold mb-10 text-center">Kontakt</h2>
            <div class="bg-black bg-opacity-60 p-8 rounded-2xl shadow-xl border border-gray-800 backdrop-filter backdrop-blur-lg">
                <div class="text-center mb-6">
                    <h3 class="text-2xl font-bold mb-1">Vladimír Seman / Krvavý Dobšinský</h3>
                    <p class="text-lg text-gray-300">krvavydobsinsky@gmail.com</p>
                </div>
                <form name="kontakt" netlify class="space-y-6">
                    <div>
                        <label for="name" class="block text-sm font-medium mb-1 text-gray-300">Meno</label>
                        <input type="text" id="name" name="name" required class="w-full px-4 py-2 rounded-md bg-gray-800 bg-opacity-50 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500 text-white">
                    </div>

                    <div>
                        <label for="email" class="block text-sm font-medium mb-1 text-gray-300">E-mail</label>
                        <input type="email" id="email" name="email" required class="w-full px-4 py-2 rounded-md bg-gray-800 bg-opacity-50 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500 text-white">
                    </div>

                    <div>
                        <label for="message" class="block text-sm font-medium mb-1 text-gray-300">Správa</label>
                        <textarea id="message" name="message" rows="4" required class="w-full px-4 py-2 rounded-md bg-gray-800 bg-opacity-50 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500 text-white"></textarea>
                    </div>

                    <div class="text-center">
                        <button type="submit" class="px-8 py-3 text-lg font-semibold rounded-md bg-transparent text-white border-2 border-purple-600 relative overflow-hidden transition-all duration-300 hover:text-white hover:shadow-lg hover:shadow-purple-500/30 uppercase tracking-wider group">
                            <span class="relative z-10">Odoslať správu</span>
                            <span class="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </section>

    <footer class="py-8 bg-black bg-opacity-70 text-center text-gray-400 backdrop-filter backdrop-blur-lg mt-16">
        <div class="container mx-auto">
            <p>© 2025 Šepot lesa | Všetky práva vyhradené</p>
            <div class="mt-4 flex justify-center space-x-4">
                <a href="https://open.spotify.com/show/1jpZ723mEpLld7bZeZ2wdE?si=kbLG6uAaTRuVDCEScLavyQ" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-purple-500 transition-colors">
                    <i class="fab fa-spotify text-xl"></i>
                </a>
                <a href="https://www.instagram.com/krvavydobsinsky/" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-purple-500 transition-colors">
                    <i class="fab fa-instagram text-xl"></i>
                </a>
                <a href="https://www.facebook.com/vlado.seman" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-purple-500 transition-colors">
                    <i class="fab fa-facebook text-xl"></i>
                </a>
                </div>
        </div>
    </footer>

    <script>
        // Funkcia pre plynulé posúvanie
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetElement = document.querySelector(this.getAttribute('href'));
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Funkcia pre animácie pri posúvaní
        const animatedElements = document.querySelectorAll('.track-card, .stats-card, .feature-card');

        // Nastavenie počiatočného stavu pre animácie
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        });

        // Nastavenie Intersection Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    // Voliteľné: Odpojiť observer po animácii, aby sa nespúšťala znova
                    // observer.unobserve(entry.target);
                } else {
                     // Voliteľné: Resetovať animáciu, ak element opustí viewport
                     // entry.target.style.opacity = '0';
                     // entry.target.style.transform = 'translateY(20px)';
                }
            });
        }, {
            threshold: 0.1 // Spustiť, keď je viditeľných aspoň 10% elementu
        });

        // Pozorovanie všetkých animovaných elementov
        animatedElements.forEach(element => {
            observer.observe(element);
        });

    </script>
</body>
</html>

