import React, { useEffect, useState } from 'react';
import './App.css';
// Import komponentov Recharts priamo
import {
    PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis,
    YAxis, CartesianGrid, Tooltip
} from 'recharts';

// --- Komponent Hlavička ---
// Zobrazuje hlavný titulok, popis a tlačidlá s výzvou na akciu.
// Obsahuje obrázok na pozadí a vizuálne efekty.
const Header = () => {
    return (
        <header className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
            {/* Pozadia a prekrytia */}
            <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-900 opacity-95 z-0"></div>
            <div className="absolute inset-0 opacity-30 z-0">
                <img src="https://i.imgur.com/ST2nkj5.png"
                     alt="Pozadie lesa"
                     className="w-full h-full object-cover"
                     onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/1920x1080/000000/FFFFFF?text=Obrázok+sa+nepodarilo+načítať'; e.target.alt='Záložný obrázok'; }} />
            </div>
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20" style={{ background: 'repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 2px)' }}></div>

            {/* Obsah hlavičky */}
            <div className="container mx-auto px-4 text-center z-10">
               {/* Zobrazenie frekvencie (bez glitch efektu) */}
               <div
                    className="mb-2 text-xs md:text-sm tracking-widest frequency-text font-medium"
                    style={{ background: 'linear-gradient(to right, #9333ea, #ec4899)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}
                >
                    127.5 MHz
                </div>
                {/* Hlavný titulok s pulzujúcim efektom */}
                <h1
                    className="text-5xl md:text-7xl font-bold mb-4 text-white relative"
                >
                    Šepot lesa
                    <span className="absolute inset-0 opacity-50 blur-sm" style={{ animation: 'pulse 3s infinite alternate', background: 'radial-gradient(circle, rgba(147, 51, 234, 0.3), transparent 70%)', borderRadius: '50%' }}></span>
                </h1>
                {/* Podtitulok/popis */}
                <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                    Interaktívna audiohra o tichu, vine a hľadaní pravdy v hlbinách lesa.
                </p>
                {/* Dekoratívny oddeľovač */}
                <div className="my-3 opacity-80">
                    <span className="inline-block w-16 h-px bg-purple-500"></span>
                    <span className="mx-2 text-xs tracking-widest font-medium">HOLLOW</span>
                    <span className="inline-block w-16 h-px bg-pink-500"></span>
                </div>
                {/* Tlačidlá s výzvou na akciu */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                    {/* Tlačidlo na posun k trackom */}
                    <a href="#tracks" className="smooth-scroll px-8 py-3 text-lg font-semibold rounded-md bg-transparent text-white border-2 border-purple-600 relative overflow-hidden transition-all duration-300 hover:text-white hover:shadow-lg hover:shadow-purple-500/30 uppercase tracking-wider group">
                        <span className="relative z-10">Prehrať ukážku</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></span>
                    </a>
                     {/* Tlačidlo na posun ku kontaktu */}
                     <a href="#contact" className="smooth-scroll px-8 py-3 text-lg font-semibold rounded-md bg-transparent text-white border-2 border-purple-600 relative overflow-hidden transition-all duration-300 hover:text-white hover:shadow-lg hover:shadow-purple-500/30 uppercase tracking-wider group">
                        <span className="relative z-10">Kontaktovať autora</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></span>
                    </a>
                </div>
            </div>

            {/* Spodná SVG vlna pre vizuálny prechod */}
            <div className="absolute bottom-0 left-0 right-0 h-32 opacity-20 z-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-full">
                    <path fill="#000000" d="M0,96L48,128C96,160,192,224,288,224C384,224,480,160,576,138.7C672,117,768,139,864,165.3C960,192,1056,224,1152,218.7C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </div>
            {/* Indikátor šípky pre posun nadol */}
            <div className="absolute bottom-10 left-0 right-0 text-center z-10">
                <a href="#about" className="smooth-scroll text-white opacity-70 hover:opacity-100 transition-opacity">
                    <i className="fas fa-chevron-down text-2xl animate-bounce"></i>
                </a>
             </div>
            {/* Prekrytie s efektom blikania pre atmosféru */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ animation: 'flicker 8s infinite alternate' }}>
                <div className="absolute inset-0 bg-black"></div>
            </div>
        </header>
    );
};

// --- Komponent Nadpis Sekcie ---
// Znovu použiteľný komponent pre nadpisy sekcií s voliteľnými podnadpismi.
const SectionTitle = ({ title, subtitle }) => (
    <>
        <h2 className="text-4xl font-bold mb-3 text-center">{title}</h2>
        {/* Voliteľný podnadpis s gradientovým podčiarknutím */}
        {subtitle && (
            <div className="text-center mb-10">
                <div className="inline-block">
                    <span className="text-xs tracking-widest font-medium" style={{ background: 'linear-gradient(to right, #9333ea, #ec4899)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>{subtitle}</span>
                    <div className="h-px w-full bg-gradient-to-r from-purple-500 to-pink-500 mt-1"></div>
                </div>
            </div>
        )}
    </>
);

// --- Komponent Oddeľovač ---
// Znovu použiteľný vizuálny oddeľovač medzi sekciami.
const Divider = () => (
    <div className="h-px w-4/5 mx-auto bg-gradient-to-r from-transparent via-purple-500 to-transparent my-16 relative">
        {/* Žiariaca bodka v strede */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg shadow-purple-500/50"></div>
    </div>
);

// --- Komponent O hre ---
// Popisuje audiohru.
const About = () => (
     <section id="about" className="py-20 px-4 relative">
        {/* Jemný vzor na pozadí */}
        <div className="absolute inset-0 opacity-5 z-0" style={{ backgroundImage: 'radial-gradient(rgba(147, 51, 234, 0.03) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        <div className="container mx-auto max-w-4xl">
            <SectionTitle title="O hre" subtitle="HLAS LESA" />
            {/* Karta s obsahom s rozmazaním a okrajom */}
            <div className="bg-black bg-opacity-40 p-8 rounded-2xl shadow-2xl border border-gray-800 backdrop-filter backdrop-blur-md relative overflow-hidden">
                 {/* Jemný vzor vo vnútri karty */}
                 <div className="absolute inset-0 z-0 opacity-[0.02]">
                     <div style={{ backgroundImage: 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path d="M10 0L0 10h10v10L20 10h-10V0z" fill="%23FFFFFF"/></svg>\')', backgroundSize: '20px 20px' }}></div>
                </div>
                {/* Hlavný textový obsah */}
                <div className="relative z-10 text-lg leading-relaxed">
                  <p>
                        Audiohra Šepot lesa je <span style={{ background: 'linear-gradient(to right, #9333ea, #ec4899)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }} className="font-semibold">mysteriózny príbeh</span> s <span style={{ background: 'linear-gradient(to right, #9333ea, #ec4899)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }} className="font-semibold">psychologickými a hororovými prvkami</span>. Hráč sa stáva Jakubom Horákom, ktorý sa vracia do rodnej dediny, aby odhalil pravdu o zmiznutí svojho brata.
                    </p>
                    <p className="mt-4">
                        Každý track je <span style={{ background: 'linear-gradient(to right, #9333ea, #ec4899)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }} className="font-semibold">interaktívny</span> a obsahuje <span style={{ background: 'linear-gradient(to right, #9333ea, #ec4899)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }} className="font-semibold">rozhodnutia</span>, ktoré vedú k rôznym vetvám príbehu.
                    </p>
                    {/* Zoznam kľúčových vlastností */}
                    <p className="mt-6 font-medium">100 % pôvodný scenár a herecké výkony</p>
                    <p className="mt-2 font-medium"><span style={{ background: 'linear-gradient(to right, #9333ea, #ec4899)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }} className="font-semibold">Viacero možných ciest a koncov</span></p>
                    <p className="mt-2 font-medium">Vysoká úroveň zvukovej produkcie</p>
                     <p className="mt-2 font-medium">Ideálne pre distribúciu cez Spotify, podcastové siete, audio platformy</p>
                </div>
                {/* Prekrytie s efektom scanline */}
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'repeating-linear-gradient(transparent, transparent 2px, rgba(0, 0, 0, 0.05) 2px, rgba(0, 0, 0, 0.05) 4px)', zIndex: 11 }}></div>
                {/* Dekoratívny rohový prvok */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                   <div className="absolute top-0 right-0 w-4 h-4 bg-gradient-to-br from-purple-500 to-pink-500 transform rotate-45 translate-x-1/2 -translate-y-1/2 opacity-70"></div>
                </div>
            </div>
        </div>
    </section>
);

// --- Komponent Výhody pre partnerov ---
// Zdôrazňuje výhody pre potenciálnych partnerov.
const PartnerBenefits = () => (
    <section id="partner-benefits" className="py-20 px-4 relative bg-gray-900 bg-opacity-30">
        {/* Jemný vzor na pozadí */}
        <div className="absolute inset-0 opacity-5 z-0" style={{ backgroundImage: 'radial-gradient(rgba(147, 51, 234, 0.04) 1px, transparent 1px)', backgroundSize: '25px 25px' }}></div>
        <div className="container mx-auto max-w-5xl">
            <SectionTitle title="Pre partnerov" subtitle="UNIKÁTNY MARKETINGOVÝ NÁSTROJ" />
            {/* Mriežka kariet s výhodami */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
               {/* Karta 1: Inovatívny formát */}
                <div className="bg-black bg-opacity-50 p-6 rounded-xl shadow-lg border border-gray-800 backdrop-filter backdrop-blur-sm hover:shadow-purple-500/20 transition-all duration-300 feature-card">
                    <div className="mb-4 text-purple-500 text-2xl"><i className="fas fa-chart-line"></i></div>
                    <h3 className="text-xl font-bold mb-3">Inovatívny formát s rastúcim potenciálom</h3>
                   <p className="text-gray-300">Prvá slovenská interaktívna audiohra na Spotify kombinuje rýchlo rastúci trend audiokníh a gamifikácie. Unikátny produkt, ktorý môže osloviť široké spektrum poslucháčov a vytvoriť novú kategóriu.</p>
                </div>
                 {/* Karta 2: Existujúca fanúšikovská základňa */}
                <div className="bg-black bg-opacity-50 p-6 rounded-xl shadow-lg border border-gray-800 backdrop-filter backdrop-blur-sm hover:shadow-purple-500/20 transition-all duration-300 feature-card">
                    <div className="mb-4 text-purple-500 text-2xl"><i className="fas fa-users"></i></div>
                    <h3 className="text-xl font-bold mb-3">Existujúca fanúšikovská základňa</h3>
                    <p className="text-gray-300">Vďaka etablovanému podcastu Krvavý Dobšinský má hra prístup k lojálnej komunite poslucháčov, ktorí majú záujem o podobný obsah. Minimalizuje sa tak riziko a náklady na marketing v počiatočnej fáze.</p>
                </div>
                 {/* Karta 3: Vysoká miera znovuhrateľnosti */}
                <div className="bg-black bg-opacity-50 p-6 rounded-xl shadow-lg border border-gray-800 backdrop-filter backdrop-blur-sm hover:shadow-purple-500/20 transition-all duration-300 feature-card">
                    <div className="mb-4 text-purple-500 text-2xl"><i className="fas fa-sync-alt"></i></div>
                    <h3 className="text-xl font-bold mb-3">Vysoká miera znovuhrateľnosti</h3>
                    <p className="text-gray-300">Viacero rozhodnutí a koncov dáva hráčom dôvod vracať sa a objavovať všetky vetvy príbehu. To zvyšuje čas strávený s obsahom a potenciálne zvyšuje výnosy z platformových metrík.</p>
                </div>
                 {/* Karta 4: Potenciál série */}
                <div className="bg-black bg-opacity-50 p-6 rounded-xl shadow-lg border border-gray-800 backdrop-filter backdrop-blur-sm hover:shadow-purple-500/20 transition-all duration-300 feature-card">
                    <div className="mb-4 text-purple-500 text-2xl"><i className="fas fa-expand-arrows-alt"></i></div>
                    <h3 className="text-xl font-bold mb-3">Možnosť rozšírenia do série</h3>
                    <p className="text-gray-300">Šepot lesa je prvou časťou potenciálnej série, ktorá môže postupne rozširovať publikum. Funguje ako pilotný projekt pre etablovanie nového formátu s možnosťou dlhodobého rastu.</p>
                </div>
            </div>
            {/* Sekcia technických špecifikácií */}
            <div className="bg-black bg-opacity-70 p-8 rounded-2xl shadow-xl border border-gray-800 backdrop-filter backdrop-blur-lg relative overflow-hidden whisper-overlay">
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-4">Technické špecifikácie</h3>
                    {/* Mriežka pre technické detaily */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <ul className="space-y-3">
                                 <li className="flex items-start"><span className="text-purple-500 mr-2"><i className="fas fa-check"></i></span><span>36 profesionálne nahraných zvukových stôp</span></li>
                                <li className="flex items-start"><span className="text-purple-500 mr-2"><i className="fas fa-check"></i></span><span>Celková dĺžka: približne 84 minút obsahu</span></li>
                                 <li className="flex items-start"><span className="text-purple-500 mr-2"><i className="fas fa-check"></i></span><span>3 rôzne zakončenia s unikátnymi rozuzleniami</span></li>
                            </ul>
                        </div>
                         <div>
                            <ul className="space-y-3">
                                <li className="flex items-start"><span className="text-purple-500 mr-2"><i className="fas fa-check"></i></span><span>Pripravené na distribúciu v štandardných audio formátoch</span></li>
                                 <li className="flex items-start"><span className="text-purple-500 mr-2"><i className="fas fa-check"></i></span><span>Komplexná naratívna štruktúra s rôznymi kombináciami ciest</span></li>
                                <li className="flex items-start"><span className="text-purple-500 mr-2"><i className="fas fa-check"></i></span><span>Originálne zvukové efekty a hudobné spracovanie</span></li>
                            </ul>
                         </div>
                    </div>
                    {/* Záverečné vyhlásenie o pripravenosti */}
                    <div className="mt-6 text-lg text-center"><p>Kompletný materiál je pripravený pre okamžitú distribúciu</p></div>
                </div>
            </div>
        </div>
   </section>
);

// --- Komponent Karta Tracku ---
// Zobrazuje informácie o jednotlivom tracku s obrázkom a audio prehrávačom.
const TrackCard = ({ imgSrc, title, description, audioSrc }) => (
    <div className="bg-gray-900 bg-opacity-60 p-5 rounded-xl border border-gray-800 shadow-lg hover:shadow-purple-500/20 transform transition-all duration-300 hover:-translate-y-2 track-card">
        {/* Kontajner pre obrázok tracku */}
        <div className="aspect-square mb-4 overflow-hidden rounded-md">
            {/* Obrázok tracku so záložným riešením a hover efektom */}
            <img src={imgSrc} alt={`Artwork pre ${title}`} className="w-full h-full object-cover transition-all duration-300 filter grayscale hover:grayscale-0 hover:scale-105" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x400/374151/FFFFFF?text=Obrázok'; e.target.alt='Záložný obrázok'; }} />
        </div>
        {/* Názov tracku */}
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        {/* Popis tracku */}
        <p className="text-gray-300 mb-4 text-sm">{description}</p>
        {/* HTML5 audio prehrávač */}
        <audio controls className="w-full">
            <source src={audioSrc} type="audio/mpeg" />
            Váš prehliadač nepodporuje HTML5 audio. {/* Záložná správa */}
        </audio>
    </div>
);

// --- Komponent Zoznam Trackov ---
// Zobrazuje mriežku komponentov TrackCard.
const Tracklist = () => {
     // Vzorové dáta trackov (nahraďte plnými dátami)
     const tracks = [
        { imgSrc: "https://cdn.midjourney.com/492ba641-df8c-4f60-aa1d-ef2fde96dcea/0_1.png", title: "Track 01: Cesta domov", description: "Jakub sa vracia do rodnej dediny Čierny Potok. V daždi, sám v aute a myšlienkami v minulosti, zachytáva zvláštne šumy v rádiu. Samuel zmizol – a on sa rozhodol zistiť prečo. Ale ešte netuší, že odpovede už čakajú.", audioSrc: "https://raw.githubusercontent.com/Vlado361/Audiohra-/main/1_Cesta%20domov.mp3" },
        { imgSrc: "https://cdn.midjourney.com/6cf957bc-499b-431d-9b7a-c2b089594e4a/0_3.png", title: "Track 02: Zastavený čas pri kaplnke", description: "Ticho cintorína pod starou kaplnkou odhaľuje symbol a sériu čísel, ktoré sa Jakubovi zdajú povedomé. Niečo – alebo niekto – ho sleduje. A vietor začína šepkať jeho meno.", audioSrc: "https://raw.githubusercontent.com/Vlado361/Sepot_Lesa/main/2_Zastaveny_cas%20pri%20kaplnke.mp3" },
        { imgSrc: "https://cdn.midjourney.com/2923fa72-adbf-45fe-919f-0fe2db046ff8/0_1.png", title: "Track 03: Rádiová veža", description: "Zhrdzavená veža, ktorú mali dávno odstaviť, stále vysiela. Jakub zachytáva znepokojivé hlasy o koreňoch, vode a prepojení myslí. Na ceste za pravdou stojí rozhodnutie: ísť vyššie alebo hľadať odpovede dole.", audioSrc: "https://raw.githubusercontent.com/Vlado361/Sepot_Lesa/main/3_Radiova_veza.mp3" },
        { imgSrc: "https://cdn.midjourney.com/2fbafcd6-5051-454a-b93e-0e78d3b1d072/0_3.png", title: "Track 04: Výstup do neznáma", description: "Rebrík vŕzga pod nohami a šepoty silnejú. Červené znaky vedú Jakuba nahor, kam dovidí len on. Hore ho čaká niečo staré. Niečo hladné.", audioSrc: "https://raw.githubusercontent.com/Vlado361/Sepot_Lesa/main/4_Vystup_do_neznama.mp3" },
        { imgSrc: "https://cdn.midjourney.com/ece7f546-fdb8-445e-a266-3f7f248dd86e/0_0.png", title: "Track 05: Technická miestnosť", description: "V opustenej miestnosti nachádza starú nahrávku – hlas svojho otca a frekvenciu, ktorá môže všetko zmeniť. Plán, ktorý mal byť zabudnutý. A miesto, kde všetko končí.", audioSrc: "https://raw.githubusercontent.com/Vlado361/Sepot_Lesa/main/5_technicka_miestnost.mp3" },
        { imgSrc: "https://cdn.midjourney.com/cbc5ebad-159e-43a7-8736-440ea6ca732f/0_3.png", title: "Track 06: Temný les", description: "Stratený v lese, ktorý dýcha a sleduje. Samuelov hlas volá, ale aj studňa zvaná Hrdlo. Jakub sa musí rozhodnúť, čomu veriť: volaniu brata, alebo šepotu stromov.", audioSrc: "https://raw.githubusercontent.com/Vlado361/Sepot_Lesa/main/6_temny_les.mp3" }
    ];

    return (
        <section id="tracks" className="py-20 px-4">
            <div className="container mx-auto">
                <SectionTitle title="Tracklist" />
                {/* Mriežkové rozloženie pre karty trackov */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                   {/* Prechádzanie trackov a renderovanie karty pre každý */}
                   {tracks.map((track, index) => (
                        <TrackCard key={index} {...track} />
                    ))}
                    {/* Placeholder poznámka pre plnú verziu */}
                    <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center mt-6">
                         <p className="text-gray-400">[Pre úplnú verziu by tu bolo všetkých 36 trackov...]</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

// --- Komponent Apel/Lákadlá ---
// Zdôrazňuje unikátne predajné body a atmosféru hry.
const Appeal = () => (
    <section id="appeal" className="py-20 px-4 bg-black bg-opacity-50">
        <div className="container mx-auto max-w-4xl">
            <SectionTitle title="Psychologický horor s dušou slovenského folklóru" />
            {/* Mriežka bodov lákadiel */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {/* Karta 1: Unikátny formát */}
                <div className="bg-gray-900 bg-opacity-70 p-6 rounded-xl shadow-lg border border-gray-800 backdrop-filter backdrop-blur-sm hover:shadow-purple-500/20 transition-all duration-300 feature-card">
                     <div className="mb-5 text-purple-500 text-2xl"><i className="fas fa-headphones-alt"></i></div>
                    <h3 className="text-xl font-bold mb-3">Unikátny formát audiohry na Spotify</h3>
                    <p className="text-gray-300 text-sm">Šepot lesa využíva Spotify ako platformu pre interaktívnu audiohru, čo prináša prístupnosť a jednoduchosť používania na rôznych zariadeniach.</p>
               </div>
                 {/* Karta 2: Psychologická hĺbka */}
                <div className="bg-gray-900 bg-opacity-70 p-6 rounded-xl shadow-lg border border-gray-800 backdrop-filter backdrop-blur-sm hover:shadow-purple-500/20 transition-all duration-300 feature-card">
                    <div className="mb-5 text-purple-500 text-2xl"><i className="fas fa-brain"></i></div>
                    <h3 className="text-xl font-bold mb-3">Prepojenie s realitou a ľudskou psychológiou</h3>
                    <p className="text-gray-300 text-sm">Hra skúma temnú stránku ľudskej mysle, strachy, vinu a hanbu, čím vytvára hlboký psychologický zážitok pre poslucháča.</p>
                 </div>
                 {/* Karta 3: Atmosféra */}
                <div className="bg-gray-900 bg-opacity-70 p-6 rounded-xl shadow-lg border border-gray-800 backdrop-filter backdrop-blur-sm hover:shadow-purple-500/20 transition-all duration-300 feature-card">
                    <div className="mb-5 text-purple-500 text-2xl"><i className="fas fa-tree"></i></div>
                    <h3 className="text-xl font-bold mb-3">Temná, poetická atmosféra slovenských hôr</h3>
                    <p className="text-gray-300 text-sm">Autentické zachytenie slovenského prostredia, folklóru a legiend vytvára jedinečnú atmosféru, ktorá rezonuje s domácim publikom.</p>
                </div>
                 {/* Karta 4: Profesionálny zvuk */}
                <div className="bg-gray-900 bg-opacity-70 p-6 rounded-xl shadow-lg border border-gray-800 backdrop-filter backdrop-blur-sm hover:shadow-purple-500/20 transition-all duration-300 feature-card">
                    <div className="mb-5 text-purple-500 text-2xl"><i className="fas fa-microphone-alt"></i></div>
                   <h3 className="text-xl font-bold mb-3">Profesionálne nahrávky a zvukový dizajn</h3>
                    <p className="text-gray-300 text-sm">Všetky zvukové nahrávky spĺňajú najvyššie štandardy štúdiovej kvality.</p>
                </div>
                 {/* Karta 5: Vetviaci sa príbeh */}
                <div className="bg-gray-900 bg-opacity-70 p-6 rounded-xl shadow-lg border border-gray-800 backdrop-filter backdrop-blur-sm hover:shadow-purple-500/20 transition-all duration-300 md:col-span-2 feature-card">
                    <div className="mb-5 text-purple-500 text-2xl"><i className="fas fa-route"></i></div>
                    <h3 className="text-xl font-bold mb-3">Rozhodnutia, ktoré ovplyvňujú koniec</h3>
                    <p className="text-gray-300 text-sm">Príbeh sa mení podľa rozhodnutí poslucháča, čo zvyšuje znovuhrateľnosť a záujem publika vracať sa k hre opakovane. Viacero možných koncov ponúka rozdielne vysvetlenia tajomstva.</p>
                </div>
            </div>
        </div>
    </section>
);

// --- Komponent Štatistiky ---
// Zobrazuje kľúčové štatistiky o súvisiacom podcaste "Krvavý Dobšinský".
const Stats = () => (
    <section id="stats" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
            <SectionTitle title="Dosah a komunita" />
            {/* Úvodný text o podcaste */}
            <p className="text-xl text-center mb-12 max-w-3xl mx-auto text-gray-300">
                Podcast <span className="font-bold" style={{ background: 'linear-gradient(to right, #9333ea, #ec4899)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Krvavý Dobšinský</span> bude hlavným propagačným kanálom pre uvedenie hry Šepot lesa na Spotify.
            </p>
            {/* Mriežka kariet so štatistikami */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Karta Štatistiky: Celkové prehratia */}
                  <div className="bg-gray-900 bg-opacity-70 p-6 rounded-xl text-center border border-gray-800 shadow-lg backdrop-filter backdrop-blur-sm hover:shadow-purple-500/20 transition-all duration-300 stats-card">
                    <div className="text-3xl sm:text-4xl font-bold mb-2" style={{ background: 'linear-gradient(to right, #9333ea, #ec4899)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>1 000 000+</div>
                    <div className="text-lg text-gray-300">celkových prehratí</div>
               </div>
               {/* Karta Štatistiky: Sledovatelia na Spotify */}
                <div className="bg-gray-900 bg-opacity-70 p-6 rounded-xl text-center border border-gray-800 shadow-lg backdrop-filter backdrop-blur-sm hover:shadow-purple-500/20 transition-all duration-300 stats-card">
                    <div className="text-3xl sm:text-4xl font-bold mb-2" style={{ background: 'linear-gradient(to right, #9333ea, #ec4899)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>8 591</div>
                    <div className="text-lg text-gray-300">sledovateľov na Spotify</div>
                 </div>
                 {/* Karta Štatistiky: Nedávne streamy */}
                <div className="bg-gray-900 bg-opacity-70 p-6 rounded-xl text-center border border-gray-800 shadow-lg backdrop-filter backdrop-blur-sm hover:shadow-purple-500/20 transition-all duration-300 stats-card">
                    <div className="text-3xl sm:text-4xl font-bold mb-2" style={{ background: 'linear-gradient(to right, #9333ea, #ec4899)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>22 183</div>
                     <div className="text-lg text-gray-300">streamov za posledných 30 dní</div>
                </div>
                {/* Karta Štatistiky: Mesačné hodiny počúvania */}
                <div className="bg-gray-900 bg-opacity-70 p-6 rounded-xl text-center border border-gray-800 shadow-lg backdrop-filter backdrop-blur-sm hover:shadow-purple-500/20 transition-all duration-300 stats-card">
                    <div className="text-3xl sm:text-4xl font-bold mb-2" style={{ background: 'linear-gradient(to right, #9333ea, #ec4899)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>5 505</div>
                     <div className="text-lg text-gray-300">hodín počúvania mesačne</div>
                </div>
                {/* Karta Štatistiky: Mesační noví sledovatelia */}
                <div className="bg-gray-900 bg-opacity-70 p-6 rounded-xl text-center border border-gray-800 shadow-lg backdrop-filter backdrop-blur-sm hover:shadow-purple-500/20 transition-all duration-300 stats-card">
                    <div className="text-3xl sm:text-4xl font-bold mb-2" style={{ background: 'linear-gradient(to right, #9333ea, #ec4899)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>29</div>
                     <div className="text-lg text-gray-300">nových followerov mesačne</div>
                </div>
                {/* Karta Štatistiky: Miera konverzie */}
                <div className="bg-gray-900 bg-opacity-70 p-6 rounded-xl text-center border border-gray-800 shadow-lg backdrop-filter backdrop-blur-sm hover:shadow-purple-500/20 transition-all duration-300 stats-card">
                    <div className="text-3xl sm:text-4xl font-bold mb-2" style={{ background: 'linear-gradient(to right, #9333ea, #ec4899)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>84%</div>
                    <div className="text-lg text-gray-300">konverzia (3 369 poslucháčov po ukážke)</div>
                </div>
            </div>
            {/* Záverečná poznámka o dosahu komunity */}
            <div className="mt-12 text-center"><p className="text-lg text-gray-300">Vďaka vybudovanej komunite a vysokému engagementu dokážeme osloviť relevantné publikum bez potreby ďalšej investície do reklamy.</p></div>
        </div>
    </section>
);

function App() {
  // Implementácia bude pridaná neskôr
  return (
    <div>Načítavam aplikáciu Šepot lesa...</div>
  );
}

export default App;
