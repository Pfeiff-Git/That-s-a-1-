import React, { useState } from 'react';
import { Sword, Wand, Crosshair, MessageSquare, AlertTriangle, Map, Footprints, Copy, Check, Book, Share2 } from 'lucide-react';
import { campaignSettings, fumbles, gameSystems } from '../data';
import { getTheme, getToneLabel, getFlavorIntro, getFumbleEmojis } from '../utils/themeUtils';
import { FumbleResult } from '../types';

export default function FumbleApp() {
  const [setting, setSetting] = useState<string>(campaignSettings[0]);
  const [system, setSystem] = useState<string>("dnd5e");
  const [tone, setTone] = useState<number>(50);
  const [attackType, setAttackType] = useState<string>("Melee");
  const [result, setResult] = useState<FumbleResult | null>(null);
  const [history, setHistory] = useState<FumbleResult[]>([]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [appShared, setAppShared] = useState<boolean>(false);
  
  // Track indices of fumbles from the master data array that have been used
  const [usedIndices, setUsedIndices] = useState<Set<number>>(new Set());

  const sounds = ["D'oh!", "Oof!", "Ugh...", "Yikes!", "Oh no...", "Gah!", "Whoops!", "Ouch!", "Splat!", "Clang!", "Thud!", "Cringe...", "My bad!", "Oopsy!", "Aaargh!", "Blergh!", "Facepalm", "Whiff!", "Clunk!", "Darn!", "Welp...", "Egads!", "Fiddlesticks!"];
  const [buttonLabel, setButtonLabel] = useState<string>(sounds[Math.floor(Math.random() * sounds.length)]);

  const theme = getTheme(setting);
  const toneLabel = getToneLabel(tone, theme);
  
  const selectedSystem = gameSystems.find(s => s.id === system) || gameSystems[0];
  const titleText = selectedSystem.title || "That's a 1";

  const generateFumble = () => {
    setIsAnimating(true);
    setCopied(false);
    setButtonLabel(sounds[Math.floor(Math.random() * sounds.length)]);
    setTimeout(() => setIsAnimating(false), 500);

    // 1. Filter by Type
    let criteriaPool = fumbles.filter(f => f.type === attackType);
    
    // 2. Filter by Tone
    criteriaPool = criteriaPool.filter(f => tone >= f.minTone && tone <= f.maxTone);
    
    // 3. Filter by System
    criteriaPool = criteriaPool.filter(f => {
        const isUniversal = !f.systems || f.systems.length === 0;
        if (system === 'generic') return isUniversal;
        return isUniversal || f.systems.includes(system);
    });

    // Fallback if pool is empty (rare, but possible with strict filtering)
    if (criteriaPool.length === 0) {
         criteriaPool = fumbles.filter(f => f.type === attackType && (!f.systems || f.systems.includes(system)));
    }
    if (criteriaPool.length === 0) {
         criteriaPool = fumbles.filter(f => f.type === attackType && !f.systems);
    }

    // 4. NO DUPLICATES LOGIC
    // Map the filtered objects back to their original indices in the master 'fumbles' array
    const candidateIndices = criteriaPool.map(f => fumbles.indexOf(f));
    
    // Filter out indices that are already in 'usedIndices'
    let availableIndices = candidateIndices.filter(index => !usedIndices.has(index));

    // If we've exhausted this specific pool, reset the history for ONLY these items to "reshuffle" the deck
    if (availableIndices.length === 0) {
        // Remove the current candidates from the used set so they are fresh again
        const newUsedSet = new Set(usedIndices);
        candidateIndices.forEach(idx => newUsedSet.delete(idx));
        setUsedIndices(newUsedSet);
        availableIndices = candidateIndices; // They are all available again
    }

    // Pick a random index from the available ones
    const selectedIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    const randomFumble = fumbles[selectedIndex];
    
    // Add to used list
    setUsedIndices(prev => {
        const next = new Set(prev);
        next.add(selectedIndex);
        return next;
    });
    
    // 5. Smart Flavor Injection
    const flavorText = getFlavorIntro(setting);

    const finalResult: FumbleResult = {
        id: Date.now(),
        // Capitalize the first letter of the fumble text since it's now mid-sentence
        text: flavorText + randomFumble.text,
        type: attackType,
        toneValue: tone
    };

    setResult(finalResult);
    setHistory(prev => [finalResult, ...prev.slice(0, 2)]);
  };

  const handleCopy = () => {
    if (result) {
        const emojis = getFumbleEmojis(result.type, result.toneValue);
        const textToCopy = `"${result.text}" ${emojis}`;
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShareApp = async () => {
    const shareData = {
        title: titleText,
        text: "Check out this critical failure generator for TTRPGs!",
        url: window.location.href
    };

    try {
        if (navigator.share) {
            await navigator.share(shareData);
        } else {
            await navigator.clipboard.writeText(window.location.href);
            setAppShared(true);
            setTimeout(() => setAppShared(false), 2000);
        }
    } catch (err) {
        console.error("Error sharing:", err);
    }
  };

  return (
    <div className={`min-h-screen ${theme.bg} transition-colors duration-500 flex flex-col items-center p-4 sm:p-8 relative overflow-x-hidden`} style={theme.bgStyle}>
      
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
          20%, 40%, 60%, 80% { transform: translateX(2px); }
        }
        .animate-shake {
          animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes pop-glow {
          0% { filter: brightness(1); }
          50% { filter: brightness(1.3); }
          100% { filter: brightness(1); }
        }
        .animate-pop-glow {
          animation: pop-glow 0.5s ease-out;
        }
      `}</style>

      {/* Vignette Overlay for Atmosphere */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(transparent_0%,rgba(0,0,0,0.4)_100%)]"></div>
      
      {/* Tavern Candle Flicker Overlay */}
      {theme.id === 'tavern' && (
         <div className="absolute inset-0 pointer-events-none opacity-20 bg-amber-500 mix-blend-overlay animate-pulse"></div>
      )}

      {/* Header */}
      <div className="relative z-10 w-full max-w-2xl mb-8 flex flex-col items-center text-center space-y-2 mt-8">
        <h1 
            className={`${theme.textMain} text-base sm:text-4xl uppercase tracking-wider drop-shadow-md whitespace-nowrap`}
            style={{ fontFamily: theme.fontHeader }}
        >
        "{titleText}"
        </h1>
        <p className={`${theme.textMuted} text-lg`} style={{ fontFamily: theme.fontBody }}>
            -- Critical Failure Generator --
        </p>
      </div>

      <div className="w-full max-w-2xl grid gap-6 relative z-10">
        
        {/* MAIN CONTROLS "CARD" */}
        <div className={`${theme.container} p-6 transition-all duration-500`}>
            
            {/* Row 1: System & Setting (Meta) */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                 {/* Setting Select (MOVED FIRST) */}
                <div className="space-y-2">
                    <label className={`${theme.textMuted} text-xs sm:text-sm uppercase tracking-wider block`} style={{ fontFamily: theme.fontHeader }}>
                        Flavor / Setting
                    </label>
                    <div className="relative">
                        <select 
                            value={setting}
                            onChange={(e) => setSetting(e.target.value)}
                            className={`w-full ${theme.input} appearance-none rounded-none p-3 outline-none cursor-pointer text-lg`}
                            style={{ fontFamily: theme.fontBody }}
                        >
                            {campaignSettings.map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                        <div className={`absolute right-3 top-3 pointer-events-none ${theme.textMuted}`}>
                            <Map size={24} strokeWidth={2} />
                        </div>
                    </div>
                </div>

                 {/* System Select (MOVED SECOND) */}
                 <div className="space-y-2">
                    <label className={`${theme.textMuted} text-xs sm:text-sm uppercase tracking-wider block`} style={{ fontFamily: theme.fontHeader }}>
                        Ruleset
                    </label>
                    <div className="relative">
                        <select 
                            value={system}
                            onChange={(e) => setSystem(e.target.value)}
                            className={`w-full ${theme.input} appearance-none rounded-none p-3 outline-none cursor-pointer text-lg`}
                            style={{ fontFamily: theme.fontBody }}
                        >
                            {gameSystems.map((s) => (
                                <option key={s.id} value={s.id}>{s.label}</option>
                            ))}
                        </select>
                        <div className={`absolute right-3 top-3 pointer-events-none ${theme.textMuted}`}>
                            <Book size={24} strokeWidth={2} />
                        </div>
                    </div>
                </div>
            </div>

            <hr className={`border-dashed ${theme.textMuted} opacity-30 mb-6`} />

            {/* Row 2: Action Type */}
            <div className="space-y-2 mb-8">
                <label className={`${theme.textMuted} text-xs sm:text-sm uppercase tracking-wider block`} style={{ fontFamily: theme.fontHeader }}>
                    Action Type
                </label>
                <div className="relative">
                    <select 
                        value={attackType}
                        onChange={(e) => setAttackType(e.target.value)}
                        className={`w-full ${theme.input} appearance-none rounded-none p-3 outline-none cursor-pointer text-lg`}
                        style={{ fontFamily: theme.fontBody }}
                    >
                        <option value="Melee">Melee Attack</option>
                        <option value="Ranged">Ranged Attack</option>
                        <option value="Spell">Magic / Spell</option>
                        <option value="Social">Social Interaction</option>
                        <option value="Skill">Skill Check / Stealth</option>
                    </select>
                    <div className={`absolute right-3 top-3 pointer-events-none ${theme.textMuted}`}>
                        {attackType === 'Melee' && <Sword size={24} strokeWidth={2}/>}
                        {attackType === 'Ranged' && <Crosshair size={24} strokeWidth={2}/>}
                        {attackType === 'Spell' && <Wand size={24} strokeWidth={2}/>}
                        {attackType === 'Social' && <MessageSquare size={24} strokeWidth={2}/>}
                        {attackType === 'Skill' && <Footprints size={24} strokeWidth={2}/>}
                    </div>
                </div>
            </div>

            {/* Row 3: Tone Slider */}
            <div className="space-y-4 mb-10">
                <div className="flex justify-between items-end gap-2 sm:gap-4">
                    <label className={`${theme.textMuted} text-xs sm:text-xs uppercase tracking-wider whitespace-nowrap flex-shrink-0`} style={{ fontFamily: theme.fontHeader }}>
                        Chaos Level <span className="text-[0.7em] opacity-70 normal-case align-middle ml-0.5 sm:ml-1">(Slide)</span>
                    </label>
                    <div 
                        className={`flex items-center justify-end gap-2 text-base sm:text-lg min-w-[6rem] whitespace-nowrap transition-colors duration-300`} 
                        style={{ fontFamily: theme.fontBody, ...toneLabel.style }}
                    >
                        {toneLabel.label}
                    </div>
                </div>
                
                <div className="relative h-12 w-full flex items-center select-none touch-none">
                    {/* Track */}
                    <div 
                        className="absolute w-full h-4 rounded-full"
                        style={{
                            background: theme.id === 'cyber' ? '#002200' : 'rgba(0,0,0,0.3)',
                            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)'
                        }}
                    />
                    
                    {/* Invisible Input */}
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={tone}
                        onChange={(e) => setTone(parseInt(e.target.value))}
                        className="absolute w-full h-full opacity-0 cursor-pointer z-20"
                    />
                    
                    {/* Dynamic Custom Thumb (Icon Only) */}
                    <div 
                        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none z-10 flex items-center justify-center transition-all duration-75"
                        style={{ left: `${tone}%` }}
                    >
                        {/* Scaled Icon with Drop Shadow and Fluid Color */}
                        <div 
                            className={`transform scale-[2.0] sm:scale-[2.5] drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] transition-colors duration-100`}
                            style={toneLabel.style}
                        >
                            {toneLabel.icon}
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Button */}
            <button 
                onClick={generateFumble}
                className={`w-full ${theme.button} py-3 sm:py-4 text-xl transition-all relative overflow-hidden`}
                style={{ fontFamily: theme.fontHeader }}
            >
                <div className="relative z-10 flex flex-col items-center justify-center gap-1 uppercase tracking-widest">
                    <span>{buttonLabel}</span>
                    <span className="text-[10px] sm:text-xs opacity-60 font-sans font-bold tracking-[0.2em] border-t border-current/20 pt-1 w-1/2 mx-auto">
                        Tap to Roll
                    </span>
                </div>
            </button>
        </div>

        {/* Result Area */}
        {result && (
            <div 
                key={result.id}
                className={`transform transition-all duration-200 ${isAnimating ? 'scale-95 opacity-80' : 'scale-100 opacity-100 animate-shake'}`}
            >
                <div className={`${theme.container} ${!isAnimating ? 'animate-pop-glow' : ''} p-6 relative overflow-hidden group`}>
                    <div className="flex items-start gap-4">
                        <div className={`p-2 border-2 shrink-0 ${theme.id === 'cyber' ? 'border-green-500 bg-green-900/30' : 'border-red-900/30 bg-red-900/10'}`}>
                            <AlertTriangle className={`${theme.accentColor} w-8 h-8`} />
                        </div>
                        <div className="space-y-2 w-full">
                            <div className="flex justify-between items-start">
                                <h2 className={`${theme.accentColor} text-xl uppercase`} style={{ fontFamily: theme.fontHeader }}>
                                    Critical Failure!
                                </h2>
                                <button 
                                    onClick={handleCopy}
                                    className={`p-2 hover:bg-black/20 rounded transition-colors ${theme.textMuted} hover:${theme.textMain}`}
                                    title="Copy to Clipboard"
                                >
                                    {copied ? <Check size={20} /> : <Copy size={20} />}
                                </button>
                            </div>
                            <p className={`${theme.textMain} text-2xl leading-relaxed`} style={{ fontFamily: theme.fontBody }}>
                                "{result.text}"
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* History */}
        {history.length > 0 && (
            <div className="mt-4">
                <h3 className={`${theme.textMuted} text-xs uppercase mb-2 text-center`} style={{ fontFamily: theme.fontHeader }}>Previous Mishaps</h3>
                <div className="space-y-2 opacity-70">
                    {history.map((h) => (
                        <div key={h.id} className={`${theme.textMain} p-2 border-b-2 border-dashed border-black/20 text-lg flex justify-between items-center gap-4`} style={{ fontFamily: theme.fontBody }}>
                           <span>&gt; {h.text}</span>
                           <span className={`text-xs uppercase px-2 py-1 border border-current opacity-50 whitespace-nowrap`}>{h.type}</span>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* Footer with Share */}
        <div className="relative z-10 mt-12 mb-6 text-center">
            <button
                onClick={handleShareApp}
                className={`flex items-center gap-2 mx-auto px-4 py-2 rounded-full ${theme.textMuted} hover:${theme.textMain} hover:bg-black/10 transition-all`}
                style={{ fontFamily: theme.fontBody }}
            >
                {appShared ? <Check size={16} /> : <Share2 size={16} />}
                <span>{appShared ? "Link Copied!" : "Share this App"}</span>
            </button>
        </div>

      </div>
    </div>
  );
}