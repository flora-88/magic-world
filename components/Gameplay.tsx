import React, { useState, useEffect, useRef } from 'react';
import { useGame } from '../context/GameContext';
import { LOCATIONS, NPCS, SHOP_INVENTORY, ITEMS } from '../constants';
import { ParchmentContainer, GoldButton, Badge, Input } from './UI';
import Classroom from './Classroom';
import { generateNPCResponse } from '../services/geminiService';
import { ChatMessage, Item, Quest } from '../types';

const Gameplay: React.FC = () => {
  const { state, updateLocation, setState, addQuest, checkQuestTrigger, saveGame, resetGame, removeQuest } = useGame();
  const [activeTab, setActiveTab] = useState<'map' | 'location' | 'inventory' | 'quests'>('location');
  
  // Chat State
  const [selectedNPC, setSelectedNPC] = useState<string | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [isChatting, setIsChatting] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentLocation = LOCATIONS.find(l => l.id === state.location);
  const currentNPCs = NPCS.filter(n => n.locationId === state.location);
  
  // Auto-scroll chat when history changes or when opening chat
  useEffect(() => {
    if (selectedNPC && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [state.chatHistory, selectedNPC]);

  const handleMove = (locId: string) => {
    updateLocation(locId);
    setSelectedNPC(null);
    setActiveTab('location');
  };

  const handleChatSend = async () => {
    if (!chatInput.trim() || !selectedNPC) return;
    setIsChatting(true);

    const npc = NPCS.find(n => n.id === selectedNPC);
    if (!npc) return;

    // Check for quest completion upon talking
    checkQuestTrigger('Talk', selectedNPC);

    // Add User Message
    const userMsg: ChatMessage = { sender: 'Player', text: chatInput };
    const historyKey = `${selectedNPC}_${state.name}`;
    const previousHistory = state.chatHistory?.[historyKey] || [];
    
    // Optimistic Update
    const updatedHistory = [...previousHistory, userMsg];
    setState(prev => ({
      ...prev,
      chatHistory: { ...(prev.chatHistory || {}), [historyKey]: updatedHistory }
    }));
    setChatInput('');

    // AI Response
    const response = await generateNPCResponse(npc.name, npc.personality, updatedHistory, userMsg.text);
    
    const npcMsg: ChatMessage = { sender: 'NPC', text: response.text, emotion: response.emotion };
    
    setState(prev => ({
      ...prev,
      chatHistory: { ...(prev.chatHistory || {}), [historyKey]: [...updatedHistory, npcMsg] }
    }));
    setIsChatting(false);
  };

  const buyItem = (itemId: string) => {
    const item = ITEMS.find(i => i.id === itemId);
    if (item && state.money >= item.price) {
      setState(prev => ({
        ...prev,
        money: prev.money - item.price,
        inventory: [...(prev.inventory || []), itemId]
      }));
      // Check for quest completion upon obtaining item
      checkQuestTrigger('Find', itemId);
    } else {
      alert("金錢不足！");
    }
  };

  const sellItem = (itemId: string) => {
    const item = ITEMS.find(i => i.id === itemId);
    if (item) {
      setState(prev => {
        const idx = (prev.inventory || []).indexOf(itemId);
        const newInv = [...(prev.inventory || [])];
        if (idx > -1) newInv.splice(idx, 1);
        return {
          ...prev,
          money: prev.money + Math.floor(item.price / 2),
          inventory: newInv
        };
      });
    }
  };

  const handleInvestigate = () => {
    // Check if there are active 'Find' quests
    const activeFindQuests = (state.quests || []).filter(q => !q.isCompleted && q.requirementType === 'Find');
    
    // 30% chance to specifically find a quest item if one is active and we investigate
    if (activeFindQuests.length > 0 && Math.random() > 0.7) {
      const quest = activeFindQuests[0];
      if (quest.targetId) {
        checkQuestTrigger('Find', quest.targetId);
        alert(`你在仔細搜索後發現了任務物品：${getTargetName('Find', quest.targetId)}！`);
        return; 
      }
    }

    // Default investigate logic (finding money)
    const roll = Math.random();
    if (roll > 0.5) {
      const goldFound = Math.floor(Math.random() * 5) + 1;
      setState(prev => ({ ...prev, money: prev.money + goldFound }));
      alert(`你四處調查，在角落發現了 ${goldFound} 加隆！`);
    } else {
      alert("你仔細調查了四周，但什麼也沒發現。");
    }
  };

  // Helper to get target name for quests
  const getTargetName = (type: string | undefined, id: string | undefined) => {
    if (!id) return "???";
    if (type === 'Talk') {
      const n = NPCS.find(npc => npc.id === id);
      return n ? n.name : id;
    }
    if (type === 'Find') {
      const i = ITEMS.find(item => item.id === id);
      return i ? i.name : id;
    }
    return id;
  };

  // -- RENDER HELPERS --

  const renderMap = () => (
    <div className="grid grid-cols-2 gap-4 pb-20">
      {LOCATIONS.map(loc => (
        <button
          key={loc.id}
          onClick={() => handleMove(loc.id)}
          className={`p-4 border-2 rounded-lg transition-all flex flex-col items-center justify-center h-32 text-center relative overflow-hidden ${
            state.location === loc.id 
            ? 'border-green-500 bg-green-900/30' 
            : 'border-amber-700 bg-black/40 hover:bg-amber-900/40'
          }`}
        >
          <span className="font-bold text-lg relative z-10">{loc.name}</span>
          <span className="text-xs text-gray-400 mt-1 relative z-10">{loc.type}</span>
          {state.location === loc.id && <span className="text-green-400 text-xs mt-2 relative z-10">● 現在位置</span>}
        </button>
      ))}
    </div>
  );

  const renderChatInterface = () => {
    const npc = NPCS.find(n => n.id === selectedNPC);
    if (!npc) return null;

    const historyKey = `${npc.id}_${state.name}`;
    const history = state.chatHistory?.[historyKey] || [];
    const lastMsg = history.length > 0 ? history[history.length - 1] : null;
    const emotion = (lastMsg?.sender === 'NPC' && lastMsg.emotion) ? lastMsg.emotion : 'NEUTRAL';

    return (
      <div className="fixed inset-0 z-50 bg-black/90 flex flex-col p-4 animate-fade-in">
        {/* Chat Header */}
        <div className="flex items-center justify-between border-b border-amber-700 pb-4 bg-gray-900/50 p-2 rounded-t-lg">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 rounded-full border-2 border-amber-500 overflow-hidden">
                <img src={npc.image} alt={npc.name} className="w-full h-full object-cover" />
             </div>
             <div>
                <h3 className="text-xl font-bold text-amber-100">{npc.name}</h3>
                <span className="text-xs text-amber-400">{npc.role} • {emotion}</span>
             </div>
          </div>
          <button 
            onClick={() => setSelectedNPC(null)}
            className="text-amber-200 hover:text-white px-3 py-1 border border-amber-700 rounded"
          >
            離開對話
          </button>
        </div>

        {/* Chat History Area */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] bg-gray-900/80"
        >
           {history.length === 0 && (
             <div className="text-center text-gray-500 mt-10">
               <p>你靠近了 {npc.name}...</p>
               <p className="text-sm">試著說聲 "Hello" 或詢問關於霍格華茲的事。</p>
             </div>
           )}
           {history.map((msg, idx) => (
             <div key={idx} className={`flex ${msg.sender === 'Player' ? 'justify-end' : 'justify-start'}`}>
               <div className={`max-w-[80%] p-3 rounded-lg border ${
                 msg.sender === 'Player' 
                 ? 'bg-amber-900/80 border-amber-700 text-amber-50 rounded-tr-none' 
                 : 'bg-gray-800/90 border-gray-600 text-gray-200 rounded-tl-none'
               }`}>
                 <p>{msg.text}</p>
               </div>
             </div>
           ))}
           {isChatting && (
             <div className="flex justify-start">
               <div className="bg-gray-800/50 p-3 rounded-lg rounded-tl-none">
                 <span className="animate-pulse">...</span>
               </div>
             </div>
           )}
        </div>

        {/* Input Area */}
        <div className="pt-4 bg-gray-900/50 p-2 rounded-b-lg">
          <div className="flex gap-2">
            <Input 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !isChatting && handleChatSend()}
              placeholder={`對 ${npc.name} 說些什麼...`}
              disabled={isChatting}
              autoFocus
            />
            <GoldButton onClick={handleChatSend} disabled={isChatting || !chatInput.trim()}>
              發送
            </GoldButton>
          </div>
        </div>
      </div>
    );
  };

  const renderLocation = () => {
    if (!currentLocation) return null;
    
    // Class Logic
    if (currentLocation.type === 'Classroom' && currentLocation.subject) {
      return <Classroom subject={currentLocation.subject} onLeave={() => handleMove('GreatHall')} />;
    }

    return (
      <div className="space-y-6 pb-20">
        <ParchmentContainer>
          <div className="flex justify-between items-start">
             <h2 className="text-3xl font-bold mb-2">{currentLocation.name}</h2>
             <GoldButton onClick={handleInvestigate} className="text-sm px-3 py-1 bg-amber-900/50">
               🔍 調查
             </GoldButton>
          </div>
          <p className="italic text-lg mt-2">{currentLocation.description}</p>
        </ParchmentContainer>

        {/* NPC Roster List */}
        <div className="space-y-2">
           <h3 className="text-xl text-amber-200 font-bold border-b border-amber-800 pb-2 mb-4">
             在此處的人物 ({currentNPCs.length})
           </h3>
           
           {currentNPCs.length === 0 && <p className="text-gray-400 italic">這裡現在空無一人...</p>}
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {currentNPCs.map(npc => (
               <div key={npc.id} className="bg-[#1a1a1a] border border-amber-900/50 p-3 rounded-lg flex items-center justify-between hover:bg-[#252525] transition-colors">
                  <div className="flex items-center gap-3">
                     <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-500">
                        <img src={npc.image} alt={npc.name} className="w-full h-full object-cover" />
                     </div>
                     <div>
                        <h4 className="font-bold text-amber-100">{npc.name}</h4>
                        <p className="text-xs text-gray-400">{npc.role}</p>
                     </div>
                  </div>
                  <GoldButton onClick={() => setSelectedNPC(npc.id)} className="text-sm py-1 px-3">
                    對話
                  </GoldButton>
               </div>
             ))}
           </div>
        </div>

        {/* Shop Logic */}
        {currentLocation.isShop && (
          <div className="bg-black/50 p-4 rounded-lg border border-amber-800 mt-8">
            <h3 className="text-xl text-gold-400 mb-4 font-bold border-b border-gray-600 pb-2">商店商品</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(SHOP_INVENTORY[currentLocation.id] || []).map(itemId => {
                const item = ITEMS.find(i => i.id === itemId);
                if (!item) return null;
                return (
                  <div key={item.id} className="flex justify-between items-center bg-[#2a2a2a] p-3 rounded">
                    <div>
                      <p className="font-bold text-amber-100">{item.name}</p>
                      <p className="text-xs text-gray-400">{item.price} G</p>
                    </div>
                    <GoldButton onClick={() => buyItem(item.id)} className="text-sm px-3 py-1">購買</GoldButton>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderInventory = () => (
    <ParchmentContainer>
      <h2 className="text-2xl font-bold mb-4 border-b border-amber-800 pb-2">背包</h2>
      <div className="grid grid-cols-1 gap-4">
        {(state.inventory || []).length === 0 ? <p>背包是空的。</p> : (state.inventory || []).map((itemId, idx) => {
          const item = ITEMS.find(i => i.id === itemId);
          if (!item) return null;
          return (
            <div key={`${itemId}-${idx}`} className="flex justify-between items-center border-b border-amber-800/20 pb-2">
              <div>
                <p className="font-bold">{item.name}</p>
                <p className="text-sm italic text-amber-900/70">{item.description}</p>
              </div>
              <button onClick={() => sellItem(itemId)} className="text-red-800 text-sm underline hover:text-red-600">
                賣出 ({Math.floor(item.price / 2)} G)
              </button>
            </div>
          );
        })}
      </div>
    </ParchmentContainer>
  );

  const renderQuests = () => (
    <ParchmentContainer>
      <div className="flex justify-between items-center mb-4 border-b border-amber-800 pb-2">
        <h2 className="text-2xl font-bold">任務日誌</h2>
        <GoldButton onClick={addQuest} className="text-sm px-2 py-1">+ 尋找任務</GoldButton>
      </div>
      <div className="space-y-4">
        {(state.quests || []).length === 0 && <p>目前沒有任務。</p>}
        {(state.quests || []).map((q: Quest) => (
          <div key={q.id} className={`p-3 rounded border ${q.isCompleted ? 'bg-green-900/10 border-green-700' : 'bg-amber-100 border-amber-400'}`}>
            <div className="flex justify-between items-start">
              <h3 className="font-bold">{q.title}</h3>
              {q.isCompleted ? <Badge color="bg-green-700">Completed</Badge> : <Badge>Active</Badge>}
            </div>
            <p className="text-sm mt-1">{q.description}</p>
            
            {!q.isCompleted && (
              <div className="mt-2 text-sm text-amber-900 bg-amber-200/50 p-2 rounded">
                <strong>目標:</strong> {q.requirementType === 'Talk' ? '與 ' : '尋找 '} 
                <span className="font-bold underline">{getTargetName(q.requirementType, q.targetId)}</span>
                {q.requirementType === 'Talk' ? ' 對話' : ''}
              </div>
            )}

            <div className="mt-2 flex justify-between items-center">
              <span className="text-xs font-bold text-amber-800">獎勵: {q.reward} G</span>
              <div className="flex gap-2">
                {q.isCompleted ? (
                   <button onClick={() => removeQuest(q.id)} className="text-xs bg-gray-600 text-white px-2 py-1 rounded hover:bg-gray-500">
                     關閉
                   </button>
                ) : (
                   <button onClick={() => removeQuest(q.id)} className="text-xs text-red-700 hover:text-red-900 underline">
                     放棄
                   </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </ParchmentContainer>
  );

  return (
    <div className="min-h-screen pb-20 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')]">
      {/* Header */}
      <header className="bg-amber-900/90 text-amber-100 p-4 border-b-4 border-amber-600 sticky top-0 z-40 backdrop-blur-sm shadow-lg flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold font-serif">Hogwarts RPG</h1>
          <p className="text-xs text-amber-300">{state.name} | {state.house}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-black/40 px-3 py-1 rounded-full border border-amber-500">
            <span className="text-yellow-400 font-bold">{state.money} G</span>
          </div>
          <button onClick={saveGame} className="text-xs bg-amber-800 px-2 py-1 rounded border border-amber-600">Save</button>
          <button onClick={resetGame} className="text-xs bg-red-900 px-2 py-1 rounded border border-red-700">Reset</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 max-w-4xl mx-auto">
        {activeTab === 'map' && renderMap()}
        {activeTab === 'location' && !selectedNPC && renderLocation()}
        {activeTab === 'inventory' && renderInventory()}
        {activeTab === 'quests' && renderQuests()}
      </main>
      
      {/* Chat Overlay */}
      {selectedNPC && renderChatInterface()}

      {/* Bottom Nav */}
      {!selectedNPC && (
        <nav className="fixed bottom-0 left-0 w-full bg-amber-950 border-t border-amber-700 p-2 flex justify-around text-amber-200 z-50">
          <button onClick={() => setActiveTab('location')} className={`flex flex-col items-center ${activeTab === 'location' ? 'text-white scale-110' : 'opacity-70'}`}>
            <span>🏰</span>
            <span className="text-xs">Location</span>
          </button>
          <button onClick={() => setActiveTab('map')} className={`flex flex-col items-center ${activeTab === 'map' ? 'text-white scale-110' : 'opacity-70'}`}>
            <span>🗺️</span>
            <span className="text-xs">Map</span>
          </button>
          <button onClick={() => setActiveTab('inventory')} className={`flex flex-col items-center ${activeTab === 'inventory' ? 'text-white scale-110' : 'opacity-70'}`}>
            <span>🎒</span>
            <span className="text-xs">Items</span>
          </button>
          <button onClick={() => setActiveTab('quests')} className={`flex flex-col items-center ${activeTab === 'quests' ? 'text-white scale-110' : 'opacity-70'}`}>
            <span>📜</span>
            <span className="text-xs">Quests</span>
          </button>
        </nav>
      )}
    </div>
  );
};

export default Gameplay;