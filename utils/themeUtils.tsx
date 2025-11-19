import React from 'react';
import { Zap, Ghost, Flame, Smile, Skull, Anchor, Cog, Sun, AlertTriangle, Building2, Sparkles, PartyPopper, Frown } from 'lucide-react';
import { ThemeConfig, ToneLabel } from '../types';
import { D20Icon } from '../components/Icons';

export const getTheme = (currentSetting: string): ThemeConfig => {
    const s = currentSetting.toLowerCase();
    
    // --- 1. CYBER / SPACE ---
    if (s.includes('cyber') || s.includes('space') || s.includes('sci-fi')) {
      return {
        id: 'cyber',
        fontHeader: "'Press Start 2P', cursive",
        fontBody: "'VT323', monospace",
        bg: "bg-slate-950",
        bgStyle: { backgroundImage: "linear-gradient(0deg, transparent 24%, rgba(34, 197, 94, .1) 25%, rgba(34, 197, 94, .1) 26%, transparent 27%, transparent 74%, rgba(34, 197, 94, .1) 75%, rgba(34, 197, 94, .1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(34, 197, 94, .1) 25%, rgba(34, 197, 94, .1) 26%, transparent 27%, transparent 74%, rgba(34, 197, 94, .1) 75%, rgba(34, 197, 94, .1) 76%, transparent 77%, transparent)", backgroundSize: "30px 30px" },
        container: "bg-slate-900 border-4 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]",
        textMain: "text-green-400",
        textMuted: "text-green-700",
        input: "bg-black border-2 border-green-600 text-green-400 placeholder-green-800 focus:border-green-400 focus:shadow-[0_0_10px_rgba(34,197,94,0.4)]",
        button: "bg-green-600 hover:bg-green-500 text-black border-b-4 border-r-4 border-green-900 active:border-0 active:translate-y-1 active:shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]",
        accentColor: "text-green-300",
        icon: <Zap className="w-6 h-6 text-green-400 animate-pulse" />,
        animation: "animate-pulse",
        thumbBorder: "bg-green-600"
      };
    }
    
    // --- 2. HORROR / DARK ---
    if (s.includes('horror') || s.includes('dark') || s.includes('gothic')) {
      return {
        id: 'horror',
        fontHeader: "'Press Start 2P', cursive",
        fontBody: "'VT323', monospace",
        bg: "bg-neutral-950",
        bgStyle: { backgroundImage: "radial-gradient(circle at 50% 50%, #262626 0%, #0a0a0a 100%)" },
        container: "bg-[#1c1917] border-4 border-[#7f1d1d] shadow-[8px_8px_0_0_#000]",
        textMain: "text-stone-300",
        textMuted: "text-stone-600",
        input: "bg-black border-2 border-[#7f1d1d] text-stone-300 placeholder-[#7f1d1d]/50 focus:border-red-600",
        button: "bg-[#7f1d1d] hover:bg-[#991b1b] text-stone-200 border-b-4 border-r-4 border-black active:border-0 active:translate-y-1",
        accentColor: "text-red-600",
        icon: <Ghost className="w-6 h-6 text-stone-400" />,
        animation: "",
        thumbBorder: "bg-[#7f1d1d]"
      };
    }

    // --- 3. POST-APOCALYPTIC / WASTELAND ---
    if (s.includes('apoca') || s.includes('waste')) {
        return {
          id: 'wasteland',
          fontHeader: "'Press Start 2P', cursive",
          fontBody: "'VT323', monospace",
          bg: "bg-[#1a1a14]", // Dark muddy green-grey
          // Caution stripes pattern
          bgStyle: { backgroundImage: "repeating-linear-gradient(-45deg, #1a1a14, #1a1a14 10px, #222 10px, #222 20px)" },
          container: "bg-[#292524] border-4 border-[#a3e635] shadow-[8px_8px_0_0_#3f6212] border-dashed",
          textMain: "text-[#d9f99d]", // Light lime
          textMuted: "text-[#65a30d]",
          input: "bg-[#1c1917] border-2 border-[#4d7c0f] text-[#d9f99d] placeholder-[#365314] focus:border-[#a3e635]",
          button: "bg-[#4d7c0f] hover:bg-[#65a30d] text-white border-b-4 border-r-4 border-[#1a2e05] active:border-0 active:translate-y-1",
          accentColor: "text-[#a3e635]", // Lime 400
          icon: <AlertTriangle className="w-6 h-6 text-[#a3e635]" />,
          animation: "",
          thumbBorder: "bg-[#4d7c0f]"
        };
    }

    // --- 4. STEAMPUNK ---
    if (s.includes('steam')) {
        return {
          id: 'steampunk',
          fontHeader: "'Press Start 2P', cursive",
          fontBody: "'VT323', monospace",
          bg: "bg-[#27272a]",
          bgStyle: { backgroundImage: "radial-gradient(#431407 1px, transparent 1px)", backgroundSize: "20px 20px" },
          container: "bg-[#292524] border-4 border-[#c2410c] shadow-[8px_8px_0_0_#431407]", // Orange-700 border
          textMain: "text-[#fdba74]", // Orange-300
          textMuted: "text-[#9a3412]",
          input: "bg-[#0c0a09] border-2 border-[#c2410c] text-[#fdba74] placeholder-[#7c2d12] focus:border-[#fb923c]",
          button: "bg-[#c2410c] hover:bg-[#ea580c] text-[#fff7ed] border-b-4 border-r-4 border-[#431407] active:border-0 active:translate-y-1",
          accentColor: "text-[#fb923c]",
          icon: <Cog className="w-6 h-6 text-[#fb923c] animate-[spin_4s_linear_infinite]" />,
          animation: "",
          thumbBorder: "bg-[#c2410c]"
        };
    }

    // --- 5. WESTERN ---
    if (s.includes('western')) {
        return {
          id: 'western',
          fontHeader: "'Press Start 2P', cursive",
          fontBody: "'VT323', monospace",
          bg: "bg-[#fffbeb]", // Amber-50
          bgStyle: { backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d6d3d1' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E\")" },
          container: "bg-[#fef3c7] border-4 border-[#78350f] shadow-[8px_8px_0_0_#451a03]", // Amber-900
          textMain: "text-[#451a03]", // Amber-950
          textMuted: "text-[#92400e]", // Amber-700
          input: "bg-[#fffbeb] border-2 border-[#92400e] text-[#451a03] placeholder-[#d97706] focus:border-[#78350f]",
          button: "bg-[#92400e] hover:bg-[#b45309] text-[#fffbeb] border-b-4 border-r-4 border-[#451a03] active:border-0 active:translate-y-1",
          accentColor: "text-[#92400e]",
          icon: <Sun className="w-6 h-6 text-[#b45309]" />,
          animation: "",
          thumbBorder: "bg-[#92400e]"
        };
    }

    // --- 6. PIRATE / NAUTICAL ---
    if (s.includes('pirate') || s.includes('nautical')) {
        return {
          id: 'pirate',
          fontHeader: "'Press Start 2P', cursive",
          fontBody: "'VT323', monospace",
          bg: "bg-[#0f172a]", // Slate-900
          // Wavy pattern idea or just deep blue
          bgStyle: { backgroundImage: "linear-gradient(0deg, #0f172a 0%, #1e293b 100%)" },
          container: "bg-[#1e293b] border-4 border-[#fbbf24] shadow-[8px_8px_0_0_#000]", // Amber-400 (Gold) border
          textMain: "text-[#e2e8f0]", // Slate-200
          textMuted: "text-[#94a3b8]", // Slate-400
          input: "bg-[#020617] border-2 border-[#fbbf24] text-[#fbbf24] placeholder-[#94a3b8] focus:border-[#f59e0b]",
          button: "bg-[#f59e0b] hover:bg-[#fbbf24] text-[#0f172a] border-b-4 border-r-4 border-[#78350f] active:border-0 active:translate-y-1",
          accentColor: "text-[#fbbf24]",
          icon: <Anchor className="w-6 h-6 text-[#fbbf24]" />,
          animation: "",
          thumbBorder: "bg-[#fbbf24]"
        };
    }

    // --- 7. MODERN / URBAN ---
    if (s.includes('modern') || s.includes('urban')) {
        return {
          id: 'modern',
          fontHeader: "'Press Start 2P', cursive",
          fontBody: "'VT323', monospace",
          bg: "bg-[#fafafa]", // Neutral-50
          bgStyle: { backgroundImage: "linear-gradient(#e5e5e5 1px, transparent 1px), linear-gradient(90deg, #e5e5e5 1px, transparent 1px)", backgroundSize: "40px 40px" },
          container: "bg-white border-4 border-[#262626] shadow-[8px_8px_0_0_#262626]",
          textMain: "text-[#262626]",
          textMuted: "text-[#525252]",
          input: "bg-[#f5f5f5] border-2 border-[#525252] text-[#262626] placeholder-[#a3a3a3] focus:border-[#171717]",
          button: "bg-[#262626] hover:bg-[#404040] text-white border-b-4 border-r-4 border-[#a3a3a3] active:border-0 active:translate-y-1",
          accentColor: "text-[#262626]",
          icon: <Building2 className="w-6 h-6 text-[#262626]" />,
          animation: "",
          thumbBorder: "bg-[#525252]"
        };
    }

    // --- 8. HIGH FANTASY (Magical/Mystical) ---
    if (s.includes('high fantasy')) {
        return {
          id: 'high_fantasy',
          fontHeader: "'Press Start 2P', cursive",
          fontBody: "'VT323', monospace",
          bg: "bg-[#2e1065]", // purple-950
          bgStyle: { 
            // Deep magical gradient
            backgroundImage: "radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%)"
          },
          container: "bg-[#1e1b4b] border-4 border-[#a855f7] shadow-[0_0_20px_rgba(168,85,247,0.4)]", // Indigo-950, Purple-500 border, glow
          textMain: "text-[#f3e8ff]", // Purple-100
          textMuted: "text-[#c084fc]", // Purple-400
          input: "bg-[#312e81] border-2 border-[#c084fc] text-[#f3e8ff] placeholder-[#818cf8] focus:border-[#e879f9] focus:shadow-[0_0_15px_rgba(232,121,249,0.5)]",
          button: "bg-[#7e22ce] hover:bg-[#9333ea] text-white border-b-4 border-r-4 border-[#3b0764] active:border-0 active:translate-y-1",
          accentColor: "text-[#e879f9]", // Fuchsia-400
          icon: <Sparkles className="w-6 h-6 text-[#d8b4fe] animate-pulse" />,
          animation: "animate-pulse",
          thumbBorder: "bg-[#c084fc]"
        };
    }

    // --- DEFAULT: TAVERN (FANTASY) ---
    return {
      id: 'tavern',
      fontHeader: "'Press Start 2P', cursive",
      fontBody: "'VT323', monospace",
      bg: "bg-amber-950",
      // CSS pattern for wood planks
      bgStyle: { 
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 49px, #3f2e18 50px), linear-gradient(90deg, #5d4018 0%, #4a3010 100%)" 
      },
      container: "bg-[#eecfa1] border-4 border-[#5c401c] shadow-[8px_8px_0_0_#2e1f0a]",
      textMain: "text-[#4a3010]",
      textMuted: "text-[#8b6b43]",
      input: "bg-[#dfc092] border-2 border-[#8b6b43] text-[#4a3010] placeholder-[#aa8a63] focus:border-[#5c401c]",
      button: "bg-[#a03522] hover:bg-[#b5412a] text-[#f3e5d0] border-b-4 border-r-4 border-[#591c11] active:border-0 active:translate-y-1",
      accentColor: "text-[#a03522]",
      icon: <Flame className="w-6 h-6 text-orange-500 animate-pulse" />,
      animation: "",
      thumbBorder: "bg-[#8b6b43]"
    };
};

export const getToneLabel = (val: number, theme: ThemeConfig): ToneLabel => {
    const isDarkTheme = ['cyber', 'horror', 'wasteland', 'pirate', 'steampunk', 'high_fantasy'].includes(theme.id);
    let colorClass = "";

    // --- Interval 1: 0-15 (Extreme Silly) ---
    if (val <= 15) {
        if (isDarkTheme) colorClass = "text-pink-400";
        else colorClass = "text-pink-600";
        return { label: "Pure Chaos", icon: <PartyPopper className="w-5 h-5" />, color: colorClass };
    }

    // --- Interval 2: 16-35 (Clumsy / Mild Silly) ---
    if (val <= 35) {
        if (isDarkTheme) colorClass = "text-yellow-400";
        else colorClass = "text-yellow-600";
        return { label: "Slapstick", icon: <Smile className="w-5 h-5" />, color: colorClass };
    }

    // --- Interval 3: 36-65 (Standard / Adventure) ---
    if (val <= 65) {
        if (isDarkTheme) colorClass = "text-blue-400";
        else colorClass = "text-blue-600";
        // Special overrides for mono-themes
        if (theme.id === 'modern') colorClass = "text-neutral-600";
        if (theme.id === 'wasteland') colorClass = "text-[#d9f99d]";
        
        return { label: "Unfortunate", icon: <D20Icon className="w-5 h-5" />, color: colorClass };
    }

    // --- Interval 4: 66-85 (Gritty / Painful) ---
    if (val <= 85) {
        if (isDarkTheme) colorClass = "text-orange-500";
        else colorClass = "text-orange-700";
        return { label: "Gritty", icon: <AlertTriangle className="w-5 h-5" />, color: colorClass };
    }

    // --- Interval 5: 86-100 (Extreme Lethal / Catastrophic) ---
    if (isDarkTheme) colorClass = "text-red-500";
    else colorClass = "text-red-700";
    
    return { label: "Catastrophic", icon: <Skull className="w-5 h-5" />, color: colorClass };
};

export const getFlavorIntro = (currentSetting: string): string => {
    const s = currentSetting.toLowerCase();
    let flavors: string[] = [];

    // 1. Universal / Generic (Always available to add variety)
    const universal = [
        "Distracted by a sudden noise, ",
        "You hesitate for a split second and ",
        "Your foot slips on loose ground and ",
        "Sweat stings your eyes and ",
        "A momentary lapse in concentration means ",
        "Bad luck strikes! ",
        "You misjudge the distance and ",
        "In a moment of pure hubris, ",
        "Gravity becomes your enemy and ",
        "The gods look away for a moment and ",
        "Your confidence outweighs your skill and ",
        "Fate decides to humble you and ",
        "A sudden muscle spasm causes trouble and ",
    ];

    // 2. Setting Specific Injections
    
    // FANTASY / TAVERN
    if (s.includes('fantasy')) {
        flavors.push(
            "A sudden flare of torchlight blinds you and ",
            "You slip on a patch of mud (or worse) and ",
            "A fly buzzes directly into your mouth and ",
            "Your equipment belt snags on a stray nail and ",
            "The smell of stale ale distracts you and ",
            "A sudden gust of wind throws you off balance and ",
            "You are startled by a nearby chicken/rat and ",
            "Your cloak gets tangled in your legs and ",
            "You step on a loose cobblestone and ",
        );
    }

    // WESTERN SPECIFIC
    if (s.includes('western')) {
        flavors.push(
            "The harsh sun glares in your eyes and ",
            "A tumbleweed actually rolls into your legs and ",
            "Sand gets in your boots, throwing you off and ",
            "The sound of a distant hawk distracts you and ",
            "Your spurs catch on each other and ",
            "A horse whinnies loudly, startling you and ",
            "The smell of gunpowder makes you sneeze and ",
        );
    }

    // NAUTICAL / PIRATE SPECIFIC
    if (s.includes('pirate') || s.includes('nautical')) {
        flavors.push(
            "The ship lurches unexpectedly and ",
            "Sea spray hits you in the face and ",
            "You slip on the wet deck and ",
            "The sun reflects blindly off the water and ",
            "A loose rope catches your ankle and ",
            "A parrot screeches in your ear and ",
        );
    }

    // STEAMPUNK SPECIFIC
    if (s.includes('steam')) {
        flavors.push(
            "A steam valve bursts nearby and ",
            "Your goggles fog up instantly and ",
            "The gears of your equipment jam momentarily and ",
            "Soot gets in your eyes and ",
            "A clockwork mechanism misfires and ",
        );
    }

    // SCI-FI / CYBER / TECH
    if (s.includes('cyber') || s.includes('sci-fi') || s.includes('space')) {
        flavors.push(
            "Your HUD glitches with a pop-up ad and ",
            "A sudden frame-rate drop disorients you and ",
            "Magnetic interference locks your joints and ",
            "Your optic sensors flare with static and ",
            "A neon sign flickers brightly, distracting you and ",
            "Haptic feedback failure causes your hand to numb and ",
            "System lag causes you to move a second too late and ",
            "A rogue update notification blocks your vision and ",
            "Your battery saver mode engages unexpectedly and ",
        );
    }

    // POST-APOCALYPTIC / WASTELAND
    if (s.includes('apoca') || s.includes('waste')) {
        flavors.push(
            "You cough on a cloud of irradiated dust and ",
            "Your gear jams with rust and grit and ",
            "The geiger counter clicks frantically, startling you and ",
            "Debris shifts beneath your feet and ",
            "You are blinded by the harsh, unfiltered sun and ",
            "A sudden hunger pang cramps your stomach and ",
            "Your makeshift armor pinches painfully and ",
        );
    }

    // HORROR / GOTHIC / DARK
    if (s.includes('horror') || s.includes('dark') || s.includes('gothic')) {
        flavors.push(
            "A phantom whisper chills your blood and ",
            "Shadows seem to grab at your ankles and ",
            "A sudden feeling of dread freezes your muscles and ",
            "You slip on an unidentified viscous fluid and ",
            "The oppressive atmosphere weighs you down and ",
            "You catch a glimpse of something behind you and ",
            "The screams of the damned distract you and ",
            "A cold wind blows from nowhere and ",
        );
    }

    // MODERN / URBAN
    if (s.includes('modern') || s.includes('urban')) {
        flavors.push(
            "Your phone vibrates in your pocket and ",
            "A car horn blares nearby and ",
            "You trip over a curb and ",
            "The streetlights flicker and ",
            "You are distracted by a billboard and ",
        );
    }

    // Combine specific + universal
    const pool = [...flavors, ...universal];
    return pool[Math.floor(Math.random() * pool.length)];
};

export const getFumbleEmojis = (type: string, tone: number): string => {
    const silly = tone <= 35;
    const lethal = tone >= 86;

    let emojis = ["🎲", "😱"]; // Fallback

    switch (type) {
        case 'Melee':
            if (silly) emojis = ["🍌", "💫", "🥴", "🪵", "🤦", "🐔", "🤕"];
            else if (lethal) emojis = ["💀", "☠️", "🏥", "🩸", "🪦", "💔", "🤕"];
            else emojis = ["⚔️", "🛡️", "🩸", "🦶", "😵", "🤕", "🧱"];
            break;
        case 'Ranged':
            if (silly) emojis = ["🏹", "🙈", "👣", "🧱", "👀", "🤦", "🤥"];
            else if (lethal) emojis = ["💥", "🤕", "🚑", "🩸", "🧨", "💀", "👁️"];
            else emojis = ["🏹", "💢", "🤕", "🧱", "🎯", "💨"];
            break;
        case 'Spell':
            if (silly) emojis = ["🧙‍♂️", "✨", "🐥", "🍄", "🐸", "🪄", "🤪", "💇"];
            else if (lethal) emojis = ["💀", "👻", "☄️", "💥", "🧟", "🔥", "🕳️"];
            else emojis = ["⚡", "🔥", "❄️", "🌪️", "🤐", "🔮", "🌫️"];
            break;
        case 'Social':
            if (silly) emojis = ["🗣️", "😳", "🦗", "🤐", "🤡", "🤢", "👖", "💍"];
            else if (lethal) emojis = ["👑", "🚔", "⚖️", "☠️", "🗡️", "🩸", "⛓️"];
            else emojis = ["🤬", "👿", "🤥", "💔", "😤", "👎", "🤫"];
            break;
        case 'Skill':
            if (silly) emojis = ["🔧", "🔨", "🍌", "🧱", "🪜", "🤕", "🤦‍♂️", "📦"];
            else if (lethal) emojis = ["💀", "☠️", "🌋", "⚰️", "🧨", "🐊"];
            else emojis = ["🔐", "🕵️‍♂️", "🧗‍♂️", "💥", "🔦", "👣"];
            break;
    }

    // Select 2-3 random unique emojis
    const count = Math.floor(Math.random() * 2) + 2; // 2 or 3
    const shuffled = emojis.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count).join(' ');
};