import React, { useState } from 'react';
import {
  Code,
  Kanban,
  FileText,
  Palette,
  Video,
  MessageSquare,
  Search,
  Bell,
  Settings,
  Plus,
  Hash,
  User,
  Users,
  Play,
  Terminal,
  ChevronDown,
  Sparkles,
  Send,
  Mic,
  VideoOff,
  Share2,
  ExternalLink,
  Circle
} from 'lucide-react';

export default function App() {
  // Navigation & Workspace State
  const [activeTab, setActiveTab] = useState('code'); // 'code' | 'kanban' | 'docs' | 'whiteboard'
  const [activeChannel, setActiveChannel] = useState('#frontend');
  const [showRightPanel, setShowRightPanel] = useState(true);
  
  // Real-time Chat state
  const [messages, setMessages] = useState([
    { id: 1, user: 'Rahul Sharma', time: '10:42 AM', text: 'Hey Atanu, I just pushed the new API route for authentication.', avatar: 'RS', color: 'bg-emerald-600' },
    { id: 2, user: 'Priya Das', time: '10:45 AM', text: 'Awesome! I am updating the design system specs in Docs now.', avatar: 'PD', color: 'bg-violet-600' },
    { id: 3, user: 'Atanu Biswas', time: '10:48 AM', text: 'Great work team! Let me open the Code Studio and test the live preview.', avatar: 'AB', color: 'bg-indigo-600' }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  // Code Studio State
  const [code, setCode] = useState(`// Welcome to CollabSpace Live Code Studio
// Edits synchronize across all teammates in real time!

function App() {
  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif', color: '#F5F7FA' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>🚀 CollabSpace Preview</h1>
      <p style={{ color: '#9CA3AF' }}>Live sandboxed client-side web application runner.</p>
      <button 
        onClick={() => alert('Hello from CollabSpace!')}
        style={{
          marginTop: '12px',
          padding: '8px 16px',
          backgroundColor: '#6366F1',
          color: '#FFF',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}>
        Click Me
      </button>
    </div>
  );
}

export default App;`);

  // Kanban Tasks Mock State
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Implement JWT Auth flow', tag: 'Backend', priority: 'High', status: 'In Progress', assignee: 'Rahul' },
    { id: '2', title: 'Design dark-mode color tokens', tag: 'UI/UX', priority: 'Medium', status: 'Done', assignee: 'Priya' },
    { id: '3', title: 'Setup WebSocket delta broadcast', tag: 'Realtime', priority: 'Critical', status: 'Todo', assignee: 'Atanu' },
    { id: '4', title: 'Client-side iframe preview sandbox', tag: 'Frontend', priority: 'High', status: 'Review', assignee: 'Atanu' },
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    const newMsg = {
      id: Date.now(),
      user: 'Atanu Biswas',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: inputMsg,
      avatar: 'AB',
      color: 'bg-indigo-600'
    };
    setMessages(prev => [...prev, newMsg]);
    setInputMsg('');
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#0B0D10] text-[#F5F7FA] font-sans antialiased select-none">
      
      {/* 1. TOP GLOBAL APPLICATION BAR */}
      <header className="h-11 border-b border-[#272C36] bg-[#111318] flex items-center justify-between px-3 shrink-0 z-20">
        <div className="flex items-center space-x-3">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-2 font-semibold tracking-wide text-sm">
            <div className="w-5 h-5 rounded bg-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-sm shadow-indigo-500/50">
              C
            </div>
            <span className="text-white">CollabSpace</span>
          </div>

          <div className="h-4 w-[1px] bg-[#272C36]" />

          {/* Workspace Switcher */}
          <button className="flex items-center space-x-1.5 px-2 py-1 rounded hover:bg-[#1B1F28] text-xs text-[#9CA3AF] transition">
            <span className="font-medium text-[#F5F7FA]">Acme Engineering</span>
            <ChevronDown size={13} />
          </button>
        </div>

        {/* Global Search / Command Palette Shortcut */}
        <div className="flex items-center">
          <button className="flex items-center space-x-2 px-3 py-1 bg-[#151820] hover:bg-[#1B1F28] border border-[#272C36] rounded-md text-xs text-[#9CA3AF] transition w-72 justify-between">
            <div className="flex items-center space-x-2">
              <Search size={13} />
              <span>Search workspace or commands...</span>
            </div>
            <kbd className="px-1.5 py-0.5 text-[10px] bg-[#272C36] rounded text-[#F5F7FA]">⌘K</kbd>
          </button>
        </div>

        {/* User Presence & Actions */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 px-2 py-1 bg-[#151820] border border-[#272C36] rounded text-xs">
            <Circle size={8} className="fill-emerald-500 text-emerald-500 animate-pulse" />
            <span className="text-[#9CA3AF]">Connected</span>
          </div>

          <button className="p-1.5 text-[#9CA3AF] hover:text-white hover:bg-[#1B1F28] rounded">
            <Bell size={15} />
          </button>

          <div className="flex items-center space-x-2 pl-1">
            <div className="w-6 h-6 rounded-full bg-indigo-600 text-[10px] font-semibold flex items-center justify-center text-white ring-1 ring-emerald-500">
              AB
            </div>
            <span className="text-xs font-medium text-[#F5F7FA]">Atanu</span>
          </div>
        </div>
      </header>

      {/* 2. BODY LAYOUT: LEFT SIDEBAR + MAIN WORKSPACE + RIGHT PANEL */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* LEFT WORKSPACE SIDEBAR */}
        <aside className="w-60 bg-[#111318] border-r border-[#272C36] flex flex-col shrink-0">
          
          {/* Main Workspace Navigation */}
          <div className="p-3 border-b border-[#272C36]">
            <span className="text-[11px] font-semibold text-[#6B7280] tracking-wider uppercase">Workspace Tools</span>
            <div className="mt-2 space-y-1">
              <button 
                onClick={() => setActiveTab('code')}
                className={`w-full flex items-center space-x-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition ${activeTab === 'code' ? 'bg-[#1B1F28] text-indigo-400 border border-indigo-500/20' : 'text-[#9CA3AF] hover:bg-[#151820] hover:text-white'}`}>
                <Code size={15} />
                <span>Code Studio</span>
              </button>

              <button 
                onClick={() => setActiveTab('kanban')}
                className={`w-full flex items-center space-x-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition ${activeTab === 'kanban' ? 'bg-[#1B1F28] text-indigo-400 border border-indigo-500/20' : 'text-[#9CA3AF] hover:bg-[#151820] hover:text-white'}`}>
                <Kanban size={15} />
                <span>Kanban Board</span>
              </button>

              <button 
                onClick={() => setActiveTab('docs')}
                className={`w-full flex items-center space-x-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition ${activeTab === 'docs' ? 'bg-[#1B1F28] text-indigo-400 border border-indigo-500/20' : 'text-[#9CA3AF] hover:bg-[#151820] hover:text-white'}`}>
                <FileText size={15} />
                <span>Docs & Notes</span>
              </button>

              <button 
                onClick={() => setActiveTab('whiteboard')}
                className={`w-full flex items-center space-x-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition ${activeTab === 'whiteboard' ? 'bg-[#1B1F28] text-indigo-400 border border-indigo-500/20' : 'text-[#9CA3AF] hover:bg-[#151820] hover:text-white'}`}>
                <Palette size={15} />
                <span>Whiteboard</span>
              </button>
            </div>
          </div>

          {/* CHANNELS SECTION */}
          <div className="p-3 border-b border-[#272C36] flex-1 overflow-y-auto">
            <div className="flex items-center justify-between text-[11px] font-semibold text-[#6B7280] tracking-wider uppercase mb-1">
              <span>Channels</span>
              <button className="hover:text-white"><Plus size={13} /></button>
            </div>
            <div className="space-y-0.5">
              {['#general', '#frontend', '#backend', '#design'].map((ch) => (
                <button
                  key={ch}
                  onClick={() => setActiveChannel(ch)}
                  className={`w-full flex items-center space-x-2 px-2 py-1 rounded text-xs transition ${activeChannel === ch ? 'bg-[#151820] text-white font-medium' : 'text-[#9CA3AF] hover:bg-[#151820]/50 hover:text-white'}`}>
                  <Hash size={13} className="text-[#6B7280]" />
                  <span>{ch.replace('#', '')}</span>
                </button>
              ))}
            </div>

            {/* DIRECT MESSAGES SECTION */}
            <div className="mt-4 flex items-center justify-between text-[11px] font-semibold text-[#6B7280] tracking-wider uppercase mb-1">
              <span>Direct Messages</span>
              <button className="hover:text-white"><Plus size={13} /></button>
            </div>
            <div className="space-y-0.5">
              {[
                { name: 'Rahul Sharma', status: 'online', task: 'Editing App.jsx' },
                { name: 'Priya Das', status: 'online', task: 'Updating Docs' },
                { name: 'Alex Morgan', status: 'busy', task: 'In Meeting' }
              ].map(u => (
                <div key={u.name} className="flex items-center justify-between px-2 py-1 rounded text-xs text-[#9CA3AF] hover:bg-[#151820] cursor-pointer">
                  <div className="flex items-center space-x-2">
                    <span className={`w-2 h-2 rounded-full ${u.status === 'online' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                    <span className="text-[#F5F7FA]">{u.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM QUICK ACTIONS */}
          <div className="p-3 border-t border-[#272C36] flex items-center justify-between text-xs text-[#9CA3AF]">
            <button className="flex items-center space-x-2 hover:text-white">
              <Settings size={14} />
              <span>Workspace Settings</span>
            </button>
          </div>
        </aside>

        {/* 3. MAIN WORKSPACE CONTENT AREA (TAB SWITCHER) */}
        <main className="flex-1 flex flex-col bg-[#0B0D10] overflow-hidden">
          
          {/* TAB 1: CODE STUDIO */}
          {activeTab === 'code' && (
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Top Sub-Bar for Code Studio */}
              <div className="h-9 border-b border-[#272C36] bg-[#111318] flex items-center justify-between px-4">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono text-[#F5F7FA] bg-[#1B1F28] px-2 py-0.5 rounded border border-[#272C36]">
                    App.jsx
                  </span>
                  <span className="text-xs text-[#6B7280]">• Atanu editing, Rahul watching</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="flex items-center space-x-1.5 px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-medium transition shadow-sm">
                    <Play size={12} className="fill-white" />
                    <span>Run Preview</span>
                  </button>
                  <button className="flex items-center space-x-1 px-2 py-1 bg-[#1B1F28] hover:bg-[#272C36] text-[#9CA3AF] rounded text-xs transition">
                    <Share2 size={12} />
                    <span>Share</span>
                  </button>
                </div>
              </div>

              {/* Split View: Editor + Live Preview */}
              <div className="flex-1 flex overflow-hidden">
                {/* Monaco / Code Area */}
                <div className="flex-1 border-r border-[#272C36] flex flex-col bg-[#0B0D10]">
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="flex-1 w-full bg-[#0B0D10] text-[#F5F7FA] font-mono text-xs p-4 outline-none resize-none leading-relaxed"
                    spellCheck="false"
                  />
                  {/* Bottom Console Panel */}
                  <div className="h-28 border-t border-[#272C36] bg-[#111318] p-3 font-mono text-[11px]">
                    <div className="flex items-center justify-between text-[#6B7280] mb-2 pb-1 border-b border-[#272C36]/50">
                      <div className="flex items-center space-x-1.5">
                        <Terminal size={12} />
                        <span className="uppercase tracking-wider font-semibold">Console / Output</span>
                      </div>
                      <span className="text-emerald-400">● 0 errors</span>
                    </div>
                    <div className="text-[#9CA3AF]">
                      [LiveSync] Connected to CollabSpace room: #frontend <br />
                      [Bundle] Compiled successfully in 12ms. Sandboxed iframe active.
                    </div>
                  </div>
                </div>

                {/* Right Side: Live Web Preview */}
                <div className="w-1/2 flex flex-col bg-[#151820]">
                  <div className="h-8 border-b border-[#272C36] bg-[#111318] flex items-center justify-between px-3 text-xs text-[#9CA3AF]">
                    <span className="font-medium text-[#F5F7FA]">Live Web Preview</span>
                    <span className="text-[10px] text-emerald-400">● 60 FPS</span>
                  </div>
                  <div className="flex-1 p-4 bg-[#0B0D10] flex items-center justify-center">
                    <div className="w-full h-full border border-[#272C36] rounded-lg bg-[#111318] p-6 shadow-inner flex flex-col justify-center items-center text-center">
                      <div className="w-12 h-12 rounded-full bg-indigo-600/20 text-indigo-400 flex items-center justify-center mb-3">
                        <Sparkles size={24} />
                      </div>
                      <h2 className="text-lg font-bold text-white mb-1">CollabSpace Live Sandbox</h2>
                      <p className="text-xs text-[#9CA3AF] max-w-sm mb-4">
                        Code written in the editor renders here instantly inside an isolated client-side iframe.
                      </p>
                      <button 
                        onClick={() => alert('Live Preview working!')}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md text-xs font-semibold shadow-md transition">
                        Interactive Action Test
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: KANBAN BOARD */}
          {activeTab === 'kanban' && (
            <div className="flex-1 flex flex-col p-6 overflow-x-auto bg-[#0B0D10]">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-lg font-bold text-white">Sprint Kanban Board</h1>
                  <p className="text-xs text-[#9CA3AF]">Drag and drop task cards synchronized with the team.</p>
                </div>
                <button className="flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-medium transition shadow-sm">
                  <Plus size={14} />
                  <span>Create Task</span>
                </button>
              </div>

              {/* Kanban Columns */}
              <div className="grid grid-cols-4 gap-4 flex-1">
                {['Todo', 'In Progress', 'Review', 'Done'].map(col => (
                  <div key={col} className="bg-[#111318] border border-[#272C36] rounded-lg p-3 flex flex-col">
                    <div className="flex items-center justify-between mb-3 text-xs font-semibold text-[#9CA3AF]">
                      <span>{col}</span>
                      <span className="px-1.5 py-0.5 rounded bg-[#1B1F28] text-[10px]">
                        {tasks.filter(t => t.status === col).length}
                      </span>
                    </div>

                    <div className="space-y-2 flex-1 overflow-y-auto">
                      {tasks.filter(t => t.status === col).map(t => (
                        <div key={t.id} className="p-3 bg-[#151820] hover:bg-[#1B1F28] border border-[#272C36] rounded-md shadow-sm cursor-grab transition">
                          <span className="text-[10px] font-semibold text-indigo-400 uppercase tracking-wider block mb-1">
                            {t.tag}
                          </span>
                          <h4 className="text-xs font-medium text-[#F5F7FA] mb-2">{t.title}</h4>
                          <div className="flex items-center justify-between text-[10px] text-[#9CA3AF]">
                            <span className="px-1.5 py-0.5 bg-red-500/10 text-red-400 rounded border border-red-500/20">{t.priority}</span>
                            <span>👤 {t.assignee}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: DOCS & NOTES */}
          {activeTab === 'docs' && (
            <div className="flex-1 flex flex-col p-8 overflow-y-auto max-w-4xl mx-auto w-full">
              <span className="text-xs text-indigo-400 font-medium uppercase tracking-wider mb-2">Documentation / Architecture</span>
              <h1 className="text-3xl font-bold text-white mb-4">Project Alpha Launch Specification</h1>
              <div className="flex items-center space-x-3 text-xs text-[#9CA3AF] pb-4 border-b border-[#272C36] mb-6">
                <span>Created by Atanu</span>
                <span>•</span>
                <span>Last updated 5 mins ago</span>
                <span>•</span>
                <span className="text-emerald-400">3 teammates viewing</span>
              </div>
              <div className="space-y-4 text-sm text-[#9CA3AF] leading-relaxed">
                <p>
                  CollabSpace is architected to give developers a unified real-time suite that combines real-time code editing, agile Kanban sprint tracking, and live documentation.
                </p>
                <div className="p-4 bg-[#151820] border-l-2 border-indigo-500 rounded-r-md">
                  <h3 className="text-xs font-semibold text-white uppercase mb-1">Key Sprint Objective</h3>
                  <p className="text-xs">Deliver zero-lag real-time synchronization using WebSocket room channels and client-side sandboxed execution.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: WHITEBOARD */}
          {activeTab === 'whiteboard' && (
            <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#0B0D10] relative">
              <div className="text-center">
                <Palette size={48} className="text-indigo-500 mx-auto mb-3" />
                <h2 className="text-lg font-bold text-white mb-1">Infinite Collaborative Whiteboard</h2>
                <p className="text-xs text-[#9CA3AF] max-w-sm mb-4">
                  Multiplayer sketching, system architecture wireframes, and sticky notes canvas.
                </p>
                <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-medium shadow transition">
                  Create First Drawing Element
                </button>
              </div>
            </div>
          )}
        </main>

        {/* 4. RIGHT COLLAPSIBLE PANEL: VIDEO CALL TILES & TEAM CHAT */}
        {showRightPanel && (
          <aside className="w-80 bg-[#111318] border-l border-[#272C36] flex flex-col shrink-0">
            
            {/* Top Video Call Heads */}
            <div className="p-3 border-b border-[#272C36]">
              <div className="flex items-center justify-between text-[11px] font-semibold text-[#6B7280] tracking-wider uppercase mb-2">
                <span>Room Video Call (3 Connected)</span>
                <span className="text-emerald-400">● Live</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { name: 'Atanu', mic: true, cam: true, border: 'border-indigo-500' },
                  { name: 'Rahul', mic: true, cam: false, border: 'border-[#272C36]' },
                  { name: 'Priya', mic: false, cam: true, border: 'border-[#272C36]' }
                ].map(peer => (
                  <div key={peer.name} className={`h-16 bg-[#151820] border ${peer.border} rounded-md flex flex-col items-center justify-center relative shadow-sm`}>
                    <div className="w-6 h-6 rounded-full bg-[#1B1F28] flex items-center justify-center text-[10px] font-bold text-[#F5F7FA]">
                      {peer.name[0]}
                    </div>
                    <span className="text-[10px] text-[#9CA3AF] mt-1">{peer.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Team Chat Messages */}
            <div className="flex-1 flex flex-col p-3 overflow-hidden">
              <div className="flex items-center justify-between text-[11px] font-semibold text-[#6B7280] tracking-wider uppercase mb-2">
                <span>Chat: {activeChannel}</span>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {messages.map(m => (
                  <div key={m.id} className="flex space-x-2.5">
                    <div className={`w-6 h-6 rounded-full ${m.color} text-white text-[9px] font-bold flex items-center justify-center shrink-0`}>
                      {m.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline space-x-2">
                        <span className="text-xs font-semibold text-white">{m.user}</span>
                        <span className="text-[10px] text-[#6B7280]">{m.time}</span>
                      </div>
                      <p className="text-xs text-[#9CA3AF] mt-0.5 leading-snug">{m.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input Box */}
              <form onSubmit={handleSendMessage} className="mt-3 relative">
                <input
                  type="text"
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  placeholder={`Message ${activeChannel}...`}
                  className="w-full bg-[#151820] border border-[#272C36] focus:border-indigo-500 rounded-md py-2 pl-3 pr-9 text-xs text-white outline-none placeholder-[#6B7280] transition"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 p-1 text-indigo-400 hover:text-white transition">
                  <Send size={13} />
                </button>
              </form>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
